import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../src/gendiff.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');

const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');

const diff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff', () => {
  expect(gendiff(jsonFilepath1, jsonFilepath2)).toBe(diff);
  expect(gendiff(yamlFilepath1, yamlFilepath2)).toBe(diff);
});
