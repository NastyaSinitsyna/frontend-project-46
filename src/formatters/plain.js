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
          key, status, children, preValue, curValue,
        } = dataItem;
        switch (status) {
          case 'root':
            return iter(children, keys);
          case 'nested':
            return iter(children, [...keys, key]);
          case 'added':
            return `Property '${getFullKey(keys, key)}' was added with value: ${formatValue(curValue)}`;
          case 'removed':
            return `Property '${getFullKey(keys, key)}' was removed`;
          case 'changed':
            return `Property '${getFullKey(keys, key)}' was updated. From ${formatValue(preValue)} to ${formatValue(curValue)}`;
          case 'unchanged':
            return null;
          default:
            throw new Error('Unknown status');
        }
      })
      .filter((dataItem) => typeof dataItem === 'string');
    return result.join('\n');
  };
  return iter(diff, []);
};

export default plain;
