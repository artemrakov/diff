import plain from './plain';
import tree from './tree';
import json from './json';

const getFormatter = (format) => {
  switch (format) {
    case 'tree':
      return tree;
    case 'plain':
      return plain;
    case 'json':
      return json;
    default:
      throw new Error(`Unknown formatter format: ${format}`);
  }
};

export default getFormatter;
