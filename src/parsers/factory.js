import jsonParser from './json_parser';
import yamlParser from './yaml_parser';
import iniParser from './ini_parser';

const getParser = (fileFormat) => {
  switch (fileFormat) {
    case '.json':
      return jsonParser;
    case '.yml':
      return yamlParser;
    case '.ini':
      return iniParser;
    default:
      throw new Error(`Unknown file format: ${fileFormat}`);
  }
};

export default getParser;
