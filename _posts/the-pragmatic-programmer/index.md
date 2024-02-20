---
title: 'The Pragmatic Programmer'
description: 'Andrew Hunt and David Thomas'
date: '2020-07-19'
categories: ['Book Review']
published: true
---

![The Pragmatic Programmer](/assets/blog/the-pragmatic-programmer/the-pragmatic-programmer.jpg)

Last week, after reviewing [_The Passionate Programmer_](/the-passionate-programmer), I realized that another book that will definitely belong in the top 3 in my list of essential reads for professional software developers has a fairly similar title: _The Pragmatic Programmer_. I read this book over multiple years — Amazon shows that I bought it in 2016 and according to Goodreads, I finally finished it in 2019. Over that three-year period, this book served as a personal oasis to remind me of the art and beauty of programming while I was knee deep in the muckiness of building a startup — which usually isn't as elegant or pragmatic as the craft programming can be.

To review this book, I'll follow the same approach that I think has been working out pretty well for me on this blog. I'll copy-paste the TOC of the book, and fill out each bullet with 1-2 lines from the chapter that stood out the most for me. Here we go:

### A Pragmatic Philosophy

Care about your craft. Think about your work.

1. **The Cat Ate My Source Code**: Provide options and don't make lame excuses.
2. **Software Entropy**: Don't live with broken windows. If there is insufficient time to fix it properly, then board it up. Perhaps you can comment out the offending code, or display a "Not Implemented" message, or substitute dummy data instead.
3. **Stone Soup and Boiled Frogs**: There are a couple of morals in the stone soup story. The villagers are tricked by the soldiers, who use the villagers' curiosity to get food from them. But more importantly, the soldiers act as a catalyst, bringing the village together so they can jointly produce something that they couldn't have done by themselves—a synergistic result. Eventually everyone wins. It's time to bring out the stones. Work out what you can reasonably ask for. Develop it well. Once you've got it, show people, and let them marvel. Then say "of course, it would be better if we added...." Pretend it's not important. Sit back and wait for them to start asking you to add the functionality you originally wanted. People find it easier to join an ongoing success. Show them a glimpse of the future and you'll get them to rally around. Be a catalyst for change. On the flip side, remember the big picture. Most software disasters start out too small to notice, and most project overruns happen a day at a time. Systems drift from their specifications feature by feature, while patch after patch gets added to a piece of code until there's nothing of the original left. It's often the accumulation of small things that breaks morale and teams. Don't be like the frog. Keep an eye on the big picture. Constantly review what's happening around you, not just what you personally are doing.
4. **Good-Enough Software**: You can discipline yourself to write software that's good enough—good enough for your users, for future maintainers, for your own peace of mind. You'll find that you are more productive and your users are happier. And you may well find that your programs are actually better for their shorter incubation. Make quality a requirements issue. Great software today is often preferable to perfect software tomorrow. If you give your users something to play with early, their feedback will often lead you to a better eventual solution. Don't spoil a perfectly good program by overembellishment and over-refinement. Move on, and let your code stand in its own right for a while. It may not be perfect. Don't worry: it could never be perfect.
5. **Your Knowledge Portfolio**: Managing your knowledge portfolio is very similar to managing a financial portfolio: a. Serious investors invest regularly—as a habit, b. Diversification is the key to long-term success, c. Smart investors balance their portfolios between conservative and high-risk, high-reward investments, d. Investors try to buy low and sell high for maximum return, e. Portfolios should be reviewed and rebalanced periodically. Learn at least one new language every year, read a technical book each quarter, read nontechnical books, take classes, participate in local user groups, experiment with different environments, stay current, and get wired. Critically analyze what you read and hear.

6. **Communicate**: Plan what you want to say. Write an outline. Then ask yourself, "Does this get across whatever I'm trying to say?" Refine it until it does. Know your audience, choose your moment, choose a style, make it look good, involve your audience, be a listener, and get back to people.

### A Pragmatic Approach

7. **The Evils of Duplication**: **_Don't Repeat Yourself_**. Later on in the development process, you may choose to violate the DRY principle for performance reasons. Frequently this occurs when you need to cache data to avoid repeating expensive operations. The trick is to localize the impact. The violation is not exposed to the outside world: only the methods within the class have to worry about keeping things straight. How does duplication arise?

   - **Imposed duplication**: Developers feel they have no choice—the environment seems to require duplication.
   - **Inadvertent duplication**: Developers don't realize that they are duplicating information. Make it easy to reuse.
   - **Impatient duplication**: Developers get lazy and duplicate because it seems easier.
   - **Interdeveloper duplication**: Multiple people on a team (or on different teams) duplicate a piece of information.

8. **Orthogonality**: Eliminate effects between unrelated things. You get two major benefits if you write orthogonal systems: increased productivity and reduced risk. Our preference is to start by separating infrastructure from application. Each major infrastructure component (database, communications interface, middleware layer, and so on) gets its own subteam. **Building unit tests is itself an interesting test of orthogonality**. What does it take to build and link a unit test? Do you have to drag in a large percentage of the rest of the system just to get a test to compile or link? If so, you've found a module that is not well decoupled from the rest of the system. Some techniques to maintain orthogonality:

   - **Keep your code decoupled**: Write shy code—modules that don't reveal anything unnecessary to other modules and that don't rely on other modules' implementations. Try the Law of Demeter.
   - **Avoid global data**: Even globals that you intend only to read can lead to trouble (for example, if you suddenly need to change your code to be multithreaded).
   - **Avoid similar functions**: Duplicate code is a symptom of structural problems.

9. **Reversibility**: Nothing is more dangerous than an idea if it's the only one you have. The mistake lies in assuming that any decision is cast in stone—and in not preparing for the contingencies that might arise. Instead of carving decisions in stone, think of them more as being written in the sand at the beach. A big wave can come along and wipe them out at any time. There are no final decisions.
10. **Tracer Bullets**: Tracer bullets are loaded at intervals on the ammo belt alongside regular ammunition. When they're fired, their phosphorus ignites and leaves a pyrotechnic trail from the gun to whatever they hit. If the tracers are hitting the target, then so are the regular bullets. Tracer bullets work because they operate in the same environment and under the same constraints as the real bullets. They get to the target fast, so the gunner gets immediate feedback. And from a practical standpoint they're a relatively cheap solution. You might think that this tracer code concept is nothing more than prototyping under an aggressive name. There is a difference. With a prototype, you're aiming to explore specific aspects of the final system. With a true prototype, you will throw away whatever you lashed together when trying out the concept, and recode it properly using the lessons you've learned. Prototyping generates disposable code. Tracer code is lean but complete, and forms part of the skeleton of the final system.
11. **Prototypes and Post-it Notes**: Prototyping is a learning experience. Its value lies not in the code produced, but in the lessons learned. That's really the point of prototyping. You can ignore correctness, completeness, robustness, and style.
12. **Domain Languages**: Program close to the problem domain. Domain-specific languages, or DSL's, are related to Metaprogramming covered later.
13. **Estimating**: Iterate the schedule with the code. Where do estimates come from? Here's a process one can follow:
    - Understand what's being asked
    - Build a model of the system
    - Break the model into components
    - Give each parameter a value
    - Calculate the answers
    - Keep track of your estimating prowess

### The Basic Tools

14. **The Power of Plain Text**: Keep knowledge in plain text, as opposed to a binary format. It guarantees insurance against obsolescence, leverage, and easier testing.
15. **Shell Games**: Use the power of command shells.
16. **Power Editing**: Use a single editor well. They usually are configurable, extensible, and programmable.
17. **Source Code Control**: It's a giant UNDO key — always use source code control.
18. **Debugging**: Don't panic, and fix the problem, not the blame. Once you reproduce the bug, here are some debugging strategies: visualize your data, tracing, rubber ducking, process of elimination, etc.
19. **Text Manipulation**: Learn a text manipulation language. Some use cases:

    - Database schema maintenance
    - Java property access
    - Test data generation
    - Book writing(!)
    - C to Object Pascal interface
    - Generating web documentation

20. **Code Generators**: Write code that writes code. Passive code generators run once to producte a result. Active code generators are used each time their results are required. Code generators needn't be complex, and code generators needn't generate code.

### Pragmatic Paranoia

21. **Design by Contract (DBC)**: Clients and suppliers must agree on rights and responsibilities. These include preconditions, postconditions, class invariants, etc. DBC fits in nicely with the concept of crashing early (the next bullet).
22. **Dead Programs Tell No Lies**: We want to ensure that we do no damage while we're working the bugs out. So we try to check things often and terminate the program if things go awry. Crash early.
23. **Assertive Programming** describes an easy method of checking along the way—write code that actively verifies your assumptions. If it can't happen, use assertions to ensure that it won't. Leave assertions turned on.
24. **When to Use Exceptions**: Exceptions, like any other technique, can cause more harm than good if not used properly. Use exceptions for exceptional problems — error handlers are an alternative.
25. **How to Balance Resources**: As you juggle system resources — memory, files, devices, etc., make sure you don't drop any of the balls. Finish what you start. The finish what you start tip tells us that, ideally, the routine that allocates a resource should also free it. Deallocate resources in the opposite order to that in which you allocate them. That way you won't orphan resources if one resource contains references to another. When allocating the same set of resources in different places in your code, always allocate them in the same order. This will reduce the possibility of deadlock. (If process A claims resource1 and is about to claim `resource2`, while process B has claimed `resource2` and is trying to get `resource1`, the two processes will wait forever.)

### Bend, or Break

Or, how to make reversible decisions, so your code can stay flexible and adaptable in the face of an uncertain world.

26. **Decoupling and the Law of Demeter**: We need to look at coupling—the dependencies among modules of code. Keep separate concepts separate, and decrease coupling. The Law of Demeter for functions attempts to minimize coupling between modules in any given program. It tries to prevent you from reaching into an object to gain access to a third object's methods. Using The Law of Demeter will make your code more adaptable and robust, but at a cost: as a "general contractor," your module must delegate and manage any and all subcontractors directly, without involving clients of your module.
27. **Metaprogramming**: A good way to stay flexible is to write _less_ code. Changing code leaves you open to the possibility of introducing new bugs. With Metaprogramming we can move details out of the code completely, where they can be changed more safely and easily. Put abstractions in code, details in metadata. What happens if you let applications configure each other—software that adapts itself to its environment? Unplanned, spur-of-the-moment configuration of existing software is a powerful concept.
28. **Temporal Coupling**: Do you depend on the "tick" coming before the "tock"? Not if you want to stay flexible. We need to allow for concurrency and to think about decoupling any time or order dependencies. In doing so, we can gain flexibility and reduce any time-based dependencies in many areas of development: workflow analysis, architecture, design, and deployment. Analyze workflow to improve concurrency. Design using services. In a hungry consumer model, you replace the central scheduler with a number of independent consumer tasks and a centralized work queue. Each consumer task grabs a piece from the work queue and goes on about the business of processing it.
29. **It's Just a View**: A key concept in creating flexible code is the separation of a data model from a view, or presentation, of that model. We can use this publish/subscribe mechanism to implement a very important design concept: the separation of a model from views of the model. This is the key concept behind the Model-View-Controller (MVC) idiom: separating the model from both the GUI that represents it and the controls that manage the view. While MVC is typically taught in the context of GUI development, it is really a general-purpose programming technique. The view is an interpretation of the model (perhaps a subset)—it doesn't need to be graphical.
30. **Blackboards**: There's a technique for decoupling modules even further by providing a meeting place where modules can exchange data anonymously and asynchronously. This is the topic of Blackboards. Use them to coordinate workflow.

### While You Are Coding

31. **Programming by Coincidence**: Developers who don't actively think about their code are programming by coincidence—the code might work, but there's no particular reason why. We should avoid programming by coincidence—relying on luck and accidental successes—in favor of programming deliberately:
    - Always be aware of what you are doing.
    - Don't code blindfolded.
    - Proceed from a plan.
    - Rely only on reliable things.
    - Document your assumptions.
    - Don't just test your code, but test your assumptions as well.
    - Prioritize your effort.
    - Don't be a slave to history. Don't let existing code dictate future code.
32. **Algorithm Speed**: Spot potential problems before they happen by estimating the speed of the code you write. If you test a sort routine with random input keys, you may be surprised the first time it encounters ordered input. Pragmatic Programmers try to cover both the theoretical and practical bases. After all this estimating, the only timing that counts is the speed of your code, running in the production environment, with real data. If it's tricky getting accurate timings, use code profilers to count the number of times the different steps in your algorithm get executed, and plot these figures against the size of the input. Also be wary of _premature optimization_. It's always a good idea to make sure an algorithm really is a bottleneck before investing your precious time trying to improve
33. **Refactoring**: We constantly see room for improvement in our programs and our designs. Rather than construction, software is more like gardening—it is more organic than concrete. Rewriting, reworking, and re-architecting code is collectively known as refactoring. Refactoring your code—moving functionality around and updating earlier decisions—is really an exercise in pain management. Don't try to refactor and add functionality at the same time, and make sure you have good tests before you begin refactoring.
34. **Code That's Easy to Test**: Make code easy to test, and you'll increase the likelihood that it will actually get tested. Chip-level testing for hardware is roughly equivalent to unit testing in software—testing done on each module, in isolation, to verify its behavior. Tests should be composable; that is, a test can be composed of subtests of subcomponents to any depth. We can use this feature to test selected parts of the system or the entire system just as easily, using the same tools. **Testing is more cultural than technical**; we can instill this testing culture in a project regardless of the language being used.
35. **Evil Wizards**: Be careful of tools that write reams of code on your behalf unless you understand what they're doing. But if you do use a wizard, and you don't understand all the code that it produces, you won't be in control of your own application. You won't be able to maintain it, and you'll be struggling when it comes time to debug.

### Before the Project

36. **The Requirements Pit**: Don't gather requirements—dig for them! There's a simple technique for getting inside your users' requirements that isn't used often enough: become a user. Are you writing a system for the help desk? Spend a couple of days monitoring the phones with an experienced support person. Work with a user to think like a user. By using a formal template as an aide-mémoire, you can be sure that you include all the information you need in a use case: performance characteristics, other involved parties, priority, frequency, and various errors and exceptions that can crop up ("nonfunctional requirements"). The key to managing growth of requirements is to point out each new feature's impact on the schedule to the project sponsors. Create and maintain a project glossary—one place that defines all the specific terms and vocabulary used in a project.
37. **Solving Impossible Puzzles**: When you're stuck, step back a pace and ask yourself these questions: Is there an easier way? Are you trying to solve the right problem, or have you been distracted by a peripheral technicality? Why is this thing a problem? What is it that's making it so hard to solve? Does it have to be done this way? Does it have to be done at all?
38. **Not Until You're Ready**: Listen to nagging doubts—start when you're ready.
39. **The Specification Trap**: Some things are better done than described.
40. **Circles and Arrows**: Don't be a slave to Formal Methods. Pragmatic Programmers look at methodologies critically, then extract the best from each and meld them into a set of working practices that gets better each month.

### Pragmatic Projects

41. **Pragmatic Teams**: As soon as you have more than one person working on a project, you need to establish some ground rules and delegate parts of the project accordingly. To outsiders, the worst project teams are those that appear sullen and reticent. They hold meetings with no structure, where no one wants to talk. Their documents are a mess: no two look the same, and each uses different terminology. There is a simple marketing trick that helps teams communicate as one: generate a brand. When you start a project, come up with a name for it, ideally something off-the-wall.
42. **Ubiquitous Automation**: Automate your procedures. Civilization advances by extending the number of important operations we can perform without thinking. Using cron, we can schedule backups, the nightly build, Web site maintenance, and anything else that needs to be done—unattended, automatically.
43. **Ruthless Testing**: Finding bugs is somewhat like fishing with a net. We use fine, small nets (unit tests) to catch the minnows, and big, coarse nets (integration tests) to catch the killer sharks. Test Early. Test Often. Test Automatically. There are several major types of software testing that you need to perform: Unit testing, Integration testing, Validation and verification, Resource exhaustion, errors, and recovery, Performance testing, and Usability testing. If you are really serious about testing, you might want to appoint a project saboteur. The saboteur's role is to take a separate copy of the source tree, introduce bugs on purpose, and verify that the tests will catch them. Tip 65 Test State Coverage, Not Code Coverage.
44. **It's All Writing**: The palest ink is better than the best memory. We want to downplay the dichotomy between code and documentation, and instead treat them as two views of the same model. In general, comments should discuss why something is done, its purpose and its goal. The code already shows how it is done, so commenting on this is redundant—and is a violation of the DRY principle. Here's a list of things that should not appear in source comments.
    - **A list of the functions exported by code in the file.** There are programs that analyze source for you. Use them, and the list is guaranteed to be up to date.
    - **Revision history.** This is what source code control systems are for. However, it can be useful to include information on the date of last change and the person who made it.
    - **A list of other files this file uses**. This can be determined more accurately using automatic tools.
    - **The name of the file.** If it must appear in the file, don't maintain it by hand. RCS and similar systems can keep this information up to date automatically. If you move or rename the file, you don't want to have to remember to edit the header.
45. **Great Expectations**: The perception of success is what counts—delight your project's sponsor. Some consultants call this process "managing expectations"—actively controlling what users should hope to get from their systems.
46. **Pride and Prejudice**: Sign your work, and take pride in what you do. Pragmatic Programmers don't shirk from responsibility. Instead, we rejoice in accepting challenges and in making our expertise well known. If we are responsible for a design, or a piece of code, we do a job we can be proud of.

---

_This is #61 in a series of book reviews published weekly on this site._
