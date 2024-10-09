import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, test } from '@jest/globals';
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

describe.each([
  {
    a: jsonFilepath1,
    b: jsonFilepath2,
    expected: expectedStylishDiff,
  },
  {
    a: yamlFilepath1,
    b: yamlFilepath2,
    expected: expectedStylishDiff,
  },
])('gendiff in stylish format', ({ a, b, expected }) => {
  test('should return stylish diff for json files', () => {
    expect(gendiff(a, b, 'stylish')).toBe(expected);
  });

  test('should return stylish diff for yaml files', () => {
    expect(gendiff(a, b, 'stylish')).toBe(expected);
  });
});

describe.each([
  {
    a: jsonFilepath1,
    b: jsonFilepath2,
    expected: expectedPlainDiff,
  },
  {
    a: yamlFilepath1,
    b: yamlFilepath2,
    expected: expectedPlainDiff,
  },
])('gendiff in plain format', ({ a, b, expected }) => {
  test('should return plain diff for json files', () => {
    expect(gendiff(a, b, 'plain')).toBe(expected);
  });

  test('should return plain diff for yaml files', () => {
    expect(gendiff(a, b, 'plain')).toBe(expected);
  });
});

describe.each([
  {
    a: jsonFilepath1,
    b: jsonFilepath2,
    expected: expectedJsonDiff,
  },
  {
    a: yamlFilepath1,
    b: yamlFilepath2,
    expected: expectedJsonDiff,
  },
])('gendiff in json format', ({ a, b, expected }) => {
  test('should return json diff for json files', () => {
    expect(gendiff(a, b, 'json')).toBe(expected);
  });

  test('should return json diff for yaml files', () => {
    expect(gendiff(a, b, 'json')).toBe(expected);
  });
});
