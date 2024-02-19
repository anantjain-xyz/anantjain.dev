---
title: "Dynamo: Amazon’s Highly Available Key-value Store"
description: "Amazon"
date: "2020-08-08"
categories: ['Paper Review']
published: true
---

## Abstract

> Reliability at massive scale is one of the biggest challenges we face at Amazon.com, one of the largest e-commerce operations in the world; even the slightest outage has significant financial consequences and impacts customer trust. The Amazon.com platform, which provides services for many web sites worldwide, is implemented on top of an infrastructure of tens of thousands of servers and network components located in many data centers around the world. At this scale, small and large components fail continuously and the way persistent state is managed in the face of these failures drives the reliability and scalability of the software systems. This paper presents the design and implementation of Dynamo, a highly available key-value storage system that some of Amazon’s core services use to provide an “always-on” experience. To achieve this level of availability, Dynamo sacrifices consistency under certain failure scenarios. It makes extensive use of object versioning and application-assisted conflict resolution in a manner that provides a novel interface for developers to use.

## Notes

### Introduction

- There are strict operational requirements on Amazon’s platform in terms of performance, reliability and efficiency, and to support continuous growth the platform needs to be highly scalable. 

- One of the lessons our organization has learned from operating Amazon’s platform is that the reliability and scalability of a system is dependent on how its application state is managed. For example, customers should be able to view and add items to their shopping cart even if disks are failing, network routes are flapping, or data centers are being destroyed by tornados. 

- As such Amazon’s software systems need to be constructed in a manner that treats failure handling as the normal case without impacting availability or performance. 

- Dynamo is used to manage the state of services that have very high reliability requirements and need tight control over the tradeoffs between availability, consistency, cost-effectiveness and performance. 

- A select set of applications requires a storage technology that is flexible enough to let application designers configure their data store appropriately based on these tradeoffs to achieve high availability and guaranteed performance in the most cost effective manner. 

- There are many services on Amazon’s platform that only need primary-key access to a data store. For many services, such as those that provide best seller lists, shopping carts, customer preferences, session management, sales rank, and product catalog, the common pattern of using a relational database would lead to inefficiencies and limit scale and availability. Dynamo provides a simple primary-key only interface to meet the requirements of these applications. 

- Dynamo uses a synthesis of well known techniques to achieve scalability and availability: Data is partitioned and replicated using consistent hashing, and consistency is facilitated by object versioning. The consistency among replicas during updates is maintained by a quorum-like technique and a decentralized replica synchronization protocol. Dynamo employs a gossip based distributed failure detection and membership protocol. Dynamo is a completely decentralized system with minimal need for manual administration. Storage nodes can be added and removed from Dynamo without requiring any manual partitioning or redistribution.

![Summary of techniques used in Dynamo and their advantages](./dynamo-techniques.png)

### Background

- For many of the more common usage patterns of state persistence, a relational database is a solution that is far from ideal. 
    - Most of these services only store and retrieve data by primary key and do not require the complex querying and management functionality offered by an RDBMS.
    - This excess functionality requires expensive hardware and highly skilled personnel for its operation, making it a very inefficient solution.
    - In addition, the available replication technologies are limited and typically choose consistency over availability. 

- Dynamo has a simple key/value interface, is highly available with a clearly defined consistency window, is efficient in its resource usage, and has a simple scale out scheme to address growth in data set size or request rates. Each service that usesDynamo runs its own Dynamo instances.

### Interesting Assumptions

- Dynamo does not provide any isolation guarantees and permits only single key updates. 

- Services must be able to configure Dynamo such that they consistently achieve their latency and throughput requirements.The tradeoffs are in performance, cost efficiency, availability, and durability guarantees. 

- Its operation environment is assumed to be non-hostile and there are no security related requirements such as authentication and authorization. 

- SLA: provide a response within 300ms for 99.9% of its requests for a peak client load of 500 requests per second. 

### A note on SLA's

A common approach in the industry for forming a performance oriented SLA is to describe it using average, median and expected variance. At Amazon we have found that these metrics are not good enough if the goal is to build a system where all customers have a good experience, rather than just the majority. For example if extensive personalization techniques are used then customers with longer histories require more processing which impacts performance at the high-end of the distribution. An SLA stated in terms of mean or median response times will not address the performance of this important customer segment. To address this issue, at Amazon, SLAs are expressed and measured at the **99.9th percentile** of the distribution. The choice for 99.9% over an even higher percentile has been made based on a cost-benefit analysis which demonstrated a significant increase in cost to improve performance that much. 

### Design Considerations

- Availability can be increased by using optimistic replication techniques, where changes are allowed to propagate to replicas in the background, and concurrent, disconnected work is tolerated. The challenge with this approach is that it can lead to conflicting changes which must be detected and resolved. This process of conflict resolution introduces two problems: when to resolve them and who resolves them. Dynamo is designed to be an eventually consistent datastore; that is all updates reach all replicas eventually.

- An important design consideration is to decide when to perform the process of resolving update conflicts, i.e., whether conflicts should be resolved during reads or writes. Dynamo targets the design space of an “always writeable” data store (i.e., a data store that is highly available for writes). For a number of Amazon services, rejecting customer updates could result in a poor customer experience. This requirement forces them to push the complexity of conflict resolution to the reads in order to ensure that writes are never rejected. 

- Who resolves these conflicts? This can be done by the data store or the application. If conflict resolution is done by the data store, its choices are rather limited (“last write wins”). Since the application is aware of the data schema, it can decide on the conflict resolution method that is best suited for its client’s experience. Despite this flexibility, some application developers may not want to write their own conflict resolution mechanisms and choose to push it down to the data store, which in turn chooses a simple policy such as “last write wins”. 

- Other key principles embraced in this design:
    - Incremental scalability
    - Symmetry (no distinguished node)
    - Decentralization (centralized control has resulted in outages)
    - Heterogeneity (the work distribution must be proportional to the capabilities of the individual servers. This is essential in adding new nodes with higher capacity without having to upgrade all hosts at once)

### Related work

- P2P systems evolved to the next generation into what is widely known as structured P2P networks. These networks employ a globally consistent protocol to ensure that any node can efficiently route a search query to some peer that has the desired data. 

- **Oceanstore** provides a global, transactional, persistent storage service that supports serialized updates on widely replicated data. Oceanstore resolves conflicts by processing a series of updates, choosing a total order among them, and then applying them atomically in that order. It is built for an environment where the data is replicated on an untrusted infrastructure. 

- **Bayou** is a distributed relational database system that allows disconnected operations and provides eventual data consistency.

- **Antiquity** uses a secure log to preserve data integrity, replicates each log on multiple servers for durability, and usesByzantine fault tolerance protocols to ensure data consistency. In contrast to Antiquity, Dynamo does not focus on the problem of data integrity and security and is built for a trusted environment. 

- [**Bigtable**](/bigtable) is a distributed storage system for managing structured data. It maintains a sparse, multi-dimensional sorted map and allows applications to access their data using multiple attributes. Compared to Bigtable, Dynamo targets applications that require only key/value access with primary focus on high availability where updates are not rejected even in the wake of network partitions or server failures. 

- Multihop routing increases variability in response times, thereby increasing the latency at higher percentiles. Dynamo can be characterized as a **zero-hop DHT**, where each node maintains enough routing information locally to route a request to the appropriate node directly.

### Interesting Bits from Detailed System Architecture

- Dynamo treats both the key and the object supplied by the caller as an opaque array of bytes. It applies a MD5 hash on the key to generate a 128-bit identifier, which is used to determine the storage nodes that are responsible for serving the key. 

- Basic consistent hashing algorithm presents some challenges.
    - First, the random position assignment of each node on the ring leads to non-uniform data and load distribution.
    - Second, the basic algorithm is oblivious to the heterogeneity in the performance of nodes. 

- Instead of mapping a node to a single point in the circle, each node gets assigned to multiple points in the ring. To this end, Dynamo uses the concept of “virtual nodes".

- The system is designed so that every node in the system can determine which nodes should be in this list for any particular key. To account for node failures, preference list contains more than N nodes. 

- Most of the time, new versions subsume the previous version(s), and the system itself can determine the authoritative version (syntactic reconciliation). However, version branching may happen, in the presence of failures combined with concurrent updates, resulting in conflicting versions of an object. In these cases, the system cannot reconcile the multiple versions of the same object and the client must perform the reconciliation in order to collapse multiple branches of data evolution back into one (semantic reconciliation). A typical example of a collapse operation is “merging” different versions of a customer’s shopping cart. Using this reconciliation mechanism, an “add to cart” operation is never lost. However, deleted items can resurface.

- Dynamo uses **vector clocks** in order to capture causality between different versions of the same object. A vector clock is effectively a list of (node, counter) pairs. One vector clock is associated with every version of every object. If the counters on the first object’s clock are less-than-or-equal to all of the nodes in the second clock, then the first is an ancestor of the second and can be forgotten. Otherwise, the two changes are considered to be in conflict and require reconciliation.

- To maintain consistency among its replicas, Dynamo uses a consistency protocol similar to those used in quorum systems. This protocol has two key configurable values: R and W. R + W > N yields a quorum-like system.

- Dynamo implements an anti-entropy (replica synchronization) protocol to keep the replicas synchronized. of individual keys. Parent nodes higher in the tree are hashes of their respective children. The principal advantage of Merkle tree is that each branch of the tree can be checked independently without requiring nodes to download the entire tree or the entire data set. Merkle trees minimize the amount of data that needs to be transferred for synchronization and reduce the number of disk reads performed during the anti-entropy process.

- To prevent logical partitions, some Dynamo nodes play the role of seeds. Seeds are nodes that are discovered via an external mechanism and are known to all nodes. Because all nodes eventually reconcile their membership with a seed, logical partitions are highly unlikely.

- In Dynamo, each storage node has three main software components: request coordination, membership and failure detection, and a local persistence engine. All these components are implemented in Java.

- Each client request results in the creation of a state machine on the node that received the client request. The state machine contains all the logic for identifying the nodes responsible for a key, sending the requests, waiting for responses, potentially doing retries, processing the replies and packaging the response to the client. Each state machine instance handles exactly one client request. For instance, a read operation implements the following state machine: 
    - (i) send read requests to the nodes, 
    - (ii) wait for minimum number of required responses, 
    - (iii) if too few replies were received within a given time bound, fail the request, 
    - (iv) otherwise gather all the data versions and determine the ones to be returned and 
    - (v) if versioning is enabled, perform syntactic reconciliation and generate an opaque write context that contains the vector clock that subsumes all the remaining versions.

### Experiences and Lessons Learned

- Low values of W and R can increase the risk of inconsistency as write requests are deemed successful and returned to the clients even if they are not processed by a majority of the replicas. This also introduces a vulnerability window for durability when a write request is successfully returned to the client even though it has been persisted at only a small number of nodes.

- Traditional wisdom holds that durability and availability go hand in-hand. However, this is not necessarily true here.

- Common (N,R,W) configuration used by several instances of Dynamo is (3,2,2).

- Since Dynamo is run on standard commodity hardware components that have far less I/O throughput than high-end enterprise servers, providing consistently high performance for read and write operations is a non-trivial task.

- Dynamo provides the ability to trade-off durability guarantees for performance. In the optimization each storage node maintains an object buffer in its main memory. Each write operation is stored in the buffer and gets periodically written to storage by a writer thread. This optimization has resulted in lowering the 99.9th percentile latency by a factor of 5 during peak traffic even for a very small buffer of a thousand objects, but it trades durability for performance.

- Divergent Versions: the number of versions returned to the shopping cart service was profiled for a period of 24 hours. During this period, 99.94% of requests saw exactly one version; 0.00057% of requests saw 2 versions; 0.00047% of requests saw 3 versions and 0.00009% of requests saw 4 versions.

- Client-driver or server-driver coordination: An alternative approach to request coordination is to move the state machine to the client nodes. An important advantage of the client-driven coordination approach is that a load balancer is no longer required to uniformly distribute client load. Fair load distribution is implicitly guaranteed by the near uniform assignment of keys to the storage nodes.

- Balancing foreground vs. background tasks: the background tasks were integrated with an admission control mechanism. A feedback mechanism based on the monitored performance of the foreground tasks is employed to change the number of slices that are available to the background tasks. Monitored aspects include latencies for disk operations, failed database accesses due to lock-contention and transaction timeouts, and request queue wait times. This information is used to check whether the percentiles of latencies (or failures) in a given trailing time window are close to a desired threshold.



### PDF

* [Original](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf)
* [Annotated copy](./dynamo-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #18 in this [series](https://anantjain.dev/#paper-reviews).