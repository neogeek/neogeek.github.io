import { readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/build';

import calculateTimeToRead from './_utilities/calc-ttr.mjs';
import renderMarkdown from './_utilities/render-markdown.mjs';
import renderRss from './_utilities/render-rss.mjs';

import head from './_includes/head.mjs';
import header from './_includes/header.mjs';
import footer from './_includes/footer.mjs';

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

await Promise.all(
  sortedPosts.map(async post => {
    post['dateString'] = new Date(post.date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    post['content'] = await readFile(post.path, 'utf8');

    post['markdown'] = renderMarkdown(post['content']);

    post['ttr'] = calculateTimeToRead(post['content']).toString();
  })
);

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
            <div class="progress"></div>
            <header>
              <a href="/">← Back</a>
            </header>
            <main class="post">
              <h1>${post.title}</h1>
              <p>
                Published <time>${post['dateString']}</time> &#8226;
                ${post['ttr']}
              </p>
              ${post['markdown'].replace(/<h1>.+\<\/h1>/gis, '')}
            </main>
            <footer>${footer}</footer>
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
      <header>${header}</header>
      <main>
        <h2>Posts</h2>

        ${Object.keys(postsGroupedByYear)
          .sort()
          .reverse()
          .map(year => {
            return html`
              <!-- <h3>${year}</h3> -->
              <ul class="blog-posts">
                ${postsGroupedByYear[year].map(post => {
                  return html`<li class="blog-post">
                    <h4>
                      ${typedDrafts.includes(post) ? '[DRAFT]' : ''}
                      <a
                        href="${post.path
                          .replace(dirname(post.path), '')
                          .replace(/\.md$/, '')}"
                        >${post.title}</a
                      >
                    </h4>
                    <p>${post.subtitle}</p>
                    <p>
                      <time>${post['dateString']}</time> &#8226; ${post['ttr']}
                    </p>
                  </li>`;
                })}
              </ul>
            `;
          })}

        <hr />

        <h2>Current Projects</h2>
        <ul class="project-list">
          ${projects
            .filter(project => project.current)
            .map(project => {
              return html`<li class="project-item">
                <h4><a href="${project.url}">${project.name}</a></h4>
                <p>${project.description}</p>
              </li>`;
            })}
        </ul>

        <h2>Open Source Projects</h2>
        <ul class="project-list">
          ${projects
            .filter(project => !project.current)
            .map(project => {
              return html`<li class="project-item">
                <h4><a href="${project.url}">${project.name}</a></h4>
                <p>${project.description}</p>
              </li>`;
            })}
        </ul>
      </main>
      <footer>${footer}</footer>
    </body>
  </html>`;
