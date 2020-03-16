import ini from 'ini';
import _ from 'lodash';

const REGEX_FOR_NUMBER = /^-?[\d.]+(?:e-?\d+)?$/;

const objectParser = (data) => {
  const result = Object.keys(data).reduce((acc, key) => {
    const element = data[key];

    if (_.isObject(element)) {
      return { ...acc, [key]: objectParser(element) };
    }

    // rare case in json file ini parser parse number as string
    const value = REGEX_FOR_NUMBER.test(element) ? parseInt(element, 10) : element;
    return { ...acc, [key]: value }
  }, {});

  return result;
};

export default (data) => {
  const parsedData = ini.parse(data);

  return objectParser(parsedData);
}
