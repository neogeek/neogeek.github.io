import { html } from 'onlybuild';

import config from '../_data/config.json' assert { type: 'json' };
import posts from '../_data/posts.json' assert { type: 'json' };

/**
 * @param {typeof config} config
 * @param {typeof posts} posts
 * @returns {string}
 */
const renderRss = (
  config,
  posts
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
          <published>${new Date(post.date).toISOString()}</published>
        </item>`;
      })
      .join('')}
  </channel>
</rss>`;

export default renderRss;
