import { readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/src/build.js';

import renderMarkdown from './_utilities/render-markdown.mjs';
import renderRss from './_utilities/render-rss.mjs';

import head from './_includes/head.mjs';
import header from './_includes/header.mjs';

import config from './_data/config.json' assert { type: 'json' };
import posts from './_data/posts.json' assert { type: 'json' };

await Promise.all(
  posts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(async post => {
      await writeFileAndMakeDir(
        dirname(post.path),
        'build/',
        html`<!DOCTYPE html>
          <html lang="en">
            <head>
              ${head({
                title: post.title,
                subtitle: post.subtitle
              })}
            </head>
            <body>
              <header>
                <a href="/">← Back</a>
              </header>
              <main class="post">
                ${renderMarkdown(await readFile(post.path, 'utf8'))}
              </main>
            </body>
          </html>`
      );
    })
);

await writeFile('build/feed.xml', renderRss(config, posts));

export default html`<!DOCTYPE html>
  <html lang="en">
    <head>
      ${head()}
    </head>
    <body>
      ${header}
      <main>
        <h2>Articles</h2>

        <ul>
          ${posts
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            )
            .map(post => {
              return html`<li>
                <a href="${post.path.replace('/README.md', '')}"
                  >${post.title}</a
                >
                -
                ${new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </li>`;
            })}
        </ul>

        ${renderMarkdown(await readFile('./README.md', 'utf8'))}
      </main>
    </body>
  </html>`;
