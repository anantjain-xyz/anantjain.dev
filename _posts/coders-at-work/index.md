---
title: "Coders at Work"
description: "Peter Seibel"
date: "2020-08-23"
categories: ['Book Review']
published: true
---

![Coders at Work: Reflections on the Craft of Programming](/assets/blog/coders-at-work/coders-at-work-cover.jpg)

Continuing on the trend of finishing books about programmers and programming that I've been reading for multiple years, I finally wrapped up _Coders at Work_ by Peter Seibel this weekend. Much in the same format as _Founders at Work_ (one of my all-time favorite books that is a collection of interviews with founders), _Coders at Work_ is a collection of interviews with unarguably the best "coders" of the past few decades. Some examples include Brendan Eich (creator of Javascript), Peter Norvig (director of Google Research), Ken Thompson (inventor of Unix), Donald Knuth (of The Art of Computer Programming textbooks), and so on. According to Amazon, it took me exactly 5 years to finish this book — my purchase history shows that I acquired this treasure on August 21, 2015 on my Kindle. What this necessarily means is that as I write this review, I'm very excited to review highlights from my Kindle since I very much don't recollect a single thing from the earlier interviews.

There are tons of gems in this book, so this is going to be a long one!

### Jamie Zawinski (Lisp, Netscape)

- At the end of the day, ship the fucking thing! It's great to rewrite your code and make it cleaner and by the third time it'll actually be pretty. But that's not the point-you're not here to write code; you're here to ship products.

- I think one of the most important things, for me anyway, when building something from the ground up like that is, as quickly as possible, getting the program to a state that you, the programmer, can use it. Even a little bit. Because that tells you where to go next in a really visceral way.
                
- As far as the assertions-how formally do you think? Some people just use ad hoc assertions-here's something that I think should be true here. And some people think very formally-functions have preconditions and postconditions and there are global invariants. Where are you on that scale?

- Zawinski (on testing): Nah. We never did any of that. I did occasionally for some things. The date parser for mail headers had a gigantic set of test cases. Back then, at least, no one really paid a whole lot of attention to the standards. So you got all kinds of crap in the headers. And whatever you're throwing at us, people are going to be annoyed if their mail sorts wrong.

- It feels like you're writing a story and you're trying to express a concept to a very dumb person-the computer-who has a limited vocabulary.

- People who can dig into an API and figure out which parts you need and which parts you don't, is, I think, one of those important things now.

### Brad Fitzpatrick (LiveJournal)

- Someone described Google's App Engine as this generation's BASIC. Because this generation, everything is networked.

- *Seibel*: Programs like that, the code base is pretty huge. When you look at something like that for fun, how deeply do you get into it? *Fitzpatrick*: Generally, I'll just pipe find into less and try to understand the directory structure. Then either something grabs my eye or I don't understand what something is. So I pick a random file and get a feel for it. Then I bounce around and wander aimlessly until I'm bored and then pick a new random spot to jump in.

- (On recruiting) Somebody who was passionate about something and had some side project. How did they maintain it and how serious did they get with it? Or do they do a lot of quick hacks and abandon them?

- I guess there are the people who just do it for a job but don't really enjoy it. Which is OK. But it's kind of weird to compare those people with people who are hardcore programmers. What's ten times more productive when one person works ten times the hours and thinks about it nonstop and the other person just does it at his job?

### Douglas Crockford (Javascript)

- The worst feature of JavaScript, without question, is its dependence on a global object. It doesn't have linkers, it doesn't have any kind of information hiding between compilation units. It all gets dumped together into a common global object.

> The whole Web is built on one mistake after another. We have this big pile of accidents.

- Readability of code is now my first priority. It's more important than being fast, almost as important as being correct, but I think being readable is actually the most likely way of making it correct.

### Brendan Eich (Javascript)

- But in the real world we're all in debuggers and they're pieces of shit from the 70s like GDB.

- So we tend to do a lot of data structures that are constant time. And even then, constant can be not one-it can be big enough that you care.

- While producing a lot of code is still important, what has interested me-and this is something that we talked about at Netscape when we talked about their track for principal engineer-is somebody who isn't management but still has enough leadership or influence to cause other programmers to write code like they would write without them having to do it, because you don't have enough hours in the day or fingers.

### Joshua Bloch (Java)

- Generally speaking, if I find myself copying and pasting, I think, "What's wrong with this design? How can I fix it?" So that's something that took a little while to get right.

- Another is Elements of Style, which isn't even a programming book. You should read it for two reasons: The first is that a large part of every software engineer's job is writing prose. If you can't write precise, coherent, readable specs, nobody is going to be able to use your stuff. So anything that improves your prose style is good. The second reason is that most of the ideas in that book are also applicable to programs.

> As they say, it's easier to optimize correct code than to correct optimized code.

- But the fundamental rule is, write the code that uses the API before you write the code that implements it.

- I think that people who say, "Oh, it's not worth the time; it's just the name of a variable," just don't get it. You're not going to produce a maintainable program with that attitude.

- As I write the program, I say to myself, what it is that must be true here? And it's very important to put those assertions into the code, to preserve them for posterity. If your language lets you do it with an assert construct, use it; if not, put assertions in comments.

- I'm sure you've read "On the Cruelty of Really Teaching Computing Science", which I think is as wrong as it could possibly be. Dijkstra says that you shouldn't let students even touch a computer until they've manipulated symbols, stripped of their true meaning, for a semester. That's crazy! There's a joy in telling the computer to do something, and watching it do it. I would not deprive students of that joy.

- There's a wonderful Knuth quote about testing, quoted by Bentley and Mcllroy in their wonderful paper called "Engineering a Sort Function," about getting yourself in the meanest and nastiest mood that you can. I most certainly did that for this set of tests.

- Intelligence is not a scalar quantity; it's a vector quantity. And if you lack empathy or emotional intelligence, then you shouldn't be designing APIs or GUIs or languages.

### Joe Armstrong (Erlang)

- Over the years I've kind of made a generic mistake and the generic mistake is to not open the black box. To mentally think, this black box is so impenetrable and so difficult that I won't open it.
                
- I can't say beginner programmers should open up all these abstractions. But what I am saying is you should certainly consider the possibility of opening them. Not completely reject the idea. It's worthwhile seeing if the direct route is quicker than the packaged route.

- There must be big commercial interests for whom it is very desirable that stuff won't work together. It creates thousands of jobs for consultants. And thousands of tools to solve problems that shouldn't exist. Problems that were solved years ago.

- There are two changes and I think they're to do with the number of years you program. One is, when I was younger quite often I would write a program and work at it until it's finished. When it was finished I would stop working on it. It was done, finished. Then I'd get an insight-"Ah! Wrong! Idiot!" I'd rewrite it. Again: "Yeah, it's wrong"-rewrite

- One that's tricky is slight spelling errors in variable names. So I choose variable names that are very dissimilar, deliberately, so that error won't occur. If you've got a long variable like personName and you've got personNames with an "s" on the end, that's a list of person names, that will be something that my eye will tend to read what I thought it should have been. And so I'd have personName and then listOfPeople.
                
- It's a motivating force to implement something; I really recommend it. If you want to understand C, write a C compiler. If you want to understand Lisp, write a Lisp compiler or a Lisp interpreter.

- But despite everything the central core of functional programming is the idea of nonmutable state-that x isn't the name of a location in memory; it's a value. So it can't change. We say x equals three and you can't change it thereafter.

- Provided you can reproduce an error. Errors that are nonreproducible, that's pretty difficult to debug. But they weren't giving me that. They were giving me reproducible errors. So just carry on halving until you find it. You must ultimately find it.

- Then there's-I don't know if I read it somewhere or if I invented it myself: Joe's Law of Debugging, which is that all errors will be plus/minus three statements of the place you last changed the program.

- It depends on the difficulty of the problem. I think with very difficult problems I quite often start right by writing the documentation. The more difficult it is, the more likely I am to document it first.

- And in a way, writing the documentation is thinking about the types in a way. I suppose you start off with "is a". You say, "A melody is a sequence of notes." Right. OK. A melody is a sequence of chords where each chord is a parallel composition of notes of the same duration. Just by defining terms in your documentation-a something is a something-you're doing a sort of type analysis and you're thinking declaratively about what the data structures are.

- Dan Ingalls mentioned Prolog as an example of the kind of idea that we should really revisit now that we've had a couple decades of Moore's Law. You just walk around going, where's the program-I haven't written a program. You just told it a few facts about the system, about your problem. Here it is figuring out what to do. It's wonderful. I should go back to Prolog and drop Erlang.

- You were asking earlier what should one do to become a better programmer? Spend 20 percent of your time learning stuff-because it's compounded. Read Hamming's paper. It's good. Very good.

- *Seibel*: What makes a good programmer? If you are hiring programmers-what do you look for? *Armstrong*: Choice of problem, I think. Are you driven by the problems or by the solutions? I tend to favor the people who say, "I've got this really interesting problem." Then you ask, "What was the most fun project you ever wrote; show me the code for this stuff. How would you solve this problem?"

- (Message passing vs. memory sharing for concurrency): The thing that is surprising is that it's more efficient in certain circumstances. What we did for the reasons of fault tolerance, turned out to be, in many circumstances, just as efficient or even more efficient than sharing.

- I'm also very skeptical about implicit parallelism. Your programming language can have parallel constructs but if it doesn't map into hardware that's parallel, if it's just being emulated by your programming system, it's not a benefit. So there are three types of hardware parallelism:
  - There's pipeline parallelism-so you make a deeper pipeline in the chip so you can do things in parallel.
  - There's data parallelism, which is not really parallelism but it has to do with cache behavior. If you want to make a C program go efficiently, if *p is on a I6-byte boundary, if you access *p, then the access to *(p + 1) is free, basically, because the cache line pulls it in.
  - The other source of real concurrency in the chip are multicores.

### Simon Peyton Jones (Haskell)
                
- People often ask, "What's the equivalent of UML diagrams for a functional language?" And I think the best answer I've ever been able to come up with is, it's the type system. When an object-oriented programmer might draw some pictures, I'm sitting there writing type signatures.

- I think for some styles of programming you might want to use message passing. For others you might want to use Software Transactional Memory. For others data parallelism is much better.

### Peter Norvig (Google)

- About having schedules, and keeping team members and customers and managers happy. When you're a grad student, you don't have to do that; just show up to your adviser every now and then.

- So I think understanding interfaces and how they go together is more important than all the details of the insides of these packages.

- You have to understand a little bit more, and say, "Is it safe, what I'm doing here? Or what are the failure cases? Sure, I tried it once and it worked, but is it always going to work? How do I write test cases to show that and to understand it a little better, and then once I've done that, can I extract what I've done and publish a new tool that other people can use because I've put these pieces together in a certain way."

- If you have two good programmers, it's better for them to work independently and then debug each other's work afterwards rather than to say, "We'll take a 50 percent hit just for that added set of eyes."

- Do you think those are related? It often seems that people who write the worst spaghetti code are the ones who can hold the most in their head-that's the only way they could possibly write code like that.

- I think it's also that I'm probably more goal-oriented. Knuth is good if you say, "I want to know everything about this subject." But usually I'm saying, "I want to know if A is better than B," or, "I want to know the asymptotic complexity of this, and once I've got that, I don't need all the details of how we got there."

> One of the interesting things we found, when trying to predict how well somebody we've hired is going to perform when we evaluate them a year or two later, is one of the best indicators of success within the company was getting the worst possible score on one of your interviews. We rank people from one to four, and if you got a one on one of your interviews, that was a really good indicator of success. Ninety-nine percent of the people who got a one in one of their interviews we didn't hire. But the rest of them, in order for us to hire them somebody else had to be so passionate that they pounded on the table and said, "I have to hire this person because I see something in him that's so great, and this guy who thought he was no good is wrong, and I've got to stand up for him and put my reputation on the line."
                
### Guy Steele (Common Lisp and Scheme)

- Fred Brooks's Mythical Man-Month gave me some insights.

- Knuth carefully laid out TeX: The Program so you could almost read it as a novel or something.
                
- Fred Brooks's saying about flowcharts and tables, saying, "Show me your interfaces and I won't need your code because it'll be redundant or irrelevant."

- I realized as languages got more complicated they were really too big to design all at once and that languages would necessarily from now on undergo evolution because they were too big to design all at once or to implement all at once. And so I got to thinking that maybe for a really successful programming language, you need to design and plan for the social process as much as you design the technical features of the language and think about how those two things are going to interact.

- There's this Huffman encoding problem. If you make something concise, something is going to have to be more verbose as a consequence.

- We can't make it trivial, but I think we can make it easier to avoid mistakes of various kinds. A good example is overflow detection on arithmetic, or providing bignums instead of just letting 32-bit integers wrap around.
                
- Certainly, dealing with parallel processes has produced the most difficult-to-deal-with bugs.

- You use proofs for the same reason you use data types, or for the same reason that mountain climbers use ropes. If all is well, you don't need them. But they increase the chance of catching it if something does go wrong.

- In particular, the details of the programming tend to take a local point of view and the invariants tend to focus on the global point of view.

- There's a Dijkstra quote about how you can't prove by testing that a program is bug-free, you can only prove that you failed to find any bugs with your tests.

### Dan Ingalls (Smalltalk)

- If Alan Kay is Smalltalk's father, Dan Ingalls is its mother - Smalltalk may have started as a gleam in Alan Kay's eye, but Ingalls is the one who did the hard work of bringing it into the world.

- Alan Kay has said that both Lisp and Smalltalk have the problem that they're so good they eat their children.

- A decade or two ago there was HyperCard and lots of teachers were able to understand that and do useful things in it. It's really strange that that whole experience didn't naturally go right into the Web. I think there's still a role to be filled there with tools as simple as HyperCard and as immediate as the Web. It would be cool if it went that way.

- Another aspect of Smalltalk that Alan Kay has particularly emphasized in recent years is that it wasn't supposed to be about objects; it was about message passing. C++ and Java don't have message passing in nearly the same way Smalltalk did. Why is that such a core idea? Because it gives you real separation. Alan's latest phrase-which is appropriate, I think-is it should be like the Internet all the way down. So why is message passing such a good thing? That's the reason: it separates the inside from the outside, 100 percent.

- There's a place you want to get to, you pick a piece of it that would be gratifying and that would demonstrate that you're on the path and that you can fit into the time until you next get pulled off to do this at home or that at work.

- Debugging as an important element of an intellectual toolkit-the idea that the name of the game is not to get the right answer but to get an answer and then debug it.

- I think of a lot of it as being more architectural: the way the graphics work together with the models; the way things need to be updated or cached.

- Well, you can leave it open how they do their part of it and you maybe only step in with micromanagement where it's needed. And often things turn out better.

### L Peter Deutsch (Interlisp, Smalltalk VM, Ghostscript)

- My recollection was that I did that the way I actually have done most of my programming, which is to do the data structures first. My belief is still, if you get the data structures and their invariants right, most of the code will just kind of write itself.

- Someone extrapolated the growth rate and said, "My God. By 20 or 30 years from now, every single person will have to be a telephone operator." Well, that's what happened. I think something like that may be happening in some big areas of programming, as well.

- I was starting to be aware of what I would call functional segmentation but I didn't think of it as having any particular significance. I was aware that you could write certain parts of the program and not have to think about other parts of the program while you were doing it,

- We saw interface-design choices just emerging from the task. That was the point in my career at which I dimly started to become aware that interfaces between entities really needed to be designed separately, that the interfaces between them were also an important design issue.

- If I was going to draw lessons from it-well again, I'm kind of an elitist: I would say that the people who should be programming are the people who feel comfortable in the world of symbols. If you don't feel really pretty comfortable swimming around in that world, maybe programming isn't what you should be doing.

- Even sometimes measure things you don't think you need to measure. That had a profound effect on me.

- I think essentially all of what's called computer science is some combination of engineering and applied mathematics.

- Extreme Programming: I'm not a big fan of XP, and it's for two reasons. XP advocates very tight coupling with the customer during the development process on, I guess, two grounds. One is that this results in the customer's needs being understood and met better. That may well be true. I don't have firsthand knowledge of it but I'm a little wary of that because the customer doesn't always know what the customer's needs are.

- The other reason that XP, I think, advocates this tight coupling with the customer is to avoid premature generalization or overdesign. I think that's a two-edged sword. Because I've seen that process go astray in both directions: both premature generalization and premature specialization.

- So I have some questions about XP in that respect. What happens after the project is "done"? Is it maintainable? Is it supportable? Is it evolvable? What happens when the original developers have left? Because XP is so documentation-phobic, I have very grave concerns about that.

- One school of thought, which I think is probably pretty close to the way XP looks at it, that basically says that because requirements are going to change all the time, you shouldn't expect software to last. If the requirements change, you build something new. There is, I think, a certain amount of wisdom in that.

- I think behind this perhaps is a mindset of software as expense vs. software as capital asset.
                
- And there is no such thing as a capital asset that doesn't require ongoing maintenance and investment. You should expect that there's going to be some cost associated with maintaining a growing library of reusable software.

- What I see getting reused is either very small things-individual icons, individual web page designs-or very big things like entire languages or large applications with extension architectures like Apache or Mozilla.

- Passing a pointer and storing a pointer are localized operations, but their consequences are to implicitly create this graph. I'm not even going to talk about multithreaded applications-even in single-threaded applications you have data that's flowing between different parts of the program.

- Jim Morris, who's one of my favorite originators of computer epigrams, once said that a type checker is just a Neanderthal correctness-prover. If there's going to be a breakthrough, that's where I see it coming from-from more powerful ways of talking declaratively about how our programs are intended to be structured and what our programs are intended to do.

- The reason I don't program in Lisp anymore: I can't stand the syntax. It's just a fact of life that syntax matters.

- Language systems stand on a tripod. There's the language, there's the libraries, and there are the tools. And how successful a language is depends on a complex interaction between those three things. Python has a great language, great libraries, and hardly any tools.

- The conclusion I came to is that theorem-proving technology probably wouldn't have helped a whole lot because in the few places where it could have, formalizing what it was that the software was supposed to do would've been a Herculean job.

- And I had this little epiphany that the reason that I was having trouble finding another software project to get excited about was not that I was having trouble finding a project. It was that I wasn't excited about software anymore.

### Ken Thompson (Unix)                

- Thompson went on, with Dennis Ritchie, to invent Unix, an endeavor for which he fully expected to be fired. He also invented the B programming language, the precursor to Dennis Ritchie's C. In 1983, Thompson and Ritchie received the Turing Award for their "development of generic operating systems theory and specifically for the implementation of the Unix operating system."

- I've never been a lover of existing code. Code by itself almost rots and it's gotta be rewritten. Even when nothing has changed, for some reason it rots.

- Documenting is an art as fine as programming. It's rare I find documentation at the level I like. Usually it's much, much finer-grained than need be. It contains a bunch of irrelevancies and dangling references that assume knowledge not there. Documenting is very, very hard; it's time-consuming. To do it right, you've got to do it like programming. You've got to deconstruct it, put it together in nice ways, rewrite it when it's wrong. People don't do that.

- Thompson: I think MIT has always had an inferiority complex over Unix.

- Even a big program, I'll say "main, left, right, print, hello." And well, "hello" isn't what I wanted out from this program. What's the first thing I want out, and I'll write that and debug that part. I'll run a program 20 times an hour that I'm developing, building up to it.

- Seibel: Another phase of programming is optimization. Some people optimize things from the very beginning. Others like to write it one way and then worry about optimizing it later. What's your approach?

- Ninety-nine percent of the time something simple and brute-force will work fine. If you really are building a tool that is used a lot and it has some sort of minor quadratic behavior sometimes you have to go in and beat on it. But typically not. The simpler the better.

- And if there's one thing that characterizes my code, it's that it's simple, choppy, and little. Nothing fancy. Anybody can read it.

- If you can really work hard and get some little piece of a big program to run twice as fast, then you could have gotten the whole program to run twice as fast if you had just waited a year or two.

- Plus, garbage collection fights cache coherency massively. And there's no garbage-collection algorithm that is right for all machines.

- Seibel: And are there development tools that just make you happy to program?Thompson: I love yacc. I just love yacc. It just does exactly what you want done. Its complement, Lex, is horrible. It does nothing you want done.

- That generates burnout. Excitement programming, I never ever felt stress. I've been in other situations too where deadlines-external deadlines-generate stress. That's not fun; I don't like that.

- Nothing much new has happened in computers that you couldn't have predicted. The last significant thing, I think, was the Internet, and that was certainly in place in '99. Everything has expanded-the speed of individual computers is still expanding exponentially, but what's different?

### Fran Allen (Compilers)

- In 2002 Allen was awarded the Turing Award for her "pioneering contributions to the theory and practice of optimizing compiler techniques," becoming the first female recipient in the 40-year history of the prize.

- I'm a very strong believer that one wants to be able to take the practice into identifiable algorithms, and theory, and ways of thinking about how to solve the problems and also to take the algorithms into practice to see how really valuable they are, and how they apply. I think our field is best done when it works on both sides on the same projects.

- People have been debating at least since Gerald Weinberg's book The Psychology of Computer Programming whether it's better for people to "own" code, so they take responsibility for it, or to have people work more collaboratively so you avoid having silos that only one person understands. It sounds like you thought dividing up the ownership was the way to go?

- One of the difficulties of the kind of technical management that you were doing is finding the balance between having your own technical opinions about how stuff should be done and giving people room to put their own ideas in.

- That's kind of a basic threshold for me. And it doesn't matter whether it has anything to do with programming or computers. If they can't get enthusiastic about something, they're not going to get charged up in a group.

- What I do do, though, is encourage a young person starting out to not jump into becoming a manager, which is very tempting for people who have a talent in that direction. Get a reputation for technical work. Whether it's a nice piece of science, an algorithm, or writing great code-whatever it is, establish a strong reputation there first. That'll serve you well if you do want to go to managing projects and so forth, to have learned the discipline of what it takes to do that and how to function in that way.

- Also, I rely on what other people think. I've been wrong plenty and it's a real learning experience when I find myself thinking more highly of somebody than the group does. If you have a good group, it's a very good way of sorting out who's doing good work.

- The motivation for the design of C was three problems they couldn't solve in the high-level languages: One of them was interrupt handling. Another was scheduling resources, taking over the machine and scheduling a process that was in the queue. And a third one was allocating memory. And you couldn't do that from a high-level language. So that was the excuse for C.

- By 1960, we had a long list of amazing languages: Lisp, APL, Fortran, COBOL, Algol 60. These are higher-level than C. We have seriously regressed, since C developed. C has destroyed our ability to advance the state of the art in automatic optimization, automatic parallelization, automatic mapping of a high-level language to the machine. This is one of the reasons compilers are ... basically not taught much anymore in the colleges and universities.

- I saw some history recently, that IBM's diversity policies go back to 1899, just consistently, all through these periods when there wasn't much attention being paid to that-very explicit policies.

- We tend to think of creativity as a special gift that a person has, just as being able to read and write were special gifts in the Dark Ages-things only a few people were able to do. I found the idea that computers are the enablers of creativity very inspiring.

### Bernie Cosell (PDP-I)

- I did something that they hadn't done-it was one of the things that I got known for around BBN, which is, I made things work.
                
- One other thing I think schools can do is the stuff that's in Knuth. I'm surrounded by people who think linked lists are magic. They don't know anything about the 83 different kinds of trees and why some are better than others. They don't understand about garbage collection. They don't understand about structures and things.

- What you wanted to do with a design review was double-check that the parts that he thought he had right he did have right and potentially give him some insight on the parts that he didn't. Once I apprehended that-I was only like 20 or 2I-that seemed so obviously right, such an obvious good use of the senior talent doing the review.

- I have a couple of rules that I try to impress on people, usually people fresh out of college, who believe that they understand everything there is to know about programming. The first is the idea that there are very few inherently hard programs. If you're looking at a piece of code and it looks very hard-if you can't understand what this thing is supposed to be doing-that's almost always an indication that it was poorly thought through. The other rule is to realize that programs are meant to be read. You don't get credit because the program works. We're going to the next level. Working programs are a given.

- "You don't get credit because the program works. We're going to the next level. Working programs are a given"

- So he saw what happens when one very intense, very good programmer doesn't segment it down. You get one very long program-it's not that the program was spaghetti code but there were just so many levels of complexity in this one linear suite. He almost pissed me off because, as I say, he went over my head to demand that the department had to have standards to not allow that thing to happen.

- The only place I tend to put comments in my code is when my instinct says, "This particular piece of code, even though it works, doesn't clearly state what I'm trying to accomplish."

- When you have to fix a bug in a program you never, ever fix the bug in the place where you find it. My rule is, "If you knew then what you know now about the fact that this piece of code is broken, how would you have organized this piece of the routine?"

- So when they ask, "How long is it going to take you to put this change in?" you have three answers. The first is the absolute shortest way, changing the one line of code. The second answer is how long it would be using my simple rule of rewriting the subroutine as if you were not going to make that mistake. Then the third answer is how long if you fix that bug if you were actually writing this subroutine in the better version of the program. So you make your estimate someplace between those last two and then every time you get assigned a task you have a little bit of extra time available to make the program better. I think that that makes an incredible difference. It makes for programs that evolve cleanly.

### Donald Knuth (The Art of Computer Programming, TeX)

- I couldn't teach classes full-time and write software full-time. I could teach classes full-time and write a book full-time but software required so much attention to detail. It filled that much of my brain to the exclusion of other stuff.

- Literate programming is based on this idea that the best way to communicate is to say things both informally and formally that are related.

---

_This is #66 in a series of book reviews published weekly on this site._
