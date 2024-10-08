import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const getFileData = (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const extention = path.extname(absFilepath);
  const content = fs.readFileSync(absFilepath, 'utf8');
  return { content, extention };
};

export default (filepath) => {
  const fileData = getFileData(filepath);
  if (fileData.extention.includes('json')) {
    return JSON.parse(fileData.content);
  }
  return yaml.load(fileData.content);
};
