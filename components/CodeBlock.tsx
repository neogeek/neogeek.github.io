import hljs from 'highlight.js/lib/core';

import bash from 'highlight.js/lib/languages/bash';
import csharp from 'highlight.js/lib/languages/csharp';
import css from 'highlight.js/lib/languages/css';
import javascript from 'highlight.js/lib/languages/javascript';
import json from 'highlight.js/lib/languages/json';
import typescript from 'highlight.js/lib/languages/typescript';
import yaml from 'highlight.js/lib/languages/yaml';

hljs.registerLanguage('bash', bash);
hljs.registerLanguage('csharp', csharp);
hljs.registerLanguage('css', css);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('json', json);
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('yaml', yaml);

export default function CodeBlock({ children }: any): JSX.Element {
  return (
    <pre>
      <code
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(children.props.children, {
            language: children.props.className.replace(/language\-/, ''),
          }).value,
        }}
      />
    </pre>
  );
}
