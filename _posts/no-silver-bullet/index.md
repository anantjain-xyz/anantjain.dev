---
title: 'No Silver Bullet'
description: 'Frederick P. Brooks, Jr., University of North Carolina at Chapel Hill'
date: '2020-07-11'
categories: ['Paper Review']
published: true
---

### Abstract

> There is no single development, in either technology or management technique, which by itself promises even one order-of-magnitude improvement within a decade in productivity, in reliability, in simplicity.

### Introduction

_No Silver Bullet_ by Turing award winner Frederick Brooks is a classic paper from 1986 that still holds it ground in today's date. It a successor of his book, _The Mythical Man-Month_, which introduced the world to Brook's Law, namely that "adding manpower to a late software project makes it later". I'm very glad I finally got a chance to read this paper. Here are some direct quotes from this paper:

- All software construction involves essential tasks, the fashioning of the complex conceptual structures that compose the abstract software entity, and accidental tasks, the representation of these abstract entities in programming languages and the mapping of these onto machine languages within space and speed constraints.
- Most of the big past gains in software productivity have come from removing artificial barriers that have made the accidental tasks inordinately hard, such as severe hardware constraints, awkward programming languages, lack of machine time.
- How much of what software engineers now do is still devoted to the accidental, as opposed to the essential? Unless it is more than 9/10 of all effort, shrinking all the accidental activities to zero time will not give an order of magnitude improvement.
- We must observe that the anomaly is not that software progress is so slow but that computer hardware progress is so fast.

> The essence of a software entity is a construct of interlocking concepts: data sets, relationships among data items, algorithms, and invocations of functions. This essence is abstract, in that the conceptual construct is the same under many different representations. It is nonetheless highly precise and richly detailed.

### Essential Difficulties

Let us consider the inherent properties of this irreducible essence of modern software systems: complexity, conformity, changeability, and invisibility.

- **Complexity**: Scaling-up of a software entity is not merely a repetition of the same elements in larger size; it is necessarily an increase in the number of different elements. In most cases, the elements interact with each other in some nonlinear fashion, and the complexity of the whole increases much more than linearly:
  - From the complexity comes the difficulty of communication among team members, which leads to product flaws, cost overruns, schedule delays.
  - From the complexity comes the difficulty of enumerating, much less understanding, all the possible states of the program, and from that comes the unreliability.
  - From the complexity of the functions comes the difficulty of invoking those functions, which makes programs hard to use.
  - From complexity of structure comes the difficulty of extending programs to new functions without creating side effects.
  - From the complexity of structure comes the unvisualized state that constitute security trapdoors.
  - This complexity makes overview hard, thus impeding conceptual integrity.
- **Conformity**: Much of the complexity a software engineer must master is arbitrary complexity, forced without rhyme or reason by the many human institutions and systems to which his/her interfaces must confirm.
- **Changeability**: Callbacks of automobiles are really quite infrequent; field changes of computers somewhat less so. Both are much less frequent than modifications to fielded software. Software in a system embodies its function, and software can be changed more easily. The pressures for extended function come chiefly from users who like the basic function and invent new uses for it. Successful software also survives beyond the normal life of the machine vehicle for which it is first written.
- **Invisibility**: As soon as we attempt to diagram software structure, we find it to constitute not one, but several, general directed graphs, superimposed one upon another. The several graphs may represent the flow of control, the flow of data, patterns of dependency, time sequence, name-space relationships. These are usually not even planar, much less hierarchical.

### Past Breakthroughs Solved Accidental Difficulties

- **High-level languages**: What does a high-level language accomplish? It frees a program from much of its accidental complexity. An abstract program consists of conceptual constructs: operations, data types, sequences, and communication. The concrete machine program is concerned with bits, registers, conditions, branches, channels, disks, and such. To the extent that the high-level language embodies the constructs wanted in the abstract program and avoids all lower ones, it eliminates a whole level of complexity that was never inherent in the program at all. Moreover, at some point the elaboration of a high-level language becomes a burden that increases, not reduces, the intellectual task of the user who rarely uses the esoteric constructs.
- **Time-sharing**: The limits of the contribution of time-sharing derive directly. The principle effect is to shorten system response time. As it goes to zero, at some point it passes the human threshold of noticeability, about 100 milliseconds. Beyond that no benefits are to be expected.
- **Unified programming environments**: These attack the accidental difficulties of using programs together, by providing integrated libraries, unified file formats, and piles and filters.

### Hopes for the Silver

- **Ada and other high-level language advances**: Perhaps the Ada philosophy is more of an advance than the Ada language, for it is the philosophy of modularization, of abstract data types, of hierarchical structuring.
- **Object-oriented programming**:
  - We must be careful to distinguish two separate ideas that go under that name: abstract data types and hierarchical types, also called classes. The concept of the abstract data type is that an object’s type should be defined by a name, a set of proper values, and a set of proper operations, rather than its storage structure, which should be hidden.
  - The two concepts are orthogonal — there may be hierarchies without hiding and hiding without hierarchies. Both concepts represent real advances in the art of building software.
  - An order-of-magnitude gain can be made by object-oriented programming only if the unnecessary underbrush of type specification remaining today in our programming language is itself responsible for nine- tenths of the work involved in designing a program product.
- **Artificial intelligence.**: The hard thing about building software is deciding what to say, not saying it. No facilitation of expression can give more than marginal gains.
- **Expert systems**: An expert system is a program containing a generalized inference engine and a rule base, designed to take input data and assumptions and explore the logical consequences through the inferences derivable from the rule base, yielding conclusions and advice, and offering to explain its results by retracing its reasoning for the user. One can visualize a debugging assistant that offers very generalized suggestions at first, but as more and more system structure is embodied in the rule base, comes more and more particular in the hypotheses is generates and the tests it recommends. A crucial part of our imaginary scenario is the development of easy ways to get from program structure specification to the automatic or semi-automatic generation of diagnostic rules. Even more difficult and important is the twofold task of knowledge acquisition: finding articulate, self-analytical experts who know why they do things; and developing efficient techniques for extracting what they know and distilling it into rule bases. The essential prerequisite for building an expert system is to have an expert.
- **“Automatic” programming**: Automatic programming always has been a euphemism for programming with a higher-level language than was presently available to the programmer.
- **Graphical programming**: The flowchart is a very poor abstraction of software structure. In the pitiful, multipage, connection-boxed form to which the flow chart has today been elaborated, it has proved to be essentially useless as a design-tool programmers draw flow charts after, not before, writing the programs they describe. More fundamentally, as I have argued above, software is very difficult to visualize. Whether we diagram control flow, variable scope nesting, variable cross-references, data blow, hierarchical data structures, or whatever, we feel only one dimension of the intricately interlocked software elephant.
- **Program verification**: The hardest part of the software task is arriving at a complete and consistent specification, and much of the essence of building a program is in fact the debugging of the specification.
- **Environments and tools**: Language-specific smart editors are developments not yet widely used in practice, but the most they promise is freedom from syntactic errors and simple semantic errors.
- **Workstations**: Compiling could stand a boost, but a factor of 10 in machine speed would surely leave think-time the dominant activity in the programmer’s day. Indeed, it appears to be so now.

### Promising Attacks on the Conceptual Essence

- **Buy versus build.**: The use of n copies of a software system effectively multiplies the productivity of its developers by n. That is an enhancement of the productivity of the discipline and of the nation. Buyers of \$50,000 office machines today cannot conceivably afford customized payroll programs; so they adapt their payroll procedures to the packages available. Computers are now so commonplace, if not yet so beloved, that the adaptations are accepted as a matter of course.
- **Requirements refinement and rapid prototyping**: The hardest single part of building a software system is deciding precisely what to build. No other part of the conceptual work is to difficult as establishing the detailed technical requirements, including all the interfaces to people, to machines, and to other software systems. No other part of the work so cripples the resulting system if done wrong. No other part is more difficult go rectify later. I would go a step further and assert that it is really impossible for clients, even those working with software engineers, to specify completely, precisely, and correctly the exact requirements of a modern software product before having built and tried some versions of the product they are specifying.
- **Incremental development—grow, not build, software.**: The system should first be made to run, even though it does nothing useful except call the proper set of dummy subprograms. Then, bit-by-bit it is fleshed out, with the subprograms in turn being developed into actions or calls to empty stubs in the level below. The morale effects are startling. Enthusiasm jumps when there is a running system, even a simple one. Teams can _grow_ much more complex entities in four months than they can _build_.
- **Great designers**: Great designs come from great designers. Software construction is a creative process. Sound methodology can empower and liberate the creative mind; it cannot enflame or inspire the drudge. Good managers, scarce though they be, are no scarcer than good designers. Great designers and great managers are both very rare.

### PDF

- [Original](https://s3.amazonaws.com/systemsandpapers/papers/Frederick_Brooks_87-No_Silver_Bullet_Essence_and_Accidents_of_Software_Engineering.pdf)
- [Annotated copy](./no-silver-bullet-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #14 in this [series](https://anantjain.dev/#paper-reviews).
