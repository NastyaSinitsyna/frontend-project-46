import gendiff from '../gendiff.js';

const formObjDiff = (data) => {
  const diffAsObj = data.reduce((acc, { diffKey, preValue, curValue }) => {
    if (typeof preValue === 'object' && typeof curValue === 'object') {
      acc[`  ${diffKey}`] = formObjDiff(gendiff(preValue, curValue));
      return acc;
    }
    if (preValue === curValue) {
      acc[`  ${diffKey}`] = preValue;
      return acc;
    } if (preValue === undefined) {
      acc[`+ ${diffKey}`] = curValue;
      return acc;
    } if (curValue === undefined) {
      acc[`- ${diffKey}`] = preValue;
      return acc;
    }
    acc[`- ${diffKey}`] = preValue;
    acc[`+ ${diffKey}`] = curValue;
    return acc;
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
    let currentIndent;
    let bracketIndent;
    const result = entries.reduce((acc, [key, value]) => {
      if (key.startsWith('  ') || key.startsWith('+ ') || key.startsWith('- ')) {
        currentIndent = replacer.repeat(indentSize - 2);
        bracketIndent = replacer.repeat(indentSize - spacesCount);
      } else {
        currentIndent = replacer.repeat(indentSize);
        bracketIndent = replacer.repeat(indentSize - spacesCount);
      }
      const newAcc = `${acc}\n${currentIndent}${key}: ${iter(value, level + 1)}`;
      return newAcc;
    }, '');
    return `{${result}\n${bracketIndent}}`;
  };

  return iter(data, 1);
};

export default (data) => stringify(formObjDiff(data));
