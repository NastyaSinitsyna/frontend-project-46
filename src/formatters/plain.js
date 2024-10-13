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
  const formattedDiff = diff
    .map((diffItem) => {
      const diffKey = Object.keys(diffItem).toString();
      const diffData = diffItem[diffKey];
      const { status, preValue, curValue } = diffData;
      if (Array.isArray(diffData)) {
        const newData = diffData.map((innerDiff) => getFullKey(diffKey, innerDiff));
        return plain(newData);
      }
      if (status === 'added') {
        return `Property '${diffKey}' was added with value: ${formatValue(curValue)}`;
      }
      if (status === 'removed') {
        return `Property '${diffKey}' was removed`;
      }
      if (status === 'changed') {
        return `Property '${diffKey}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`;
      }
      return diffItem;
    })
    .filter((diffItem) => typeof diffItem === 'string');
  const result = formattedDiff.join('\n');
  return result;
};

export default plain;
