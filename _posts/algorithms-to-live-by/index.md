---
title: "Algorithms to Live By"
description: "A book by Brian Christian and Tom Griffiths"
date: "2018-09-14T15:46:02.394Z"
categories: ['Book Review']
published: true
canonical_link: https://medium.com/@anant90/algorithms-to-live-by-book-review-77f53d63fa78
redirect_from:
  - /algorithms-to-live-by-book-review-77f53d63fa78
---

![](./asset-1.jpeg)

Whether you’re a computer science veteran, or just want to dip your toes into the fantastic world of algorithms, this book is for you. Being able to explain complex ideas in simple words is the hallmark of mastery of a subject, and Brian Christian and Tom Griffiths prove every bit of theirs in this book.

_Algorithms to Live By_ takes you on a journey of eleven ideas from computer science, that we, knowingly or not, use in our lives every day. I enjoyed this book a lot, so this review is going to be a long one.

#### 1\. Optimal Stopping

Imagine the following scenario: you have to hire a secretary from a pool of fixed applicants. You have to interview the candidates one by one and make a hire/no-hire decision right after each interview. If you pass on someone, you cannot come back to them. If you hire someone, the process stops and they are your new secretary. How do you maximize your chances to find the best secretary in the group? This is the famous S_ecretary Problem,_ and it forms the basis for the discussion in this chapter.

You probably don’t want to hire the first person you interview, since you don’t know what the baseline is. You don’t want to hire the last person either: you almost certainly have passed on your best candidate at this point. So the optimal strategy involves interviewing and rejecting the first few candidates no matter how good they are: just to set up the baseline first and then hiring the best you’ve seen so far after. This _optimal_ point turns out to be `1/e` or about 37%. Reject 37% of the applicants, and then hire the next one better than anyone you’ve seen so far. Variants of this _Secretary Problem_ and the accompanying _37% Rule_ apply to vast areas of real life too — from dating to parking your car to selling/buying a house: knowing when to stop looking is crucial. Before you get too excited, here’s the sobering bit: this optimal strategy fails 63% of the time.

#### 2\. Explore/Exploit

It’s Saturday and it’s your cheat day. Do you open Yelp and explore a new restaurant, or do you go back to the sandwich place you’ve been craving all week? Do you put on Spotify’s Daily Mix, or do you just go back to listening to your favorite albums? In other words, do you _explore_, or do you _exploit_? From A/B Testing websites to A/B Testing human drugs via clinical trials, software engineers and pharmaceutical companies alike are trying to figure out where the balance lies. In addition to discussing a number of strategies like “_Win-Stay, Lose-Shift”_ to win the slot machines on a casino floor (formally known as the [_multi-armed bandit problem_](https://en.wikipedia.org/wiki/Multi-armed_bandit)), this chapter will help you think better next time you have to pick between the latest or the greatest.

#### 3\. Sorting

Sorting algorithms are usually the first ones that any introductory Computer Science course covers. Topics discussed here go from the _Big O notation_ that serves as a yardstick for measuring the performance of algorithms, to the bouquet of sorting algorithms themselves: the _bubble_, _insertion_, _merge_ and _quick_ sorts. Moreover, sorting is prophylaxis for search: if you have your collection sorted, searching becomes a whole lot easier. The chapter ends with a discussion on tournaments of various types: _round-robin_, _ladder_, _single-elimination_ and so on. After all, tournaments are just another sorting problem, and so are the pecking orders and dominance hierarchies in the animal (and human) kingdom. Keeping things sorted just makes life easier.

#### 4\. Caching

Or, the memory hierarchy — and what to keep on top of your mind, and what to delegate to pen and paper or a Notes app. Any discussion on caching necessitates a look into various strategies for deciding what stays in a cache — strategies like _Random Eviction_, _First-In-First-Out_, _Least Recently Used_ and so on help. One thing I really liked here was how the _Least Recently Used_ can be effectively applied to a physical library: instead of putting the returned books back on the shelves, libraries could use them to create a cache section — after all, the books that were most recently borrowed are most likely to get borrowed again!

#### 5\. Scheduling

How do you get things done? How do you schedule your day? How do you arrange the tasks so that the most gets done in the least amount of time? Moreover, how do you handle a situation where a low priority task is blocking a higher priority task, and you’re just stuck in a _priority inversion_? This chapter was almost like revisiting a bunch of old friends from undergrad: you don’t think about _Preemption_ or _Thrashing_ in your day-to-day work much.

#### 6\. Bayes’s Rule

I’m assuming you already know Bayes’s Rule, but if you don’t, it’s just a simple way to determine how probable something `A`is given something else `B`has happened, usually denoted as `P(A|B)`. It’s assumed you have good information about the _priors_: how likely those two things are to happen independently, and you know how likely things are things to occur the other way: `B|A` I’ll just write it out. To get `P(A|B)`, multiply `P(B|A)`with `P(A)`and divide by `P(B)`. It’s really that simple. Just make sure your priors are good: a good reminder in this chapter was that exposure to just news and not much else serves to contaminate them, making us worse predictors of events.

The _Copernican Principle_, which dictates that a good prediction for how long something will last is to see how long it has already lasted, resurfaced in this chapter: it was also a key topic in [Antifragile](https://anantjain.dev/antifragile-things-that-gain-from-disorder-8a0e86257edb) that I reviewed last month: it applies to things that are antifragile (like books) and not to those that are not (like human lifespans).

On that note, the three basic probability distributions: Additive rule (_Erlang prior_), Multiplicative rule (_Power Law prior_), and Average rule (_Normal prior_) are explained in this chapter in a very elegant and easy-to-read prose. [_Writing across curriculum_](https://anantjain.dev/writing-to-learn-9ed157c4fe4a) should really be mandated, and I was impressed to read about these ideas without a single mathematical equation or graph.

#### 7\. Overfitting

This chapter is focussed on the case against complexity, and on keeping your models as simple as possible: not only they work better, but one can argue that simplicity should be a goal in itself. Folks in Machine Learning would love the discussion of ideas around _cross-validation_ (hold some of your data back to test later that your learned model _generalizes_ well, that it doesn’t just _overfit_ your training data), _regularization_ (penalize your models for complexity: so that simplicity is a part of the goal), _early stopping_ and so on.

#### 8\. Relaxation

The perfect is the enemy of the good, so it’s okay to just relax and let it slide once in a while. A large class of problems in Computer Science, known as _NP-Hard Problems,_ are intractable. For any realistic dataset, we have no way to compute a perfect solution in any reasonable amount of time. The most famous example of this is the _Travelling Salesman Problem_: figure out a route that a salesman should travel to visit all his stops with the least distance covered: the possibilities here are way too many to consider one by one. Relaxing the constraints and solving a similar, but an easier problem seems to be the solution. Any optimization problem has two parts — the rules and the scorekeeping. It may be worth violating the rules sometimes and take a hit on the score as long as it keeps you moving ( this is actually called _Lagrangian Relaxation_).

#### 9\. Randomness

Randomness is another thing that works when nothing else works. Starting with the _Monte Carlo Method_, this chapter talks about _Randomized Algorithms_ — and you have to love this part of Computer Science since this is where things stop being so exact. Not only that, _Randomness_ can save you in _Optimization_, making sure you don’t get trapped in a _local minimum_ while _hill climbing_ your way. I really loved how this chapter ended with a discussion on randomness, evolution, and creativity. After all, you can make a case that all art stems out of some form of randomness.

#### 10\. Networking

_Packet Switching, ACKnowledgements, triple handshakes, exponential backoff_ and the algorithms of forgiveness: networking is another topic full of gems. Connecting people is one of the most fundamental and impactful areas of Computer Science — we’re talking about the internet here. How to control the flow, how to avoid congestions (_Additive Increase, Multiplicative Decrease_), how to establish Backchannels (and the role of white noise and little acknowledgments in everyday real-life conversations!), and how to avoid _bufferbloats_: these are some of the topics that are part of any Computer Networking class, but it was great to see them in a new light.

#### 11\. Game Theory

_The Prisoners Dilemma_: the paradox where two individuals acting in their own self-interest does not result in the optimal outcome. Succinctly, think of two prisoners being interrogated by a detective: if they rat each other out, they both have to serve time in the prison, but if only one rats the other out, he gets to walk away free while the other one goes behind the bars. If they both stay loyal to each other, both of them walk away free: but this optimal outcome will never be reached if both the prisoners act in their self-interest — which is something you would expect them to do.

This is the core problem used to introduce anyone to Game Theory: the beautiful field of Nash Equilibria, Dominant Strategies, Tragedy of the Commons and infinite recursions of getting into each other’s minds. The panacea: if you’re trapped in a game that lends itself to paradoxical incentives, change the game: set the rules so that there’s no incentive to act any other way. Have the mafia waiting outside the prison so that the one who rats his comrade is found getting eaten by the fish at the bottom of the local lake the next day. From poker to auctions, especially ad auctions that form the basis of the internet economy today (think Google and Facebook), Game Theory is another field of computer science/math that you cannot miss to explore!

---

Overall, I was left marveling at the authors’ ability to boil ideas from Computer Science down to their very core. This book is the perfect first introduction to this vast and beautiful field, and should be a required reading for any CS101 course. In some sense, it was a mini re-education for me too, and taught me a lot about how to talk about and teach Computer Science.

If this post piqued your interest and you want to learn algorithms, I can’t help but self-promote this course:

[**Learn Algorithms and Data Structures | Commonlounge**  
_This 26-part course consists of tutorials on algorithms and data structures. It alternates between tutorials and…_www.commonlounge.com](https://www.commonlounge.com/discussion/d4a14f601eb44281b6c579e73d126cca "https://www.commonlounge.com/discussion/d4a14f601eb44281b6c579e73d126cca")[](https://www.commonlounge.com/discussion/d4a14f601eb44281b6c579e73d126cca)

…and, if you liked the ideas in the _Machine Learning_ part and want to dive deeper, check this one out:

[**Learn Machine Learning | Commonlounge**  
_This 29-part course consists of tutorials on ML concepts and algorithms, as well as end-to-end follow-along ML…_www.commonlounge.com](https://www.commonlounge.com/discussion/35ccdb70826e434a876d612504297232 "https://www.commonlounge.com/discussion/35ccdb70826e434a876d612504297232")[](https://www.commonlounge.com/discussion/35ccdb70826e434a876d612504297232)

_This is #36 in a series of book reviews that I write every week._

![Sorting. Caching. By [Ugur Akdemir](https://unsplash.com/@ugur)](./asset-2.png)
