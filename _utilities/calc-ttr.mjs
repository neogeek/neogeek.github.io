const averageWPM = 240;

/**
 * @param {string} content
 * @returns {string}
 */
const calculateTimeToRead = content => {
  const words = content
    .replace(/(<([^>]+)>)/gi, '')
    .replace(/```.+?```/gs, '')
    .split(/[ ]+/).length;

  const ttr = Math.ceil(words / averageWPM);

  return ttr > 0 ? `${ttr} ${ttr === 1 ? 'minute' : 'minutes'}` : '';
};

export default calculateTimeToRead;
