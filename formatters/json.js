const json = (data) => {
  const result = data.reduce((acc, dataItem) => {
    acc.push(JSON.stringify(dataItem, null, 2));
    return acc;
  }, []);
  return result.join(';\n');
};
export default json;
