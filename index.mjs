import { readFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/src/build.js';

import renderMarkdown from './_utilities/render-markdown.mjs';

import head from './_includes/head.mjs';
import header from './_includes/header.mjs';

import posts from './_data/posts.json' with { type: "json" };

await Promise.all(
  posts.map(async post => {
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

export default html`<!DOCTYPE html>
  <html lang="en">
    <head>
      ${head()}
    </head>
    <body>
      ${header}
      <main>${renderMarkdown(await readFile('./README.md', 'utf8'))}</main>
    </body>
  </html>`;
