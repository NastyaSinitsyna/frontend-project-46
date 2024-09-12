import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../src/gendiff.js';
import stylish from '../src/stylish.js';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const jsonFilepath1 = getFixturePath('file1.json');
const jsonFilepath2 = getFixturePath('file2.json');
// for plain files JSON
const jsonFilepath3 = getFixturePath('file3.json');
const jsonFilepath4 = getFixturePath('file4.json');

const yamlFilepath1 = getFixturePath('file1.yml');
const yamlFilepath2 = getFixturePath('file2.yml');
// for plain files YML
const yamlFilepath3 = getFixturePath('file3.yml');
const yamlFilepath4 = getFixturePath('file4.yml');

const diff1 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

// for plain files
const diff2 = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

const diffJson1 = stylish(gendiff(jsonFilepath1, jsonFilepath2));
const diffYAML1 = stylish(gendiff(yamlFilepath1, yamlFilepath2));
test('gendiff', () => {
  expect(diffJson1).toBe(diff1);
  expect(diffYAML1).toBe(diff1);
});

// for plain files
const diffJson2 = stylish(gendiff(jsonFilepath3, jsonFilepath4));
const diffYAML2 = stylish(gendiff(yamlFilepath3, yamlFilepath4));
test('gendiff2', () => {
  expect(diffJson2).toBe(diff2);
  expect(diffYAML2).toBe(diff2);
});
