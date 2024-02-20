---
title: "Optimizing Space Amplification in RocksDB"
description: "Facebook"
date: "2022-02-26"
categories: ["Paper Review"]
published: true
---

### Abstract

> RocksDB is an embedded, high-performance, persistent key-value storage engine developed at Facebook. Much of our current focus in developing and configuring RocksDB is to give priority to resource efficiency instead of giving priority to the more standard performance metrics, such as response time latency and throughput, as long as the latter remain acceptable. In particular, we optimize space efficiency while ensuring read and write latencies meet service-level requirements for the intended workloads. This choice is motivated by the fact that storage space is most often the primary bottleneck when using Flash SSDs under typical production workloads at Facebook. RocksDB uses log-structured merge trees to obtain significant space efficiency and better write throughput while achieving acceptable read performance.

> This paper describes methods we used to reduce storage usage in RocksDB. We discuss how we are able to trade off storage efficiency and CPU overhead, as well as read and write amplification. Based on experimental evaluations of MySQL with RocksDB as the embedded storage engine (using TPC-C and LinkBench benchmarks) and based on measurements taken from production databases, we show that RocksDB uses less than half the storage that InnoDB uses, yet performs well and in many cases even better than the B-tree-based InnoDB storage engine. To the best of our knowledge, this is the first time a Log-structured merge tree-based storage engine has shown competitive performance when running OLTP workloads at large scale.

### Highlights

- Facebook has one of the largest MySQL installations in the world, storing many 10s of petabytes of online data.

- RocksDB got started by forking the code from Google’s LevelDB.

- MyRocks is RocksDB integrated as a MySQL storage engine.

- Within Facebook, RocksDB is used as a storage engine for Laser, a high query throughput, low latency key-value storage service, ZippyDB, a distributed key-value store with Paxos style replication, Dragon, a system to store indices of the Social Graph, and Stylus, a stream processing engine, to name a few.

- The per node query rate is low, because the amount of data that has to be stored (and be accessible) is so large, it has to be sharded across many nodes to fit, and the more nodes, the fewer queries per node.

- Moreover, minimizing space amplification makes SSDs an increasingly attractive alternative compared to spinning disks for colder data storage, as SSD prices continue to decline.

- It is not possible to simultaneously reduce space, read, and write amplification.

- We believe some of the techniques are being described for the first time, including dynamic LSM-tree level size adjustment, tiered compression, shared compression dictionary, prefix bloom filters, and different size multipliers at different LSM-tree levels.

- At each of these successive levels, three binary searches are necessary. The first search locates the target SST by using the data in the Manifest File. The second search locates the target data block within the SST file by using the SST’s index block. The final search looks for the key within the data block. Bloom filters (kept in files but cached in memory) are used to eliminate unnecessary SST searches, so that in the common case only 1 data block needs to be read from disk.

- If we assume that the last level is filled to its target size with data and that each level is 10X larger than the previous level, then in the worst case, LSM-tree space amplification will be 1.111..., considering that all of the levels up to the last level combined are only 11.111...% the size of the last level.

- Dynamic level size adaptation: The level size multiplier is a tunable parameter within an LSM-tree. Above, we assumed it is 10. The larger the size multiplier is, the lower the space amplification and the read amplification, but the higher the write amplification.

- Compression: Key prefix encoding, Sequence ID garbage collection, Data compression, Dictionary-Based Compression

- Tradeoffs/Tuning:
  - Tiered compression: In our installations, a strong compression algorithm (like zlib or Zstandard) is typically used at the last level even though it incurs higher CPU overhead, because most (close to 90%) of the data is located at that level, yet only a small fraction of reads and writes go to it.
  - Bloom filters
  - Prefix Bloom filters

### Conclusion

A number of techniques were described for the first time:

- dynamic LSM-tree level size adjustment based on current DB size;
- tiered compression where different levels of compression are used at different LSM-tree levels;
- use of a shared compression dictionary;
- application of Bloom filters to key prefixes; and
- use of different size multipliers at different LSMtree levels. Moreover, we believe this is the first time a storage engine based on an LSM-tree has been shown to have competitive performance on traditional OLTP workloads.

### PDF

- [Original](http://cidrdb.org/cidr2017/papers/p82-dong-cidr17.pdf)
- [Annotated copy](/assets/blog/rocksdb/rocksdb-annotated.pdf)

---

I love reading foundational papers in Computer Science and publish my notes here on this blog. This was post #36 in this [series](https://anantjain.dev/#paper-reviews).
