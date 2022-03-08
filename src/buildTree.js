import _ from 'lodash';

const compareObj = (obj1, obj2) => {
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(keys);
  const result = sortedKeys.reduce((acc, key) => {
    const unchanged = `    ${key}: ${obj1[key]}`;
    const changed1 = `  - ${key}: ${obj1[key]}`;
    const changed2 = `  + ${key}: ${obj2[key]}`;
    if (_.has(obj1, key) && _.has(obj2, key)) {
      const newAcc = (obj1[key] === obj2[key]) ? _.concat(acc, unchanged)
        : _.concat(acc, changed1, changed2);
      return newAcc;
    }
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      return acc.concat(changed1);
    }
    return acc.concat(changed2);
  }, []);
  return `{\n${result.join('\n')}\n}`;
};

export default compareObj;
