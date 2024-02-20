---
title: "BeyondCorp: Design to Deployment at Google"
description: ""
date: "2020-05-09"
categories: ['Paper Review']
published: true
---

### Intro

BeyondCorp is Google's implementation of a [Zero Trust Network.](https://stratechery.com/2020/zero-trust-information/).

### Abstract

The goal of Google’s BeyondCorp initiative is to improve the security with regard to how employees and devices access internal applications. Unlike the conventional perimeter security model, BeyondCorp doesn’t gate access to services and tools based on a user’s physical location or the originating network; instead, access policies are based on information about a device, its state, and its associated user. BeyondCorp considers both internal networks and external networks to be completely untrusted, and gates access to applications by dynamically asserting and enforcing levels, or “tiers,” of access.

### Architecture

![Architecture of the BeyondCorp Infrastructure Components](/assets/blog/beyondcorp/beyondcorp-architecture.png)

These are the fundamental components of the BeyondCorp System:
- Access requirements are organized into **Trust Tiers** representing levels of increasing sensitivity.
- **Resources** are an enumeration of all the applications, services, and infrastructure that are subject to access control.
- **Trust Inferer** is a system that continuously analyzes and annotates device state. The system sets the maximum trust tier accessible by the device and assigns the VLAN to be used by the device on the corporate network.
- The **Access Policy** is a programmatic representation of the Resources, Trust Tiers, and other predicates that must be satisfied for successful authorization.
- The **Access Control Engine** is a centralized policy enforcement service referenced by each gateway that provides a binary authorization decision based on the access policy, output of the Trust Inferer, the resources requested, and real-time credentials.
- **Device Inventory Service** continuously collects, processes, and publishes changes about the state of known devices.
- Resources are accessed via **Gateways**, such as SSH servers, Web proxies, or 802.1x-enabled networks. Gateways perform authorization actions, such as enforcing a minimum trust tier or assigning a VLAN.

### Other Interesting Bits

- As a device is allowed to access more sensitive data, we require more frequent tests of user presence on the device, so the more we trust a given device, the shorter-lived its credentials.
- In addition to providing tier assignments, the Trust Inferer also supports network segmentation efforts by annotating which VLANs a device may access. Network segmentation allows us to restrict access to special networks—lab and test environments, for example—based on the device state.
- Once the incoming data are in a common format, all data must be correlated. During this phase, the data from distinct sources must be reconciled into unique device-specific records. When we determine that two existing records describe the same device, they are combined into a single record. While data correlation may appear straightforward, in practice it becomes quite complicated because many data sources don’t share overlapping identifiers.
- Somewhat surprisingly, latency between a policy or device state change and the ability of gateways to enforce this change hasn’t proven problematic. The update latency is typically less than a second. The fact that not all information is available to precompute is a more substantial concern.
- Given the aforementioned complexity of correlating data from disparate sources, we decided to use an X.509 certificate as a persistent device identifier. This certificate provides us with two core functionalities:
- Thus, the certificate does not remove the necessity of correlation logic; nor is it sufficient to gain access in and of itself. However, it does provide a cryptographic GUID which enforcement gateways use to both encrypt traffic and to consistently and uniquely refer to the device.
- Native mobile applications are subject to the same authorization enforcement as resources accessed by a Web browser; this is because API endpoints also live behind proxies that are integrated with the Access Control Engine.
- The exceptions model has resulted in an increased level of complexity in the BeyondCorp ecosystem, and over time, the answer to “why was my access denied?” has become less obvious.
- Over-communication is also problematic: change-resistant users tend to overestimate the impact of changes and attempt to seek unnecessary exemptions.
- As Google’s corporate infrastructure is evolving in many unrelated ways,
it’s easy for users to conflate access issues with other ongoing efforts, which also slows remediation efforts and increases the operational load on support staff.

### PDF

* [Original](https://storage.googleapis.com/pub-tools-public-publication-data/pdf/44860.pdf)
* [Annotated copy](/assets/blog/beyondcorp/beyondcorp-annotated.pdf)

---
Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #5 in this [series](https://anantjain.dev/#paper-reviews).