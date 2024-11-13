const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

export const getFullKey = (root, data) => {
  const alter = (coll, keys) => {
    if (coll.key) {
      keys.push(coll.key);
    }
    const newKey = keys.join('.');
    return { ...coll, key: newKey };
  };
  return data.map((dataItem) => alter(dataItem, [root]));
};

const plain = (diff) => {
  const formattedDiff = diff
    .map((diffItem) => {
      const {
        key, status, children, preValue, curValue,
      } = diffItem;
      console.log(diffItem);
      switch (status) {
        case 'root':
          return key === undefined ? plain(children) : plain(getFullKey(key, children));
        case 'nested':
          return plain(getFullKey(key, children));
        case 'added':
          return `Property '${key}' was added with value: ${formatValue(curValue)}`;
        case 'removed':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`;
        case 'unchanged':
          return diffItem;
        default:
          throw new Error('Unknown status');
      }
    })
    .filter((diffItem) => typeof diffItem === 'string');
  const result = formattedDiff.join('\n');
  return result;
};

export default plain;
