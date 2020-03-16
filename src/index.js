import fs from 'fs';
import path from 'path';
import getParser from './parsers/factory';
import diff from './diff';
import getFormatter from './formatters/factory';

const gendiff = (firstConfig, secondConfig, format = 'tree') => {
  const fileFormat = path.extname(firstConfig);
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const parser = getParser(fileFormat);

  const parsedData1 = parser(data1);
  const parsedData2 = parser(data2);

  const normalizedData = diff(parsedData1, parsedData2);

  const formatter = getFormatter(format);
  return formatter(normalizedData);
};

export default gendiff;
