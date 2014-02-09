---
layout: post
title: Hosting Static Websites on Amazon S3
description: A quick rundown on how to host a static website using Amazon S3 and your domain registrar.
year: 2014
---

Assuming you already have an [Amazon Web Service](http://aws.amazon.com/) account the first step would be top open up you [AWS Management Console](https://console.aws.amazon.com/console/home) and select the [S3](https://console.aws.amazon.com/s3/home) Service.

Once at the S3 Manangement Console complete the following steps:

1. Create a new bucket with the domain you will be hosting at (including the www. for this example).
2. Once created select **Staic Web Site Hosting** under the properties of the newly created bucket.
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

5. Then open your S3 account using the credentials found in the [IAM Management Console](https://console.aws.amazon.com/iam/home?#security_credential) and open the section labeled **Access Keys (Access Key ID and Secret Access Key)**.
6. Create a new key/value pair (or use a preexisting one).
7. Enter credentials in an app like [Transmit](https://panic.com/transmit/) and then upload the contents of your static site to the bucket you created.

Next up is to configure your domain registrar to correctly point to the newly created bucket.