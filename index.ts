import { readFile, writeFile } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';

import { html } from 'onlybuild';

import { writeFileAndMakeDir } from 'onlybuild/build';

import calculateTimeToRead from './_utilities/calc-ttr.js';
import renderMarkdown from './_utilities/render-markdown.js';
import renderRss from './_utilities/render-rss.js';

import head from './_includes/head.js';
import header from './_includes/header.js';
import footer from './_includes/footer.js';

import config from './_data/config.json';
import drafts from './_data/drafts.json';
import posts from './_data/posts.json';
import projects from './_data/projects.json';

const sortedPosts = [
  ...posts,
  ...(process.env.NODE_ENV === 'development' ? drafts : [])
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

    post['markdown'] = post['markdown']
      .replace(/<pre>/g, '<copy-to-clipboard><pre>')
      .replace(/<\/pre>/g, '</pre></copy-to-clipboard>');

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
      join('build', parse(post.path).name, 'index.html'),
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
              <a href="/">← Home</a>
            </header>
            <main class="post">
              <h1>${post.title}</h1>
              <p>
                Published
                <time datetime="${new Date(post['dateString']).toISOString()}"
                  >${post['dateString']}</time
                >
                &#8226; ${post['ttr']}
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
              <h3>${year}</h3>
              <ul class="blog-posts">
                ${postsGroupedByYear[year].map(post => {
                  return html`<li class="blog-post">
                    <h4>
                      ${drafts.includes(post) ? '[DRAFT]' : ''}
                      <a
                        href="${post.path
                          .replace(dirname(post.path), '')
                          .replace(/\.md$/, '')}"
                        >${post.title}</a
                      >
                    </h4>
                    <p>${post.subtitle}</p>
                    <p>
                      <time
                        datetime="${new Date(post['dateString']).toISOString()}"
                        >${post['dateString']}</time
                      >
                      &#8226; ${post['ttr']}
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
