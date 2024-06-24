import { readFile } from 'node:fs/promises';

import { globby } from 'globby';

import parseFrontMatter from './parse-front-matter.js';
import getModifiedDate from './get-modified-date.js';
import calculateTimeToRead from './calc-ttr.js';
import renderMarkdown from './render-markdown.js';

const getPostPaths = async () => await globby(['./posts/*.md']);

const getPosts = async () => {
  const posts = (
    await Promise.all(
      (
        await getPostPaths()
      ).map(async path => {
        const { data, content } = parseFrontMatter(
          await readFile(path, 'utf8')
        );

        if (data.draft && process.env.NODE_ENV !== 'development') {
          return;
        }

        if (data) {
          const date = new Date(data.date);

          data.date = date;

          data.dateString = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          data.lastModifiedDateString = (
            await getModifiedDate(path)
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });

          data.ttr = calculateTimeToRead(content).toString();
        }

        let markdown = await renderMarkdown(content.replace(/^# [^\n]+/, ''));

        markdown = markdown
          .replace(/<pre>/g, '<copy-to-clipboard><pre>')
          .replace(/<\/pre>/g, '</pre></copy-to-clipboard>');

        return { path, data, content, markdown };
      })
    )
  )
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  return posts;
};

const getPostsByYear = async () => {
  return (await getPosts()).reduce((years, post) => {
    const date = new Date(post.data.date);

    if (!years[date.getFullYear()]) {
      years[date.getFullYear()] = [];
    }

    years[date.getFullYear()].push(post);

    return years;
  }, {});
};

export { getPostPaths, getPosts, getPostsByYear };
