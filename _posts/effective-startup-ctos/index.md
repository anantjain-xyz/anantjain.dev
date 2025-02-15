---
title: "Measuring Your Performance as a Startup CTO (Seed/Series A Stage)"
description: "A framework to measure your performance in the earliest stages"
date: "2024-09-13"
categories: ["Tech"]
published: true
---

Measuring your performance as a Startup CTO at a Seed/Series A startup is a unique challenge. As the CTO[1], you're typically a founder driving direction and growth by talking to users and building something they want. You're both an individual contributor writing code every day and a "line Engineering Manager" directly responsible for the engineering team's management. While there are multiple career frameworks out there[2], ladders for individual contributors or engineering managers don’t capture this hybrid role.

After leading teams at Brex, I wanted to adapt the engineering career path to a CTO role. I admired our engineering leadership structure and wanted to emulate it in future roles.

The following is the rubric spanning five areas that I have been using in my own role — numerous other Seed/Series A CTOs I've talked to about this topic have found it tremendously useful too:

---

**A. Building something users want.** Timely delivery of solutions to real customer problems. Tying this to top-level company metrics has typically worked best for me. Some examples that I've used in the past:
1. ARR Growth
2. Net Revenue Retention Growth
In particular, it's more important to measure this by "customer love/obsession" (as measured by lack of churn or account expansion), and not just a top-level "vanity metric" like revenue growth.

---

**B. Technical Excellence**: Drive technical vision and strategy, promoting a culture of building **scalable, maintainable, and reliable** systems. While something like the [DX Core 4](https://getdx.com/research/measuring-developer-productivity-with-the-dx-core-4/) framework might work here, I've seen something as simple as DORA metrics to be more than sufficient at this stage:
1. Deployment Frequency (PRs shipped per engineer per week)
2. Lead time to deployment (Under 5 mins is good enough at this stage)
3. Change Failure Rate (SEV1/2 incidents per week per engineer)
4. Mean Time to Restore (Time to Detect / Time to Mitigate incidents)

---

**C. Technical Direction**: Shape the product and technical direction for the company. This is similar to bullet A, except on a longer time horizon. I like to measure this by assessing the quality of technical bets/decisions over a long time horizon. For example:
1. Technical bets that keep execution as fast as today a year from now.
2. Technical bets that simplify the tech stack or keep it simple a year from now.
3. Technical/Product bets that add a 10x competitive differentiation in a dimension that users care about (e.g., the ability to host your infrastructure on-premises for enterprises if your competitors don't support it).

---

**D. Recruiting and Growth**: Be the primary point person for sourcing, interviewing, closing, and retaining top engineering talent, as well as developing leaders. 
1. Engineering team growth, while maintaining a very high bar.
2. Engineering team retention (including non-regretted).

---

**E. Team Culture**: Accountable for the health of the engineering team. Drive growth, development, and calibration of all engineers.

1. Employee happiness (you can run monthly surveys, but usually this is quite subjective to measure at this stage).
2. Engineering team retention (including non-regretted).

---

In the future, I'll write another post with a lightweight career framework for founding engineers at a Seed/Series A startup.

[1] By CTO, I’m referring to the person who the engineering team reports to. In some startups, there’s a CTO (usually a cofounder) who is a better fit as the “chief architect” and hires a VP Engineering / Head of Engineering / etc. to actually manage and grow the team.

[2] [Progression.fyi](https://progression.fyi/) is a good resource for engineering career frameworks.