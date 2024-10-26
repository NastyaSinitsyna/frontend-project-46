const formIndent = (level) => {
  const replacer = ' ';
  const spacesCount = 4;
  const indentSize = spacesCount * level;
  const bracketIndent = replacer.repeat(indentSize - spacesCount);
  const currentIndent = replacer.repeat(indentSize - 2);
  return { currentIndent, bracketIndent };
};

const formatValue = (data, level) => {
  const dataType = typeof data;
  if (dataType !== 'object' || data === null) {
    return `${data}`;
  }
  if (dataType === 'object') {
    const entries = Object.entries(data);
    const { currentIndent, bracketIndent } = formIndent(level);
    const result = entries.map(([key, value]) => `${currentIndent}  ${key}: ${formatValue(value, level + 1)}`);
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  }
  throw new Error('Unknown data type');
};

const stylish = (diff) => {
  const iter = (data, level) => {
    const { currentIndent, bracketIndent } = formIndent(level);
    const result = data.map((item) => {
      const {
        key, status, children, preValue, curValue,
      } = item;
      switch (status) {
        case 'nested':
          return `${currentIndent}  ${key}: ${iter(children, level + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${formatValue(curValue, level + 1)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${formatValue(preValue, level + 1)}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${formatValue(preValue, level + 1)}\n${currentIndent}+ ${key}: ${formatValue(curValue, level + 1)}`;
        case 'unchanged':
          return `${currentIndent}  ${key}: ${formatValue(curValue, level + 1)}`;
        default:
          throw new Error('Unknown status');
      }
    });
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return iter(diff, 1);
};

export default stylish;
