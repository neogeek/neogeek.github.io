import { Marked } from 'marked';

import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js';

const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const renderMarkdown = contents => marked.parse(contents);

export default renderMarkdown;
