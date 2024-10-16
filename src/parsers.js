import yaml from 'js-yaml';

export default (fileData) => {
  const { content, extention } = fileData;
  switch (extention) {
    case 'json':
      return JSON.parse(content);
    default:
      return yaml.load(content);
  }
};
