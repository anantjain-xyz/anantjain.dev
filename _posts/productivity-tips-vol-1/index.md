---
title: "Productivity Tips, Vol 1"
description: "Individual Contributor version"
date: "2024-07-05"
categories: ["Tech"]
published: true
---

As I moved away from an Individual Contributor role at work in 2021, I was asked to write a post or present a talk on “Productivity Tips.”

People noticed that I was doing things differently, and they wanted to hear about my mental models that helped me stay productive — not just in terms of raw code or PRs, but also being on top of multiple initiatives, proposals, and discussions across various teams without burning out.

I believe every software engineer should have a version of these tips in their toolkit. Remember, everyone is different when it comes to “productivity,” so do what works for you!

## 1. Async over Sync

As a developer, understand that you're not a server that has to respond to every request within 50ms. Constant context switching is a productivity killer.

Treat yourself like a ticketing system with SLAs in hours, if not minutes. Here's how I used to define my SLAs for incoming pings:

- **L1/L2 incident** on my team, or L1 incident that I can help with (e.g., dashboard is down!): 1 sec (i.e., drop everything and fix it now!)
- **Teammate is blocked** (e.g., PR review) and just DM’ed you for help: 15 mins.
- **All other DMs and @mentions**: 1 hour.
- **High-priority** Slack channels (team channels, active projects, etc.): 2 hours.
- **Low-priority** Slack channels (group/org channels, projects on other teams, etc.): 1 day.
- **Email**: 1 day.
- **Reading Queue with 2-10 min reads:** 1 week.

When working with large code bases, you'll encounter things that take more than a few seconds (e.g., running tests or pre-commit checks locally). When you’re waiting on something, it's easy to go back to Slack to check out what’s going on, or go read that next doc on your reading queue.

This idea is also in the "Getting Things Done" book — if something takes less than 2 minutes, do it right away; otherwise, queue it. I treat incoming asks as events in my priority queue and keep the bar to interrupt myself very high.

## 2. Deep Work vs. Shallow Work

Know which mode you’re in during a particular hour:

- **Shallow work:** Think of yourself as a multi-core CPU and multitask. This work “just needs to be done.” Focus on quantity over quality, from admin tasks (e.g., clicking a button to give someone some access) to mildly engaging tasks (e.g., reviewing a 50-line PR). Group this work into a single “power hour” or a 30-min slot in the middle of the day.
- **Deep work:** This is where magic happens. Get “in the zone” and stay there for extended periods (at least an hour, ideally 2 hours or more). This is your core job, and this is where “important, but not urgent” work happens. Schedule Focus blocks on your calendar to minimize distractions.

The key takeaway is to be in one mode or the other. Mixing the two means you're always in Shallow work mode, producing lower quality work or working outside regular hours to focus.

## 3. Track Time to Avoid Burnout

This is a radical tip, but worth sharing. What helps me avoid burnout is tracking exactly how many hours per week I’m working. Not just clock-in/clock-out, but actual work time tracked to the minute via [Toggl Track](https://toggl.com/track/toggl-desktop/).

Burnout for me occurs when:

1. I don’t have time for things I value the most (e.g., family, fitness, etc.).
2. I don't know if I’m working to my fullest potential. I might not know the ROI (Return on Investment) for my time. In the `ROI = Impact/Effort` equation, I usually know the `Impact`, but can lose track of my `Effort` if I’m not tracking it.

Thus, tracking time has helped me in three ways:

- It gives me permission to switch off when I’ve done “enough” in a week. If I’ve spent more than [xx] hours at work by Friday afternoon, I’ll switch off early if nothing pressing is happening, and avoid picking up laptop until Sunday when the next week starts.
- It helps me visualize weeks or months when I’m pushing hard and ensure I follow those periods with a vacation or just slow down for a week or two. Admittedly, fully turning off is easier for me than slowing down, but again, people work differently.
- It makes me realize how much time I’m not spending effectively. You can’t improve what you don’t measure, and this helps me stop “[snacking](https://lethain.com/work-on-what-matters/) at work” (spending time on things that don’t matter just to feel productive).

## 4. Don't Be a Purist

Engineers are interesting people with well-formed ideas and opinions. Especially opinions. It’s not hard to find “purists” in one aspect or the other at work (eg., ”I only use vim” or “I only use emacs” or even “I only use command line git”, and so on). I tend to try out a lot of tools all the time, and try to pick the best one for whatever I need to do.

For example, I switched to using Github Desktop app for certain parts of git that were just easier/faster to perform using a GUI, even if just to keep my mental bandwidth focused on the actual task I’m trying to do, instead of remembering or googling various git tricks.

## 5. Use the “Cloud” More

In mature engineering projects, you'd expect a CICD system. Push a commit, and automated tests run. I’ve found that there are times when you can leverage this to speed yourself up for those 1-line (or even 10-line) changes that “just fix one thing”.

I’ve seen developers try to run a whole test harness on a new service/codebase from a cold start for a quick change — do that in the background, but also push the commit and open a draft PR so that you start running tests on your PR even before tests on your own machine are done.

For simple changes, treating your laptop as just the authoring tool can work just fine.

---

That’s a wrap! Writing a post like this feels a bit of a meaningless exercise, since I can never cover every single productivity tip/trick (poor “recall”), as well as what I might suggest here might actually be pretty obvious to the reader (poor “precision”). So if you found even one of the five tips new or interesting, try it out, and let me know how it worked for you — there are more of these to warrant a Vol 2 of this post!
