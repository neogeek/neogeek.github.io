import { readFile } from 'node:fs/promises';

import { html } from 'onlybuild';

import { Marked } from 'marked';

import getModifiedDate from './_utilities/get-modified-date.js';

import head from './_includes/head.js';
import footer from './_includes/footer.js';

const lastModifiedDate = await getModifiedDate('use.md');

export default html`<!DOCTYPE html>
  <html lang="en">
    <head>
      ${head({
        title: 'Use',
        subtitle: 'What does Scott use for development/gaming?'
      })}
    </head>
    <body>
      <header>
        <a href="/">← Home</a>
      </header>
      <main class="use">
        ${new Marked().parse(await readFile('use.md', 'utf8'))}
      </main>
      <footer>
        <p>
          <i
            >Last Updated:
            <time datetime="${lastModifiedDate.toString()}"
              >${lastModifiedDate.toLocaleDateString('en-us', {
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
