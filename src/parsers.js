import yaml from 'js-yaml';

export default (fileData) => {
  const { content, fileType } = fileData;
  switch (fileType) {
    case 'json':
      return JSON.parse(content);
    case 'yaml':
    case 'yml':
      return yaml.load(content);
    default:
      throw new Error('Unknown format');
  }
};
