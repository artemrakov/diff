import fs from 'fs';
import parse from './parser';
import diff from './diff';
import stringify from './stringify';

const run = (firstConfig, secondConfig) => {
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const parsedData1 = parse(data1);
  const parsedData2 = parse(data2);

  const normalizedData = diff(parsedData1, parsedData2);
  return stringify(normalizedData);
};

export default run;
