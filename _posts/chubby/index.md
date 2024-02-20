---
title: "Chubby: Lock Service for Loosely-coupled Distributed Systems"
description: "Google"
date: "2020-06-06"
categories: ['Paper Review']
published: true
---

### Abstract

> We describe our experiences with the Chubby lock service, which is intended to provide coarse-grained locking as well as reliable (though low-volume) storage for a loosely-coupled distributed system. Chubby provides an interface much like a distributed file system with advisory locks, but the design emphasis is on availability and reliability, as opposed to high performance. Many instances of the service have been used for over a year, with several of them each handling a few tens of thousands of clients concurrently. The paper describes the initial design and expected use, compares it with actual use, and explains how the design had to be modified to accommodate the differences.

### Introduction

* Chubby is intended for use within a **loosely-coupled distributed system** consisting of **moderately large numbers of small machines** connected by a high-speed network.
* The primary goals included **reliability**, **availability** to a moderately large set of clients, and **easy-to-understand semantics**; throughput and storage capacity were considered secondary.
* Chubby’s client interface is similar to that of a simple file system that performs whole-file reads and writes, augmented with advisory locks and with notification of various events such as file modification.
* [Google File System](/google-file-system) uses a Chubby lock to appoint a GFS master server, and [Bigtable](/bigtable) uses Chubby in several ways: to elect a master, to allow the master to discover the servers it controls, and to permit clients to find the master. In addition, both GFS and Bigtable use Chubby as a well-known and available location to store a small amount of meta-data; in effect they use Chubby as the root of their distributed data structures.
* Asynchronous consensus is solved by the [Paxos](/paxos) protocol 

### Design Decisions

* Chose a **lock service**, as opposed to a library or service for consensus.
* Chose to **serve small-files** to permit elected primaries to advertise themselves and their parameters, rather than build and maintain a second service.
* A service advertising its primary via a Chubby file may have thousands of clients. Therefore, they must allow **thousands of clients** to observe this file, preferably without needing many servers.
* Clients and replicas of a replicated service may wish to know when the service’s primary changes. This suggests that an **event notification mechanism** would be useful to avoid polling.
* Even if clients need not poll files periodically, many will; this is a consequence of supporting many developers. Thus, **caching** of files is desirable.
* Developers are confused by non-intuitive caching semantics, so they prefer **consistent caching**.
* To avoid both financial loss and _jail time_, we provide security mechanisms, including **access control**.
* A choice that may surprise some readers is that they do not expect lock use to be fine-grained, in which they might be held only for a short duration (seconds or less); instead, they expect **coarse-grained** use. Coarse-grained locks impose far less load on the lock server. In particular, the lock-acquisition rate is usually only weakly related to the transaction rate of the client applications.

### System Structure

![](/assets/blog/chubby/system-structure.png)

* All communication between Chubby clients and the servers is mediated by the client library.
* The replicas use a distributed consensus protocol to elect a **master**; the master must obtain votes from a majority of the replicas, plus promises that those replicas will not elect a different master for an interval of a few seconds known as the **master lease**.
* Clients find the master by sending master location requests to the replicas listed in the DNS.
* Read requests are satisfied by the master alone; this is safe provided the master lease has not expired, as no other master can possibly exist.
* If a master fails, the other replicas run the election protocol when their master leases expire; a new master will typically be elected in a few seconds.
* If a replica fails and does not recover for a few hours, a simple replacement system selects a fresh machine from a free pool and starts the lock server binary on it. It then updates the DNS tables, replacing the IP address of the failed replica with that of the new one.

### Components

* **Locks and Sequencers**: Each Chubby file and directory can act as a reader-writer lock: either one client handle may hold the lock in exclusive (writer) mode, or any number of client handles may hold the lock in shared (reader) mode. Like the mutexes known to most programmers, locks are advisory.
* **Events**: The last two events mentioned are rarely used, and with hindsight could have been omitted:
  * file contents modified
  * child node added, removed, or modified
  * Chubby master failed over
  * a handle (and its lock) has become invalid
  * lock acquired
  * conflicting lock request from another client
* **API**: Clients see a Chubby handle as a pointer to an opaque structure that supports various operations. Handles are created only by `Open()`, and destroyed with `Close()`. `Poison()` causes outstanding and subsequent operations on the handle to fail without closing it; this allows a client to cancel Chubby calls made by other threads without fear of deallocating the memory being accessed by them. The main calls that act on a handle are: `GetContentsAndStat()`, `GetStat()`, `ReadDir()`, `SetContents()`, `SetACL()`, `Delete()`, `Acquire()`, `TryAcquire()`, `Release()`, `GetSequencer()`, `SetSequencer()`, `CheckSequencer()`.
* **Caching**: When file data or meta-data is to be changed, the modification is blocked while the master sends invalidations for the data to every client that may have cached it; this mechanism sits on top of KeepAlive RPCs.
* **Sessions and KeepAlives**: A Chubby session is a relationship between a Chubby cell and a Chubby client; it exists for some interval of time, and is maintained by periodic handshakes called KeepAlives.
* **Fail-overs**: When a master fails or otherwise loses mastership, it discards its in-memory state about sessions, handles, and locks.
* **Database implementation**: The first version of Chubby used the replicated version of Berkeley DB as its database. Because Chubby does not use path-based permissions, a single lookup in the database suffices for each file access.
* **Backup**: Every few hours, the master of each Chubby cell writes a snapshot of its database to a GFS file server in a different building.
* **Mirroring**: Mirroring is used most commonly to copy configuration files to various computing clusters distributed around the world.

### Mechanisms for Scaling

Chubby’s clients are individual processes, so Chubby must handle more clients than one might expect; we have seen 90,000 clients communicating directly with a Chubby master—far more than the number of machines involved. Here, the authors describe two familiar mechanisms, **proxies** and **partitioning**, that they expect will allow Chubby to scale further. They do not yet use them in production, but they are designed, and may be used soon.

### Use, surprises and design errors

* **Used as a name server**: Even though Chubby was designed as a lock service, the authors found that its most popular use was as a name server. Had they foreseen the use of Chubby as a name service, they might have chosen to implement full proxies sooner than they did.
* **Abusive clients**: The most important aspect of their design review is to determine whether use of any of Chubby’s resources (RPC rate, disc space, number of files) grows linearly (or worse) with number of users or amount of data processed by the project. Any linear growth must be mitigated by a compensating parameter that can be adjusted to reduce the load on Chubby to reasonable bounds.
* **Developers rarely consider availability**: Also, developers fail to appreciate the difference between a service being up, and that service being available to their applications.
* **RPC use affects transport protocols**: TCP’s back off policies pay no attention to higher-level timeouts such as Chubby leases, so TCP-based KeepAlives led to many lost sessions at times of high network congestion. They were forced to send KeepAlive RPCs via UDP rather than TCP; UDP has no congestion avoidance mechanisms, so they would prefer to use UDP only when high-level time-bounds must be met.

### Summary

Chubby is a distributed lock service intended for coarse-grained synchronization of activities within Google’s distributed systems; it has found wider use as a name service and repository for configuration information.

### PDF

* [Original](https://static.googleusercontent.com/media/research.google.com/en//archive/chubby-osdi06.pdf)
* [Annotated copy](/assets/blog/chubby/chubby-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #9 in this [series](https://anantjain.dev/#paper-reviews).