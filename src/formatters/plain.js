import gendiff from '../gendiff.js';

export const getFullKey = (root, coll) => {
  const entries = Object.entries(coll);
  const newColl = entries.reduce((acc, [key, value]) => {
    const newAcc = { ...acc, [`${root}.${key}`]: value };
    return newAcc;
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
  const formattedDiff = data
    .map((dataItem) => {
      const { diffKey, preValue, curValue } = dataItem;
      if (typeof curValue === 'object' && typeof preValue === 'object') {
        const newData = gendiff(getFullKey(diffKey, preValue), getFullKey(diffKey, curValue));
        return plain(newData);
      }
      if (preValue === undefined) {
        return `Property '${diffKey}' was added with value: ${formatValue(curValue)}`;
      }
      if (curValue === undefined) {
        return `Property '${diffKey}' was removed`;
      }
      if (preValue !== curValue) {
        return `Property '${diffKey}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`;
      }
      return 'No change';
    })
    .filter((dataItem) => dataItem !== 'No change');
  const result = formattedDiff.join('\n');
  return result;
};

export default plain;
