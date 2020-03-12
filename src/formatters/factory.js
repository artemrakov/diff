import plain from './plain';
import tree from './tree';

const getFormatter = (format) => {
  switch (format) {
    case 'tree':
      return tree;
    case 'plain':
      return plain;
    default:
      throw new Error(`Unknown formatter format: ${format}`);
  }
};

export default getFormatter;
