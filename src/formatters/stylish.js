const formIndent = (level, replacer = ' ', spacesCount = 4) => {
  const identSize = spacesCount * level - 2;
  const indent = replacer.repeat(identSize);
  return indent;
};

const formatValue = (data, level) => {
  const dataType = typeof data;
  if (dataType !== 'object' || data === null) {
    return `${data}`;
  }
  if (dataType === 'object') {
    const entries = Object.entries(data);
    const indent = formIndent(level);
    const result = entries.map(([key, value]) => `${indent}  ${key}: ${formatValue(value, level + 1)}`);
    return `{\n${result.join('\n')}\n${formIndent(level - 1)}  }`;
  }
  throw new Error('Unknown data type');
};

const stylish = (diff) => {
  const iter = (data, level) => {
    const indent = formIndent(level);
    const result = data.map((item) => {
      const {
        key, type, children, value1, value2,
      } = item;
      switch (type) {
        case 'root':
          return `{\n${iter(children, level)}\n}`;
        case 'nested':
          return `${indent}  ${key}: {\n${iter(children, level + 1)}\n${indent}  }`;
        case 'added':
          return `${indent}+ ${key}: ${formatValue(value2, level + 1)}`;
        case 'removed':
          return `${indent}- ${key}: ${formatValue(value1, level + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${formatValue(value1, level + 1)}\n${indent}+ ${key}: ${formatValue(value2, level + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${formatValue(value2, level + 1)}`;
        default:
          throw new Error('Unknown diff type');
      }
    });
    return `${result.join('\n')}`;
  };
  return iter(diff, 1);
};

export default stylish;
