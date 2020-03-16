import ini from 'ini';

const REGEX_FOR_NUMBER = /^-?[\d.]+(?:e-?\d+)?$/;

const buildValue = (element) => {
  if (!_.isObject(element)) {
    return element;
  }

  // needed for rare case with ini files
  const transform = (item) => (REGEX_FOR_NUMBER.test(item) ? parseInt(item, 10) : item);
  const keys = Object.keys(element);
  return keys.reduce((acc, key) => ({ ...acc, [key]: transform(element[key]) }), {});
};

export default (data) => {
  const parsedData = ini.parse(data);

  console.log(parsedData);
}
