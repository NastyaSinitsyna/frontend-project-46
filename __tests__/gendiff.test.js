import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../src/gendiff.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const filepath1 = getFixturePath('file1.json');
const filepath2 = getFixturePath('file2.json');

const diff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('gendiff', () => {
  expect(gendiff(filepath1, filepath2)).toBe(diff); // tests here to be put
});
