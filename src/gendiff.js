import _ from 'lodash';

export default (content1, content2) => {
  const keys1 = Object.keys(content1);
  const keys2 = Object.keys(content2);
  const diffKeys = _.sortBy(_.union(keys1, keys2));
  const diff = diffKeys.reduce((acc, diffKey) => {
    const preValue = content1[diffKey];
    const curValue = content2[diffKey];
    return { ...acc, [`${diffKey}Diff`]: { diffKey, preValue, curValue } };
  }, {});
  return diff;
};
