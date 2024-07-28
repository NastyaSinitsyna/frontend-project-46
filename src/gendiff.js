import _ from 'lodash';

import fileParse from './parsers.js';

import stylish from './stylish.js';

export default (filepath1, filepath2) => {
  const content1 = fileParse(filepath1);
  const content2 = fileParse(filepath2);

  const keys1 = Object.keys(content1).sort();
  const keys2 = Object.keys(content2).sort();

  const sortedContent1 = keys1.reduce((acc, key1) => {
    acc[key1] = content1[key1];
    return acc;
  }, {});
  const sortedContent2 = keys2.reduce((acc, key2) => {
    acc[key2] = content2[key2];
    return acc;
  }, {});
  const diffKeys = _.union(keys1, keys2);

  const diff = diffKeys.reduce((acc, diffKey) => {
    const value1 = sortedContent1[diffKey];
    const value2 = sortedContent2[diffKey];
    acc.push([diffKey, value1, value2]);
    return acc;
  }, []);
  console.log(diff);

  const formattedDiff = stylish(diff);

  return formattedDiff;
};
