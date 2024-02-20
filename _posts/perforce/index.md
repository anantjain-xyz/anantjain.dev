---
title: 'Still All on One Server: Perforce at Scale'
description: 'Google'
date: '2021-01-23'
categories: ['Paper Review']
published: true
---

### Abstract

> Google runs the busiest single Perforce server on the planet, and one of the largest repositories in any source control system. From this high-water mark this paper looks at server performance and other issues of scale, with digressions into where we are, how we got here, and how we continue to stay one step ahead of our users.

### Highlights

- Google’s main Perforce server supports over twelve thousand users, has more than a terabyte of metadata, and performs 11-12 million commands on an average day. The server runs on a 16-core machine with 256 GB of memory, running Linux.

- This server instance has been in operation for more than eleven years, and just passed changelist 20,000,000 (of which slightly under ten million are actual changelists).Our largest client has six million files; our largest changelists have in the low hundreds of thousands of files.

- A distinctive feature of the Google environment, which is extremely popular but quite expensive in terms of server load, is our code review tool, “Mondrian”, which provides a dashboard from which users can browse and review changelists.

- In order to understand Perforce performance, one needs to understand **the effect of database locking on concurrency**. For large Perforce sites, this is the single biggest factor affecting performance.For administrators of small sites, it’s still worth understanding that performance issues are often caused by a few users or a few commands, and if you can prevent these you can improve performance without making any other changes.

- **Memory** is important for a Perforce server, but, unlike CPU, there’s a point beyond which more memory doesn’t help. More doesn’t hurt (it’s used for disk caching), but it may be an unnecessary expense.

- **Disk I/O** – For a large site, Perforce performance is dependent on disk I/O more than on any other resource. This means that making sure your disk is correctly configured, keeping your database on local disk instead of on network disk, and striping your data across multiple disk spindles, e.g., with RAID 10, will all improve performance.

- Ways of **reducing use of metadata**: Client and label cleanups, sparse clients, sparse branches, and obliterates (did one large-scale obliterate of all branches older than two years (after letting our users specify exceptions).This removed 11% of the file paths in the depot, saved about $100,000, and let us defer a hardware purchase by a quarter.)

- **Monitor and If Necessary, Kill User Commands**: In simplest terms, the goal is that you should never be notified about a problem by one of your users. In addition to notifying us by email of exceptional conditions, there are some conditions where the right solution is always to kill an offending command, and in these cases we’ve extended the definition of “monitoring” to include killing these processes.

- **Systems Which Offload Work From Perforce**, like replicas, or a file system integration that serves files which would otherwise require calls to “p4 sync”.They also have some specialized database systems which contain much of the Perforce metadata and can be queried instead of the Perforce server.

- **Multiple Servers**: Clearly, putting some projects on other Perforce servers reduces load on the main server, but there are limits to the benefits of this strategy. Unrelated projects can go on different servers, but arbitrarily splitting servers to solve performance problems won’t offset the additional cost in administration, inconvenience, and user education.

- **Availability**: We average about an hour a month of downtime, including scheduled downtime for failovers and upgrades. You need a test server, and you should make every effort to have it look exactly the same as your real server. You need a hot standby, and a failover plan, and you need to test your failovers. Every outage should have a postmortem, with action items to prevent it from happening again.

- **Reducing administrative load**: If you manage multiple servers, make all of them look the same. This means that accounts only have to be created once, and users have the same password on all servers. Invest in automating tasks. Move to longer Licensing terms. Share all information, and document everything.


### Conclusion

There is some pain in being a pioneer: one recurring theme is that Perforce now provides solutions to many problems which we’ve already spent time designing our own solutions for, but this is minor.

### PDF

* [Original](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/39983.pdf)
* [Annotated copy](/assets/blog/perforce/perforce-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #32 in this [series](https://anantjain.dev/#paper-reviews).


