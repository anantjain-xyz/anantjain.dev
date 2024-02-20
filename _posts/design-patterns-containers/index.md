---
title: 'Design patterns for container-based distributed systems'
description: 'Google'
date: '2020-10-17'
categories: ['Paper Review']
published: true
---

### Introduction

This paper describes three types of design patterns that we have observed emerging in container-based distributed systems: single-container patterns for container management, single-node patterns of closely cooperating containers, and multi-node patterns for distributed algorithms. Like object-oriented patterns before them, these patterns for distributed computation encode best practices, simplify development, and make the systems where they are used more reliable.

### Distributed systems design patterns

- The success of MapReduce is largely limited to a single programming language, insofar as the Apache Hadoop ecosystem is primarily written in and for Java. Developing a truly comprehensive suite of patterns for distributed system design requires a very generic, language-neutral vehicle to represent the atoms of the system.

- To date, containers and container images have achieved the large measure of their popularity sim- ply by being a better, more reliable method for delivering software from development all the way through production. By being hermetically sealed, carrying their dependencies with them, and providing an atomic deployment signal (“succeeded”/“failed”), they dramatically improve on the previous state of the art in deploying software in the datacenter or cloud. But containers have the potential to be much more than just a better deployment vehicle – we believe they are destined to become analogous to objects in object-oriented software systems, and as such will enable the development of distributed system design patterns

### Single-container management patterns

- The container provides a natural boundary for defining an interface, much like the object boundary. Containers can expose not only application-specific functionality, but also hooks for management systems, via this interface.

- The traditional container management interface is extremely limited. A container effectively exports three verbs: run(), pause(), and stop().

- It is easy to define an HTTP based management API that can be “implemented” by having the container host a web server at specific endpoints, in addition to its main functionality.

- In the “upward” direction the container can expose a rich set of application information, including application-specific monitoring metrics (QPS, application health, etc.), profiling information of interest to developers (threads, stack, lock contention, network message statistics, etc.), component configuration information, and component logs.

- In the “downward” direction, the container interface provides a natural place to define a lifecycle that makes it easier to write software components that are controlled by a management system. For example, a cluster management system will typically assign “priorities” to tasks, with high-priority tasks guaranteed to run even when the cluster is oversubscribed.

- For example, Kubernetes uses a “graceful deletion” feature of Docker that warns a container, via the SIGTERM signal, that it is going to be terminated, an application-defined amount of time before it is sent the SIGKILL signal. This allows the application to terminate cleanly by finishing in-ﬂight operations, ﬂushing state to disk, etc. One can imagine extending such a mechanism to provide support for state serialization and recovery that makes state management significantly easier for stateful distributed systems.

- Another example of a “downward” API that a container might support is “replicate yourself” (to scale up the service).

### Single-node, multi-container application patterns

Beyond the interface of a single container, we also see design patterns emerging that span containers. These single-node patterns consist of symbiotic containers that are co-scheduled onto a single host machine. Container management system support for co-scheduling multiple containers as an atomic unit, an abstraction Kubernetes calls “Pods” and Nomad [11] calls “task groups,” is thus a required feature for enabling the patterns we describe in this section.

- **Sidecar Pattern:** The first and most common pattern for multi-container deployments is the sidecar pattern. Sidecars extend and enhance the main container. Sidecars are possible because containers on the same machine can share a local disk volume. 
    - While it is always possible to build the functionality of a sidecar container into the main container, there are several benefits to using separate containers. first, the container is the unit of resource accounting and allocation, so for example a web server container’s cgroup can be configured so that it provides consistent low latency responses to queries, while the logsaver container is configured to scavenge spare CPU cycles when the web server is not busy.
    - Second, the container is the unit of packaging, so separating serving and log saving into different containers makes it easy to divide responsibility for their development between two separate programming teams, and allows them to be tested independently as well as together
    - Third, the container is the unit of reuse, so sidecar containers can be paired with numerous different “main” containers
    - Fourth, the container provides a failure containment boundary, making it possible for the overall system to degrade gracefully
    - Lastly, the container is the unit of deployment, which allows each piece of functionality to be upgraded and, when necessary, rolled back, independently.

- **Ambassador pattern:** Ambassador containers proxy communication to and from a main container. This container pattern simplifies the programmer’s life in three ways: they only have to think and program in terms of their application connecting to a single server on localhost, they can test their application standalone by running a real memcache instance on their local machine instead of the ambassador, and they can reuse the twemproxy ambassador with other applications that might even be coded in different languages. Ambassadors are possible because containers on the same machine share the same localhost network interface.


- **Adapter pattern:** In contrast to the ambassador pattern, which presents an application with a simplified view of the outside world, adapters present the outside world with a simplified, homogenized view of an application. A concrete example of the adapter pattern is adapters that ensure all containers in a system have the same monitoring interface. Applications today use a wide variety of methods to export their metrics (e.g. JMX, statsd, etc).

### Multi-node application patterns

- **Leader election pattern:** An alternative to linking a leader election library into the application is to use a leader election container. A set of leader-election containers, each one co-scheduled with an instance of the application that requires leader election, can perform election amongst themselves, and they can present a simplified HTTP API over localhost to each application container that requires leader election (e.g. becomeLeader, renewLeadership, etc.). These leader election containers can be built once, by experts in this complicated area, and then the subsequent simplified interface can be re-used by application developers regardless of their choice of implementation language. This represents the best of abstraction and encapsulation in software engineering.

- **Work queue pattern:** The availability of containers that implement the run() and mount() interfaces makes it fairly straightforward to implement a generic work queue framework that can take arbitrary processing code packaged as a container, and arbitrary data, and build a complete work queue system. The developer only has to build a container that can take an input data file on the filesystem, and transform it to an output file; this container would become one stage of the work queue. All of the other work involved in developing a complete work queue can be handled by the generic work queue framework that can be reused whenever such a system is needed.

- **Scatter/gather pattern:** The last distributed systems pattern we highlight is scatter/gather. In such a system, an external client sends an initial request to a “root” or “parent” node. This root fans the request out to a large number of servers to perform computations in parallel. Each shard returns partial data, and the root gathers this data into a single response to the original request. In particular, to implement a scatter/gather system, a user is required to supply two containers. first, the container that implements the leaf node computation; this container performs the partial computation and returns the corresponding result. The second container is the merge container; this container takes the aggregated output of all of the leaf containers, and groups them into a single response

### Conclusion

- Much as object-oriented programming led to the emergence and codification of object-oriented “design patterns,” we see container architectures leading to design patterns for container-based distributed systems

- In this paper we identified three types of patterns we have seen emerging: single-container patterns for system management, single-node patterns of closely-cooperating containers, and multi-node patterns for distributed algorithms

- In addition, they provide some benefits unique to distributed systems, such as enabling components to be upgraded independently, to be written in a mixture of languages, and for the system a whole to degrade gracefully

### PDF

- [Original](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/45406.pdf)
- [Annotated copy](/assets/blog/design-patterns-containers/design-patterns-containers-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #26 in this [series](https://anantjain.dev/#paper-reviews).
