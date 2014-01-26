---
layout: post
title: iOS Device SVG Templates
image: /images/posts/ios-device-svg-templates/ios-device-svg-templates-themes.png
description: iOS Device SVG Templates is a new project for displaying iOS screenshots in themeable iOS devices.
year: 2014
---

Displaying screenshots of your application or responsive design in an iPhone just got easier! These SVG templates are incredibly easy to use on any website and only requires adding one `object` tag into your HTML per screenshot.

```html
<object type="image/svg+xml"
    data="iphone-5c-portrait.svg?screenshot=screenshot-portrait.png"
    width="300" height="600"></object>
```

##iPhone 5c

![screenshot](/images/posts/ios-device-svg-templates/ios-device-svg-templates-orientations.png)

The iPhone 5c is avalible in both portrait and landscape. Each image also includes the following color themes:

- iphone-5c-green (default)
- iphone-5c-blue
- iphone-5c-yellow
- iphone-5c-red
- iphone-5c-white

Themes can be added by use of the `theme` variable in the data attribute.

```html
<object type="image/svg+xml"
    data="iphone-5c-portrait.svg?screenshot=screenshot-portrait.png&amp;theme=iphone-5c-red"
    width="300" height="600"></object>
<object type="image/svg+xml"
    data="iphone-5c-landscape.svg?screenshot=screenshot-landscape.png&amp;theme=iphone-5c-red"
    width="600" height="300"></object>
```

[iOS Device SVG Templates at GitHub](https://github.com/neogeek/ios-device-svg-templates)