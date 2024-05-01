import { html } from 'onlybuild';

import config from '../_data/config.json' with { type: "json" };

export default html`<header>
  <h1>${config.title}</h1>
  <p>${config.subtitle}</p>
</header>`;