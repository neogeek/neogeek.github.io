---
title: Dear Scott, I heard you were learning how to program.
subtitle: Advice for my former self, back when I was learning how to program. Or for anyone else on a similar journey.
date: 07/11/2024
draft: true
---

I've been programming for the better part of 20 years. When I first started learning how to do any coding, in my case, HTML, I was also learning how computers worked. I had experience launching games from DOS but didn't know how to work with the file system when referencing an image via a path. I figured it all out eventually, of course. It was certainly an interesting time to learn.

Knowing what I know now, I have a few tips and tricks for myself. However, sharing this advice might have stifled my learning process, as I tend to thrive when I'm struggling to understand something, which I did a lot of. So much struggling. 😬

I thought I would share a few things with the void that I try to keep in mind. Both for myself and anyone I find myself helping down the path of learning how to program.

## It's OK to use an existing library

Most people won't have an issue with this. I might be one of dozens of people with this issue. I often find myself wanting to rebuild something from scratch instead of using an existing library. I did this back when JQuery came out. I did it again when I started to build games in JavaScript, and I continue to do it in Unity. Using an existing library can rob you of learning how something truly works, but it will get you where you need to go faster.

## Learn how to write unit tests

This is a big one. I love writing tests now. I can't even believe I used to work without them. This one would have saved time and frustration. Tests can be great insurance if you build them correctly. I start building them right away in most of my projects, even adding one that checks to see if the tests can run correctly in the environment I'm working in. That way, I have no excuse for writing one when an opportunity arises.

## Learn how to write good documentation

I don't write inline comments unless the line I'm commenting on code one might consider dark magic where there is no way to prevent that (which could be an indication of another problem). What I do write is comprehensive README files. Like inline comments, these can get out of date, so it would have been good for me to learn how to write these early on and build them into my typical flow so it would feel more like second nature. I also like to write function block header comments. They are useful when using a text editor that shows them in a tooltip when using the function somewhere else.

## Step away when you are stuck

I've been guilty of not doing this more often than I'd like to admit. Usually, stepping away and doing something else results in enough time away from the problem that you can revisit it with new eyes or come back with a solution. Taking a shower, going for a walk, playing a video game, or even just working on another part of the same project can give you enough distance to help you revisit the problem with a fresh set of eyes.

## Get a desk duck

This one might feel silly, and it can be. But I have things on my desk that I use as reminders to talk out when I have a problem rather than try to solve something directly. You don't have to talk to it, but if it helps, go for it. Just don't do it if you work in an office. You have coworkers you could use to talk out things instead.

## Keep it simple stupid

If you can overcomplicate it, you can also just not. If you think you need to do this, or this, and that, you might need something else. And while that something else might not be evident at the time, taking the time to think about why it's overly complicated might present a simple solution.

## Use version control for EVERYTHING

Not sure why this one is not at the top, but just do it. Even if the repository is just local, commit to it when you have something working, not just at the end of the day. Use real commit messages. If it's something you want to keep, push it to GitHub, Bitbucket, or GitLab.

## Use code auto-formatting tools

Prettier, editor config, etc. Pick one for your workflow and use it. Even if it doesn't feel right at first, just use it. Soon, you won't believe you ever worked without it. And when you work on a team, it gets even better because you now all code in the same format. Perfect.

## Try not to ask for help right away

This one might be a bit controversial, but I believe if you ask for help right away, you will never learn. I see countless posts on Reddit these days from people asking stupid questions seconds after they run into an issue. My recommendation is this: if you run into a bug or a syntax error, try to figure out **what** is wrong.
