import { parse } from 'yaml';

const frontMatterPattern = /^[-]{3}.+?[-]{3}/s;

const parseFrontMatter = (content: string) => {
  if (!frontMatterPattern.test(content)) {
    return {
      content
    };
  }

  const [matches] = content.match(frontMatterPattern);

  const data = parse(matches.replace(/[\-]{3}/g, '').trim());

  return {
    data,
    content: content.replace(frontMatterPattern, '').trim()
  };
};

export default parseFrontMatter;
