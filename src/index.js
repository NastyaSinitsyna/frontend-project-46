import fs from 'node:fs';
import path from 'node:path';

import fileParse from './parsers.js';
import gendiff from './gendiff.js';
import getFormat from './formatters/getFormat.js';

const getFileData = (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const fileType = path.extname(absFilepath).slice(1);
  const content = fs.readFileSync(absFilepath, 'utf8');
  return { content, fileType };
};

export default (filepath1, filepath2, format = 'stylish') => {
  const content1 = fileParse(getFileData(filepath1));
  const content2 = fileParse(getFileData(filepath2));
  return getFormat(gendiff(content1, content2), format);
};
