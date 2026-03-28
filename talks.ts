import { html } from 'onlybuild';

import head from './_includes/head.js';
import header from './_includes/header.js';
import footer from './_includes/footer.js';

import { getTalks } from './_utilities/talks.js';

const talks = await getTalks();

export default html`<!DOCTYPE html>
  <html lang="en">
    <head>
      ${head()}
    </head>
    <body>
      <header>${header}</header>
      <main>
        <h2>Talks</h2>

        <ul>
          ${talks.map(talk => {
            return html`<li>
              <a href=${`/${talk.path.replace(/^\//, '')}`}
                >${talk.data.title}</a
              >
            </li> `;
          })}
        </ul>
      </main>
      <footer>${footer}</footer>
    </body>
  </html>`;
