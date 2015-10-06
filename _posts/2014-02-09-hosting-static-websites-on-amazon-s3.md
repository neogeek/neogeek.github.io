---
layout: post
title: Hosting Static Websites on Amazon S3
description: This article is a quick rundown on how to host a static website using Amazon S3 and your domain registrar.
keywords: hosting amazon s3 namecheap
---

Assuming you already have an [Amazon Web Service](http://aws.amazon.com/) account the first step would be to open up you [AWS Management Console](https://console.aws.amazon.com/console/home) and select the [S3](https://console.aws.amazon.com/s3/home) Service.

Once at the S3 Management Console, complete the following steps:

1. Create a new bucket with the domain you will be hosting at (including the www. for this example).
2. Select **Static Web Site Hosting** under the properties of the newly created bucket.
3. Select **Enable website hosting** and enter a file name for the index document.
4. Select **Permissions** and then open **Edit Bucket Policy**. Enter the following (change the www.example.com to your full bucket name):

    ```json
    {
        "Statement": [
            {
                "Sid": "AddPerm",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "*"
                },
                "Action": [
                    "s3:GetObject"
                ],
                "Resource": [
                    "arn:aws:s3:::www.example.com/*"
                ]
            }
        ]
    }
    ```

5. Navigate to your [IAM Management Console](https://console.aws.amazon.com/iam/home?#security_credential) and open the section labeled **Access Keys (Access Key ID and Secret Access Key)**.
6. Create a new key/value pair (or use a preexisting one).
7. Enter these credentials in an app that support S3, like [Transmit](https://panic.com/transmit/), and then upload the contents of your static site to the bucket you created.

Next up is to configure your domain registrar to correctly point to the newly created bucket. _These directions are specific to [Namecheap.com](http://namecheap.com/)._

1. Login to your account and head over to the [Manage Domains](https://manage.www.namecheap.com/myaccount/domain-list.asp) page.
2. Select the domain you want to point to the Amazon S3 bucket.
3. Make sure you are using the registrars name servers (DNS).
4. Edit the host records on the **All Host Records** page (link in sidebar) to look like the example below:

The long URL in the second row can be found in the **Static Web Site Hosting** section of the **AWS Management Console**.

<div class="table-wrapper">
<table>
    <thead>
        <tr>
            <th>Host Name</th>
            <th>IP Address / URL</th>
            <th>Record Type</th>
            <th>TTL</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>@</td>
            <td>http://www.example.com/</td>
            <td>URL Redirect</td>
            <td>1800</td>
        </tr>
        <tr>
            <td>www</td>
            <td>www.example.com.s3-website-us-east-1.amazonaws.com.</td>
            <td>CNAME (Alias)</td>
            <td>1800</td>
        </tr>
    </tbody>
</table>
</div>

**Note:** Make sure that you **DO NOT** set the **@** host name to be a CNAME (Alias) if you have MX records. This will prevent any email you have set up from working.
