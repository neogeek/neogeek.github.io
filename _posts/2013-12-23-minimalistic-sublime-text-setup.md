---
layout: post
title: Minimalistic Sublime Text Setup
description: Recently I made the switch from Textmate to Sublime Text. Detailed below is my custom setup of Sublime Text 3.
year: 2013
---

##Package Control

For package/theme management I use the popular [Package Control](https://sublime.wbond.net) plugin. Installation is simple and can be achived by accessing the console in Sublime Text (ctrl + `) and pasting in the command found on the [Package Control's installation page](https://sublime.wbond.net/installation).

##Packages

- [GitGutter](https://github.com/jisaacks/GitGutter)
- [Handlebars](https://github.com/daaain/Handlebars)
- [MarkdownEditing](https://github.com/ttscoff/MarkdownEditing)
- [Sass](https://github.com/nathos/sass-textmate-bundle)
- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)

##Theme

- [Dracula](https://github.com/zenorocha/dracula-theme)
- [Spacegray](https://github.com/kkga/spacegray)

##Icon

- [Sublime Text icon replacement for Flatland Theme](http://dribbble.com/shots/1027361-Sublime-Text-icon-replacement-for-Flatland-Theme) by [@namzo](http://dribbble.com/namzo)

##Settings

```json
{
	"color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",
	"draw_white_space": "all",
	"folder_exclude_patterns":
	[
		".git",
		"venv"
	],
	"font_size": 15,
	"ignored_packages":
	[
		"Vintage",
		"Markdown"
	],
	"scroll_past_end": true,
	"tab_size": 4,
	"theme": "Spacegray.sublime-theme",
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"word_wrap": true
}
```