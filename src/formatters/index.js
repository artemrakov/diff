import plain from './plain';
import tree from './tree';

const getFormatter = (format) => {
  const formats = {
    tree,
    plain,
    json: JSON.stringify,
  };

  return formats[format];
};

export default getFormatter;
