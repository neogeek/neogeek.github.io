---
layout: post
title: MAMP & PEAR
year: 2010
---

Upon installation, MAMP already has a great deal of additional packages available to you. Besides the obvious Apache, PHP and MySQL components, MAMP also comes with Freetype, curl and gd pre-installed. The default MAMP installation can also be extended to include other components. PEAR is a distribution system for PHP libraries such as HTTP_OAuth, an implementation of the OAuth 1.0a spec. This article will cover the basics of setting up MAMP and installing PEAR libraries.

##Installing MAMP

MAMP, like most other Mac applications, can be installed by simply dragging and dropping the application into the Applications folder. Once installed, locate and launch the MAMP.app application. Then open up the preferences panel and select your desired options.

#Installing PEAR Libraries

To install any PEAR library, download the library of your choice, unzip the downloaded file and copy the contents of the unzipped folder to /Applications/MAMP/bin/&#8203;php/php5.4.19/lib/ or /Applications/MAMP/bin/&#8203;php/php5.5.3/lib/. The resulting file structure should be similar to the example below.

```
- /Applications/MAMP/bin/php/php5.5.3/lib/
	- HTTP_OAuth-0.3.1/
		- examples/
		- HTTP/
			- OAuth.php
		- tests/
```

Once you have verified the PEAR library is in the correct place, you can start using the library right away. Try the following script and replace the include to the PEAR library you want to install.

```php
<?php
include('HTTP_OAuth-0.3.1/HTTP/OAuth.php');
if (class_exists('HTTP_OAuth')) { echo 'PEAR Package Installed!'; }
else { echo 'Error Loading PEAR Package.'; }
?>
```