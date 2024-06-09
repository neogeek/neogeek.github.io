import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/build';

import renderRss from './_utilities/render-rss.js';

import head from './_includes/head.js';
import header from './_includes/header.js';
import footer from './_includes/footer.js';

import config from './_data/config.json';
import projects from './_data/projects.json';

import { getPosts, getPostsByYear } from './_utilities/posts.js';

const posts = await getPosts();
const postsGroupedByYear = await getPostsByYear();

await Promise.all(
  posts.map(async post => {
    await writeFileAndMakeDir(
      join('build', parse(post.path).name, 'index.html'),
      html`<!DOCTYPE html>
        <html lang="en">
          <head>
            ${head({
              title: post.data.title,
              subtitle: post.data.subtitle
            })}
          </head>
          <body>
            <div class="progress"></div>
            <header>
              <a href="/">← Home</a>
            </header>
            <main class="post">
              <h1>${post.data.title}</h1>
              <p>
                Published
                <time datetime="${post.data.date.toISOString()}"
                  >${post.data.dateString}</time
                >
                ${post.data.dateString !== post.data.lastModifiedDateString
                  ? html`&#8226; Last Updated
                      <time
                        datetime="${new Date(
                          post.data.lastModifiedDateString
                        ).toISOString()}"
                        >${post.data.lastModifiedDateString}</time
                      >`
                  : ''}
                &#8226; ${post.data.ttr}
              </p>
              ${post.markdown.replace(/<h1>.+\<\/h1>/gis, '')}
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
              <h3>${year}</h3>
              <ul class="blog-posts">
                ${postsGroupedByYear[year].map(post => {
                  return html`<li class="blog-post">
                    <h4>
                      ${post.data.draft ? '[DRAFT]' : ''}
                      <a
                        href="${post.path
                          .replace(dirname(post.path), '')
                          .replace(/\.md$/, '')}"
                        >${post.data.title}</a
                      >
                    </h4>
                    <p>${post.data.subtitle}</p>
                    <p>
                      <time datetime="${post.data.date.toISOString()}"
                        >${post.data.dateString}</time
                      >
                      &#8226; ${post.data.ttr}
                    </p>
                  </li>`;
                })}
              </ul>
            `;
          })}

        <hr />

        <h2>Projects</h2>

        <p>
          You can see all projects on my
          <a href="https://scottdoxey.com">portfolio</a>.
        </p>

        <h3>Active Projects</h3>
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

        <h3>Open Source Projects</h3>
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
