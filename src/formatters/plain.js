const formatValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  return value;
};

export const getFullKey = (keys, key) => [...keys, key].join('.');

const plain = (diff) => {
  const iter = (data, keys) => {
    const result = data
      .map((dataItem) => {
        const {
          key, type, children, value1, value2,
        } = dataItem;
        switch (type) {
          case 'root':
            return iter(children, keys);
          case 'nested':
            return iter(children, [...keys, key]);
          case 'added':
            return `Property '${getFullKey(keys, key)}' was added with value: ${formatValue(value2)}`;
          case 'removed':
            return `Property '${getFullKey(keys, key)}' was removed`;
          case 'changed':
            return `Property '${getFullKey(keys, key)}' was updated. From ${formatValue(value1)} to ${formatValue(value2)}`;
          case 'unchanged':
            return null;
          default:
            throw new Error('Unknown diff type');
        }
      })
      .filter((dataItem) => typeof dataItem === 'string');
    return result.join('\n');
  };
  return iter(diff, []);
};

export default plain;
