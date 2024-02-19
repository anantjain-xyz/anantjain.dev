---
title: 'Keeping CALM: When Distributed Consistency Is Easy'
description: 'Joseph M. Hellerstein, Peter Alvaro'
date: '2020-10-31'
categories: ['Paper Review']
published: true
---

### Key Insights

- Coordination is often a limiting factor in system performance. While sometimes necessary for consistent outcomes, coordination often needlessly stands in the way of interactivity, scalability, and availability.
- Distributed systems deserve a computability theory: When is coordination required for consistency, and when can it be avoided?
- The CALM Theorem shows that monotonicity is the answer to this question. Monotonic problems have consistent, coordination-free implementations; non-monotonic problems require coordination for consistency.
- The CALM Theorem emerges by shifting the definition of consistency to one of deterministic program outcomes rather than ordered histories of events. CALM thinking is also constructive: it informs the design of new distributed programming languages, program analysis tools, and application design patterns.

### Highlights

- Distributed systems are tricky. Multiple unreliable machines are running in parallel, sending messages to each other across network links with arbitrary delays. How can we be confident these systems do what we want despite this chaos?  

- The issue is not that coordination is tricky to implement, though that is true. The main problem is that coordination can dramatically slow down computation or stop it altogether  

> "The first principle of successful scalability is to batter the consistency mechanisms down to a minimum, move them off the critical path, hide them in a rarely visited corner of the system, and then make it as hard as possible for application developers to get permission to use them."  

- The crux of consistency: Monotonicity  

- Note that the question assumes some definition of "consistency." Where traditional work focused narrowly on memory consistency (that is, reads and writes produce agreed-upon values), we want to focus on program consistency: does the implementation produce the outcome we expect (for example, deadlocks detected, garbage collected), despite any race conditions across messages and computation that might arise?  

- Unlike traditional memory consistency properties such as linearizability, confluence makes no requirements or promises regarding notions of recency (for example, a read is not guaranteed to return the result of the latest write request issued) or ordering of operations (for example, writes are not guaranteed to be applied in the same order at all replicas).  

- To capture the notion of a distributed system composed out of monotonic (or non-monotonic) logic, Ameloot uses the formalism of a relational transducer running on each machine on a network.

- CALM provides the formal framework for the widespread intuition that we can indeed "work around CAP"—for monotone problems—even if we violate traditional systems-level notions of storage consistency.  

- The relatively uncommon non-monotonic relational operations—for example, set difference—stand out in the language's syntax. In addition, Bloom's type system includes CRDT-like lattices that provide object-level commutativity, associativity and idempotence, which can be composed into larger monotonic functions. 

### PDF

* [Original](https://cacm.acm.org/magazines/2020/9/246941-keeping-calm/fulltext)
* [Annotated copy](./calm-theorem-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #28 in this [series](https://anantjain.dev/#paper-reviews).


