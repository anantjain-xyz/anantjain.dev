---
title: "Borg, Omega, and Kubernetes"
description: "Lessons learned from three container-management systems over a decade at Google"
date: "2020-04-11"
categories: ['Paper Review']
published: true
---

## Notes

- **Borg** was built to manage both long-running services and batch jobs, which had previously been handled by two separate systems: Babysitter and the Global Work Queue.

- **Omega**, an offspring of Borg, was driven by a desire to improve the software engineering of the Borg ecosystem. Omega stored the state of the cluster in a centralized Paxos-based transaction-oriented store that was accessed by the different parts of the cluster control plane (such as schedulers), using optimistic concurrency control to handle the occasional conflicts. This decoupling allowed the Borgmaster’s functionality to be broken into separate components that acted as peers, rather than funneling every change through a monolithic, centralized master.

- The third container-management system developed at Google was **Kubernetes**. It was conceived of and developed in a world where external developers were becoming interested in Linux containers, and Google had developed a growing business selling public-cloud infrastructure. Like Omega, Kubernetes has at its core a shared persistent store, with components watching for changes to relevant objects. In contrast to Omega, which exposes the store directly to trusted control-plane components, state in Kubernetes is accessed exclusively through a domain- specific REST API that applies higher-level versioning, validation, semantics, and policy, in support of a more diverse array of clients.

### Containers

- The resource isolation provided by containers has enabled Google to drive utilization significantly higher than industry norms.

- The user-facing jobs reserve more resources than they usually need—allowing them to handle load spikes and fail-over—and these mostly-unused resources can be reclaimed to run batch jobs.

- The isolation is not perfect, though: containers cannot prevent interference in resources that the operating-system kernel doesn’t manage, such as level 3 processor caches and memory bandwidth, and containers need to be supported by an additional security layer (such as virtual machines) to protect against the kinds of malicious actors found in the cloud.

- A modern container is more than just an isolation mechanism: it also includes an _image_—the files that make up the application that runs inside the container.

### Application-oriented infrastruture

Containerization transforms the data center from being machine-oriented to being application-oriented.

- **Application environment**: Decoupling of image and OS makes it possible to provide the same deployment environment in both development and production, which, in turn, improves deployment reliability and speeds up development by reducing inconsistencies and friction. If this is done correctly, the only local external dependencies will be on the Linux kernel system-call interface. While this limited interface dramatically improves the portability of images, it is not perfect: applications can still be exposed to churn in the OS interface, particularly in the wide surface area exposed by socket options, `/proc`, and arguments to `ioctl` calls.

- **Containers as the unit of management**:

    - Building management APIs around containers rather than machines shifts the “primary key” of the data center from machine to application. Kubernetes provides key-value annotations stored in each object’s metadata that can be used to communicate application structure. Such annotations can be set by the container itself or other actors in the management system (e.g., the process rolling out an updated version of the container).

    - Monitoring is just one example. The application-oriented shift has ripple effects throughout the management infrastructure. The load balancers don’t balance traffic across machines; they balance across application instances. Logs are keyed by application, not machine, so they can easily be collected and aggregated across instances without pollution from multiple applications or system operations. We can detect application failures and more readily ascribe failure causes without having to disentangle them from machine-level signals.

    - Finally, although so far we have focused on applications being 1:1 with containers, in reality we use nested containers that are co-scheduled on the same machine: the outermost one provides a pool of resources; the inner ones provide deployment isolation. In Borg, the outermost container is called a resource allocation, or alloc; in Kubernetes, it is called a **pod**. Kubernetes regularizes things and always runs an application container inside a top-level pod, even if the pod contains a single container.

- **Orchestration is the beginning, not the end**:

    - Kubernetes attempts to avert increased complexity by adopting a consistent approach to its APIs. Every Kubernetes object has three basic fields in its description: `ObjectMetadata`, `Specification` (or `Spec`), and `Status`. The `ObjectMetadata` is the same for all objects in the system; it contains information such as the object’s name, UID (unique identifier), an object version number (for optimistic concurrency control), and labels (key-value pairs, see below). The contents of `Spec` and `Status` vary by object type, but their concept does not: `Spec` is used to describe the desired state of the object, whereas `Status` provides read- only information about the current state of the object.

    - Kubernetes has three different forms of replicated pods:
        - `ReplicationController`: run-forever replicated containers (e.g., web servers).
        - `DaemonSet`: ensure a single instance on each node in the cluster (eg., logging agents).
        - `Job`: a run-to-completion controller that knows how to run a (possibly parallelized) batch job from start to finish.
    - The idea of a reconciliation controller loop is shared throughout Borg, Omega, and Kubernetes to improve the resiliency of a system: it compares a desired state (e.g., how many pods should match a label-selector query) against the observed state (the number of such pods that it can find), and takes actions to converge the observed and desired states. Because all action is based on observation rather than a state diagram, reconciliation loops are robust to failures and perturbations: when a controller fails or restarts it simply picks up where it left off.
    - The design of Kubernetes as a combination of microservices and small control loops is an example of control through _choreography_ — achieving a desired emergent behavior by combining the effects of separate, autonomous entities that collaborate. This is a conscious design choice in contrast to a centralized _orchestration_ system, which may be easier to construct at first but tends to become brittle and rigid over time, especially in the presence of unanticipated errors or state changes.

### Things to avoid

1. **Don’t make the container system manage port numbers**: Learning from experiences with Borg, they decided that Kubernetes would allocate an IP address per pod, thus aligning network identity (IP address) with application identity. This makes it much easier to run off-the-shelf software on Kubernetes: applications are free to use static well-known ports (e.g., 80 for HTTP traffic), and existing, familiar tools can be used for things like network segmentation, bandwidth throttling, and management. On bare metal, one can use an SDN (Software Defined Network) overlay or configure L3 routing to handle multiple IPs per machine.

2. **Don’t just number containers: give them labels**: Kubernetes primarily uses labels to identify groups of containers. A label is a key/value pair that contains information that helps identify the object. A pod might have the labels `role=frontend` and `stage=production`, indicating that this container is serving as a production front-end instance. Labels can be dynamically added, removed, and modified by either automated tools or users, and different teams can manage their own labels largely independently. Sets of objects are defined by label selectors (e.g., `stage==production && role==frontend`).

3. **Be careful with ownership**: In Kubernetes, pod-lifecycle management components such as replication controllers determine which pods they are responsible for using label selectors, so multiple controllers might think they have jurisdiction over a single pod. It is important to prevent such conflicts through appropriate configuration choices. But the flexibility of labels has compensating advantages—for example, the separation of controllers and pods means that it is possible to “orphan” and “adopt” containers.

4. **Don’t expose raw state**: A key difference between Borg, Omega, and Kubernetes is in their API architectures. Kubernetes picks a middle ground between Borg and Omega that provides the flexibility and scalability of Omega’s componentized architecture while enforcing system-wide invariants, policies, and data transformations. It does this by forcing all store accesses through a centralized API server that hides the details of the store implementation and provides services for object validation, defaulting, and versioning.

### Some open, hard problems

1. **Configuration**: Application configuration becomes the catch- all location for implementing all of the things that the container-management system doesn’t (yet) do. To cope with these kinds of requirements, configuration-management systems tend to invent a domain-specific configuration language that (eventually) becomes Turing complete, starting from the desire to perform computation on the data in the configuration (e.g., to adjust the amount of memory to give a server as a function of the number of shards in the service). The result is the kind of inscrutable “configuration is code” that people were trying to avoid by eliminating hard-coded parameters in the application’s source code. It doesn’t reduce operational complexity or make the configurations easier to debug or change; it just moves the computations from a real programming language to a domain-specific one, which typically has weaker development tools such as debuggers and unit test frameworks.

2. **Dependency Management**: Standing up a service typically also means standing up a series of related services (monitoring, storage, Continuous Integration / Continuous Deployment (CI/CD), etc). Almost no system, however, captures, maintains, or exposes this kind of dependency information, so automating even common cases at the infrastructure level is nearly impossible. A standard problem is that it is hard to keep dependency information up to date if it is provided manually, and at the same time attempts to determine it automatically (e.g., by tracing accesses) fail to capture the semantic information needed to understand the result. One possible way to make progress is to require that an application enumerate the services on which it depends, and have the infrastructure refuse to allow access to any others.

### PDF

* [Original](https://static.googleusercontent.com/media/research.google.com/en//pubs/archive/44843.pdf)
* [Annotated copy](/assets/blog/borg-omega-kubernetes/borg-omega-kubernetes-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #1 in this [series](https://anantjain.dev/#paper-reviews).