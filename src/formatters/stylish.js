// const formObjDiff = (diff) => {
//   const diffAsObj = diff.reduce((acc, diffItem) => {
//     const {
//       key, status, children, preValue, curValue,
//     } = diffItem;
//     if (status === 'nested') {
//       return { ...acc, [`  ${key}`]: formObjDiff(children) };
//     }
//     if (status === 'unchanged') {
//       return { ...acc, [`  ${key}`]: curValue };
//     } if (status === 'added') {
//       return { ...acc, [`+ ${key}`]: curValue };
//     } if (status === 'removed') {
//       return { ...acc, [`- ${key}`]: preValue };
//     }
//     return { ...acc, [`- ${key}`]: preValue, [`+ ${key}`]: curValue };
//   }, {});
//   return diffAsObj;
// };

// const stringify = (data, replacer = ' ', spacesCount = 4) => {
//   const iter = (currentData, level) => {
//     const dataType = typeof currentData;
//     if (dataType !== 'object' || currentData === null) {
//       const result = `${currentData}`;
//       return result;
//     }
//     if (Array.isArray(currentData)) {
//       const result = `[${Array.toString(currentData)}]`;
//       return result;
//     }

//     const entries = Object.entries(currentData);
//     const indentSize = spacesCount * level;
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const result = entries.reduce((acc, [key, value]) => {
//       if (key.startsWith('  ') || key.startsWith('+ ') || key.startsWith('- ')) {
//         const currentIndent = replacer.repeat(indentSize - 2);
//         const newAcc = `${acc}\n${currentIndent}${key}: ${iter(value, level + 1)}`;
//         return newAcc;
//       }
//       const currentIndent = replacer.repeat(indentSize);
//       const newAcc = `${acc}\n${currentIndent}${key}: ${iter(value, level + 1)}`;
//       return newAcc;
//     }, '');
//     return `{${result}\n${bracketIndent}}`;
//   };

//   return iter(data, 1);
// };

// export default (data) => stringify(formObjDiff(data));

const formatValue = (value, currentIndent, bracketIndent) => {
  if (typeof value !== 'object' || value === null) {
    return `${value}`;
  }
  if (typeof value === 'object') {
    const entries = Object.entries(value);
    const result = entries.map(([key, value]) => `${currentIndent + 1}  ${key}: ${value}`);
    return `{\n${result}\n${bracketIndent}}`
  }
};

const stylish = (diff, replacer = ' ', spacesCount = 4) => {
  const iter = (data, level) => {
    const indentSize = spacesCount * level;
    const bracketIndent = replacer.repeat(indentSize - spacesCount);
    const currentIndent = replacer.repeat(indentSize - 2);
    const result = data.map((item) => {
      const {
        key, status, children, preValue, curValue,
      } = item;
      switch (status) {
        case 'nested':
          return  `${replacer.repeat(indentSize)}${key}: ${iter(children, level + 1)}`;
        case 'added':
          return `${currentIndent}+ ${key}: ${formatValue(curValue, currentIndent,bracketIndent)}`;
        case 'removed':
          return `${currentIndent}- ${key}: ${formatValue(preValue, currentIndent, bracketIndent)}`;
        case 'changed':
          return `${currentIndent}- ${key}: ${formatValue(preValue, currentIndent, bracketIndent)}\n${currentIndent}+ ${key}: ${formatValue(curValue, currentIndent, bracketIndent)}`;
        default:
          return `${currentIndent}  ${key}: ${formatValue(curValue, currentIndent, bracketIndent)}`;
      }
    });
    return `{\n${result.join('\n')}\n${bracketIndent}}`;
  };
  return iter(diff, 1)
};

export default stylish;
