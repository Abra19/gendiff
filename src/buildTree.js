import _ from 'lodash';

const removed = '  -';
const added = '  +';
const noChange = '   ';

const makeLine = (key, obj1, obj2, acc) => {
  const unchanged = `${noChange} ${key}: ${obj1[key]}`;
  const changed1 = `${removed} ${key}: ${obj1[key]}`;
  const changed2 = `${added} ${key}: ${obj2[key]}`;
  if (!_.has(obj1, key)) {
    return acc.concat(changed2);
  }
  if (!_.has(obj2, key)) {
    return acc.concat(changed1);
  }
  return (obj1[key] === obj2[key]) ? _.concat(acc, unchanged)
    : _.concat(acc, changed1, changed2);
};

const compareObj = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => (makeLine(key, obj1, obj2, acc)), []);
  return `{\n${result.join('\n')}\n}`;
};

export default compareObj;
