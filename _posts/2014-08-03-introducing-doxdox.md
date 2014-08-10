---
layout: post
title: Introducing doxdox
description: Managing documentation can be a tedious task, especially if you want to keep it usable and easy to read. While working on [Facade.js](http://facade.js/) I built a Python script for converting JSON files exported from [dox](https://github.com/visionmedia/dox), a jsdoc parser for JavaScript, into formatted HTML. Today I re-released that library in the form of a node.js package complete with dox included.
keywords: nodejs
year: 2014
---

To get started, ensure that your script is utilizing the [jsdoc](http://usejsdoc.org) format properly. Below is an excerpt from core Facade.js:

```javascript
/**
 * Creates a new Facade.js object with either a preexisting canvas tag or a unique name, width, and height.
 *
 *     var stage = new Facade(document.querySelector('canvas'));
 *     var stage = new Facade('stage', 500, 300);
 *
 * @property {Object} canvas Reference to the canvas element.
 * @property {Object} context Reference to the <a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D" target="_blank">CanvasRenderingContext2D</a> object.
 * @property {Integer} dt Current time in milliseconds since last canvas draw.
 * @property {Integer} fps Current frames per second.
 * @property {Integer} ftime Time of last canvas draw.
 * @param {Object|String?} canvas Reference to an HTML canvas element or a unique name.
 * @param {Integer?} width Width of the canvas.
 * @param {Integer?} height Height of the canvas.
 * @return {Object} New Facade.js object.
 * @public
 */
 ```

Then install doxdox using `npm`:

```bash
$ npm install doxdox -g
```

Once installed, display the help command to become more familiar with functional offerings of doxdox:

```bash
$ doxdox --help
```

```bash
 Usage: doxdox <file> [options]

 Options:

  -h, --help        Display this help message.
  -v, --version     Display the current installed version.
  -t, --title       Sets title.
  -d, --description Sets description.
  -l, --layout      Template to render the documentation with.
  -o, --output      File to save documentation to. Default to stdout.

 Available Layouts:

  - Bootstrap (default)   (http://getbootstrap.com/)
  - Markdown          (http://daringfireball.net/projects/markdown/)
```

Finally, run the following command to generate documentation (replace `facade.js` with your own filename).

```bash
$ doxdox facade.js > ~/Desktop/documentation.html
```

Now you will have a nicely formatted HTML document containing documentation for your project! You can see a live demo of what this will look like at <http://docs.facadejs.com/>.
