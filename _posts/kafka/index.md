---
title: "Kafka: a Distributed Messaging System for Log Processing"
description: "LinkedIn"
date: "2020-04-18"
categories: ["Paper Review"]
published: true
---

## Abstract

> Log processing has become a critical component of the data pipeline for consumer internet companies. We introduce Kafka, **a distributed messaging system** that we developed for **collecting and delivering high volumes of log data with low latency**. Our system incorporates ideas from existing log aggregators and messaging systems, and is **suitable for both offline and online message consumption**. We made quite a few unconventional yet practical design choices in Kafka to make our system efficient and scalable. Our experimental results show that Kafka has superior performance when compared to two popular messaging systems. We have been using Kafka in production for some time and it is processing hundreds of gigabytes of new data each day.

## Notes

### Design choices

- **Offline and Online:** Large amount of "log" data is generated at any sizable internet company consisting primarily of user activity data and operational metrics data.
- **Low latency:** User activity data (logins, pageviews, clicks, likes, etc.) is now a part of of the production data pipeline used directly in site features, thus requiring low latency.
- **High volume:** This production, real-time usage of log data creates new challenges for data systems because its volume is orders of magnitude larger than the “real” data.
- **Pull model:** They find the “pull” model more suitable for our applications since each consumer can retrieve the messages at the maximum rate it can sustain and avoid being flooded by messages pushed faster than it can handle. The pull model also makes it easy to rewind a consumer.
- Kafka only guarantees **at-least-once** delivery. Delivery guarantees are often overkill for collecting log data. For instance, losing a few pageview events occasionally is certainly not the end of the world.
- If an application cares about duplicates, it must add its own de- duplication logic, either using the offsets that we return to the consumer or some unique key within the message. This is usually a more cost-effective approach than using two-phase commits.
- Kafka guarantees that messages from a single partition are delivered to a consumer in order. However, there is no guarantee on the ordering of messages coming from different partitions.

### Architecture

![Kafka Architecture](/assets/blog/kafka/kafka-architecture.png)

- A stream of messages of a particular type is defined by a topic.
- A producer can publish messages to a topic.
- The published messages are then stored at a set of servers called brokers. Each producer can publish a message to either a randomly selected partition or a partition semantically determined by a partitioning key and a partitioning function.
- To balance load, a topic is divided into multiple partitions and each broker stores one or more of those partitions. Each partition of a topic corresponds to a logical log. Physically, a log is implemented as a set of segment files of approximately the same size (e.g., 1GB).
- Each broker keeps in memory a sorted list of offsets, including the offset of the first message in every segment file
- For better performance, Kafka flushes the segment files to disk only after a configurable number of messages have been published or a certain amount of time has elapsed. A message is only exposed to the consumers after it is flushed.
- A consumer can subscribe to one or more topics from the brokers, and consume the subscribed messages by pulling data from the brokers.
- Although the end consumer API iterates one message at a time, under the covers, each pull request from a consumer also retrieves multiple messages up to a certain size, typically hundreds of kilobytes.
- They do not have a central “master” node, but instead let consumers coordinate among themselves in a decentralized fashion. To facilitate the coordination, they employ a highly available consensus service Zookeeper. Zookeeper has a very simple, file system like API. One can create a path, set the value of a path, read the value of a path, delete a path, and list the children of a path. It does a few more interesting things: (a) one can register a watcher on a path and get notified when the children of a path or the value of a path has changed; (b) a path can be created as ephemeral (as oppose to persistent), which means that if the creating client is gone, the path is automatically removed by the Zookeeper server; (c) zookeeper replicates its data to multiple servers, which makes the data highly reliable and available.

### Unconventional choices

- Unlike typical messaging systems, a message stored in Kafka doesn’t have an explicit message id. Instead, each message is addressed by its logical offset in the log. This avoids the overhead of maintaining auxiliary, seek-intensive random-access index structures that map the message ids to the actual message locations. Note that our message ids are increasing but not consecutive. To compute the id of the next message, we have to add the length of the current message to its id.
- Unlike traditional iterators, the message stream iterator never terminates. If there are currently no more messages to consume, the iterator blocks until new messages are published to the topic.
- Supports both the point-to-point delivery model in which multiple consumers jointly consume a single copy of all messages in a topic, as well as the publish/subscribe model in which multiple consumers each retrieve its own copy of a topic.
- Another unconventional choice made is to avoid explicitly caching messages in memory at the Kafka layer. Instead, Kafka relies on the underlying file system page cache.
- On Linux and other Unix operating systems, there exists a **sendfile API** that can directly transfer bytes from a file channel to a socket channel. Kafka exploits the sendfile API to efficiently deliver bytes in a log segment file from a broker to a consumer, which avoids unnecessary copies and system calls.
- **Stateless Broker:** Unlike most other messaging systems, in Kafka, the information about how much each consumer has consumed is not maintained by the broker, but by the consumer itself. However, this makes it tricky to delete a message, since a broker doesn’t know whether all subscribers have consumed the message. Kafka solves this problem by using a simple time-based SLA for the retention policy.
- **Reconsumption:** A consumer can deliberately rewind back to an old offset and re-consume data.

### Performance

![Kafka Performance](/assets/blog/kafka/kafka-performance.png)

- On average, Kafka can publish messages at the rate of 50,000 and 400,000 messages per second for batch size of 1 and 50, respectively.
- On average, Kafka consumed 22,000 messages per second, more than 4 times that of ActiveMQ and RabbitMQ

### Future Work

- Add built-in replication of messages across multiple brokers to allow durability and data availability guarantees even in the case of unrecoverable machine failures.
- Add some stream processing capability in Kafka.
- Add a library of helpful stream utilities, such as different windowing functions or join techniques will be beneficial to this kind of applications.

### Trivia

- Every day, China Mobile collects 5–8TB of phone call records and Facebook gathers almost 6TB of various user activity events.

### PDF

- [Original](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/09/Kafka.pdf)
- [Annotated copy](/assets/blog/kafka/kafka-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #2 in this [series](https://anantjain.dev/#paper-reviews).
