import _ from 'lodash';

import fileParse from './parsers.js';

const findDiff = (content1, content2) => {
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
    const value1 = sortedContent1[diffKey];
    const value2 = sortedContent2[diffKey];
    acc.push([diffKey, value1, value2]);
    return acc;
  }, []);
  return diff;
};

const formObjDiff = (data) => {
  const diffAsObj = data.reduce((acc, [key, value1, value2]) => {
    let specSymbol;
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      specSymbol = '  ';
      acc[`${specSymbol}${key}`] = formObjDiff(findDiff(value1, value2));
      return acc;
    }
    if (value1 === value2) {
      specSymbol = '  ';
      acc[`${specSymbol}${key}`] = value1;
      return acc;
    } if (value1 === undefined) {
      specSymbol = '+ ';
      acc[`${specSymbol}${key}`] = value2;
      return acc;
    } if (value2 === undefined) {
      specSymbol = '- ';
      acc[`${specSymbol}${key}`] = value1;
      return acc;
    }
    specSymbol = '- ';
    acc[`${specSymbol}${key}`] = value1;
    specSymbol = '+ ';
    acc[`${specSymbol}${key}`] = value2;
    return acc;
  }, {});
  return diffAsObj;
};

export default (filepath1, filepath2) => {
  const content1 = fileParse(filepath1);
  const content2 = fileParse(filepath2);
  const diff = formObjDiff(findDiff(content1, content2));
  return diff;
};
