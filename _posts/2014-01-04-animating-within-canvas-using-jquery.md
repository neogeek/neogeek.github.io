---
layout: post
title: Animating Within Canvas Using jQuery
subtitle: Making animating within canvas easy using jQuery.
year: 2014
---

If you are like me and completely enamoued with HTML 5's canvas tag you have at one point or another setup animations for entities drawn in canvas.

Recently I was exploring simple ways of animating entities in canvas and happened upon this trick with the jQuery animate method.

```javascript
var box = { _x: 0, _y: 0 };
$(box).animate({ _x: 100 }, 500, 'swing');
```

Be aware, the use of an underscore in front of each key is required as the object passed to animate is not a valid DOM object.