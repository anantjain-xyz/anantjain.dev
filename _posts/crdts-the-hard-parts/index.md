---
title: "CRDTs: The Hard Parts"
description: "Martin Kleppmann"
date: "2020-12-12"
categories: ["Paper Review"]
published: true
---

### Abstract

Conflict-free Replicated Data Types (CRDTs) are an increasingly popular family of algorithms for optimistic replication. They allow data to be concurrently updated on several replicas, even while those replicas are offline, and provide a robust way of merging those updates back into a consistent state. CRDTs are used in geo-replicated databases, multi-user collaboration software, distributed processing frameworks, and various other systems.

However, while the basic principles of CRDTs are now quite well known, many challenging problems are lurking below the surface. It turns out that CRDTs are easy to implement badly. Many published algorithms have anomalies that cause them to behave strangely in some situations. Simple implementations often have terrible performance, and making the performance good is challenging.

In this talk Martin goes beyond the introductory material on CRDTs, and discusses some of the hard-won lessons from years of research on making CRDTs work in practice.

### Notes

Two primary technologies for real-time collaboration are:

- **Operational Transforms (OT's)**: Central server is required
- **CRDT's**: Don't require a central server, but easy to implement badly. The "better" way to do real-time collaboration since 2006.

The main topics covered in the talk are:

1. **Interleaving anomalies:**

   - CRDT's -> create a unique ID for each character.
   - RGA algorithm: Not very bad interleaving but indeterministic output based especially if you move the cursor and add something

2. **Reordering list items:**

   - Can’t be done just by using insert + delete operations.
   - Sometimes we do not know what the end result should be.
   - Example of composability of CRDTs to form another one: List CRDT + AWSet + LWWRegister = another CRDT

3. **Moving subtrees in trees:**

   - How to prevent cycles? Last-Writer-Wins (LWW)
   - We need to decide on the end result of merges. There could possibly be multiple "correct" results.
   - Dropbox sync example.
   - Google sync example.
   - Undo operations until we're back to a previous timestamp.

4. **Reducing metadata overhead:**
   - 1:100 ratio
   - Columnar encoding
   - [Automerge project](https://github.com/automerge/automerge)

### Links

- [Talk video](https://martin.kleppmann.com/2020/07/06/crdt-hard-parts-hydra.html)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #29 in this [series](https://anantjain.dev/#paper-reviews).
