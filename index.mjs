import { readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/src/build.js';

import renderMarkdown from './_utilities/render-markdown.mjs';
import renderRss from './_utilities/render-rss.mjs';

import head from './_includes/head.mjs';
import header from './_includes/header.mjs';

import config from './_data/config.json' assert { type: 'json' };
import drafts from './_data/drafts.json' assert { type: 'json' };
import posts from './_data/posts.json' assert { type: 'json' };
import projects from './_data/projects.json' assert { type: 'json' };

/**
 * @type {typeof posts}
 */
const typedDrafts = drafts;

const sortedPosts = [
  ...posts,
  ...(process.env.NODE_ENV === 'development' ? typedDrafts : [])
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

/** @type {{[key: string]: typeof posts}} */
const postsGroupedByYear = sortedPosts.reduce((years, post) => {
  const date = new Date(post.date);

  if (!years[date.getFullYear()]) {
    years[date.getFullYear()] = [];
  }

  years[date.getFullYear()].push(post);

  return years;
}, {});

await Promise.all(
  sortedPosts.map(async post => {
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

        ${Object.keys(postsGroupedByYear)
          .sort()
          .reverse()
          .map(year => {
            return html`
              <h3>${year}</h3>
              <ul>
                ${postsGroupedByYear[year].map(post => {
                  return html`<li>
                    <p>
                      ${typedDrafts.includes(post) ? '[DRAFT]' : ''}
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
                    </p>
                    <p>${post.subtitle}</p>
                  </li>`;
                })}
              </ul>
            `;
          })}

        <hr />

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
