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
import projects from './_data/projects.json' assert { type: 'json' };

await Promise.all(
  posts
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(async post => {
      await writeFileAndMakeDir(
        post.path.replace(dirname(post.path), '').replace(/\.md$/, ''),
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
                <a
                  href="${post.path
                    .replace(dirname(post.path), '')
                    .replace(/\.md$/, '')}"
                  >${post.title}</a
                >
                -
                <time
                  >${new Date(post.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</time
                >
              </li>`;
            })}
        </ul>

        <h2>Current Projects</h2>
        <ul>
          ${projects
            .filter(project => project.current)
            .map(project => {
              return html`<li>
                <a href="${project.url}">${project.name}</a>
                - ${project.description}
              </li>`;
            })}
        </ul>

        <h2>Open Source Projects</h2>
        <ul>
          ${projects
            .filter(project => !project.current)
            .map(project => {
              return html`<li>
                <a href="${project.url}">${project.name}</a>
                - ${project.description}
              </li>`;
            })}
        </ul>
      </main>
    </body>
  </html>`;
