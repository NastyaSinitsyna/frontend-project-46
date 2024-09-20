const json = (data) => {
  const result = data.reduce((acc, dataItem) => {
    acc.push(JSON.stringify(dataItem));
    return acc;
  }, []);
  return result;
};
export default json;
