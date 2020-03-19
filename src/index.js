import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildDiff from './diff';
import getFormatter from './formatters';

const gendiff = (firstConfig, secondConfig, format = 'tree') => {
  const fileExtention = path.extname(firstConfig);
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const parse = getParser(fileExtention);

  const parsedData1 = parse(data1);
  const parsedData2 = parse(data2);

  const diff = buildDiff(parsedData1, parsedData2);

  const formatParse = getFormatter(format);
  return formatParse(diff);
};

export default gendiff;
