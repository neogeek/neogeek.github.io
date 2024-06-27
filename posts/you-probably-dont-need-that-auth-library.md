---
title: You (Probably) Don't Need That Auth Library
subtitle: I wondered this many years ago, when trying to setup Google Login with OAuth, and what I learned surprised me.
date: 06/16/2024
---

# You (Probably) Don't Need That Auth Library

If you have ever visited [r/nextjs](https://www.reddit.com/r/nextjs/), you have probably seen a post with someone complaining about an auth library. ["NextAuth.js has bad or incomplete documentation"](https://www.reddit.com/r/nextjs/search/?q=nextauth), ["Clerk (or Auth0) is too expensive"](https://www.reddit.com/r/nextjs/search/?q=clerk), etc. One question I have not seen is, "Do I even need these libraries?" or better yet, "_Why_ do I need these libraries?".

I asked myself the same question a while back when first looking into setting up single sign-on via Facebook Login and Google Login in a PHP application[^1]. What I learned surprised me.

## The Surprise

When I looked into how existing libraries worked, I found that it boiled down to only two URLs. Two!

But wait, you might be wondering, "Is he crazy? How could it be so easy if there are libraries like NextAuth.js and services like Auth0?"

## The Problem

Before we can answer this, let's look at this table of auth providers:

| Provider  | OAuth Protocol Version | Documentation                                                                                                                                          |
| --------- | :--------------------: | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Apple     |          2.0           | [developer.apple.com](https://developer.apple.com/documentation/sign_in_with_apple/sign_in_with_apple_rest_api)                                        |
| Discord   |          2.0           | [discord.com/developers](https://discord.com/developers/docs/topics/oauth2)                                                                            |
| Facebook  |          2.0           | [developers.facebook.com](https://developers.facebook.com/docs/facebook-login/guides/advanced/manual-flow/)                                            |
| GitHub    |          2.0           | [docs.github.com](https://docs.github.com/en/rest/authentication/authenticating-to-the-rest-api?apiVersion=2022-11-28)                                 |
| Google    |          2.0           | [developers.google.com](https://developers.google.com/identity/protocols/oauth2/web-server#httprest)                                                   |
| Instagram |          2.0           | [developers.facebook.com](https://developers.facebook.com/docs/instagram-basic-display-api/reference/oauth-authorize/)                                 |
| LinkedIn  |          2.0           | [learn.microsoft.com](https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin%2Fcontext&tabs=HTTPS1) |
| Microsoft |          2.0           | [learn.microsoft.com](https://learn.microsoft.com/en-us/entra/identity-platform/v2-oauth2-auth-code-flow#redirect-uris-for-single-page-apps-spas)      |
| PayPal    |          2.0           | [developer.paypal.com](https://developer.paypal.com/api/rest/authentication/)                                                                          |
| Spotify   |          2.0           | [developer.spotify.com](https://developer.spotify.com/documentation/web-api/tutorials/code-flow)                                                       |
| Twitch    |          2.0           | [dev.twitch.tv](https://dev.twitch.tv/docs/authentication/getting-tokens-oauth/#implicit-grant-flow)                                                   |

What do they have in common? They all share the same OAuth Protocol Version, which is the easier version to work with. But, as you can imagine, that wasn't always the case.

Let's take a look at these auth providers:

| Provider      | OAuth Protocol Version |
| ------------- | :--------------------: |
| Bitbucket     |       1.0a, 2.0        |
| Dropbox       |        1.0, 2.0        |
| Etsy          |          1.0           |
| Evernote      |          1.0a          |
| Flickr        |          1.0a          |
| Goodreads     |          1.0           |
| Netflix       |          1.0a          |
| Okta          |       1.0a, 2.0        |
| OpenTable     |          1.0a          |
| Trello        |          1.0           |
| Tumblr        |          1.0a          |
| Twitter       |       1.0a, 2.0        |
| WordPress.com |          1.0           |

See the difference? While some of them support 2.0, others have yet to make it past 1.0 or even 1.0a. And, for the sake of my mental well-being, I will not go into the difference between 1.0 and 2.0. Let's say that if you are considering writing your own logic, 2.0 is the only way to go.

## The Solution

Now, let's take a look at those URLs.

### /auth

This is the URL used to redirect you to the provider's authentication confirm page.

```javascript
const client_id = 'xxxxx';

const redirect_uri = 'http://localhost:8080/oauth/google/callback';

const redirectUrl =
  `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirect_uri}&client_id=${client_id}` +
  `&access_type=offline&response_type=code&prompt=consent&scope=https://www.googleapis.com/auth/userinfo.email`;
```

### /token with code

Once you confirm, the page will redirect you back to your app with a `code` parameter in the URL's hash. You then use this code to fetch the tokens you will use to make further requests. Note that this token is single-use and only valid for about 30 seconds.

```javascript
const code = 'xxxxx';

const client_id = 'xxxxx';
const client_secret = 'xxxxx';

const redirect_uri = 'http://localhost:8080/oauth/google/callback';

const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: JSON.stringify({
    code,
    client_id,
    client_secret,
    redirect_uri,
    grant_type: 'authorization_code'
  })
});
```

An example response from this request:

```json
{
  ...
  "access_token": "xxxxx",
  "expires_in": 0,
  "refresh_token": "xxxxx"
  ...
}
```

### /token with refresh_token

And finally, when the access token you got from the request above expires, you can use the refresh token to get another one.

```javascript
const access_token = 'xxxxx';

const response = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  body: JSON.stringify({
    refresh_token,
    client_id,
    client_secret,
    grant_type: 'refresh_token'
  })
});
```

An example response from this request:

```json
{
  ...
  "access_token": "xxxxx",
  "expires_in": 0,
  "refresh_token": "xxxxx"
  ...
}
```

That's it!

And because I got sick and tired of digging for those URLs, I made a package for myself and others to use <https://github.com/neogeek/create-app-oauth-providers>.

But you don't have to use this package! In fact, I recommend you use it as a reference, as there is barely anything to it.

<style>
  table { width: auto;}
</style>

[^1]: <https://github.com/neogeek-deprecated/Overseer-Framework/blob/master/oauth2.php>
