---
title: 'Availability in Globally Distributed Storage Systems'
description: 'Google'
date: '2020-10-24'
categories: ['Paper Review']
published: true
---

### Abstract

> Highly available cloud storage is often implemented with complex, multi-tiered distributed systems built on top of clusters of commodity servers and disk drives. Sophisticated management, load balancing and recovery techniques are needed to achieve high performance and availability amidst an abundance of failure sources that include software, hardware, network connectivity, and power issues. While there is a relative wealth of failure studies of individual components of storage systems, such as disk drives, relatively little has been reported so far on the overall availability behavior of large cloud- based storage services. We characterize the availability properties of cloud storage systems based on an extensive one year study of Google’s main storage infrastructure and present statistical models that enable further insight into the impact of multiple design choices, such as data placement and replication strategies. With these models we compare data availability under a variety of system parameters given the real patterns of failures observed in our fleet.

### Highlights

- Correctly designing and optimizing these multilayered systems for user goals such as data availability relies on accurate models of system behavior and performance

- Our work is presented in two parts: First, we measured and analyzed the component availability, e.g. machines, racks, multi-racks, in tens of Google storage clusters. We determined that the critical element in models of availability is their ability to account for the frequency and magnitude of correlated failures. Next, we consider data availability by analyzing unavailability at the distributed file system level, where one file system instance is referred to as a cell. We apply two models of multi-scale correlated failures for a variety of replication schemes and system parameters.

- Ourresults show the importance of considering cluster-wide failure events in the choice of replication and recovery policies.

- A large collection of nodes along with their higher level coordination processes are called a cell or storage cell. A typical cell may comprise many thousands of nodes housed together in a single building or set of colocated buildings.

- The node remains unavailable until it regains responsiveness or the storage system reconstructs the data from other surviving nodes.

- Nodes can become unavailable for a large number of reasons. For example, a storage node or networking switch can be overloaded; a node binary or operating system may crash or restart; a machine may experience a hardware error; automated repair processes may temporarily remove disks or machines; or the whole cluster could be brought down for maintenance.

- Experience shows that while short unavailability events are most frequent, they tend to have a minor impact on cluster-level availability and data loss. Therefore, while we track unavailability metrics at multiple time scales in our system, in this paper we focus only on events that are 15 minutes or longer.

- We observe that initiating recovery after transient failures is inefficient and reduces resources available for other operations. For these reasons, GFS typically waits 15 minutes before commencing recovery of data on unavailable nodes.

- We primarily use two metrics throughout this paper: The average availability of all N nodes, and Mean time to failure, or MTTF.

- Distributed storage systems increase resilience to failures by using replication or erasure encoding across nodes.

- In both cases, data is divided into a set of stripes, each of which comprises a set of fixed size data and code blocks called chunks. Data in a stripe can be reconstructed from some subsets of the chunks. For replication, R = n refers to n identical chunks in a stripe, so the data may be recovered from any one chunk. For Reed-Solomon erasure encoding, RS(n, m) denotes n distinct data blocks and m error correcting blocks in each stripe. In this case a stripe may be reconstructed from any n chunks.

- Data availability is a complex function of the individual node availability, the encoding scheme used, the distribution of correlated node failures, chunk placement, and recovery times that we will explore in the second part of this paper.

- Disks have been the focus of several other studies, since they are the system component that permanently stores the data, and thus a disk failure potentially results in permanent data loss

- One study reports ARR (annual replacement rate) for disks between 2% and 4%.

- For the purposes of this paper, we are interested in disk errors as perceived by the application layer. This includes latent sector errors and corrupt sectors on disks, as well as errors caused by the firmware, device drivers, controllers, cables, enclosures, silent network and memory corruption, and software bugs.

- We focus on node restarts (software restarts of the storage program running on each machine), planned machine reboots (e.g. kernel version upgrades), and unplanned machine reboots (e.g. kernel crashes).

- We observe that the majority of unavailability is generated by planned reboots.

- The numbers we report for component failures are inclusive of software errors and hardware failures. Though disks failures are permanent and most node failures are transitory, the significantly greater frequency of node failures makes them a much more important factor for system availability.

- The co-occurring failure of a large number of nodes can reduce the effectiveness of replication and encoding schemes. Therefore it is critical to take into account the statistical behavior of correlated failures to understand data availability.

- By failure domain, we mean a set of machines which we expect to simultaneously suffer from a common source of failure, such as machines which share a network switch or power cable. We demonstrate this method by validating physical racks as an important failure domain

- We define a failure burst with respect to a window size w as a maximal sequence of node failures, each one occurring within a time window w of the next.

- Using this definition, we observe that 37% of failures are part of a burst of at least 2 nodes. Given the result above that only 8.0% of non-correlated failures may be incorrectly clustered, we are confident that close to 37% of failures are truly correlated.

- Two broad classes of failure bursts can be seen in the plot: First, those failure bursts that are characterized by a large number of failures in quick succession show up as steep lines with a large number of nodes in the burst. Such failures can be seen, for example, following a power outage in a datacenter. Second, those failure bursts that are characterized by a smaller number of nodes failing at a slower rate at evenly spaced intervals. Such correlated failures can be seen, for example, as part of rolling reboot or upgrade activity at the datacenter management layer.

- For larger bursts of at least 10 nodes, we find only 3% have all their nodes on unique racks. We introduce a metric to quantify this degree of domain correlation in the next section.

- We introduce a metric to measure the likelihood that a failure burst is domain-related, rather than random, based on the pattern of failure observed. The metric can be used as an effective tool for identifying causes of failures that are connected to domain locality. It can also be used to evaluate the importance of domain diversity in cell design and data placement. We focus on detecting rack-related node failures in this section, but our methodology can be applied generally to any domain and any type of failure.

- The score allows us to compare the rack concentration of bursts of the same size. For example the burst (1, 4) has score 6. The burst (1, 1, 1, 2) has score 1 which is lower.

- We define the rack affinity of a burst in a particular cell to be the probability that a burst of the same size affecting randomly chosen nodes in that cell will have a smaller burst score, plus half the probability that the two scores are equal, to eliminate bias.

- So we define a rack-correlated burst to be one with a metric close to 1, a rack-uncorrelated burst to be one with a metric close to 0.5, and a rack anti-correlated burst to be one with a metric close to 0 (we have not observed such a burst).

- We find that, in general, larger failure bursts have higher rack affinity.

- Two methods for coping with the large number of failures described in the first part of this paper include data replication and recovery, and chunk placement.

- Replication or erasure encoding schemes provide resilience to individual node failures.

- Distributed filesystems will necessarily employ queues for recovery operations following node failure.

- To mitigate the effect of large failure bursts in a single failure domain we consider known failure domains when placing chunks within a stripe on storage nodes.

- Given a failure burst, we can compute the expected fraction of stripes made unavailable by the burst.

- We also see that for small and medium bursts sizes, and large encodings, using a rack-aware placement policy increases the stripe MTTF by a factor of 3 typically.

- This section introduces a trace-based simulation method for calculating availability in a cell. The method replays observed or synthetic sequences of node failures and calculates the resulting impact on stripe availability.

- For each node, the recorded events of interest are down, up and recovery complete events.

- We are interested in the expected number of stripes that are unavailable for at least 15 minutes, as a function of time.

- The model captures the interaction of different failure types and production parameters with more flexibility than is possible with the trace-based simulation described in the previous section.

- The Markov model allows us to reason directly about the contribution to data availability of each level of the storage stack and several system parameters, so that we can evaluate tradeoffs.

- The Markov model handles rare events and arbitrarily low stripe unavailability rates efficiently.

- A key assumption of the Markov model is that events occur independently and with constant rates over time.

- In practice, failure events are not always independent. Most notably, it has been pointed out in that the time between disk failures is not exponentially distributed and exhibits autocorrelation and long-range dependence.

- With the Markov chain thus completely specified, computing the MTTF of a stripe, as the mean time to reach the ‘unavailable state’ r − 1 starting from state s, follows by standard methods

- The models introduced so far can be extended to compute the availability of multi-cell replication schemes.

- Reed-Solomon codes may also be used, giving schemes such as RS(6, 3) × 3 for three cells each with a RS(6, 3) encoding of the data. We do not consider here the case when individual chunks may be combined from multiple cells to recover data, or other more complicated multi-cell encodings.

- We build the corresponding transition matrix that models the resulting multi-cell availability as follows. We start from the transition matrices Mi for each cell, as explained in the previous section. We then build the transition matrix for the combined scheme as the tensor product of these, (cid:78) i Mi, plus terms for whole cell failures, and for cross-cell recoveries if the data becomes unavailable in some cells but is still available in at least one cell.

- A point of interest here is the recovery bandwidth between cells, quantified in Section 8.5. Bandwidth between distant cells has significant cost which should be considered when choosing a multi-cell replication scheme.

- We underline two observations that surface from validation. first, the model is able to capture well the effect of failure bursts, which we consider as having the most impact on the availability numbers.

- Second, the model can distinguish between failure bursts that span racks, and thus pose a threat to availability, and those that do not.

- Reducing recovery times is effective when correlated failures are few. For RS(6, 3) with no correlated failures, a 10% reduction in recovery time results in a 19% reduction in unavailability.

- The gain in availability achieved by increasing the replication number, for example, grows much more slowly when we have correlated failures.

- We find that improvements below the node (server) layer of the storage stack do not significantly improve data availability.

- Replicating data across multiple cells (data centers) greatly improves availability because it protects against correlated failures.

- This introduces a tradeoff between higher replication in a single cell and the cost of inter-cell bandwidth.

- Considering the relative cost of storage versus recovery bandwidth allows us to choose the most cost effective scheme given particular availability goals.

- We focus on failure bursts, since they have a large influence on the availability of the system. Previous literature on failure bursts has focused on methods for discovering the relationship between the size of a failure event and its probability of occurrence.

- Models that have been developed to study the reliability of long-term storage fall into two categories, non Markov and Markov models. Those in the first category tend to be less versatile.

- Markov models are able to capture the system much more generally and can be used to model both replication and Reed-Solomon encoding.

### Conclusion

Inside Google, the analysis described in this paper has provided a picture of data availability at a finer granularity than previously measured. Using this framework, we provide feedback and recommendations to the development and operational engineering teams on different replication and encoding schemes, and the primary causes of data unavailability in our existing cells. Such analysis complements the intuition of the designers and operators of these complex distributed systems.

### PDF

* [Original](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/36737.pdf)
* [Annotated copy](./availability-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #27 in this [series](https://anantjain.dev/#paper-reviews).


