import fs from 'fs';
import path from 'path';
import getParser from './parsers/factory';
import diff from './diff';
import stringify from './stringify';

const run = (firstConfig, secondConfig) => {
  const fileFormat = path.extname(firstConfig);
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const parser = getParser(fileFormat);

  const parsedData1 = parser(data1);
  const parsedData2 = parser(data2);

  const normalizedData = diff(parsedData1, parsedData2);
  return stringify(normalizedData);
};

export default run;
