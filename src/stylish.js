import { makeDiff } from './gendiff.js';

const diffToObj = (data) => {
  const diffAsObj = data.reduce((acc, [key, value1, value2]) => {
    let specSymbol;
    if (typeof value1 === 'object' && typeof value2 === 'object') {
      specSymbol = '  ';
      acc[`${specSymbol}${key}`] = diffToObj(makeDiff(value1, value2));
      return acc;
    }
    if (value1 === value2) {
      specSymbol = '  ';
      acc[`${specSymbol}${key}`] = value1;
      return acc;
    } if (value1 === undefined) {
      specSymbol = '+ ';
      acc[`${specSymbol}${key}`] = value2;
      return acc;
    } if (value2 === undefined) {
      specSymbol = '- ';
      acc[`${specSymbol}${key}`] = value1;
      return acc;
    }
    specSymbol = '- ';
    acc[`${specSymbol}${key}`] = value1;
    specSymbol = '+ ';
    acc[`${specSymbol}${key}`] = value2;
    return acc;
  }, {});
  //console.log(diffAsObj);
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

export default (data) => stringify(diffToObj(data));
