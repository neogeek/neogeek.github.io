import { readFile, stat } from 'node:fs/promises';

import { html } from 'onlybuild';

import { Marked } from 'marked';

import head from './_includes/head.js';
import footer from './_includes/footer.js';

const { mtime } = await stat('now.md');

export default html`<!DOCTYPE html>
  <html lang="en">
    <head>
      ${head({
        title: 'Now',
        subtitle: "What's Scott up to right now(ish)?"
      })}
    </head>
    <body>
      <header>
        <a href="/">← Home</a>
      </header>
      <main class="now">
        ${new Marked().parse(await readFile('now.md', 'utf8'))}
      </main>
      <footer>
        <p>Inspired by <a href="https://nownownow.com/">NowNowNow</a>.</p>
        <p>
          <i
            >Last Updated:
            <time datetime="${mtime.toString()}"
              >${mtime.toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time
            ></i
          >
        </p>
      </footer>
      <footer>${footer}</footer>
    </body>
  </html>`;
