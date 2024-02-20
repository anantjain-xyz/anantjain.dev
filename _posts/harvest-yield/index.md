---
title: "Harvest, Yield, and Scalable Tolerant Systems"
description: "Armando Fox, Eric A. Brewer"
date: "2020-09-19"
categories: ["Paper Review"]
published: true
---

### Abstract

> The cost of reconciling consistency and state management with high availability is highly magnified by the unprecedented scale and robustness requirements of today’s Internet applications. We propose two strategies for improving overall availability using simple mechanisms that scale over large applications whose output behavior tolerates graceful degradation. We characterize this degradation in terms of harvest and yield, and map it directly onto engineering mechanisms that enhance availability by improving fault isolation, and in some cases also simplify programming. By collecting examples of related techniques in the literature and illustrating the surprising range of applications that can benefit from these approaches, we hope to motivate a broader research program in this area.

### Overview

- Our approaches tolerate partial failures by emphasizing simple composition mechanisms that promote fault containment, and by translating possible partial failure modes into engineering mechanisms that provide smoothly degrading functionality rather than lack of availability of the service as a whole.

- **Strong CAP Principle:** Strong Consistency, High Availability, Partition-resilience: Pick at most 2.

- **Weak CAP Principle:** In practice, many applications are best described in terms of reduced consistency or availability.

  - For example, weakly-consistent distributed databases such as Bayou provide speciﬁc models with well-deﬁned consistency/availability tradeoffs; disconnected ﬁlesystems such as Coda explicitly argued for availability over strong consistency; and expiration-based consistency mechanisms such as leases provide fault-tolerant consistency management.
  - These examples suggest that there is a Weak CAP Principle: The stronger the guarantees made about any two of strong consistency, high availability, or resilience to partitions, the weaker the guarantees that can be made about the third.

- Both strategies we propose for improving availability with simple mechanisms rely on the ability to broaden our notion of “correct behavior” for the target application, and then exploit the tradeoffs in the CAP principle to improve availability at large scale.

- We assume that clients make queries to servers, in which case there are at least two metrics for correct behavior: yield, which is the probability of completing a request, and harvest, which measures the fraction of the data reﬂected in the response, i.e. the completeness of the answer to the query.

- In the presence of faults there is typically a tradeoff between providing no answer (reducing yield) and providing an imperfect answer (maintaining yield, but reducing harvest).

- At ﬁrst glance, it would appear that this kind of degradation applies only to queries and not to updates. However, the model can be applied in the case of “single-location” updates: those changes that are localized to a single node (or technically a single partition). This model of updates fails for global changes, but it is still quite useful for many practical applications, including personalization databases and collaborative ﬁltering.

- The terms harvest and yield are consistent with the use of the term yield in semiconductor manufacturing: typically, each die on a wafer is intolerant to harvest degradation, and yield is deﬁned as the fraction of working dice on a wafer.

### Strategy 1: Trading Harvest for Yield: Probabilistic Availability

- Of course, it is possible to replicate all data, but doing so may have relatively little impact on harvest and yield despite signiﬁcant cost, and in any case can never ensure 100% harvest or yield because of the best-effort Internet protocols the service relies on.

- As a similar example, transformation proxies for thin clients also trade harvest for yield, by degrading results on demand to match the capabilities of clients that might otherwise be unable to get results at all.

### Strategy 2: Application Decomposition and Orthogonal Mechanisms

- Some large applications can be decomposed into subsystems that are independently intolerant to harvest degradation (i.e. they fail by reducing yield), but whose independent failure allows the overall application to continue functioning with reduced utility. The application as a whole is then tolerant of harvest degradation. A good decomposition has at least one actual beneﬁt and one potential beneﬁt.

- The actual beneﬁt is the ability to provision each subsystem’s state management separately, providing strong consistency or persistent state only for the subsystems that need it, not for the entire application. The savings can be signiﬁcant if only a few small subsystems require the extra complexity.

- Traditionally, the boundary between subsystems with differing state management requirements and data semantics has been characterized via narrow interface layers; we propose that in some cases it is possible to do even better, if we can identify orthogonal mechanisms.

- Unlike a layered mechanism, which sits above or below the next layer, an orthogonal mechanism is independent of other mechanisms, and has essentially no runtime interface to the other mechanisms (except possibly a conﬁguration interface.

- Since Brooks reveals that the complexity of a software project grows as the square of the number of engineers and Leveson cites evidence that most failures in complex systems result from unexpected inter-component interaction rather than intra-component bugs, we conclude that less machinery is (quadratically) better.

- The ability to exploit orthogonal mechanisms therefore constitutes a second (potential) advantage of decomposition.

### Programming With Orthogonal Mechanisms

- This behavior is compatible with the SNS constraint of restartable workers, and state maintenance is orthogonal to SNS, since no interfaces or behaviors were added or modiﬁed in SNS to support SRM applications.

### Related Uses of Orthogonal Mechanisms

- Composition of orthogonal subsystems shifts the burden of checking for possibly harmful interactions from runtime to compile time, and deployment of orthogonal guard mechanisms improves robustness for the runtime interactions that do occur, by providing improved fault containment.

- The practical implication of these effects is that application writers need not concern themselves directly with the provision of incremental scaling (replication and load management) and high availability: the simple mechanisms in SNS perform these functions for all applications.

- Various forms of sandboxing, including stack-overrun guarding, systemcall monitoring, and software fault isolation, constitute good examples of orthogonal safety

- Orthogonal privacy and data integrity is exempliﬁed by the Secure Socket Layer (SSL) protocol: an initial out-of-band handshake establishes a secure channel, which can then be used as the substrate of any stream connection.

- This and similar examples constitute abundant (if anecdotal) support for the design principle of simple failsafe mechanisms with small state spaces; our contribution is the identiﬁcation of this collection of techniques and the potential synergy of pairing them with compile-time orthogonal composition as strategies for improving robustness.

### Discussion

- Speciﬁc mechanisms we have been able to exploit to simplify engineering and improve robustness or scalability include:

  - Simple mechanisms with small state spaces whose behaviors are easy to reason about: timeout-based partial failure handling, guard timers, orthogonal security, etc., inspired by orthogonal mechanisms in safety critical systems.
  - The orthogonalization of these mechanisms with respect to application logic, separating the application functionality from the provision of high availability. The composition of SNS and SRM provide a good illustration of this approach.
  - The replacement of hard state with refreshable soft state, which often has the beneﬁcial side effect of making the recovery code the same as the mainline code. The load balancing manager in SNS works this way, using refreshable soft state mechanisms inspired by IP multicast routing and SRM state repair.
  - Overall tractability of large-scale engineering involving hardware replication and redundancy. Only a few very expensive specialized systems, such as Teradata’s 768-node data mining cluster, really compare in size and aggregate capacity to cluster-based Internet services.

- Simple techniques were chosen in order to simplify the formidable programming task, and techniques with good fault isolation were favored in order to preserve the fault isolation advantages already inherent in clusters.

### PDF

- [Original](https://radlab.cs.berkeley.edu/people/fox/static/pubs/pdf/c18.pdf)
- [Annotated copy](/assets/blog/harvest-yield/harvest-yield-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #24 in this [series](https://anantjain.dev/#paper-reviews).
