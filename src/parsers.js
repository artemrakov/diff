import ini from 'ini';
import yaml from 'js-yaml';
import _ from 'lodash';

const iniParse = (data) => {
  const REGEX_FOR_NUMBER = /^-?[\d.]+(?:e-?\d+)?$/;
  const parsedData = ini.parse(data);

  const objectParse = (data) => {
    const result = Object.keys(data).reduce((acc, key) => {
      const element = data[key];

      if (_.isObject(element)) {
        return { ...acc, [key]: objectParse(element) };
      }

      // rare case in json file ini parser parse number as string
      const value = REGEX_FOR_NUMBER.test(element) ? parseInt(element, 10) : element;
      return { ...acc, [key]: value };
    }, {});

    return result;
  };

  return objectParse(parsedData);
};


const getParser = (parseFormat) => {
  switch (parseFormat) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.safeLoad;
    case '.ini':
      return iniParse;
    default:
      throw new Error(`Unknown parse format: ${parseFormat}`);
  }
};

export default getParser;
