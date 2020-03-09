import fs from 'fs';
import parseData from './parser';
import diff from './diff';

const run = (firstConfig, secondConfig) => {
  const data1 = fs.readFileSync(firstConfig, 'utf8');
  const data2 = fs.readFileSync(secondConfig, 'utf8');

  const parsedData1 = parseData(data1);
  const parsedData2 = parseData(data2);

  console.log(parsedData1);
  console.log(parsedData2);

  const comparedData = diff(parsedData1, parsedData2);
};


run('src/before.json', 'src/after.json');

// export default run;
