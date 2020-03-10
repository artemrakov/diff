import fs from 'fs';
import path from 'path';
import gendiff from '../src';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('get difference between 2 files', () => {
  const beforeFilePath = getFixturePath('before.json');
  const afterFilePath = getFixturePath('after.json');
  const expectedResult = readFile('result.txt');

  const result = gendiff(beforeFilePath, afterFilePath);

  expect(result).toEqual(expectedResult);
});
