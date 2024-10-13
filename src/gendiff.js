import _ from 'lodash';

const gendiff = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const diffKeys = _.sortBy(_.union(keys1, keys2));
  const diff = diffKeys.map((diffKey) => {
    const preValue = content1[diffKey];
    const curValue = content2[diffKey];
    if (typeof curValue === 'object' && typeof preValue === 'object') {
      const result = { [`${diffKey}`]: gendiff(preValue, curValue) };
      return result;
    }
    if (preValue === undefined) {
      const result = { [`${diffKey}`]: { status: 'added', preValue, curValue } };
      return result;
    }
    if (curValue === undefined) {
      const result = { [`${diffKey}`]: { status: 'removed', preValue, curValue } };
      return result;
    }
    if (preValue !== curValue) {
      const result = { [`${diffKey}`]: { status: 'changed', preValue, curValue } };
      return result;
    }
    const result = { [`${diffKey}`]: { status: 'unchanged', preValue, curValue}  };
    return result;
  });
  return diff;
};
export default gendiff;
