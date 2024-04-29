import _ from 'lodash';

import fileParse from './parsers.js';

export default (filepath1, filepath2) => {
  const content1 = fileParse(filepath1);
  const content2 = fileParse(filepath2);

  const keys1 = Object.keys(content1).sort();
  const keys2 = Object.keys(content2).sort();

  const content1Sorted = keys1.reduce((acc, key1) => {
    acc[key1] = content1[key1];
    return acc;
  }, {});
  const content2Sorted = keys2.reduce((acc, key2) => {
    acc[key2] = content2[key2];
    return acc;
  }, {});

  const diffKeys = _.union(keys1, keys2);

  const diff = diffKeys.reduce((acc, diffKey) => {
    const value1 = content1Sorted[diffKey];
    const value2 = content2Sorted[diffKey];
    if (value1 === value2) {
      const key = `  ${diffKey}`;
      acc[key] = value1;
      return acc;
    } if (!value2) {
      const key = `- ${diffKey}`;
      acc[key] = value1;
      return acc;
    } if (!value1) {
      const key = `+ ${diffKey}`;
      acc[key] = value2;
      return acc;
    }
    const key1 = `- ${diffKey}`;
    acc[key1] = value1;
    const key2 = `+ ${diffKey}`;
    acc[key2] = value2;
    return acc;
  }, {});

  const entries = Object.entries(diff);
  const diffAsString = entries.reduce((acc, [key, value]) => {
    const newAcc = acc.concat(`  ${key}: ${value}\n`);
    return newAcc;
  }, '');
  const diffFormatted = `{\n${diffAsString}}`;
  return diffFormatted;
};
