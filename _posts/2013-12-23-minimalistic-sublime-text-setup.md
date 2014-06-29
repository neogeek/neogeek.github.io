---
layout: post
title: Minimalistic Sublime Text Setup
description: Recently I made the switch from Textmate to Sublime Text. Detailed below is my custom setup of Sublime Text 3.
image: /images/posts/minimalistic-sublime-text-setup/screenshot.png
keywords: sublime text
year: 2013
---

##Package Control

For package/theme management I use the popular [Package Control](https://sublime.wbond.net) plugin. Installation is simple and can be achieved by accessing the console in Sublime Text (ctrl + `) and pasting in the command found on the [Package Control's installation page](https://sublime.wbond.net/installation).

##Packages

- [GitGutter](https://github.com/jisaacks/GitGutter)
- [Handlebars](https://github.com/daaain/Handlebars)
- [MarkdownEditing](https://github.com/ttscoff/MarkdownEditing)
- [ReactJS](https://github.com/reactjs/sublime-react)
- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)
- [SublimeLinter-contrib-jslint](https://github.com/devdoc/SublimeLinter-jslint)
- [SublimeLinter-pylint](https://github.com/SublimeLinter/SublimeLinter-pylint)

##Theme

- [Dracula](https://github.com/zenorocha/dracula-theme)

##Settings

```json
{
	"color_scheme": "Packages/Dracula Color Scheme/Dracula.tmTheme",
	"draw_white_space": "all",
	"ensure_newline_at_eof_on_save": true,
	"folder_exclude_patterns":
	[
		".git",
		"venv"
	],
	"font_size": 14,
	"ignored_packages":
	[
		"Vintage",
		"Markdown"
	],
	"scroll_past_end": true,
	"spell_check": true,
	"tab_size": 4,
	"translate_tabs_to_spaces": true,
	"trim_trailing_white_space_on_save": true,
	"word_wrap": true
}
```
