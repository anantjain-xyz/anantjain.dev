---
title: "The Google File System"
description: "Google"
date: "2020-05-02"
categories: ['Paper Review']
published: true
---

## Abstract

> We have designed and implemented the Google File System, a **scalable distributed file system** for large distributed data-intensive applications. It provides **fault tolerance** while running on **inexpensive commodity hardware**, and it delivers high aggregate performance to a large number of clients. While sharing many of the same goals as previous distributed file systems, our design has been driven by observations of our application workloads and technological environment, both current and anticipated, that reflect a marked departure from some earlier file system assumptions. This has led us to reexamine traditional choices and explore radically different design points. The file system has successfully met our storage needs. It is **widely deployed within Google** as the storage platform for the generation and processing of data used by our service as well as research and development efforts that require large data sets. The largest cluster to date provides **hundreds of terabytes of storage across thousands of disks on over a thousand machines, and it is concurrently accessed by hundreds of clients**. In this paper, we present file system interface extensions designed to support distributed applications, discuss many aspects of our design, and report measurements from both micro-benchmarks and real world use.

## Notes

### Design constraints

* **Component failures are the norm** rather than the exception: have seen problems caused by application bugs, operating system bugs, human errors, and the failures of disks, memory, connectors, networking, and power supplies. Therefore, constant monitoring, error detection, fault tolerance, and automatic recovery must be integral to the system.
* **Files are huge** by traditional standards. Multi-GB files are common.
* Most **files are mutated by appending new data** rather than overwriting existing data. Random writes within a file are practically non-existent. Once written, the files are only read, and often only sequentially. Given this access pattern on huge files, appending becomes the focus of performance optimization and atomicity guarantees, while caching data blocks in the client loses its appeal.
* **Co-designing the applications and the file system API** benefits the overall system by **increasing flexibility**. For example, they have relaxed GFS’s consistency model to vastly simplify the file system without imposing an onerous burden on the applications. They have also introduced an atomic append operation so that multiple clients can append concurrently to a file without extra synchronization between them.
* The workloads primarily consist of two kinds of reads: **large streaming reads** and **small random reads**.
* Files are often used as producer-consumer queues or for many-way merging.
* High sustained bandwidth is more important than low latency.

### Interface

In addition to create, delete, open, close, read, and write operations on files, GFS has snapshot and record append operations. Snapshot creates a copy of a file or a directory tree at low cost. Record append allows multiple clients to append data to the same file concurrently while guaranteeing the atomicity of each individual client’s append.

### Architecture

![](/assets/blog/google-file-system/gfs-architecture.png)

* The **master maintains all file system metadata**. This includes the namespace, access control information, the mapping from files to chunks, and the current locations of chunks. It also controls system-wide activities such as chunk lease management, garbage collection of orphaned chunks, and chunk migration between chunkservers.

* Each chunk is identified by an immutable and globally unique 64 bit chunk handle assigned by the master at the time of chunk creation.

* By default, they store **three replicas**, though users can designate different replication levels for different regions of the file namespace.

* Clients interact with the master for metadata operations, but all data-bearing communication goes directly to the chunkservers.

* **Neither the client nor the chunkserver caches file data**. Client caches offer little benefit because most applications stream through huge files or have working sets too large to be cached. Further reads of the same chunk require no more client-master interaction until the cached information expires or the file is reopened. In fact, the client typically asks for multiple chunks in the same request and the master can also include the information for chunks immediately following those requested.

* **Lazy space allocation** avoids wasting space due to internal fragmentation, perhaps the greatest objection against such a large chunk size (64MB).

* A small file consists of a small number of chunks, perhaps just one. The chunkservers storing those chunks may become **hot spots** if many clients are accessing the same file. They fixed this problem by storing such executables with a higher replication factor and by making the batch-queue system stagger application start times.

* Three major types of **metadata**: the file and chunk namespaces, the mapping from files to chunks, and the locations of each chunk’s replicas. The master does not store chunk location information persistently. Instead, it asks each chunkserver about its chunks at master startup and whenever a chunkserver joins the cluster. This eliminated the problem of keeping the master and chunkservers in sync as chunkservers join and leave the cluster, change names, fail, restart, and so on. In a cluster with hundreds of servers, these events happen all too often.

* The **operation log** contains a historical record of critical metadata changes. It is central to GFS. Not only is it the only persistent record of metadata, but it also serves as a logical time line that defines the order of concurrent operations. They replicate it on multiple remote machines and respond to a client operation only after flushing the corresponding log record to disk both locally and remotely.

* **Guarantees**: File namespace mutations (e.g., file creation) are atomic. They are handled exclusively by the master: namespace locking guarantees atomicity and correctness; the master’s operation log defines a global total order of these operations. A record append causes data (the “record”) to be **appended atomically at least once** even in the presence of concurrent mutations, but at an offset of GFS’s choosing.

* GFS applications can accommodate the **relaxed consistency model** with a few simple techniques already needed for other purposes: relying on appends rather than overwrites, checkpointing, and writing self-validating, self-identifying records.

* **Leases and mutation order**: Each mutation is performed at all the chunk’s replicas. They use leases to maintain a consistent mutation order across replicas. The master grants a chunk lease to one of the replicas, called the primary. The primary picks a serial order for all mutations to the chunk. All replicas follow this order when applying mutations.

![](/assets/blog/google-file-system/gfs-data-flow.png)

* To **fully utilize each machine’s network bandwidth**, the data is pushed linearly along a chain of chunkservers rather than distributed in some other topology (e.g., tree). Thus, each machine’s full outbound bandwidth is used to transfer the data as fast as possible rather than divided among multiple recipients. The network topology is simple enough that “distances” can be accurately estimated from IP addresses.

* **Namespace management and locking at master**: Each master operation acquires a set of locks before it runs. Typically, if it involves `/d1/d2/.../dn/leaf`, it will acquire read-locks on the directory names `/d1`, `/d1/d2`, ..., `/d1/d2/.../dn`, and either a read lock or a write lock on the full pathname `/d1/d2/.../dn/leaf`. Note that leaf may be a file or directory depending on the operation. One nice property of this locking scheme is that it allows concurrent mutations in the same directory. For example, multiple file creations can be executed concurrently in the same directory: each acquires a read lock on the directory name and a write lock on the file name. Also, **locks are acquired in a consistent total order** to prevent deadlock: they are first ordered by level in the namespace tree and lexicographically within the same level.

* **Garbage Collection**: After a file is deleted, GFS does not immediately reclaim the available physical storage. It does so only lazily during regular garbage collection at both the file and chunk levels. We find that this approach makes the system much simpler and more reliable. Garbage collection provides a uniform and dependable way to clean up any replicas not known to be useful. It merges storage reclamation into the regular background activities of the master, such as the regular scans of namespaces and handshakes with chunkservers. Thus, it is done in batches and the cost is amortized. Also, the delay in reclaiming storage provides a safety net against accidental, irreversible deletion.

* **High Availability**: They keep the overall system highly available with two simple yet effective strategies: **fast recovery** and **replication**.

* **Data Integrity**: Each chunkserver uses checksumming to detect corruption of stored data.

### Interesting Challenges

* Some of the **biggest problems were disk and Linux related**. Many of the disks claimed to the Linux driver that they supported a range of IDE protocol versions but in fact responded reliably only to the more recent ones. This problem motivated our use of checksums to detect data corruption, while concurrently they modified the kernel to handle these protocol mismatches.

* Another Linux problem was a **single reader-writer lock** which any thread in an address space must hold when it pages in from disk (reader lock) or modifies the address space in an `mmap()` call (writer lock). They saw transient timeouts in our system under light load and looked hard for resource bottlenecks or sporadic hardware failures. Eventually, they found that this single lock blocked the primary network thread from mapping new data into memory while the disk threads were paging in previously mapped data. Since they are mainly limited by the network interface rather than by memory copy bandwidth, they worked around this by replacing `mmap()` with `pread()` at the cost of an extra copy.

### PDF

* [Original](https://static.googleusercontent.com/media/research.google.com/en//archive/gfs-sosp2003.pdf)
* [Annotated copy](/assets/blog/google-file-system/gfs-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #4 in this [series](https://anantjain.dev/#paper-reviews).