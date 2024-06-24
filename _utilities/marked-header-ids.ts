const markedHeaderIds = () => ({
  useNewRenderer: true,
  renderer: {
    heading({ text, depth }) {
      if (depth === 2) {
        const escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');

        return `<h${depth} id="${escapedText}"><a href="#${escapedText}">${text}</a></h${depth}>`;
      }

      return `<h${depth}>${text}</h${depth}>`;
    }
  }
});

export default markedHeaderIds;
