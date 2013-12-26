---
layout: post
title: PHP & ImageMagick
---

While the built-in PHP library GD is usually sufficient for modifying and/or creating images, it is always a good idea to cultivate multiple alternatives. ImageMagick is a command-line based utility which provides a multitude of functionalities from resizing to converting file formats. While not normally installed on most servers, it is easy to set up providing you have SSH access. The server specific instructions for setting up ImageMagick should be readily available through your hosting provider's control panel. This article will go over how to install ImageMagick locally (Mac instructions only) and basic PHP usage.

##Initial Setup

First you must download and extract the latest version of ImageMagick from the project's website into /Library. Then rename ImageMagick-X.X.X/ to ImageMagick/, facilitating seamless future updates.

##Terminal Setup

**Note:** This next step can be skipped providing you do not plan on using ImageMagick from the command line.

Next you will edit your .bash_profile file located in your home directory by entering the text below into a Terminal window.

```bash
vim ~/.bash_profile
```

Once you hit enter, if the .bash_profile file doesn't exit, an empty document will appear. If the file does exist, place your cursor at the end of the document. When your cursor is in place, press the i key to enter insert mode and paste the following code into the file.

```bash
#ImageMagick Setup
export MAGICK_HOME=/Library/ImageMagick
export PATH=$MAGICK_HOME/bin:$PATH
export DYLD_LIBRARY_PATH=$MAGICK_HOME/lib
```

To commit the changes and exit, press esc then type :wq and hit enter. Then close and reopen Terminal, thus causing the .bash_profile file to execute.

To commit the changes and exit, press esc then type :wq and hit enter. Then close and reopen Terminal, thus causing the .bash_profile file to execute.

```bash
convert -version
```

The resulting output should look something similar to the output below.

```bash
Version: ImageMagick 6.7.9-2 2012-08-25 Q16 http://www.imagemagick.org
Copyright: Copyright (C) 1999-2012 ImageMagick Studio LLC
Features: OpenMP OpenCL
```

##PHP Setup

Next, add the following lines of PHP to the beginning of the file where you plan on utilizing ImageMagick.

```php
<?php
putenv('MAGICK_HOME=/Library/ImageMagick');
putenv('PATH=' . getenv('MAGICK_HOME') . '/bin:' . getenv('PATH'));
putenv('DYLD_LIBRARY_PATH=' . getenv('MAGICK_HOME') . '/lib');
?>
```

##Example Usage

Below are a few simple examples of how to convert, resize or rotate an image in PHP using the convert command.

```php
<?php
// Basic conversion from PNG to JPG
exec('convert avatar.png avatar.jpg');
// Resize to 80x80 (no cropping)
exec('convert avatar.png -resize 80x80 avatar_sm.png');
// Rotate 90°
exec('convert avatar.png -rotate 90 avatar_rotated.png');
// Resize & Crop to 80x80
exec('convert avatar.png -resize 80x80^ -gravity center -extent 80x80 avatar_sm.png');
?>
```

##Conclusion

Now that you have ImageMagick setup in both the command line and in PHP, you can start to utilize it in future projects. It is recommended that when you use ImageMagick, you take into consideration the load it places on the server each time you convert, resize or rotate an image.