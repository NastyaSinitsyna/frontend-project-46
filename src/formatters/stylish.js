const formObjDiff = (diff) => {
  const diffAsObj = diff.reduce((acc, diffItem) => {
    const diffKey = Object.keys(diffItem).toString();
    const diffData = diffItem[diffKey];
    const { status, preValue, curValue } = diffData;
    if (Array.isArray(diffData)) {
      return { ...acc, [`  ${diffKey}`]: formObjDiff(diffData) };
    } if (status === 'unchanged') {
      return { ...acc, [`  ${diffKey}`]: preValue };
    } if (status === 'added') {
      return { ...acc, [`+ ${diffKey}`]: curValue };
    } if (status === 'removed') {
      return { ...acc, [`- ${diffKey}`]: preValue };
    }
    return { ...acc, [`- ${diffKey}`]: preValue, [`+ ${diffKey}`]: curValue };
  }, {});
  return diffAsObj;
};

const stringify = (data, replacer = ' ', spacesCount = 4) => {
  const iter = (currentData, level) => {
    const dataType = typeof currentData;
    if (dataType !== 'object' || currentData === null) {
      const result = `${currentData}`;
      return result;
    }
    if (Array.isArray(currentData)) {
      const result = `[${Array.toString(currentData)}]`;
      return result;
    }

    const entries = Object.entries(currentData);
    const indentSize = spacesCount * level;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const result = entries.reduce((acc, [key, value]) => {
      if (key.startsWith('  ') || key.startsWith('+ ') || key.startsWith('- ')) {
        const currentIndent = replacer.repeat(indentSize - 2);
        const newAcc = `${acc}\n${currentIndent}${key}: ${iter(value, level + 1)}`;
        return newAcc;
      }
      const currentIndent = replacer.repeat(indentSize);
      const newAcc = `${acc}\n${currentIndent}${key}: ${iter(value, level + 1)}`;
      return newAcc;
    }, '');
    return `{${result}\n${bracketIndent}}`;
  };

  return iter(data, 1);
};

export default (data) => stringify(formObjDiff(data));
