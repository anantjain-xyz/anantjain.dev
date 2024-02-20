---
title: "Paxos Made Simple"
description: "Leslie Lamport"
date: "2020-05-30"
categories: ["Paper Review"]
published: true
---

### Abstract

> The Paxos algorithm, when presented in plain English, is very simple.

### Introduction

The Paxos algorithm for implementing a **fault-tolerant distributed system**, at its heart, is a consensus algorithm. It follows almost unavoidably from the properties we want it to satisfy.

### The Problem

Assume a collection of processes that can propose values. A consensus algorithm ensures that a single one among the proposed values is chosen. If no value is proposed, then no value should be chosen. If a value has been chosen, then processes should be able to learn the chosen value. The safety requirements for consensus are:

- Only a value that has been proposed may be chosen,
- Only a single value is chosen, and
- A process never learns that a value has been chosen unless it actually has been.

We let the three roles in the consensus algorithm be performed by three classes of agents: **proposers**, **acceptors**, and **learners**. We use the customary asynchronous, non-Byzantine model, in which:

- Agents operate at arbitrary speed, may fail by stopping, and may restart. Since all agents may fail after a value is chosen and then restart, a solution is impossible unless some information can be remembered by an agent that has failed and restarted.
- Messages can take arbitrarily long to be delivered, can be duplicated, and can be lost, but they are not corrupted.

### The Solution

- A proposer chooses a new proposal number n and sends a request to each member of some set of acceptors, asking it to respond with:

  (a) A promise never again to accept a proposal numbered less than n, and

  (b) The proposal with the highest number less than n that it has accepted, if any.

  We call such a request a **prepare request** with number n.

- If the proposer receives the requested responses from a majority of the acceptors, then it can issue a proposal with number n and value v, where v is the value of the highest-numbered proposal among the responses, or is any value selected by the proposer if the responders reported no proposals. A proposer issues a proposal by sending, to some set of acceptors, a request that the proposal be accepted. (This need not be the same set of acceptors that responded to the initial requests.) Let’s call this an **accept request**.

- What about an acceptor? It can receive two kinds of requests from proposers: prepare requests and accept requests. An acceptor can ignore any request without compromising safety. So, we need to say only when it is allowed to respond to a request. It can always respond to a prepare request. It can respond to an accept request, accepting the proposal, iff it has not promised not to.

- Suppose an acceptor receives a prepare request numbered n, but it has already responded to a prepare request numbered greater than n, thereby promising not to accept any new proposal numbered n. There is then no reason for the acceptor to respond to the new prepare request, since it will not accept the proposal numbered n that the proposer wants to issue. So we have the acceptor ignore such a prepare request. We also have it ignore a prepare request for a proposal it has already accepted.

- With this optimization, an acceptor needs to remember only the highest-numbered proposal that it has ever accepted and the number of the highest-numbered prepare request to which it has responded.

### The Algorithm

Putting the actions of the proposer and acceptor together, we see that the algorithm operates in the following two phases.

**Phase 1.**
(a) A proposer selects a proposal number n and sends a prepare request with number n to a majority of acceptors.
(b) If an acceptor receives a prepare request with number n greater than that of any prepare request to which it has already responded, then it responds to the request with a promise not to accept any more proposals numbered less than n and with the highest-numbered pro- posal (if any) that it has accepted.

**Phase 2.**
(a) If the proposer receives a response to its prepare requests (numbered n) from a majority of acceptors, then it sends an accept request to each of those acceptors for a proposal numbered n with a value v, where v is the value of the highest-numbered proposal among the responses, or is any value if the responses reported no proposals.
(b) If an acceptor receives an accept request for a proposal numbered n, it accepts the proposal unless it has already responded to a prepare request having a number greater than n.

### Guaranteeing Progress

To guarantee progress, a distinguished proposer must be selected as the only one to try issuing proposals. If the distinguished proposer can communicate successfully with a majority of acceptors, and if it uses a proposal with number greater than any already used, then it will succeed in issuing a proposal that is accepted.

### Implementing a State Machine

A simple way to implement a distributed system is as a collection of clients that issue commands to a central server. The server can be described as a deterministic state machine that performs client commands in some sequence.

An implementation that uses a single central server fails if that server fails. We therefore instead use a collection of servers, each one independently implementing the state machine. Because the state machine is deterministic, all the servers will produce the same sequences of states and outputs if they all execute the same sequence of commands. A client issuing a command can then use the output generated for it by any server.

**To guarantee that all servers execute the same sequence of state machine commands, we implement a sequence of separate instances of the Paxos consensus algorithm, the value chosen by the ith instance being the ith state machine command in the sequence. Each server plays all the roles (proposer, acceptor, and learner) in each instance of the algorithm.**

### PDF

- [Original](https://lamport.azurewebsites.net/pubs/paxos-simple.pdf)
- [Annotated copy](/assets/blog/paxos/paxos-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #8 in this [series](https://anantjain.dev/#paper-reviews).
