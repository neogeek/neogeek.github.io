---
layout: post
title: Minimalistic Sublime Text Setup
---

Recently I made the switch from Textmate to Sublime Text. Detailed below is my custom setup of Sublime Text 3.

##Package Control

For package/theme management I use the popular [Package Control](https://sublime.wbond.net). Installation is simple and can be achived by simply accessing Sublime Text's console (ctrl + `) and pasting in the following command:

```python
import urllib.request,os; pf = 'Package Control.sublime-package'; ipp = sublime.installed_packages_path(); urllib.request.install_opener( urllib.request.build_opener( urllib.request.ProxyHandler()) ); open(os.path.join(ipp, pf), 'wb').write(urllib.request.urlopen( 'http://sublime.wbond.net/' + pf.replace(' ','%20')).read())
```

##Packages

- [GitGutter](https://github.com/jisaacks/GitGutter)
- [MarkdownEditing](https://github.com/ttscoff/MarkdownEditing)
- [SublimeLinter](https://github.com/SublimeLinter/SublimeLinter)

##Theme

- [Dracula](https://github.com/zenorocha/dracula-theme)

##Settings

```json
{
	"color_scheme": "Packages/Dracula.tmTheme",
	"font_size": 15,
	"draw_white_space": "all",
	"trim_trailing_white_space_on_save": true,
	"folder_exclude_patterns":
	[
		".git",
		"venv"
	],
	"ignored_packages":
	[
		"Vintage",
		"Markdown"
	],
	"scroll_past_end": true
}
```

##Package Settings

###SublimeLinter

```json
{
	"sublimelinter_gutter_marks": false,
	"sublimelinter_mark_style": "fill",
	"javascript_linter": "jslint",
	"jslint_options": { "browser": true, "nomen": true, "white": true }
}
```

##Custom Build Systems

###CasperJS

```json
{
	"shell_cmd": "casperjs --no-colors test $file"
}
```