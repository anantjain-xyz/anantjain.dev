---
title: "Source Code Rejuvenation is not Refactoring"
description: "Peter Pirkelbauer, Damian Dechev, and Bjarne Stroustrup"
date: "2020-09-12"
categories: ["Paper Review"]
published: true
---

### Abstract

> Programmers rely on programming idioms, design patterns, and workaround techniques to make up for missing programming language support. Evolving languages often address frequently encountered problems by adding language and library support to subsequent releases. By using new features, programmers can express their intent more directly. As new concerns, such as parallelism or security, arise, early idioms and language facilities can become serious liabilities. Modern code sometimes benefits from optimization techniques not feasible for code that uses less expressive constructs. Manual source code migration is expensive, time-consuming, and prone to errors. In this paper, we present the notion of source code rejuvenation, the automated migration of legacy code and very briefly mention the tools we use to achieve that. While refactoring improves structurally inadequate source code, source code rejuvenation leverages enhanced program language and library facilities by finding and replacing coding patterns that can be expressed through higher-level software abstractions. Raising the level of abstraction benefits software maintainability, security, and performance.

### Introduction

- While refactoring improves structurally inadequate source code, source code rejuvenation leverages enhanced program language and library facilities by ﬁnding and replacing coding patterns that can be expressed through higher-level software abstractions. Raising the level of abstraction beneﬁts software maintainability, security, and performance.

- In this paper, the authors present the notion of source code rejuvenation, the automated migration of legacy code and very brieﬂy mention the tools they use to achieve that.

- Source code rejuvenation is a source-to-source transformation that replaces deprecated language features and idioms with modern code.

- Source code rejuvenation is a unidirectional process that detects coding techniques expressed in terms of lower-level language and converts them into code using higher-level abstractions.

### Applications

- **Source Code Migration:** Upgrading to the next iteration of a language can invalidate existing code. For example, a language can choose to improve static type safety by tightening the type checking rules.

- **Education:** Integration with a smart IDE enables “live” suggestions that can replace workarounds/idioms with new language constructs, thereby educating programmers on how to better use available language and library constructs.

- **Optimization:** The detection of workarounds and idioms can contribute a signiﬁcant factor to both the development cost of a compiler and the runtime, as the detection and transformation requires time. Automated source code migration that performs a one-time source code transformation to utilize the new language support enables optimizations that might be forgone otherwise.

### Refactoring vs. Rejuvenation

- The term refactoring is derived from the mathematical term “factoring” and refers to ﬁnding multiple occurrences of similar code and factoring it into a single reusable function, thereby simplifying code comprehension and future maintenance tasks.

- Refactorings capture maintenance tasks that occur repeatedly.

- Refactoring is a computer assisted process that guarantees correctness, thereby enabling programmers to maintain and develop software more eﬃciently.

- “Anti-patterns” and “code smells” are indicators of design deﬁciencies:

  - **Anti-patterns** are initially structured solutions that turn out to be more troublesome than anticipated. Examples for anti-patterns include the use of exception-handling for normal control-ﬂow transfer, ignoring exceptions and errors, magic strings, and classes that require their client-interaction occur in a particular sequence.
  - Source code that is considered structurally inadequate is said to suﬀer from **code smell**. Examples for “code smell” include repeated similar code, long and confusing functions (or methods), overuse of type tests and type casts.

- Refactoring of anti-patterns and “code smells” to more structured solutions improves safety and maintainability.

- Refactoring does not emphasize a particular goal or direction of source code modiﬁcation.

- Refactoring does not eliminate bugs, but can make bugs easier to spot and ﬁx.

- Refactoring strictly preserves the observable behavior of the program.

![Source Code Rejuvenation vs. Refactoring](/assets/blog/rejuvenation/rejuvenation.png)

### Conclusion

In this paper, the authors have demonstrated with examples that the diﬀerence between language evolution related code transformations and refactoring is subtle but important. They suggest the term “source code rejuvenation” for describing one-time and directed source code transformations that discover and eliminate outdated workaround techniques and idioms.

### PDF

- [Original](https://www.stroustrup.com/sofsem10.pdf)
- [Annotated copy](/assets/blog/rejuvenation/rejuvenation-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #23 in this [series](https://anantjain.dev/#paper-reviews).
