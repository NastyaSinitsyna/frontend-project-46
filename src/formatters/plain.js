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
  const result = data.map((item) => {
    const { key, ...rest } = item;
    return { ...rest, key: `${root}.${item.key}` };
  });
  return result;
};

const plain = (diff) => {
  const formattedDiff = diff
    .map((diffItem) => {
      const {
        key, status, children, preValue, curValue,
      } = diffItem;
      switch (status) {
        case 'nested':
          return plain(getFullKey(key, children));
        case 'added':
          return `Property '${key}' was added with value: ${formatValue(curValue)}`;
        case 'removed':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`;
        default:
          return diffItem;
      }
    })
    .filter((diffItem) => typeof diffItem === 'string');
  const result = formattedDiff.join('\n');
  return result;
};

export default plain;
