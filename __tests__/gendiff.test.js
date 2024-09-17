import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../src/gendiff.js';
import stylish from '../src/stylish.js';
import plain from '../src/plain.js';

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

test('should return diff of nested files in stylish format', () => {
  const diffJson = stylish(gendiff(jsonFilepath1, jsonFilepath2));
  const diffYAML = stylish(gendiff(yamlFilepath1, yamlFilepath2));
  const expectedDiff = `{
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
  expect(diffJson).toBe(expectedDiff);
  expect(diffYAML).toBe(expectedDiff);
});

test('should return diff of plain files in stylish format', () => {
  const diffJson = stylish(gendiff(jsonFilepath3, jsonFilepath4));
  const diffYAML = stylish(gendiff(yamlFilepath3, yamlFilepath4));
  const expectedDiff = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  expect(diffJson).toBe(expectedDiff);
  expect(diffYAML).toBe(expectedDiff);
});

test('should return diff of nested files in plain format', () => {
  const diffJson = plain(gendiff(jsonFilepath1, jsonFilepath2));
  const diffYAML = plain(gendiff(yamlFilepath1, yamlFilepath2));
  const expectedDiff = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  expect(diffJson).toBe(expectedDiff);
  expect(diffYAML).toBe(expectedDiff);
});

test('should return diff of plain files in plain format', () => {
  const diffJson = plain(gendiff(jsonFilepath3, jsonFilepath4));
  const diffYAML = plain(gendiff(yamlFilepath3, yamlFilepath4));
  const expectedDiff = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;
  expect(diffJson).toBe(expectedDiff);
  expect(diffYAML).toBe(expectedDiff);
});
