const formObjDiff = (diff) => {
  const diffAsObj = diff.reduce((acc, diffItem) => {
    const {
      key, status, children, preValue, curValue,
    } = diffItem;
    if (status === 'nested') {
      return { ...acc, [`  ${key}`]: formObjDiff(children) };
    }
    if (status === 'unchanged') {
      return { ...acc, [`  ${key}`]: curValue };
    } if (status === 'added') {
      return { ...acc, [`+ ${key}`]: curValue };
    } if (status === 'removed') {
      return { ...acc, [`- ${key}`]: preValue };
    }
    return { ...acc, [`- ${key}`]: preValue, [`+ ${key}`]: curValue };
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

// const makeStrings = (diff) => {
//   const data = diff.map((diffItem) => {
//     const { key, status, children, preValue, curValue } = diffItem;
//     if (status === 'nested') {
//       const result = `  ${key}: ${makeStrings(children)}`;
//       console.log(result);
//       return result;
//     }
//     if (status === 'unchanged') {
//       const result = `  ${key}: ${curValue}`;
//       console.log(result);
//       return result;
//     } else if (status === 'added') {
//       const result = `+ ${key}: ${curValue}`;
//       console.log(result);
//       return result;
//     } else if (status === 'removed') {
//       const result = `- ${key}: ${preValue}`;
//       console.log(result);
//       return result;
//     } else {
//     const result = [`- ${key}: ${preValue}`, `+ ${key}: ${curValue}`];
//     console.log(result);
//     return result;
//     }
//   });
//   return data;
// };

// const stylish = (diff, replacer = ' ', spacesCount = 4) => {
//   const iter = (data, level) => {
//     const indentSize = spacesCount * level;
//     const bracketIndent = replacer.repeat(indentSize - spacesCount);
//     const currentIndent = replacer.repeat(indentSize - 2);
//     const newData = makeStrings(data);
//     // console.log(newData);
//     const result = newData.map((dataItem) => `\n${currentIndent}${dataItem}`);
//     console.log(result);
//     return `{${result}\n${bracketIndent}}`;
//   }
//   return iter(diff, 1);
// };

// export default stylish;
