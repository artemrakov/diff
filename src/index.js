import fs from 'fs';
import path from 'path';
import getParser from './parsers';
import buildDiff from './diff';
import getFormatter from './formatters';

const gendiff = (firstFilePath, secondFilePath, format = 'tree') => {
  const fileExtention = path.extname(firstFilePath).replace('.', '');
  const data1 = fs.readFileSync(firstFilePath, 'utf8');
  const data2 = fs.readFileSync(secondFilePath, 'utf8');

  const parse = getParser(fileExtention);

  const parsedData1 = parse(data1);
  const parsedData2 = parse(data2);

  const diff = buildDiff(parsedData1, parsedData2);

  const stringify = getFormatter(format);
  return stringify(diff);
};

export default gendiff;
