---
title: 'The Byzantine Generals Problem'
description: 'Leslie Lamport, et al.'
date: '2021-01-30'
categories: ['Paper Review']
published: true
---

### Abstract

> Reliable computer systems must handle malfunctioning components that give conflicting information to different parts of the system. This situation can be expressed abstractly in terms of a group of generals of the Byzantine army camped with their troops around an enemy city. Communicating only by messenger, the generals must agree upon a common battle plan. However, one or more of them may be traitors who will try to confuse the others. The problem is to find an algorithm to ensure that the loyal generals will reach agreement. **It is shown that, using only oral messages, this problem is solvable if and only if more than two-thirds of the generals are loyal**; so a single traitor can confound two loyal generals. **With unforgeable written messages, the problem is solvable for any number of generals and possible traitors.** Applications of the solutions to reliable computer systems are then discussed.

### Highlights

**Byzantine Generals Problem**: A commanding general must send an order to his `n - 1` lieutenant generals such that:
- IC1. All loyal lieutenants obey the same order.
- IC2. If the commanding general is loyal, then every loyal lieutenant obeys the order he sends.

One might think that the difficulty in solving the Byzantine Generals Problem stems from the requirement of reaching exact agreement. The paper demonstrates that this is not the case by showing that reaching approximate agreement is just as hard as reaching exact agreement.

A traitorous commander may decide not to send any order. Since the lieutenants must obey some order, they need some default order to obey in this case. We let RETREAT be this default order.

The paper goes on to extend the solution algorithms presented for oral and signed messages to more general graphs than fully connected ones.

### Reliable Systems

- The use of majority voting to achieve reliability is based upon the assumption that all the non-faulty processors will produce the same output. This is true so long as they all use the same input. However, any single input datum comes from a single physical component — for example, from some other circuit in the reliable computer, or from some radar site in the missile defense system — and a malfunctioning component can give different values to different processors. Moreover, different processors can get different values even from a non-faulty input unit if they read the value while it is changing.

- No two clocks run at precisely the same rate, so no matter how accurately the processors' clocks are synchronized initially, they will eventually drift arbitrarily far apart unless they are periodically resynchronized. We therefore have the problem of keeping the processors' clocks all synchronized to within some fixed amount, even if some of the processors are faulty. This is as difficult a problem as the Byzantine Generals Problem itself. Solutions to the clock synchronization problem exist which are closely related to our Byzantine Generals solutions. They is described in a future paper.

### Conclusion

Achieving reliability in the face of arbitrary malfunctioning is a difficult problem, and its solution seems to be inherently expensive. The only way to reduce the cost is to make assumptions about the type of failure that may occur.

### PDF

* [Original](https://people.eecs.berkeley.edu/~luca/cs174/byzantine.pdf)
* [Annotated copy](/assets/blog/byzantine/byzantine-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #33 in this [series](https://anantjain.dev/#paper-reviews).

