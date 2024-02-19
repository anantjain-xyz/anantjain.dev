---
title: 'Leverage vs. Decoupling'
description: 'Thinking through tradeoffs is what makes software engineering so fun. Here’s an interesting one.'
date: '2022-07-04'
categories: ['Tech']
published: true
---

### Leverage

Your *managerial leverage* is your team's output divided by your team's size. To increase your managerial leverage, your team can do more with the same people or do the same with fewer people. You can do this by either:

-   increasing the productivity of the individuals or
-   increasing the leverage of the things they work on.

Let's consider the latter for this post. Assume your organization is in the middle of a long-running code migration (who isn't?) It could be a switch to microservices, a new framework, or a new pattern of writing code. In a well-managed, high-growth startup, it's hard to resource these migrations unless they also lead to an improvement for the customers. In other words, it's easier to work on projects where the work is leveraged --- make customers happier by shipping new features and make progress on a long-running migration "for free."

But, nothing is "free."

Rarely does increasing the leverage of work not expand the scope of the work. That's not necessarily bad --- if you can 2x the output for 1.5x the time investment, you're still net ahead.

Thus, we look for opportunities that "kill two birds with one (1.5x-sized) stone".

### Decoupling

Decoupling is a very good thing in software engineering. For this post, let's talk about a specific type of decoupling: between projects. It's easier and less risky to ship two one-month projects than one two-month project. There are very long lists of benefits of this elsewhere, but here are just a few:

1.  *Accurate scoping:* Smaller projects come with much better estimates. Larger projects come with fictitious, overly ambitious estimates.

2.  *Frequent wins:* Your team needs regular wins to stay motivated. Shipping something concrete to customers feels great---the more frequent, the better.

3.  *Reduce rollout risks:* Smaller changes are easier to test and roll back if things don't look right.

4.  *Rapid feedback:* It's easier to identify and address customer feedback on smaller changes. With a significant change, you may not know which part needs more work.

5.  *Makes teams nimble:* In high-growth startups, teams *need* to respond to changing priorities. The option to temporarily switch to a higher priority project between milestones makes teams agile.

In my experience, breaking a project into the tiniest possible milestones and shipping them every week (or day if you can!) leads to more successful projects.

This, however, brings us to a vexing question: instead of killing two birds with one (1.5x-sized) stone and increasing your team's *leverage*, would you rather kill two birds with two smaller stones, given all the benefits of *decoupling*?
