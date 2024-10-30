import fs from 'node:fs';
import path from 'node:path';

import gendiff from '../gendiff.js';
import fileParse from '../parsers.js';
import stylish from './stylish.js';
import plain from './plain.js';

const getFileData = (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const extention = path.extname(absFilepath);
  const content = fs.readFileSync(absFilepath, 'utf8');
  return { content, extention };
};

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fileParse(getFileData(filepath1));
  const content2 = fileParse(getFileData(filepath2));
  if (format === 'stylish') {
    return stylish(gendiff(content1, content2));
  }
  if (format === 'plain') {
    return plain(gendiff(content1, content2));
  }
  if (format === 'json') {
    return JSON.stringify(gendiff(content1, content2), null, 2);
  }
  return 'error: unknown format';
};
