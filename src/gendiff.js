import _ from 'lodash';

import fileParse from './parsers.js';

export const findDiff = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const sortedContent1 = keys1.reduce((acc, key1) => {
    acc[key1] = content1[key1];
    return acc;
  }, {});
  const sortedContent2 = keys2.reduce((acc, key2) => {
    acc[key2] = content2[key2];
    return acc;
  }, {});
  const diffKeys = _.union(keys1, keys2).sort();
  const diff = diffKeys.reduce((acc, diffKey) => {
    const preValue = sortedContent1[diffKey];
    const curValue = sortedContent2[diffKey];
    acc.push({ diffKey, preValue, curValue });
    return acc;
  }, []);
  return diff;
};

export default (filepath1, filepath2) => {
  const content1 = fileParse(filepath1);
  const content2 = fileParse(filepath2);
  const diff = findDiff(content1, content2);
  return diff;
};
