---
layout: post
title: MAMP & PEAR
description: Upon installation, MAMP already has a great deal of additional packages available to you. Besides the obvious Apache, PHP and MySQL components, MAMP also comes with Freetype, curl and gd pre-installed. The default MAMP installation can also be extended to include other components. PEAR is a distribution system for PHP libraries such as HTTP_OAuth, an implementation of the OAuth 1.0a spec.
year: 2014
---

##Installing PEAR Libraries

###PEAR CLI Instructions

Installing libraries hosted through the PEAR service is fairly straight forward. The first step is to determine which version of PHP is currenly active as MAMP has avalible to it multiple versions. To do this, navigate to the built in `phpinfo()` page located at <http://localhost/MAMP/phpinfo.php>. Make note of the version number located at the top of this page for the next step.

Open terminal and navigate to the following directory (replace the version number in the following command with the number located on the `phpinfo()` page).

```bash
cd /Applications/MAMP/bin/php/php5.5.3/bin/
```

Now, navigate to the download page of the PEAR package you want to install. In this example we are installing **HTTP_OAuth**, so the page we need is <http://pear.php.net/package/HTTP_OAuth/download> and look for the **Easy Install** instructions.

Copy the command located on the download page and paste it after `./`. This will allow you to run the `pear` command from the current folder.

```bash
./pear install HTTP_OAuth-0.3.1
```

To test to see if the package installed correctly type the following command and look for HTTP_OAuth in the list that displays.

```bash
./pear list
```

You can now include the package in any PHP script served up by this version of PHP (5.5.3 for this example).

```php
<?php
include('HTTP/OAuth.php');
if (class_exists('HTTP_OAuth')) { echo 'PEAR Package Installed!'; }
else { echo 'Error Loading PEAR Package.'; }
?>
```

###git Instructions

Similar to the steps above you must first determine which version of PHP is currenly active and then navigate to the following directory.

**Note:** This directory is different than the directory mentioned above.

```bash
cd /Applications/MAMP/bin/php/php5.5.3/lib/php/
```

Now clone the git repo into a folder of the same name:

```bash
git clone https://github.com/neogeek/Overseer-Framework.git Overseer-Framework
```

You can now include the installed library in any PHP script served up by this version of PHP (5.5.3 for this example).

```php
<?php
require('Overseer-Framework/framework.php');
if (class_exists('DOM')) { echo 'Overseer-Framework Installed!'; }
else { echo 'Error Loading Overseer-Framework.'; }
?>
```