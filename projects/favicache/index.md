---
layout: page
title: Favicache
---

#Favicache

Favicache is a Wordpress plugin which retrieves and stores favicons in a local cache. This makes for faster load times and lessens the strain on the server in which the favicon was originally retrieved from.

##Installation

1. Download the [latest version from GitHub](http://github.com/neogeek/favicache/).
2. Upload the contents of the downloaded zip file to `/wp-content/plugins/`.
3. Ensure that `/wp-content/plugins/favicache/` has [write permissions](http://codex.wordpress.org/Make_a_Directory_Writable).
4. Activate the plugin.

##Usage

Once Favicache is installed and activated, ensure that the settings for the links widget are setup as indicated in the screenshot below.

Then add or edit an existing link causing Favicache to retrieve (if available) and cache the site's favicon. It then sets the site's image to the cached version of that site's favicon.

##Theme Modification

Favicache downloads the favicons as is, without resizing them. To make sure they all look the same in the sidebar, add the following CSS to your theme's main CSS file.

```css
.widget_links ul li {
    padding: 2px 0;
}

.widget_links a img {
    width: 16px;
    height: 16px;
    vertical-align: middle;
}
```

##Compatibility

**Wordpress:** 3.0, 3.1, 3.1.3, 3.2, 3.2.1, 3.3, 3.3.1, 3.3.2, 3.4
