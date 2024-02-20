---
title: "Omega: flexible, scalable schedulers for large compute clusters"
description: "Google"
date: "2020-05-23"
categories: ["Paper Review"]
published: true
---

### Abstract

> Increasing scale and the need for rapid response to changing requirements are hard to meet with current monolithic cluster scheduler architectures. This restricts the rate at which new features can be deployed, decreases efficiency and utilization, and will eventually limit cluster growth. **We present a novel approach to address these needs using parallelism, shared state, and lock-free optimistic concurrency control.** We compare this approach to existing cluster scheduler designs, evaluate how much interference between schedulers occurs and how much it matters in practice, present some techniques to alleviate it, and finally discuss a use case highlighting the advantages of our approach – all driven by real-life Google production workloads.

### Introduction

There were two prevalent scheduler architectures up until this paper was introduced:

- **Monolithic schedulers** use a single, centralized scheduling algorithm for all jobs (Google's existing scheduler at the time, Borg, is one of these).
- **Two-level schedulers** have a single active resource manager that offers compute resources to multiple parallel, independent “scheduler frameworks”, as in Mesos and Hadoop-on-Demand.

Monolithic schedulers do not make it easy to add new policies and specialized implementations, and may not scale up to the cluster sizes we are planning for. Two-level scheduling architectures do appear to provide flexibility and parallelism, but in practice their conservative resource-visibility and locking algorithms limit both, and make it hard to place difficult-to-schedule “picky” jobs or to make decisions that require access to the state of the entire cluster.

Omega is a new parallel scheduler architecture built around shared state, using lock-free optimistic concurrency control, to achieve both implementation extensibility and performance scalability.

![Schematic overview of the scheduling architectures explored in this paper.](/assets/blog/omega/scheduler-architectures.png)

### Requirements

Cluster schedulers must meet a number of goals simultaneously: high resource utilization, user-supplied placement constraints, rapid decision making, and various degrees of “fairness” and business importance – all while being robust and always available.

Most (>80%) jobs are batch jobs, but the majority of resources (55–80%) are allocated to service jobs; the latter typically run for much longer, and have fewer tasks than batch jobs

### Shared-state scheduling

- The alternative used by Omega is the shared state approach: we grant each scheduler full access to the entire cluster, allow them to compete in a free-for-all manner, and use optimistic concurrency control to mediate clashes when they update the cluster state. This immediately eliminates two of the issues of the two-level scheduler approach – limited parallelism due to pessimistic concurrency control, and restricted visibility of resources in a scheduler framework – at the potential cost of redoing work when the optimistic concurrency assumptions are incorrect.
- We maintain a resilient master copy of the resource allocations in the cluster, which we call _cell state_. Each scheduler is given a private, local, frequently-updated copy of cell state that it uses for making scheduling decisions.
- Once a scheduler makes a placement decision, it updates the shared copy of cell state in an atomic commit. At most one such commit will succeed in the case of conflict: effectively, the time from state synchronization to the commit attempt is a transaction.
- To prevent conflicts from causing starvation, Omega schedulers typically choose to use incremental transactions, which accept all but the conflicting changes (i.e., the transaction provides atomicity but not independence).
- A scheduler can instead use an all-or-nothing transaction to achieve gang scheduling: either all tasks of a job are scheduled together, or none are, and the scheduler must try to schedule the entire job again. This helps to avoid resource hoarding, since a gang-scheduled job can preempt lower-priority tasks once sufficient resources are available and its transaction commits, and allow other schedulers’ jobs to use the resources in the meantime.

### Performance comparisons

- Average job wait times for the Omega approach are comparable to those for multi-path monolithic. This suggests that conflicts and interference are relatively rare, and this is confirmed by the graph of scheduler busyness.
- Unlike Mesos, the Omega-style scheduler manages to schedule all jobs in the workload. Unlike the monolithic multi-path implementation, it does not suffer from head-of-line blocking: the lines for batch and service jobs are independent.
- The results indicate that Omega can scale to many schedulers, as well as to challenging workloads.
- Our prototype MapReduce scheduler demonstrates that adding a specialized functionality to the Omega system is straightforward (unlike with our current production scheduler).

### Related newer papers

- Borg, Omega, and Kubernetes ([Link](/borg-omega-kubernetes/)): **Kubernetes**, the scheduling architecture of choice these days, picks a middle ground between Borg and Omega that provides the flexibility and scalability of Omega’s componentized architecture while enforcing system-wide invariants, policies, and data transformations. It does this by forcing all store accesses through a centralized API server that hides the details of the store implementation and provides services for object validation, defaulting, and versioning.

### PDF

- [Original](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/41684.pdf)
- [Annotated copy](/assets/blog/omega/omega-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #7 in this [series](https://anantjain.dev/#paper-reviews).
