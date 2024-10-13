import _ from 'lodash';

const gendiff = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const diffKeys = _.sortBy(_.union(keys1, keys2));
  const diff = diffKeys.map((diffKey) => {
    const preValue = content1[diffKey];
    const curValue = content2[diffKey];
    if (typeof curValue === 'object' && typeof preValue === 'object') {
      return { [`${diffKey}`]: gendiff(preValue, curValue) };
    }
    if (preValue === undefined) {
      return { [`${diffKey}`]: { status: 'added', preValue, curValue } };
    }
    if (curValue === undefined) {
      return { [`${diffKey}`]: { status: 'removed', preValue, curValue } };
    }
    if (preValue !== curValue) {
      return { [`${diffKey}`]: { status: 'changed', preValue, curValue } };
    }
    return { [`${diffKey}`]: { status: 'unchanged', preValue, curValue } };
  });
  return diff;
};
export default gendiff;
