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
      const { key, status, children, preValue, curValue } = diffItem;
      switch (status) {
        case 'nested':
          const newData = children.map((child) => {
              child.key = `${key}.${child.key}`;
              return child;
            });
            return plain(newData);
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
