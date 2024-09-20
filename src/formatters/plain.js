import gendiff from '../gendiff.js';

export const getFullKey = (root, coll) => {
  const entries = Object.entries(coll);
  const newColl = entries.reduce((acc, [key, value]) => {
    acc[`${root}.${key}`] = value;
    return acc;
  }, {});
  return newColl;
};

const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff) => {
  const data = Object.values(diff);
  const fomattedDiff = data.reduce((acc, dataItem) => {
    const { diffKey, preValue, curValue } = dataItem;
    if (typeof curValue === 'object' && typeof preValue === 'object') {
      const newData = gendiff(getFullKey(diffKey, preValue), getFullKey(diffKey, curValue));
      acc.push(plain(newData));
    } else if (preValue === undefined) {
      acc.push(`Property '${diffKey}' was added with value: ${formatValue(curValue)}`);
    } else if (curValue === undefined) {
      acc.push(`Property '${diffKey}' was removed`);
    } else if (preValue !== curValue) {
      acc.push(`Property '${diffKey}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`);
    }
    return acc;
  }, []);
  const result = fomattedDiff.join(`\n`);
  return result;
};

export default plain;
