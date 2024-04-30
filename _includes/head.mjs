import { html } from 'onlybuild';

import config from '../_data/config.json' with { type: "json" };

const header = ({ title, subtitle } = { title: '', subtitle: '' }) => html`
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1" />

  <title>${title ? `${title} - ` : ''}${config.title}</title>

  <meta name="description" content="${subtitle || config.subtitle}" />

  <link rel="stylesheet" href="/css/styles.css" />

  <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
  <link rel="icon" href="/favicon.ico" type="image/x-icon" />

  <script src="/js/responsive-tables.js" defer></script>
  <script src="/js/web-components/GitHubRepo.js" defer></script>
`;

export default header;
