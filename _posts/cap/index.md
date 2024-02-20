---
title: "CAP Twelve Years Later: How the “Rules” Have Changed"
description: "Eric Brewer"
date: "2020-09-05"
categories: ['Paper Review']
published: true
---

### Abstract

> The CAP theorem asserts that any networked shared-data system can have only two of three desirable properties. However, by explicitly handling partitions, designers can optimize consistency and availability, thereby achieving some trade- off of all three.

### Notes

- The NoSQL movement has applied CAP as an argument against traditional databases.

- The “2 of 3” formulation was always misleading because it tended to oversimplify the tensions among properties.

- CAP prohibits only a tiny part of the design space: perfect availability and consistency in the presence of partitions, which are rare.

- The modern CAP goal should be to maximize combinations of consistency and availability that make sense for the specific application. Such an approach incorporates plans for operation during a partition and for recovery afterward, thus helping designers think about CAP beyond its historically perceived limitations.

- The general belief is that for wide-area systems, designers cannot forfeit P and therefore have a difficult choice between C and A.

- In ACID, the C means that a transaction preserves  all  the  database  rules,  such  as  unique  keys.  In  contrast,the  C  in  CAP  refers  only  to  single‐copy  consistency,  a  strict subset  of  ACID  consistency.  ACID  consistency  also  cannot  be maintained  across  partitions—partition  recovery  will  need  to restore  ACID  consistency.

- Isolation (I). Isolation is at the core of the CAP theorem: if the system  requires  ACID  isolation,  it  can  operate  on  at  most  one side  during  a  partition.  Serializability  requires  communication  in general  and  thus  fails  across  partitions.  Weaker  definitions of  correctness  are  viable  across  partitions  via  compensation during partition recovery.

- In general, running ACID transactions on each side of a partition makes recovery easier and enables a framework for compensating  transactions  that  can  be  used  for  recovery  from  a partition.

- The “2 of 3” view is misleading on several fronts:

  - First, because partitions are rare, there is little reason to forfeit C or A when the system is not partitioned.
  - Second, the choice between C and A can occur many times within the same system at very fine granularity; not only can subsystems make different choices, but the choice can change according to the operation or even the specific data or user involved.
  - Finally, all three properties are more continuous than binary. Availability is obviously continuous from 0 to 100 percent, but there are also many levels of consistency,and even partitions have nuances, including disagreement within the system about whether a partition exists.

- This strategy should have three steps: detect partitions, enter an explicit partition mode that can limit some operations,and initiate a recovery process to restore consistency and compensate for mistakes made during a partition.

- Latency and partitions are deeply related

- The partition decision:  cancel the operation and thus decrease availability,  or, proceed with the operation and thus risk inconsistency.

- Pragmatically, a partition is a time bound on communication

- This pragmatic view gives rise to several important consequences. The first is that there is no global notion of a partition, since some nodes might detect a partition, and others might not. The second consequence is that nodes can detect a partition and enter a partition mode—a central part of optimizing C and A.

- If users cannot reach the service at all, there is no choice between C and A except when part of the service runs on the client.

- These  systems  normally choose A over C and thus must recover from long partitions.

- Scope of consistency reflects the idea that, within some boundary,state  is  consistent,  but  outside  that  boundary  all  bets  are  off.

- In Google, the primary partition usually resides within one datacenter; however, Paxos is used on the wide area to ensure global consensus, as in Chubby,3 and highly available durable storage, as in Megastore.

- Such a view makes sense because real systems lose both C and A under some sets of faults, so all three properties are a matter of degree.

- However, although partitions are less likely within a datacenter, they are indeed possible, which makes a CA goal problematic. Finally, given the high latency across the wide area, it is relatively common to forfeit perfect consistency across the wide area for better performance.

- Another aspect of CAP confusion is the hidden cost of forfeiting consistency, which is the need to know the system’s invariants

- At the core, this is the same concurrent updates problem that makes multithreading harder than sequential programming.

- The key idea is to manage partitions very explicitly, including not only detection, but also a specific recovery process and a plan for all of the invariants that might be violated during a partition

- detect the start of a partition,  • enter an explicit partition mode that may limit some • initiate partition recovery when communication is operations, and  restored.

- Systems that use a quorum are an example of this one-sided partitioning. One side will have a quorum and can proceed,but the other cannot. Systems that support disconnected operation clearly have a notion of partition mode, as do some atomic multicast systems, such as Java’s JGroups.

- Deciding which operations to limit depends primarily on the invariants that the system must maintain

- For example, for the invariant that keys in a table are unique, designers typically decide to risk that invariant and allow duplicate keys during a partition. Duplicate keys are easy to detect during recovery, and, assuming that they can be merged, the designer can easily restore the invariant.

- Externalized events, such as charging a credit card, often work this way.In this case, the strategy is to record the intent and execute it after the recovery.

- More generally, partition mode gives rise to a fundamental user-interface challenge, which is to communicate that tasks are in progress but not complete

- Essentially, the designer must build a table that looks at the cross product of all operations and all invariants and decide for each entry if that operation could violate the invariant. If so, the designer must decide whether to prohibit, delay, or modify the operation

- The best way to track the history of operations on both sides is to use version vectors, which capture the causal dependencies among operations

- Thus, given the version vector history of both sides, the system can easily tell which operations are already in a known order and which executed concurrently

- The designer must solve two hard problems during recovery:
  - the state on both sides must become consistent, and
  - there must be compensation for the mistakes made during partition mode.

- Conversely, some systems can always merge conflicts by choosing certain operations. A case in point is text editing in Google Docs, which limits operations to applying a style and adding or deleting text. Thus, although the general problem of conflict resolution is not solvable,in practice, designers can choose to constrain the use of certain operations during partitioning so that the system can automatically merge state during recovery. Delaying risky operations is one relatively easy implementation of this strategy.

- Recent work by Marc Shapiro and colleagues at INRIA has greatly improved the use of commutative operations for state convergence. The team has developed commutative replicated data types (CRDTs), a class of data structures that provably converge after a partition, and describe how to use these structures to mutative, or   • ensure that all operations during a partition are com  • represent values on a lattice and ensure that all operations during a partition are monotonically increasing with respect to that lattice.

- However, CRDTs can also implement partition-tolerant sets that both add and delete items. The essence of this approach is to maintain two sets: one each for the added and deleted items, with the difference being the set’s membership.

- Regardless,  ATM  design  serves  as  a good  context  for  reviewing  some  of  the  challenges  involved  in compensating for invariant violations during a partition.

- Instead, using stand-in mode (partition mode), modern ATMs limit the net withdrawal  to  at  most  k,  where  k  might  be  $200.  Below  this  limit,withdrawals work completely; when the balance reaches the limit,the system denies withdrawals. Thus, the ATM chooses a sophisticated limit on availability that permits withdrawals but bounds the risk.

- In  general,  because  of  communication  delays,  the  banking system depends not on consistency for correctness, but rather on auditing  and  compensation.

- There are various ways to fix the invariants, including trivial ways such as “last writer wins” (which ignores some updates), smarter approaches that merge operations, and human escalation

- The idea of compensation is really at the core of fixing such mistakes; designers must create compensating operations that both restore an invariant and more broadly correct an externalized mistake.

- Some researchers have formally explored compensating transactions as a way to deal with long-lived transactions

- Compensating transactions take a different approach by breaking the large transaction into a saga, which consists of multiple subtransactions,each of which commits along the way. Thus, to abort the larger transaction, the system must undo each already committed subtransaction by issuing a new transaction that corrects for its effects—the compensating transaction.

- As newer techniques, such as version vectors and CRDTs, move into frameworks that simplify their use, this kind of optimization should become more widespread. However, unlike ACID transactions, this approach requires more thoughtful deployment relative to past strategies, and the best solutions will depend heavily on details about the service’s invariants and operations


### PDF

* [Original](https://www.infoq.com/articles/cap-twelve-years-later-how-the-rules-have-changed/)
* [Annotated copy](/assets/blog/cap/cap-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #22 in this [series](https://anantjain.dev/#paper-reviews).