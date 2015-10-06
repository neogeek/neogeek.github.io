---
layout: post
title: respond2png
description: While building a responsive site recently I experimented with capturing device specific screenshots using Grunt and webkit2png. To make things easy to manage in Grunt I placed all my commands into a simple bash script that accepted one parameter for the website URL.
keywords: bash responsive screenshots webkit2png
---

```bash
#!/bin/bash

webkit2png --scale=1 --width 320 -o "iPhone-Portrait" $1
webkit2png --scale=1 --zoom 2 --width 320 -o "iPhone-Portrait@2x" $1

webkit2png --scale=1 --width 568 -o "iPhone-Landscape" $1
webkit2png --scale=1 --zoom 2 --width 568 -o "iPhone-Landscape@2x" $1

webkit2png --scale=1 --width 768 -o "iPad-Portrait" $1
webkit2png --scale=1 --zoom 2 --width 768 -o "iPad-Portrait@2x" $1

webkit2png --scale=1 --width 1024 -o "iPad-Landscape" $1
webkit2png --scale=1 --zoom 2 --width 1024 -o "iPad-Landscape@2x" $1
```

I realized that with very little work I could make this into a simple command line script that, through the use of flags and parameter, could be a useful addition to my toolset.

I have open sourced [respond2png](https://github.com/neogeek/respond2png) on GitHub and can be installed with one simple command. respond2png captures both iOS and Android device sizes in both 1x and 2x (retina) formats.

```bash
$ respond2png --ios --retina http://localhost/
```
