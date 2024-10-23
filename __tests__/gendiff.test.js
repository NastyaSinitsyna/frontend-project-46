import fs from 'node:fs';
import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../index.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const getFileContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf8');

const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');

const expectedStylishDiff = getFileContent('expected.stylish.diff.txt');
const expectedPlainDiff = getFileContent('expected.plain.diff.txt');
const expectedJsonDiff = getFileContent('expected.json.diff.txt');

test.each([
  {
    filePath1: jsonFilepath1,
    filePath2: jsonFilepath2,
    format: 'stylish',
    expected: expectedStylishDiff,
  },
  {
    filePath1: yamlFilepath1,
    filePath2: yamlFilepath2,
    format: 'stylish',
    expected: expectedStylishDiff,
  },
  {
    filePath1: jsonFilepath1,
    filePath2: jsonFilepath2,
    format: 'plain',
    expected: expectedPlainDiff,
  },
  {
    filePath1: yamlFilepath1,
    filePath2: yamlFilepath2,
    format: 'plain',
    expected: expectedPlainDiff,
  },
  {
    filePath1: jsonFilepath1,
    filePath2: jsonFilepath2,
    format: 'json',
    expected: expectedJsonDiff,
  },
  {
    filePath1: yamlFilepath1,
    filePath2: yamlFilepath2,
    format: 'json',
    expected: expectedJsonDiff,
  },
])('gendiff in $format format', ({
  filePath1, filePath2, format, expected,
}) => {
  expect(gendiff(filePath1, filePath2, format)).toBe(expected);
});
