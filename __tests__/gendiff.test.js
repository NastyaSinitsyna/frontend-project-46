import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const expectedStylishDiff = getFileContent('expected.stylish.diff.txt');
const expectedPlainDiff = getFileContent('expected.plain.diff.txt');
const expectedJsonDiff = getFileContent('expected.json.diff.txt');

test.each([
  'json',
  'yml',
])('gendiff for %s files', (format) => {
  const filePath1 = getFixturePath(`file1.${format}`);
  const filePath2 = getFixturePath(`file2.${format}`);

  expect(gendiff(filePath1, filePath2, 'stylish')).toBe(expectedStylishDiff);
  expect(gendiff(filePath1, filePath2, 'plain')).toBe(expectedPlainDiff);
  expect(gendiff(filePath1, filePath2, 'json')).toBe(expectedJsonDiff);
});
