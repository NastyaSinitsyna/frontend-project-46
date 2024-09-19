import gendiff from '../src/gendiff.js';

import stylish from './stylish.js';

import plain from './plain.js';

import json from './json.js';

const getFormatDiff = (filepath1, filepath2, format) => {
  if (format === 'stylish') {
    return stylish(gendiff(filepath1, filepath2));
  }
  if (format === 'plain') {
    return plain(gendiff(filepath1, filepath2));
  }
  if (format === 'json') {
    return json(gendiff(filepath1, filepath2));
  }
  return 'error: unknown format';
};
export default getFormatDiff;
