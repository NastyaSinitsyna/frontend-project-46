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
  'stylish',
  'plain',
  'json',
])('gendiff in $format format', (format) => {
  expect(gendiff(jsonFilepath1, jsonFilepath2, format)).toBe(expectedStylishDiff);
  expect(gendiff(yamlFilepath1, yamlFilepath2, format)).toBe(expectedStylishDiff);
  expect(gendiff(jsonFilepath1, jsonFilepath2, format)).toBe(expectedPlainDiff);
  expect(gendiff(yamlFilepath1, yamlFilepath2, format)).toBe(expectedPlainDiff);
  expect(gendiff(jsonFilepath1, jsonFilepath2, format)).toBe(expectedJsonDiff);
  expect(gendiff(yamlFilepath1, yamlFilepath2, format)).toBe(expectedJsonDiff);
});
