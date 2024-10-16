import yaml from 'js-yaml';

export default (fileData) => {
  const { content, extention } = fileData;
  if (extention.includes('json')) {
    return JSON.parse(content);
  }
  return yaml.load(content);
};
