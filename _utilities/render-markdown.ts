import { Marked } from 'marked';

import markedFootnote from 'marked-footnote';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js';

const marked = new Marked(
  markedFootnote(),
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const renderMarkdown = async (contents: string) => await marked.parse(contents);

export default renderMarkdown;
