import gendiff from '../gendiff.js';

import fileParse from '../parsers.js';

import stylish from './stylish.js';

import plain from './plain.js';

import json from './json.js';

export default (filepath1, filepath2, format) => {
  const content1 = fileParse(filepath1);
  const content2 = fileParse(filepath2);
  if (format === 'stylish') {
    return stylish(gendiff(content1, content2));
  }
  if (format === 'plain') {
    return plain(gendiff(content1, content2));
  }
  if (format === 'json') {
    return json(gendiff(content1, content2));
  }
  return 'error: unknown format';
};
