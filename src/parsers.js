import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

export default (filepath) => {
  const absFilepath = path.resolve(process.cwd(), filepath);
  const extention = path.extname(absFilepath);
  const content = fs.readFileSync(absFilepath, 'utf8');
  if (extention.includes('json')) {
    return JSON.parse(content);
  }
  return yaml.load(content);
};
