---
title: 'Big Ball of Mud'
description: 'UIUC'
date: '2020-07-04'
categories: ['Paper Review']
published: true
---

### Abstract

> While much attention has been focused on high-level software architectural patterns, what is, in effect, the de-facto standard software architecture is seldom discussed. This paper examines this most frequently deployed of software architectures: **the BIG BALL OF MUD**. A BIG BALL OF MUD is a casually, even haphazardly, structured system. Its organization, if one can call it that, is dictated more by expediency than design. Yet, its enduring popularity cannot merely be indicative of a general disregard for architecture. These patterns explore the forces that encourage the emergence of a BIG BALL OF MUD, and the undeniable effectiveness of this approach to software architecture. What are the people who build them doing right? If more high-minded architectural approaches are to compete, we must understand what the forces that lead to a BIG BALL OF MUD are, and examine alternative ways to resolve them. A number of additional patterns emerge out of the BIG BALL OF MUD. We discuss them in turn. Two principal questions underlie these patterns: Why are so many existing systems architecturally undistinguished, and what can we do to improve them?

### Introduction

A BIG BALL OF MUD, the focus of this paper, is haphazardly structured, sprawling, sloppy, duct-tape and bailing wire, spaghetti code jungle. An age old adage in engineering is that everything is a tradeoff, and this paper does a really good job of exploring tradeoffs associated with architectural considerations as a codebase evolves. If you're a software engineer serious about your craftsmanship, you cannot afford to skip this paper. Here are the patterns explored, with some quotes directly lifted from the paper.

### Forces

A number of forces can conspire to drive even the most architecturally conscientious organizations to produce BIG BALLS OF MUD:

- **Time**: There may not be enough time to consider the long-term architectural implications of one’s design and implementation decisions. Architecture can be looked upon as a _Risk_, that will consume resources better directed at meeting a fleeting market window, or as an _Opportunity_ to lay the groundwork for a commanding advantage down the road.
- **Cost**: Money spent on a quick-and-dirty project that allows an immediate entry into the market may be better spent than money spent on elaborate, speculative architectural fishing expedition.
- **Experience**: Often, initial versions of a system are vehicles whereby programmers learn what pieces must be brought into play to solve a particular problem. Only after these are identified do the architectural boundaries among parts of the system start to emerge.
- **Skill**: Often, initial versions of a system are vehicles whereby programmers learn what pieces must be brought into play to solve a particular problem. Only after these are identified do the architectural boundaries among parts of the system start to emerge.
- **Visibility**: Unlike buildings, only the people who build a program see how it looks inside.
- **Complexity**: One reason for a muddled architecture is that software often reflects the inherent complexity of the application domain. This is what Brooks called "essential complexity".
- **Change**: Architecture is a hypothesis about the future that holds that subsequent change will be confined to that part of the design space encompassed by that architecture.
- **Scale**: Alan Kay, during an invited talk at OOPSLA '86 observed that "good ideas don't always scale." That observation prompted Henry Lieberman to inquire "so what do we do, just scale the bad ones?"

### Big Ball of Mud

- What does it look like? Variable and function names might be uninformative, or even misleading. Functions themselves may make extensive use of global variables, as well as long lists of poorly defined parameters. The function themselves are lengthy and convoluted, and perform several unrelated tasks. Code is duplicated. The flow of control is hard to understand, and difficult to follow. The programmer’s intent is next to impossible to discern. The code is simply unreadable, and borders on indecipherable. The code exhibits the unmistakable signs of patch after patch at the hands of multiple maintainers, each of whom barely understood the consequences of what he or she was doing. Did we mention documentation? What documentation?
- One thing that isn’t the answer is rigid, totalitarian, top-down design. Some analysts, designers, and architects have an exaggerated sense of their ability to get things right up-front, before moving into implementation. This approach leads to inefficient resources utilization, analysis paralysis, and design straightjackets and cul-de-sacs.
- Kent Beck has observed that the way to build software is to: **Make it work. Make it right. Make it fast**.
  - "Make it work" means that we should focus on functionality up-front, and get something running.
  - "Make it right" means that we should concern ourselves with how to structure the system only after we’ve figured out the pieces we need to solve the problem in the first place.
  - "Make it fast" means that we should be concerned about optimizing performance only after we’ve learned how to solve the problem, and after we’ve discerned an architecture to elegantly encompass this functionality.
  - Once all this has been done, one can consider how to make it cheap.
- "Form follows function": Distinct identities of the system’s architectural elements often don’t start to emerge until after the code is working.
- Often, the only way to get domain experience early in the lifecycle is to hire someone who has worked in a domain before from someone else.
- Over time, this symbiosis between architecture and skills can change the character of the organization itself, as swamp guides become more valuable than architects. As per CONWAY’S LAW, architects depart in futility, while engineers who have mastered the muddy details of the system they have built in their images prevail.
- Foote & Yoder went so far as to observe that inscrutable code might, in fact, have a survival advantage over good code, by virtue of being difficult to comprehend and change. This advantage can extend to those programmers who can find their ways around such code. In a land devoid of landmarks, such guides may become indispensable.
- Just as it is easier to be verbose than concise, it is easier to build complex systems than it is to build simple ones.
- **Peter Principle of Programming**: Complexity increases rapidly until the it reaches a level of complexity just beyond that with which programmers can comfortably cope.
- **It is interesting to ask whether some of the differences in productivity seen between hyper-productive organizations and typical shops are due not to differences in talent, but differences in terrain. Mud is hard to march through. The hacker in the trenches must engage complexity in hand-to-hand combat every day. Sometimes, complexity wins.**
- Yet, a case can be made that the casual, undifferentiated structure of a BIG BALL OF MUD is one of its secret advantages, since forces acting between two parts of the system can be directly addressed without having to worry about undermining the system’s grander architectural aspirations.
- During the PROTOTYPE and EXPANSIONARY PHASES of a systems evolution, expedient, white-box inheritance-based code borrowing, and a relaxed approach to encapsulation are common.
- In other words, it’s okay if the system looks at first like a BIG BALL OF MUD, at least until you know better.
- BIG BALL OF MUD architectures often emerge from throw-away prototypes, or THROWAWAY CODE, because the prototype is kept, or the disposable code is never disposed of. (One might call these "little balls of mud".)
- The PROTOTYPE PHASE and EXPANSION PHASE patterns in [Foote & Opdyke 1995] both emphasize that a period of exploration and experimentation is often beneficial before making enduring architectural commitments.
- Proponents of Extreme Programming [Beck 2000] also emphasize continuous coding and refactoring.
- Sometimes FREEDOM FROM CHOICE is what we really want.
- One of mud's most effective enemies is sunshine. Subjecting convoluted code to scrutiny can set the stage for its refactoring, repair, and rehabilitation. Code reviews are one mechanism one can use to expose code to daylight.
- In contrast to traditional solitary software production practices, pair programming subjects code to immediate scrutiny, and provides a means by which knowledge about the system is rapidly disseminated.
- If no one ever looks at code, everyone is free to think they are better than average at producing it. Programmers will, instead, respond to those relatively perverse incentives that do exist. Line of code metrics, design documents, and other indirect measurements of progress and quality can become central concerns.
- There are three ways to deal with BIG BALLS OF MUD. The first is to keep the system healthy. Conscientiously alternating periods of EXPANSION with periods of CONSOLIDATION, refactoring and repair can maintain, and even enhance a system's structure as it evolves. The second is to throw the system away and start over. The RECONSTRUCTION pattern explores this drastic, but frequently necessary alternative. The third is to simply surrender to entropy, and wallow in the mire.

### Throwaway Code

- Once the prototype is done, the code will be thrown away and written properly. As the time nears to demonstrate the prototype, the temptation to load it with impressive but utterly inefficient realizations of the system’s expected eventual functionality can be hard to resist. Sometimes, this strategy can be a bit too successful. The client, rather than funding the next phase of the project, may slate the prototype itself for release.
- THROWAWAY CODE is often written as an alternative to reusing someone else’s more complex code. When the deadline looms, the certainty that you can produce a sloppy program that works yourself can outweigh the unknown cost of learning and mastering someone else’s library or framework.
- Programmers are usually not domain experts, especially at first. However, nothing beats building a prototype to help a team learn its way around a domain.
- When you build a prototype, there is always the risk that someone will say "that's good enough, ship it". One way to minimize the risk of a prototype being put into production is to write the prototype in using a language or tool that you couldn't possible use for a production version of your product.
- **The real problem with THROWAWAY CODE comes when it isn't thrown away.**
- You can ameloriate the architectural erosion that can be caused by quick-and-dirty code by isolating it from other parts of your system, in its own objects, packages, or modules. To the extent that such code can be quarantined, its ability to affect the integrity of healthy parts of a system is reduced.

### Piecemeal Growth

- Larger projects demanded better planning and coordination. Why, it was asked, can't software be engineered like cars and bridges, with a careful analysis of the problem, and a detailed up-front design prior to implementation? Indeed, an examination of software development costs showed that problems were many times more expensive to fix during maintenance than during design.
- One of the reasons that the waterfall approach was able to flourish a generation ago was that computers and business requirements changed at a more leisurely pace. Hardware was very expensive, often dwarfing the salaries of the programmers hired to tend it.
- Today's designers are confronted with a broad onslaught of changing requirements. It arises in part from the rapid growth of technology itself, and partially from rapid changes in the business climate (some of which is driven by technology).
- A better design would have anticipated these oversights. In the presence of volatile requirements, aspirations towards such design perfection are as vain as the desire for a hole-in-one on every hole. To avoid such embarrassment, the designer may attempt to cover him or herself by specifying a more complicated, and more general solution to certain problems, secure in the knowledge that others will bear the burden of constructing these artifacts. However, sometime the anticipated contingencies never arise, and the designer and implementers wind up having wasted effort solving a problem that no one has ever actually had. **In such cases, speculative complexity can be an unnecessary obstacle to subsequent adaptation. It is ironic that the impulse towards elegance can be an unintended source of complexity and clutter instead.**
- It is maintenance programmers who are called upon to bear the burden of coping with the ever widening divergence between fixed designs and a continuously changing world. If the hypothesis that architectural insight emerges late in the lifecycle is correct, then this practice should be reconsidered.
- Maintenance **_is_** learning.
- One of the most striking things about PIECEMEAL GROWTH is the role played by Feedback — two complementary mechanisms, **homeostasis**, and **retrospective feedback**, are often far more effective.
- Proponents of Extreme Programming, or XP (as it is called) say to pretend you are not a smart as you think you are, and wait until this clever idea of yours is actually required before you take the time to bring it into being. In the cases where you were right, hey, you saw it coming, and you know what to do. In the cases where you were wrong, you won't have wasted any effort solving a problem you've never had when the design heads in an unanticipated direction instead.
- Extreme Programming relies heavily on feedback to keep requirements in sync with code, by emphasizing short (three week) iterations, and extensive, continuous consultation with users regarding design and development priorities throughout the development process.
- Extreme Programmers do not engage in extensive up-front planning. Instead, they produce working code as quickly as possible, and steer these prototypes towards what the users are looking for based on feedback.
- Feedback also plays a role in determining coding assignments. Coders who miss a deadline are assigned a different task during the next iteration, _regardless of how close they may have been to completing the task._
- Extreme Programming also emphasizes testing as an integral part of the development process. Tests are developed, ideally, before the code itself. Code is continuously tested as it is developed.
- **To counteract these forces, a permanent commitment to CONSOLIDATION and refactoring must be made. It is through such a process that local and global forces are reconciled over time. This lifecyle perspective has been dubbed the fractal model.**

### Keep it Working

- There may be times where taking a system down for a major overhaul can be justified, but usually, doing so is fraught with peril. However, once the system is brought back up, it is difficult to tell which from among a large collection of modifications might have caused a new problem.
- The chance that a significant change might contain a new error—a phenomenon he ominously referred to as a Bad Fix Injection—was about 7% in the United States.
- One of the strengths of working with a live system is that modifications that break the system are rejected immediately. There are always a large number of paths forward from any point in a system’s evolution, and most of them lead nowhere. By immediately selecting only those that do not undermine the system’s viability, obvious dead-ends are avoided.
- In unexplored territory, the prudent strategy is never to stray too far from the path. Now, if one has a map, a shortcut through the trekless thicket that might save miles may be evident. Of course, pioneers, by definition, don’t have maps. By taking small steps in any direction, they know that it is never more than a few steps back to a working system.
- Always beginning with a working system helps to encourage PIECEMEAL GROWTH. Refactoring is the primary means by which programmers maintain order from inside the systems in which they are working. The goal of refactoring is to leave a system working as well after a refactoring as it was before the refactoring. Aggressive unit and integration testing can help to guarantee that this goal is met.

### Shearing Layers

- In the context of a building, Brand distilled Duffy's proposed layers into these six: Site, Structure, Skin, Services, Space Plan, and Stuff. These layers change at different rates. Site, they say, is eternal. Structure may last from 30 to 300 years. Skin lasts for around 20 years, as it responds to the elements, and to the whims of fashion. Services succumb to wear and technical obsolescence more quickly, in 7 to 15 years. Commercial Space Plans may turn over every 3 years. Stuff, is, of course, subject to unrelenting flux.
- A system that can cope readily with a wide range of requirements, will, all other things being equal, have an advantage over one that cannot.
- Adaptability and Stability are forces that are in constant tension.
- Can we identify such layers in software? Well, at the bottom, there are data. Things that change most quickly migrate into the data, since this is the aspect of software that is most amenable to change. Data, in turn, interact with users themselves, who produce and consume them. Code changes more slowly than data, and is the realm of programmers, analysts and designers. In object-oriented languages, things that will change quickly are cast as black-box polymorphic components. Elements that will change less often may employ white-box inheritance. The abstract classes and components that constitute an object-oriented framework change more slowly than the applications that are built from them. Languages change more slowly than frameworks.
- The phenomenon whereby distinct concerns emerge as distinct layers and tiers can be seen as well with graphical user interfaces. Part of the impetus behind using METADATA is the observation that pushing complexity and power into the data pushes that same power (and complexity) out of the realm of the programmer and into the realm of users themselves.
- More enduring insights gravitate towards the primary structural elements of these systems. Things which find themselves in flux are spun out into the data, where users can interact with them. Software evolution becomes like a centrifuge spun by change. The layers that result, over time, can come to a much truer accommodation with the forces that shaped them than any top-down agenda could have devised.

### Sweeping it Under the Rug

- Children often learn that a single heap in the closet is better than a scattered mess in the middle of the floor.
- At first glance, a BIG BALL OF MUD can inspire terror and despair in the hearts of those who would try to tame it. The first step on the road to architectural integrity can be to identify the disordered parts of the system, and isolate them from the rest of it. Once the problem areas are identified and hemmed in, they can be gentrified using a divide and conquer strategy.
- If you can’t easily make a mess go away, at least cordon it off. This restricts the disorder to a fixed area, keeps it out of sight, and can set the stage for additional refactoring.
- Distilling meaningful abstractions from a BIG BALL OF MUD is a difficult and demand task. It requires skill, insight, and persistence. At times, RECONSTRUCTION may seem like the less painful course.
- Complexity can be hidden using suitable defaults (WORKS OUT OF THE BOX and PROGRAMMING-BY-DIFFERRENCE), and interfaces that gradually reveal additional capabilities as the client grows more sophisticated.

### Reconstruction

- Software is often treated as an asset by accountants, and can be an expensive asset at that. Rewriting a system, of course, does not discard its conceptual design, or its staff’s experience. If it is truly the case that the value of these assets is in the design experience they embody, then accounting practices must recognize this.
- Starting over can be seen as a defeat at the hands of the old code, or a victory over it.
- One reason to start over might be that the previous system was written by people who are long gone. Doing a rewrite provides new personnel with a way to reestablish contact between the architecture and the implementation.
- Another motivation for building a new system might be that you feel that you've got the experience you need to do the job properly.
- There are alternatives to throwning your system away and starting over. One is to embark on a regimen of incremental refactoring, to glean architectural elements and discernable abstractions from the mire. Another alternative is to reassess whether new components and frameworks have come along that can replace all or part of the system.
- Brooks has eloquently observed that the most dangerous system an architect will ever design is his or her second system. This is the notorious second-system effect. RECONSTRUCTION provides an opportunity for this misplaced hubris to exercise itself, so one must keep a wary eye open for it.

### Conclusion

There are good reasons that good programmers build BIG BALLS OF MUD. It may well be that the economics of the software world are such that the market moves so fast that long term architectural ambitions are foolhardy, and that expedient, slash-and-burn, disposable programming is, in fact, a state-of-the-art strategy. Casual architecture is natural during the early stages of a system’s evolution.

### PDF

- [Original](https://s3.amazonaws.com/systemsandpapers/papers/bigballofmud.pdf)
- [Annotated copy](./big-ball-of-mud-annotated.pdf)

---

Over the next few Saturdays, I'll be going through some of the foundational papers in Computer Science, and publishing my notes here. This is #13 in this [series](https://anantjain.dev/#paper-reviews).
