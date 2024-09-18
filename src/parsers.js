import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const extention = path.extname(absFilepath);
  const content = fs.readFileSync(absFilepath, 'utf8');
  const result = (extention.includes('json')) ? JSON.parse(content) : yaml.load(content);
  console.log(result);
  return result;
};
