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
    format: 'stylish',
    expected: expectedStylishDiff,
  },
  {
    format: 'plain',
    expected: expectedPlainDiff,
  },
  {
    format: 'json',
    expected: expectedJsonDiff,
  },
])('gendiff in $format format for json files', ({ format, expected }) => {
  expect(gendiff(jsonFilepath1, jsonFilepath2, format)).toBe(expected);
});

test.each([
  {
    format: 'stylish',
    expected: expectedStylishDiff,
  },
  {
    format: 'plain',
    expected: expectedPlainDiff,
  },
  {
    format: 'json',
    expected: expectedJsonDiff,
  },
])('gendiff in $format format for yaml files', ({ format, expected }) => {
  expect(gendiff(yamlFilepath1, yamlFilepath2, format)).toBe(expected);
});
