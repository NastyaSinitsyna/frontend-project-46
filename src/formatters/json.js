const json = (diff) => {
  const result = JSON.stringify(diff, null, 2);
  return result;
};
export default json;
