import _ from 'lodash';

const buildDiffTree = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const resultObj = sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    if (!_.has(obj1, key)) {
      return { keyName: key, type: 'added', value: value2 };
    }
    if (!_.has(obj2, key)) {
      return { keyName: key, type: 'removed', value: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { keyName: key, type: 'hasChild', value: buildDiffTree(value1, value2) };
    }
    if (value1 === value2) {
      return { keyName: key, type: 'unchanged', value: value1 };
    }
    return {
      keyName: key, type: 'changed', value: value1, changedValue: value2,
    };
  });
  return resultObj;
};

export default buildDiffTree;
