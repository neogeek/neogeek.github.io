---
layout: post
title: Animating Canvas Entities With jQuery
subtitle: Making animating canvas entities easy with jQuery.
year: 2013
---

If you are like me and completely enamoued with HTML 5's canvas tag you have at one point or another setup animations for entities drawn in canvas.

Recently I was exploring simple ways of animating entities in canvas and happened upon this trick with the jQuery animate method.

```javascript
$({ _x: 0 }).animate({ _x: 100 }, 500, 'swing');
```

Be aware, the use of an underscore in front of each key is required as the object passed to animate is not a valid DOM object.