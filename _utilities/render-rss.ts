import { html } from 'onlybuild';

import config from '../_data/config.json';
import posts from '../_data/posts.json';

type configType = typeof config;
type postsType = typeof posts;

const renderRss = (
  config: configType,
  posts: postsType
) => html`<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${config.title}</title>
    <link>${config.url}</link>
    <description>${config.subtitle}</description>
    <atom:link href="${
      new URL('feed.xml', config.url).href
    }" rel="self" type="application/rss+xml" />
    ${posts
      .map(post => {
        const { href } = new URL(
          post.path.replace('README.md', ''),
          config.url
        );

        return html`<item>
          <title>${post.title}</title>
          <link>${href}</link>
          <description>${post.subtitle}</description>
          <guid isPermaLink="true">${href}</guid>
          <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        </item>`;
      })
      .join('')}
  </channel>
</rss>`;

export default renderRss;
