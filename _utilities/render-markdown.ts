import { Marked } from 'marked';

import markedFootnote from 'marked-footnote';
import { markedHighlight } from 'marked-highlight';

import hljs from 'highlight.js';

import markedHeaderIds from './marked-header-ids.js';

const marked = new Marked(
  markedFootnote(),
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  }),
  markedHeaderIds()
);

const renderMarkdown = async (contents: string) => await marked.parse(contents);

export default renderMarkdown;
