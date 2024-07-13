---
title: "Productivity Tips, Vol 1"
description: "Individual Contributor version"
date: "2024-07-05"
categories: ["Tech"]
published: true
---

As I moved away from an Individual Contributor role at work in 2021, multiple teammates asked me to write a post on “Productivity Tips.” People noticed that I was doing things a bit differently, and they wanted to hear about my mental models that helped me stay productive — not just in terms of code or number of PRs, but also being on top of multiple initiatives, proposals, and discussions across various teams and volunteer groups without burning out.

I believe every software engineer should have a version of these tips in their toolkit. However, everyone is different when it comes to “productivity,” so do what works for you!

## 1. Async over Sync

Constant context switching is a productivity killer for you — you're not a server that has to respond to every request within 50ms. Treat yourself like a ticketing system or queue with SLAs in hours, if not minutes. Here's how I used to define my SLAs for incoming pings:

- **Incident** on my team, or a major L1 incident that I can help with: 1 sec (i.e., drop everything and fix it now!)
- **Teammate is blocked** (e.g., PR review) and just DM’ed you for help: 15 mins.
- **All other DMs and @mentions**: 1 hour.
- **High-priority** Slack channels (team channels, active projects, etc.): 2 hours.
- **Low-priority** Slack channels (group/org channels, projects on other teams, etc.): 1 day.
- **Email**: 1 day.
- **Reading Queue with 2-10 min reads:** 1 week.

This is also the core idea of "Getting Things Done" book — if something takes less than 2 minutes, do it right away; otherwise, queue it. I treat incoming asks as events in my priority queue and keep the bar to interrupt myself very high.

## 2. Deep Work vs. Shallow Work

Know which mode you’re in during a particular hour:

- **Shallow work:** Think of yourself as a multi-core CPU. This work “just needs to be done” and the focus is on quantity over quality. The work here ranges from admin tasks (e.g., clicking a button to give someone some access) to mildly engaging tasks (e.g., reviewing a 50-line PR). Group these tasks into a single “power hour” or a 30-min slots across your day.
- **Deep work:** This is where magic happens. Get “in the zone” and stay there for extended periods of time — at least an hour, ideally 2 hours or more. This is for “important, but not urgent” work that you just need to go heads down on. Schedule “Focus blocks” on your calendar to make time for this and minimize distractions.

**The key takeaway is to be in one mode or the other**. Mixing the two means you're always in Shallow work mode, producing lower quality work or working outside regular hours to focus.

## 3. Track Time to Avoid Burnout

This is a radical tip, but worth sharing. What helps me avoid burnout is tracking exactly how many hours per week I’m working. Not just clock-in/clock-out into the office, but actual work time in front of my laptop, tracked to the minute via [Toggl Track](https://toggl.com/track/toggl-desktop/).

Burnout for me occurs when:

1. I don’t have time for things I value the most (e.g., family, fitness, etc.)
2. I don't know if I’m working to my fullest potential, i.e., I don’t know the ROI (Return on Investment) for the time I’m putting in at work. In the `ROI = Impact/Effort` equation, I usually know the `Impact`, but over time, I realized that I tend to over-estimate the `Effort` if I’m not tracking it, thereby leading to an inner feeling of low ROI, even when it’s high.

Thus, tracking time has helped me in three ways:

1. It gives me permission to switch off when I’ve done “enough” in a week. If I’ve spent more than [xx] hours at work by Friday afternoon (eg., got pulled into multiple incidents over the week at odd hours), I’ll switch off a little earlier if possible, and avoid picking up the laptop until Sunday when the next week starts.
2. It helps me visualize weeks or months when I’m pushing hard and ensure I follow those periods with a vacation or just slow down for a week or two. Personally, fully turning off with a vacation is easier for me than “slowing down”, but again, do what works for you.
3. It makes me realize when I’m not spending time effectively. You can’t improve what you don’t measure, and tracking my time at work helps me stop “[snacking](https://lethain.com/work-on-what-matters/)”, i.e., spending time on things that don’t matter just to _feel_ productive.

## 4. Don't Be a Purist

Engineers are interesting people with well-formed ideas and opinions. Especially opinions. It’s not hard to find “purists” in one aspect or the other at work (eg., ”I only use vim” or “I only use emacs” or even “I only use command line git”, and so on).

I try not to be a purist when it comes to tooling, and tend to try out a lot of tools and pick the best one for whatever I need to do in the moment. For example, I switched to using Github Desktop app for _certain_ parts of git that were just easier/faster to perform using a GUI + shortcuts, just to keep my mental bandwidth focused on the actual task I’m trying to do, instead of using it to recall and correctly type each git command. Later on, when we adopted Graphite, I instantly switched back to its `gt` command-line based workflows.

## 5. Use the CICD to save yourself time

In mature engineering projects, you'd expect a CICD system where you push a commit and automated build and tests run. I’ve found that there are times when you can leverage this to speed yourself up for those “risk-free” 1-line (or even 10-line) changes in other teams’ codebases that you need to get out to unblock yourself.

I’ve seen developers run a whole test suite on a new service/codebase from scratch for diffs like these — yes, do that in the background, but also push the commit and open a draft PR so that you start running the build on CICD even before tests on your own machine are done. You’ll likely end up with both set of tests passing in parallel, instead of doing this serially and taking twice the time :)

---

That’s a wrap! Writing a post like this feels a bit of a _meaningless_ exercise, since I can never cover every single productivity tip/trick (i.e., poor “recall”), as well as what I might suggest here might actually be pretty obvious to the reader (i.e., poor “precision”). So if you found even one of the five tips new or interesting, try it out, and let me know how it worked for you!
