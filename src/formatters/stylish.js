const formIndent = (level, replacer = ' ', spacesCount = 4) => {
  const indentSize = spacesCount * level;
  const indent = replacer.repeat(indentSize - 2);
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
    return `{\n${result.join('\n')}\n${indent.slice(0, indent.length - 2)}}`;
  }
  throw new Error('Unknown data type');
};

const stylish = (diff) => {
  const iter = (data, level) => {
    const indent = formIndent(level);
    const result = data.map((item) => {
      const {
        key, status, children, preValue, curValue,
      } = item;
      switch (status) {
        case 'nested':
          return `${indent}  ${key}: ${iter(children, level + 1)}`;
        case 'added':
          return `${indent}+ ${key}: ${formatValue(curValue, level + 1)}`;
        case 'removed':
          return `${indent}- ${key}: ${formatValue(preValue, level + 1)}`;
        case 'changed':
          return `${indent}- ${key}: ${formatValue(preValue, level + 1)}\n${indent}+ ${key}: ${formatValue(curValue, level + 1)}`;
        case 'unchanged':
          return `${indent}  ${key}: ${formatValue(curValue, level + 1)}`;
        default:
          throw new Error('Unknown status');
      }
    });
    return `{\n${result.join('\n')}\n${indent.slice(0, indent.length - 2)}}`;
  };
  return iter(diff, 1);
};

export default stylish;
