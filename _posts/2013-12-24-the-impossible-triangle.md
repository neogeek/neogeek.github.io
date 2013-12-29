---
layout: post
title: The Impossible Triangle
image: /images/posts/the-impossible-triangle/impossible-triangle.jpg
year: 2013
---

![impossible-triangle](/images/posts/the-impossible-triangle/impossible-triangle.jpg)

I don't consider myself the artistic type. I'd like to be, but my mind works in a more programatic way. The anxiety of making a mistake while drawing with pen and paper or the difficulty of using the pen tool to draw _extactly_ what I see in my mind is often too great for me to create.

So when I did have the drive to create something, I utilized the tools most familiar to me. Sublime Text and bash.

The [impossible triangle](http://en.wikipedia.org/wiki/Penrose_triangle) and the art of Brazilian artist Romero Britto are both such major inspirations in my life I wanted to create something that not only captured the essence of these two inspirations but presented them in my own way.

##SVG

Vector seemed like the natural choice for a project like this, and what better to draw in vector than with SVG. I ended up drawing by hand in Sublime Text as it felt the most natural way for me to create.

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">

	<pattern id="pattern1" width="50" height="50"
		patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">

		<rect width="50" height="50" fill="#6fcee4" />

		<circle cx="25" cy="25" r="20" fill="#5987c3" />

	</pattern>

	<rect width="100%" height="100%" fill="url(#pattern1)" />

</svg>
```

![pattern1](/images/posts/the-impossible-triangle/pattern1.jpg)

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">

	<pattern id="pattern2" width="50" height="50"
		patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">

		<rect width="50" height="50" fill="#ca2e93" />

		<rect y="25" width="50" height="25" fill="#a40233" />

	</pattern>

	<rect width="100%" height="100%" fill="url(#pattern2)" />

</svg>
```

![pattern2](/images/posts/the-impossible-triangle/pattern2.jpg)

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">

	<pattern id="pattern3" width="50" height="50"
		patternUnits="userSpaceOnUse" patternTransform="rotate(45)">

		<rect width="50" height="50" fill="#fff001" />

		<rect y="25" width="50" height="25" fill="#f78934" />

	</pattern>

	<rect width="100%" height="100%" fill="url(#pattern3)" />

</svg>
```

![pattern3](/images/posts/the-impossible-triangle/pattern3.jpg)