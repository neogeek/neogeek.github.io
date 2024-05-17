{
  const css = content => content;

  const delayBeforeHidingCopyCheckmark = 1000;

  const styles = css`
    @import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/github.min.css')
    (prefers-color-scheme: light);

    @import url('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/base16/dracula.min.css')
    (prefers-color-scheme: dark);

    div {
      position: relative;
    }

    pre {
      margin: 2rem 0;
      font-family: inherit;
      font-size: 1rem;
      user-select: all;
    }

    button {
      position: absolute;
      top: 1rem;
      right: 1rem;
      padding: 0;
      font-size: 1rem;
      border: none;
      background: none;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.5;
    }

    @media (prefers-color-scheme: dark) {
      svg {
        fill: #fff;
      }

      button.active svg {
        stroke: #fff;
      }
    }

    @media (prefers-color-scheme: light) {
      svg {
        fill: #000;
      }

      button.active svg {
        stroke: #000;
      }
    }
  `;

  const createSVGClipboard = () => {
    const xmlNS = 'http://www.w3.org/2000/svg';

    const svgClipboard = document.createElementNS(xmlNS, 'svg');

    svgClipboard.setAttribute('height', '1.5em');
    svgClipboard.setAttribute('viewBox', '0 0 384 512');

    svgClipboard.appendChild(
      document.createComment(
        'Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc.'
      )
    );

    const svgClipboardPath = document.createElementNS(xmlNS, 'path');

    svgClipboardPath.setAttribute(
      'd',
      'M280 64H320C355.3 64 384 92.7 384 128V448C384 483.3 355.3 512 320 512H64C28.7 512 0 483.3 0 448V128C0 92.7 28.7 64 64 64H104H113.6C121 27.5 153.3 0 192 0C230.7 0 263 27.5 270.4 64H280ZM64 112C55.2 112 48 119.2 48 128V448C48 456.8 55.2 464 64 464H320C328.8 464 336 456.8 336 448V128C336 119.2 328.8 112 320 112H304V136C304 149.3 293.3 160 280 160H192H104C90.7 160 80 149.3 80 136V112H64ZM192 104C198.365 104 204.47 101.471 208.971 96.9706C213.471 92.4697 216 86.3652 216 80C216 73.6348 213.471 67.5303 208.971 63.0294C204.47 58.5286 198.365 56 192 56C185.635 56 179.53 58.5286 175.029 63.0294C170.529 67.5303 168 73.6348 168 80C168 86.3652 170.529 92.4697 175.029 96.9706C179.53 101.471 185.635 104 192 104Z'
    );

    svgClipboard.appendChild(svgClipboardPath);

    const svgCheckMarkPath = document.createElementNS(xmlNS, 'path');

    svgCheckMarkPath.setAttribute('d', 'M121 328.892L161.343 369L274 257');
    svgCheckMarkPath.setAttribute('fill', 'none');
    svgCheckMarkPath.setAttribute('stroke-width', '40');
    svgCheckMarkPath.setAttribute('stroke-linecap', 'round');
    svgCheckMarkPath.setAttribute('stroke-linejoin', 'round');

    svgClipboard.appendChild(svgCheckMarkPath);

    return svgClipboard;
  };

  class CopyToClipboard extends HTMLElement {
    connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });

      const style = document.createElement('style');

      style.appendChild(document.createTextNode(styles));

      shadow.appendChild(style);

      const preTags = Array.from(this.querySelectorAll('pre'));

      preTags.forEach(preTag => {
        const div = document.createElement('div');

        const button = document.createElement('button');

        button.appendChild(createSVGClipboard().cloneNode(true));

        button.addEventListener('click', () => {
          if (preTag.textContent) {
            navigator.clipboard.writeText(preTag.textContent);

            button.classList.add('active');

            setTimeout(() => {
              button.classList.remove('active');
            }, delayBeforeHidingCopyCheckmark);
          }
        });

        div.appendChild(button);

        div.appendChild(preTag);

        shadow.appendChild(div);
      });
    }
  }

  customElements.define('copy-to-clipboard', CopyToClipboard);
}
