---
title: 'The Tail at Scale'
description: 'Google'
date: '2021-01-09'
categories: ['Paper Review']
published: true
---

### Abstract

> Systems that respond to user actions quickly (within 100ms) feel more fluid and natural to users than those that take longer. Improvements in Internet connectivity and the rise of warehouse-scale computing systems have enabled Web services that provide fluid responsiveness while consulting multi-terabyte datasets spanning thousands of servers; for example, the Google search system updates query results interactively as the user types, predicting the most likely query based on the prefix typed so far, performing the search and showing the results within a few tens of milliseconds. Emerging augmented-reality devices (such as the Google Glass prototype7) will need associated Web services with even greater responsiveness in order to guarantee seamless interactivity. It is challenging for service providers to keep the tail of latency distribution short for interactive services as the size and complexity of the system scales up or as overall use increases. Temporary high-latency episodes (unimportant in moderate-size systems) may come to dominate overall service performance at large scale. Just as fault-tolerant computing aims to create a reliable whole out of less-reliable parts, large online services need to create a predictably responsive whole out of less-predictable parts; we refer to such systems as “latency tail-tolerant,” or simply “tail-tolerant.” Here, we outline some common causes for high-latency episodes in large online services and describe techniques that reduce their severity or mitigate their effect on whole-system performance. In many cases, tail-tolerant techniques can take advantage of resources already deployed to achieve fault-tolerance, resulting in low additional overhead. We explore how these techniques allow system utilization to be driven higher without lengthening the latency tail, thus avoiding wasteful over-provisioning.

### Highlights

- Variability exists due to Shared resources, Daemons, Global resource sharing, Maintenance activities, Queueing, Power limits, Garbage collection, and Energy management.

- Solid-state storage devices provide very fast random read access, but the need to periodically garbage collect a large number of datablocks can increase read latency by a factor of 100 with even a modest level of write activity.

- Variability in the latency distribution of individual components is magnified at the service level. If a user request must collect responses from 100 such servers in parallel, then 63% of user requests will take more than one second. 

- The 99th-percentile latency for all requests to finish is 140ms, and the 99th-percentile latency for 95% of the requests finishing is 70ms, meaning that waiting for the slowest 5% of the requests to complete is responsible for half of the total 99%-percentile latency.

- One can reduce component variability by Differentiating service classes and higher-level queuing, Reducing head-of-line blocking, and Managing background activities and synchronized disruption.

- It is sometimes useful for the system to break long-running requests into a sequence of smaller requests to allow interleaving of the execution of other short-running requests.

- For large fan-out services, it is sometimes useful for the system to synchronize the background activity across many different machines 

- While effective caching layers can be useful, even a necessity in some systems, they do not directly address tail latency, aside from configurations where it is guaranteed that the entire working set of an application can reside in a cache. 

- Google has found it advantageous to develop tail-tolerant techniques that mask or work around temporary latency pathologies, instead of trying to eliminate them altogether. 

- **Hedged requests**: Defer sending a secondary request until the first request has been outstanding for more than the 95th-percentile expected latency for this class of requests. This approach limits the additional load to approximately 5% while substantially shortening the latency tail.

- **Tied requests**: Requests where servers perform cross-server status updates “tied requests.” The simplest form of a tied request has the client send the request to two different servers, each tagged with the identity of the other server (“tied”). When a request begins execution, it sends a cancellation message to its counterpart. The corresponding request, if still enqueued in the other server, can be aborted immediately or deprioritized substantially. The overhead of tied requests in disk utilization is less than 1%, indicating the cancellation strategy is effective at eliminating redundant reads. 

- An alternative to the tied-request and hedged-request schemes is to probe remote queues first, then submit the request to the least-loaded server. 

- Although many systems try to partition data in such a way that the partitions have equal cost, a static assignment of a single partition to each machine is rarely sufficient in practice for two reasons: First, the performance of the underlying machines is neither uniform nor constant overtime, for reasons (such as thermal throttling and shared workload interference) mentioned earlier. And second, outliers in the assignment of items to partitions can cause data-induced load imbalance (such as when a particular item becomes popular and the load for its partition increases). 

- Some examples of Cross-Request Long-Term adaptations are: **Micro-partitions**, **Selective replication** (Google’s main Web search system uses this approach, making additional copies of popular and important documents in multiple micro-partitions.), and Latency-induced probation (by observing the latency distribution of responses from the various machines in the system, intermediate servers sometimes detect situations where the system performs better by excluding a particularly slow machine, or putting it on probation.)

- **Latency-induced probation** implies that removal of serving capacity from a live system during periods of high load actually improves latency, which is counter-intuitive.

- The search results have to be only *good enough*: Since waiting for exceedingly slow servers might stretch service latency to unacceptable levels,Google’s IR systems are tuned to occasionally respond with good-enough results when an acceptable fraction of the overall corpus has been searched, while being careful to ensure good-enough results remain rare. 

- **Canary requests**: To prevent correlated crash scenarios, some of Google’s IR systems employ a technique called “canary requests”; rather than initially send a request to thousands of leaf servers, a root server sends it first to one or two leaf servers. Despite the slight increase in latency caused by canary requests,such requests tend to be used for every request in all of Google’s large fan-out search systems due to the additional safety they provide. 

- **Mutations**: First, the scale of latency-critical modifications in these services is generally small. Second, updates can often be performed off the critical path, after responding to the user. Third, many services can be structured to tolerate inconsistent update models for (inherently more latency-tolerant) mutations. And, finally, for those services that require consistent updates, the most commonly used techniques are quorum-based algorithms (such as Lamport’s Paxos);since these algorithms must commit to only three to five replicas, they are inherently tail-tolerant. 

- **Hardware trends**: Device heterogeneity combined with ever-increasing system scale will make tolerating variability through software techniques even more important over time. 

### Conclusion

While some of the most powerful tail-tolerant techniques require additional resources, their overhead can be rather modest, often relying on existing capacity already provisioned for fault tolerance while yielding substantial latency improvements.

### PDF

* [Original](https://www2.cs.duke.edu/courses/cps296.4/fall13/838-CloudPapers/dean_longtail.pdf)
* [Annotated copy](/assets/blog/tail-at-scale/the-tail-at-scale-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #31 in this [series](https://anantjain.dev/#paper-reviews).


