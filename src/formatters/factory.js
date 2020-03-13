import plain from './plain';
import tree from './tree';
import json from './json';

const getFormatter = (format) => {
  const formats = {
    'tree': tree,
    'json': json,
    'plain': plain
  };

  return formats[format];
};

export default getFormatter;
