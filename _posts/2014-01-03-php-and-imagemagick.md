---
layout: post
title: PHP & ImageMagick
description: While the built-in PHP library GD is usually sufficient for modifying and/or creating images, it is always a good idea to cultivate multiple alternatives. ImageMagick is a command-line based utility which provides a multitude of functionalities from resizing to converting file formats. While not normally installed on most servers, it is easy to set up providing you have SSH access. The server specific instructions for setting up ImageMagick should be readily available through your hosting provider's control panel. This article will go over how to install ImageMagick locally (Mac instructions only) and basic PHP usage.
keywords: php imagemagick brew
---

## Initial Setup

### Brew Instructions

If you don't need to convert complex SVG graphics then installing using [Homebrew](http://brew.sh/) is recommended as you won't need to install extraneous dependencies.

```bash
$ brew update; brew install imagemagick
```

### MacPorts Instructions

**Notice:** Installing this way prevent accessing `convert` from PHP as it doesn't have the proper permissions.

If you need to convert complex SVG graphics (patterns, clipping paths) then you will need to install ImageMagic using MacPorts as it correctly supports the RSVG configuration. This will take much longer than the brew installation as there are many dependencies.

```bash
$ sudo port install ImageMagick +rsvg
```

To ensure that ImageMagic with the RSVG configuration was installed correctly run the following command and look for the flag `--with-rsvg`.

```bash
$ convert -list configure | grep rsvg
```

## PHP Setup

Next, add the following lines of PHP to the beginning of the file where you plan on utilizing ImageMagick.

```php
<?php

putenv('MAGICK_HOME=/usr/local');
putenv('PATH=' . getenv('MAGICK_HOME') . '/bin:' . getenv('PATH'));
putenv('DYLD_LIBRARY_PATH=' . getenv('MAGICK_HOME') . '/lib');
```

## Example Usage

```php
<?php

// Basic conversion from PNG to JPG
exec('convert avatar.png avatar.jpg');
// Resize to 100x100 (no cropping)
exec('convert avatar.png -resize 100x100 avatar_sm.png');
// Rotate 90°
exec('convert avatar.png -rotate 90 avatar_rotated.png');
// Resize & Crop to 100x100
exec('convert avatar.png -resize 100x100^ -gravity center -extent 100x100 avatar_sm.png');
```

## Conclusion

Now that you have ImageMagick setup in both the command line and in PHP, you can start to utilize it in future projects. It is recommended that when you use ImageMagick, you take into consideration the load it places on the server each time you convert, resize or rotate an image.
