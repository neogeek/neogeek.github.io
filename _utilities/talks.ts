import { readFile } from 'node:fs/promises';
import { parse, basename } from 'node:path';

import { globby } from 'globby';

import parseFrontMatter from './parse-front-matter.js';
import getModifiedDate from './get-modified-date.js';
import calculateTimeToRead from './calc-ttr.js';
import renderMarkdown from './render-markdown.js';

const getTalkPaths = async () => await globby(['./talks/**/*.md']);

const getTalks = async () => {
  const talks = (
    await Promise.all(
      (await getTalkPaths()).map(async path => {
        let name = parse(path).name;

        if (name === 'README') {
          name = basename(parse(path).dir);
        }

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
          .replace(/<\/pre>/g, '</pre></copy-to-clipboard>')
          .replace(/<!\-\-.*\-\->/gs, '');

        return { path: `talks/${name}`, data, content, markdown };
      })
    )
  )
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );

  return talks;
};

export { getTalkPaths, getTalks };
