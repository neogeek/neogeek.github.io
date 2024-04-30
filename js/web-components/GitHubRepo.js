{
  const styles = `
  :host {
    --margin: 1em;
    --font-size: 16px;
    --text-color: #000;
    --background-color: #fff;
  }

  *, *:before, *:after {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  a {
    margin: var(--margin);
    padding: 2em;
    display: inline-block;
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica', 'Arial', sans-serif;
    font-size: var(--font-size);
    line-height: 1.3;
    color: var(--text-color);
    max-width: 100%;
    width: 37.5em;
    min-height: 18.75em;
    display: grid;
    gap: 1em;
    grid-template-columns: auto 6.25em;
    grid-template-areas: 'header icon' 'header icon' 'url logo';
    text-decoration: none;
    border-radius: 0.25em;
    background-color: var(--background-color);
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  }

  header {
    grid-area: header
  }

  h1 {
    font-size: 2em;
    font-weight: 400;
    text-wrap: wrap;
    overflow-wrap: break-word;
  }

  h1 b {
    display: inline-block;
  }

  p {
    margin: 1em 0 0;
    color: var(--text-color);
    opacity: 0.8;
  }

  img {
    width: 6.25em;
    height: 6.25em;
    align-self: start;
    justify-self: end;
    grid-area: icon;
    border-radius: 0.5em;
  }

  .url {
    color: var(--text-color);
    opacity: 0.5;
    align-self: end;
    grid-area: url;
    overflow-wrap: break-word;
    overflow: auto;
  }

  svg {
    grid-area: logo;
    align-self: end;
    justify-self: end;
    opacity: 0.5;
    fill: var(--text-color);
  }
  `;

  const createSVGClipboard = () => {
    const xmlNS = 'http://www.w3.org/2000/svg';

    const svgClipboard = document.createElementNS(xmlNS, 'svg');

    svgClipboard.setAttribute('height', '1.25em');
    svgClipboard.setAttribute('viewBox', '0 0 496 512');

    svgClipboard.appendChild(
      document.createComment(
        '!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.'
      )
    );

    const svgClipboardPath = document.createElementNS(xmlNS, 'path');

    svgClipboardPath.setAttribute(
      'd',
      'M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z'
    );

    svgClipboard.appendChild(svgClipboardPath);

    return svgClipboard;
  };

  class GitHubRepo extends HTMLElement {
    constructor() {
      super();

      this.owner = this.getAttribute('owner');
      this.name = this.getAttribute('name');

      this.url =
        this.getAttribute('url') ||
        `https://github.com/${this.owner}/${this.name}`;

      this.description = this.getAttribute('description');

      this.iconUrl =
        this.getAttribute('icon-url') || `https://github.com/${this.owner}.png`;
    }
    connectedCallback() {
      this.attachShadow({ mode: 'open' });

      this.createElementWithTextNode('style', styles);

      const anchor = this.createElementWithTextNode('a');

      anchor?.setAttribute('href', this.url);

      const header = this.createElementWithTextNode('header', null, anchor);

      const name = this.createElementWithTextNode(
        'h1',
        `${this.owner}/`,
        header
      );

      this.createElementWithTextNode('b', this.name, name);

      if (this.description) {
        this.createElementWithTextNode('p', this.description, header);
      }

      const icon = this.createElementWithTextNode('img', null, anchor);

      icon?.setAttribute('src', this.iconUrl);

      const url = this.createElementWithTextNode('p', this.url, anchor);

      url?.setAttribute('class', 'url');

      anchor?.appendChild(createSVGClipboard());
    }

    /**
     * Create an HTMLElement with text.
     *
     * @param {string} tagName
     * @param {string | null} data
     * @param {HTMLElement | null} parentNode
     * @returns {HTMLElement | null}
     */
    createElementWithTextNode(tagName, data = null, parentNode = null) {
      if (!this.shadowRoot) {
        return null;
      }

      const element = document.createElement(tagName);

      if (data) {
        element.appendChild(document.createTextNode(data));
      }

      if (parentNode) {
        parentNode.appendChild(element);
      } else {
        this.shadowRoot.appendChild(element);
      }

      return element;
    }
  }

  customElements.define('github-repo', GitHubRepo);
}
