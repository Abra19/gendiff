import _ from 'lodash';

const compareObj = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const removed = '  -';
  const added = '  +';
  const noChange = '   ';
  const result = sortedKeys.reduce((acc, key) => {
    const unchanged = `${noChange} ${key}: ${obj1[key]}`;
    const changed1 = `${removed} ${key}: ${obj1[key]}`;
    const changed2 = `${added} ${key}: ${obj2[key]}`;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      return (obj1[key] === obj2[key]) ? _.concat(acc, unchanged)
        : _.concat(acc, changed1, changed2);
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return acc.concat(changed1);
    }
    return acc.concat(changed2);
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default compareObj;
