---
layout: post
title: The Impossible Triangle
image: /images/posts/the-impossible-triangle/impossible-triangle-header.jpg
year: 2014
---

![impossible-triangle](/images/posts/the-impossible-triangle/impossible-triangle-header.jpg)

I don't consider myself the artistic type. I'd like to be, but my mind works in a more programatic way. The anxiety of making a mistake while drawing with pen and paper or the difficulty of using the pen tool to draw _extactly_ what I see in my mind is often too great for me to create.

So when I did have the drive to create something, I utilized the tools most familiar to me; SVG and ImageMagick.

The impossible triangle and the art of Brazilian artist Romero Britto are both such major inspirations in my life I wanted to create something that not only captured the essence of these two inspirations but presented them in my own way.

##SVG

###Paths

First step was to setup the triangle, which was easily achived by using multiple paths.

![path-steps](/images/posts/the-impossible-triangle/path-steps.png)

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1000">

	<rect width="100%" height="100%" fill="#79e0f9" />

	<g transform="translate(100, 100)">

		<g stroke="black" stroke-width="15" fill="none">

			<path d="M392 0 L532 0 L906 666
					 L844 796 L70 796 L4 666 Z" />
			<path d="M392 0 L701 532 L339 532
					 M906 666 L264 666 L450 332
					 M70 796 L392 234 L570 532" />

		</g>

	</g>

</svg>
```

###Patterns

The next step was to create each of the patterns that would be used to fill each of the three parts of the triangle.

![pattern1](/images/posts/the-impossible-triangle/pattern1.jpg)

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

![pattern2](/images/posts/the-impossible-triangle/pattern2.jpg)

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

![pattern3](/images/posts/the-impossible-triangle/pattern3.jpg)

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

###Clipping Paths

The last step was to create the clippings paths that would be applied to each one of the patterns.

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1000">

	<defs>

		<clipPath id="part1">

			<path d="M392 0 L701 532 L339 532
					 L262 666 L906 666 L532 0 L392 0 Z" />

		</clipPath>

		<clipPath id="part2">

			<path d="M392 0 L701 532 L570 532
					 L392 234 L70 796 L4 666 L392 0 Z" />

		</clipPath>

		<clipPath id="part3">

			<path d="M392 234 L70 796 L844 796 L906 666
					 L264 666 L451 331 L392 234 Z" />

		</clipPath>

		<!-- ... -->

		<g style="clip-path: url(#part1);">
			<rect width="100%" height="100%" fill="url(#pattern1)" />
		</g>

		<g style="clip-path: url(#part2);">
			<rect width="100%" height="100%" fill="url(#pattern2)" />
		</g>

		<g style="clip-path: url(#part3);">
			<rect width="100%" height="100%" fill="url(#pattern3)" />
		</g>

		<!-- ... -->

	</defs>

</svg>
```

###Completed

![final](/images/posts/the-impossible-triangle/impossible-triangle.jpg)

```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="1000">

    <defs>

        <clipPath id="part1">

            <path d="M392 0 L701 532 L339 532
                     L262 666 L906 666 L532 0 L392 0 Z" />

        </clipPath>

        <clipPath id="part2">

            <path d="M392 0 L701 532 L570 532
                     L392 234 L70 796 L4 666 L392 0 Z" />

        </clipPath>

        <clipPath id="part3">

            <path d="M392 234 L70 796 L844 796 L906 666
                     L264 666 L451 331 L392 234 Z" />

        </clipPath>

        <pattern id="pattern1" width="50" height="50"
            patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">

            <rect width="50" height="50" fill="#6fcee4" />

            <circle cx="25" cy="25" r="20" fill="#5987c3" />

        </pattern>

        <pattern id="pattern2" width="50" height="50"
            patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">

            <rect width="50" height="50" fill="#ca2e93" />

            <rect y="25" width="50" height="25" fill="#a40233" />

        </pattern>

        <pattern id="pattern3" width="50" height="50"
            patternUnits="userSpaceOnUse" patternTransform="rotate(45)">

            <rect width="50" height="50" fill="#fff001" />

            <rect y="25" width="50" height="25" fill="#f78934" />

        </pattern>

    </defs>

    <rect width="100%" height="100%" fill="#79e0f9" />

    <g transform="translate(100, 100)">

        <g style="clip-path: url(#part1);">
            <rect width="100%" height="100%" fill="url(#pattern1)" />
        </g>

        <g style="clip-path: url(#part2);">
            <rect width="100%" height="100%" fill="url(#pattern2)" />
        </g>

        <g style="clip-path: url(#part3);">
            <rect width="100%" height="100%" fill="url(#pattern3)" />
        </g>

        <g stroke="black" stroke-width="15" fill="none">

            <path d="M392 0 L532 0 L906 666
                     L844 796 L70 796 L4 666 Z" />
            <path d="M392 0 L701 532 L339 532
                     M906 666 L264 666 L450 332
                     M70 796 L392 234 L570 532" />

        </g>

    </g>

</svg>
```

##Converting SVG to JPEG

After the image was completed I converted it from SVG to JPEG with the following command.

**Note:** ImageMagick must be installed with the RSVG flag enabled as the built-in SVG conversion has issues. Installation instructions can be found in my article [PHP & ImageMagick](/articles/php-and-imagemagick/#macports-instructions)

```bash
convert impossible-triangle.svg impossible-triangle.png
```