import path from 'node:path';
import { expect, test } from '@jest/globals';
import url from 'url';
import gendiff from '../index.js';
// import stylish from '../formatters/stylish.js';
// import plain from '../formatters/plain.js';
// import json from '../formatters/json.js';

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
  const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'stylish');
  const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'stylish');
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
  const diffJson = gendiff(jsonFilepath3, jsonFilepath4, 'stylish');
  const diffYAML = gendiff(yamlFilepath3, yamlFilepath4, 'stylish');
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
  const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'plain');
  const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'plain');
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
  const diffJson = gendiff(jsonFilepath3, jsonFilepath4, 'plain');
  const diffYAML = gendiff(yamlFilepath3, yamlFilepath4, 'plain');
  const expectedDiff = `Property 'follow' was removed
Property 'proxy' was removed
Property 'timeout' was updated. From 50 to 20
Property 'verbose' was added with value: true`;
  expect(diffJson).toBe(expectedDiff);
  expect(diffYAML).toBe(expectedDiff);
});

// test('should return diff of nested files in json format', () => {
  // const diffJson = gendiff(jsonFilepath1, jsonFilepath2, 'json');
  // const diffYAML = gendiff(yamlFilepath1, yamlFilepath2, 'json');
  // const expectedDiff = `{
  // "diffKey": "common",
  // "preValue": {
  //   "setting1": "Value 1",
  //   "setting2": 200,
  //   "setting3": true,
  //   "setting6": {
  //     "key": "value",
  //     "doge": {
  //       "wow": ""
  //     }
  //   }
  // },
  // "curValue": {
  //   "follow": false,
  //   "setting1": "Value 1",
  //   "setting3": null,
  //   "setting4": "blah blah",
  //   "setting5": {
  //     "key5": "value5"
  //   },
  //   "setting6": {
  //     "key": "value",
  //     "ops": "vops",
  //     "doge": {
//         "wow": "so much"
//       }
//     }
//   }
// };
// {
//   "diffKey": "group1",
//   "preValue": {
//     "baz": "bas",
//     "foo": "bar",
//     "nest": {
//       "key": "value"
//     }
//   },
//   "curValue": {
//     "foo": "bar",
//     "baz": "bars",
//     "nest": "str"
//   }
// };
// {
//   "diffKey": "group2",
//   "preValue": {
//     "abc": 12345,
//     "deep": {
//       "id": 45
//     }
//   }
// };
// {
//   "diffKey": "group3",
//   "curValue": {
//     "deep": {
//       "id": {
//         "number": 45
//       }
//     },
//     "fee": 100500
//   }
// }`;
//   expect(diffJson).toBe(expectedDiff);
//   expect(diffYAML).toBe(expectedDiff);
// });

// test('should return diff of plain files in json format', () => {
//   const diffJson = gendiff(jsonFilepath3, jsonFilepath4, 'json');
//   const diffYAML = gendiff(yamlFilepath3, yamlFilepath4, 'json');
//   const expectedDiff = `{
//   "diffKey": "follow",
//   "preValue": false
// };
// {
//   "diffKey": "host",
//   "preValue": "hexlet.io",
//   "curValue": "hexlet.io"
// };
// {
//   "diffKey": "proxy",
//   "preValue": "123.234.53.22"
// };
// {
//   "diffKey": "timeout",
//   "preValue": 50,
//   "curValue": 20
// };
// {
//   "diffKey": "verbose",
//   "curValue": true
// }`;
//   expect(diffJson).toBe(expectedDiff);
//   expect(diffYAML).toBe(expectedDiff);
// });
