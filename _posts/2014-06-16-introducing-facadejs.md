---
layout: post
title: Introducing Facade.js
description: Over two years ago I set out to build a game with HTML5 canvas and other emerging technologies like the GamePad API, localStorage and ApplicationCache. What I built instead was a JavaScript library for drawing shapes, text and images in HTML5 canvas.
keywords: html5 canvas javascript
year: 2014
---

## Development

Development on Facade.js started as a game engine for the [GitHub Game Off](https://github.com/blog/1303-github-game-off) in November of 2012. The topic was loosely based around forking, branching and cloning (or forks, tree branches and clones). The game concept I arrived at was to be a simple point and click adventure based on a discarded robot and his journey to find purpose.

Soon after starting I realized that I had not built a game engine, but instead built a solid wrapper around the HTML5 canvas 2d context API. I took what I had built and turned it into a stand alone library called Facade.js.

Two years, three rewrites and ±500 commits later I finally have something I am ready to share.

## Goals

Below are the goals that I set in place for Facade.js after the initial version was completed. The concept of breaking out additional non-core functionality into plugins was a day-one decision as I knew that without it there would be insurmountable feature creep.

- The first and foremost goal of Facade.js is to provide a simple API for making reusable shape, text and image objects for use within HTML5 canvas.
- Second is for this library to have a very small footprint.
- Third is that the codebase should be easily digestible for referential and educational purposes.
- Fourth is that Facade.js is easily extensible through the use of third party built plugins. These plugins should fill in the gaps that aren't covered by core functionality.

## Community

Many popular libraries have vibrant communities and anyone who has developed a library can only hope that their contribution will have a similar impact on the open source community.

Again, from day one I built Facade.js around the concept of supporting additional functionality through the use of third-party plugins. Because of this I wanted to create a way for users of Facade.js and plugin developers alike to be able to search through and register plugins in a centralized place.

Shortly after the first public release of Facade.js I launched the [Facade.js plugins registry](http://plugins.facadejs.com/). Currently the only way to register plugins through this site is to contact me directly at [%email%](#email).
