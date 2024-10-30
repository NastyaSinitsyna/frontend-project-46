import yaml from 'js-yaml';

export default (fileData) => {
  const { content, extention } = fileData;
  switch (extention) {
    case '.json':
      return JSON.parse(content);
    case '.yaml':
    case '.yml':
      return yaml.load(content);
    default:
      throw new Error('Unknown format');
  }
};
