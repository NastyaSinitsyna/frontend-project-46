import _ from 'lodash';

const gendiff = (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const diffKeys = _.sortBy(_.union(keys1, keys2));
  const diff = diffKeys.map((key) => {
    const value1 = content1[key];
    const value2 = content2[key];
    if (typeof value2 === 'object' && typeof value1 === 'object') {
      return { key, type: 'nested', children: gendiff(value1, value2) };
    }
    if (value1 === undefined) {
      return { key, type: 'added', value2 };
    }
    if (value2 === undefined) {
      return { key, type: 'removed', value1 };
    }
    if (value1 !== value2) {
      return {
        key, type: 'changed', value1, value2,
      };
    }
    return { key, type: 'unchanged', value2 };
  });
  return diff;
};

export default (content1, content2) => [{ type: 'root', children: gendiff(content1, content2) }];
