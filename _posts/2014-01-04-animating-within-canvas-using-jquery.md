---
layout: post
title: Animating Within Canvas Using jQuery
subtitle: Making animating within canvas easy using jQuery.
description: If you are like me and completely enamored with HTML 5's canvas tag you have at one point or another setup animations for entities drawn in canvas.
keywords: javascript canvas jquery
year: 2014
---

Recently I was exploring simple ways of animating entities in canvas and happened upon this trick with the jQuery animate method.

```javascript
var box = { _x: 0, _y: 0 };
$(box).animate({ _x: 100 }, 500, 'swing');
```

Be aware, the use of an underscore in front of each key is required as the object passed to animate is not a valid DOM object.

With the jQuery library you can set the easing of an animation to either linear or swing. However, if you also include jQuery UI you will have access to 30 additional types of easing (listed below).

- easeInQuad
- easeOutQuad
- easeInOutQuad
- easeInCubic
- easeOutCubic
- easeInOutCubic
- easeInQuart
- easeOutQuart
- easeInOutQuart
- easeInQuint
- easeOutQuint
- easeInOutQuint
- easeInExpo
- easeOutExpo
- easeInOutExpo
- easeInSine
- easeOutSine
- easeInOutSine
- easeInCirc
- easeOutCirc
- easeInOutCirc
- easeInElastic
- easeOutElastic
- easeInOutElastic
- easeInBack
- easeOutBack
- easeInOutBack
- easeInBounce
- easeOutBounce
- easeInOutBounce

To demonstrate how easy it is to use $.animate with canvas I put together this demo on [JSFiddle](http://jsfiddle.net/neogeek/z4VhV/).

<iframe width="100%" height="380" src="http://jsfiddle.net/neogeek/z4VhV/embedded/result,js/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>