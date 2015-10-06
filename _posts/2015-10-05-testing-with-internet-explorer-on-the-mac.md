---
layout: post
title: Testing with Internet Explorer on the Mac
description: Every couple of months I find myself digging around for answers to questions about setting up virtual machines on the Mac for testing in Internet Explorer. And of course every time I think to myself, “This would make a fantastic blog post.” This is that blog post.
keywords: internet-explorer
---

First you need to install Virtual Box from Oracle. You can download Virtual Box for free from <https://www.virtualbox.org/wiki/Downloads>.

One you have that installed it’s time to download and install the virtual machines. Luckily there is a project hosted at Github called [IEVMS](https://github.com/xdissent/ievms) which automates the process of downloading publicly available virtual machines (supplied by [Modern.IE](https://dev.modern.ie/)) and installing Internet Explorer for you.

To make things even easier I've created a tool for generating the command used to download the versions of Internet Explorer you need for testing your project.

<form class="generate-ievms-install-command">

    <p><b>Select the versions of Internet Explorer are you going to test against:</b></p>

    <div><label><input type="checkbox" name="ie" value="EDGE" checked="checked"> Internet Explorer EDGE</label></div>
    <div><label><input type="checkbox" name="ie" value="11"> Internet Explorer 11</label></div>
    <div><label><input type="checkbox" name="ie" value="10"> Internet Explorer 10</label></div>
    <div><label><input type="checkbox" name="ie" value="9"> Internet Explorer 9</label></div>
    <div><label><input type="checkbox" name="ie" value="8"> Internet Explorer 8</label></div>
    <div><label><input type="checkbox" name="ie" value="7"> Internet Explorer 7</label></div>
    <div><label><input type="checkbox" name="ie" value="6"> Internet Explorer 6</label></div>

    <pre><code>curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="EDGE" bash</code></pre>

</form>

<script src="//code.jquery.com/jquery.min.js"></script>
<script>

(function () {

    var $form = $('.generate-ievms-install-command'),
        versions = '';

    $form.on('change', 'input[type="checkbox"]', function (e) {

        versions = $form.find('input[type="checkbox"]:checked').map(function () { return this.value; }).get().join(', ');

        if (!versions) {

            versions = 'EDGE';

        }

        $form.find('pre code').text('curl -s https://raw.githubusercontent.com/xdissent/ievms/master/ievms.sh | env IEVMS_VERSIONS="' + versions + '" bash');

    });

}());

</script>

Now that you have the command ready, copy it and paste it into Terminal and wait. This will take a while.

Once that has finished we have to setup how to access your website from within the virtual machine.

Open Virtual Box and select preferences. Once that is open select the Network tab and choose Host-only Networks. If this is your first time using Virtual Box this area should be empty. If it is click the add new adapter icon. Once you are finished it should look similar to the screenshot below.

![](/images/posts/testing-with-internet-explorer-on-the-mac/preferences-network.png)

Now you configure each virtual machine.

Open the preferences of each Virtual Machine installed, select the Network tab and choose Adapter 2. Check off Enable Network Adapter and select Host-only Adapter from the dropdown. `vboxnet0` should be automatically populated in the dropdown below.

![](/images/posts/testing-with-internet-explorer-on-the-mac/vm-preferences-network-adapters.png)

Now run one of the Virtual Machines and wait for it to finish starting up. Once it does open up Terminal on the Mac and type `ifconfig vboxnet0`. The output of this command should look something like this:

```
vboxnet0: flags=8943<UP,BROADCAST,RUNNING,PROMISC,SIMPLEX,MULTICAST> mtu 1500
    ether 0a:00:27:00:00:00
    inet 192.168.56.1 netmask 0xffffff00 broadcast 192.168.56.255
```

Take the IP address after `inet` and paste it into your Virtual Machine (assuming you have Biodirection Shared Clipboard activated) and you are good to go! Any website you have running on your local machine will be displayed via that IP address and whichever port you may be developing on.
