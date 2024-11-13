import _ from 'lodash';

const gendiff = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const diffKeys = _.sortBy(_.union(keys1, keys2));
  const diff = diffKeys.map((key) => {
    const preValue = content1[key];
    const curValue = content2[key];
    if (typeof curValue === 'object' && typeof preValue === 'object') {
      return { key, status: 'nested', children: gendiff(preValue, curValue) };
    }
    if (preValue === undefined) {
      return { key, status: 'added', curValue };
    }
    if (curValue === undefined) {
      return { key, status: 'removed', preValue };
    }
    if (preValue !== curValue) {
      return {
        key, status: 'changed', preValue, curValue,
      };
    }
    return { key, status: 'unchanged', curValue };
  });
  const result = { status: 'root', children: diff };
  return [result];
  // return diff;
};
export default gendiff;
