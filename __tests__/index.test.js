import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const cases = [
  [ 'tree', 'json', 'results/tree.txt' ],
  [ 'tree', 'yml', 'results/tree.txt' ],
  [ 'tree', 'ini', 'results/tree.txt' ],
  [ 'plain', 'json', 'results/plain.txt' ],
  [ 'plain', 'yml', 'results/plain.txt' ],
  [ 'plain', 'ini', 'results/plain.txt' ],
  [ 'json', 'json', 'results/json.txt' ],
  [ 'json', 'yml', 'results/json.txt' ],
  [ 'json', 'ini', 'results/json.txt' ]
]

describe('difference between 2 files', () => {
  test.each(cases)("return diff in %p format given files in %p",
    (resultFormat, givenFileFormat, resultPath) => {
      const beforeFilePath = getFixturePath(`before.${givenFileFormat}`);
      const afterFilePath = getFixturePath(`after.${givenFileFormat}`);
      const expectedResult = readFile(resultPath);

      const result = gendiff(beforeFilePath, afterFilePath, resultFormat);

      expect(result).toEqual(expectedResult);
    })
});

