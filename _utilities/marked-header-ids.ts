const markedHeaderIds = () => ({
  useNewRenderer: true,
  renderer: {
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      const level = token.depth;

      if (level === 2) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return `<h${level} id="${escapedText}"><a href="#${escapedText}">${text}</a></h${level}>`;
      }

      return `<h${level}>${text}</h${level}>`;
    }
  }
});

export default markedHeaderIds;
