import _ from 'lodash';

const makeSpace = (quantity, replacer = ' ') => replacer.repeat(quantity);

const stringify = (obj, depth, replacer = ' ') => {
  if (!_.isObject(obj)) {
    return `${obj}`;
  }
  const lines = Object.keys(obj)
    .map((key) => {
      if (_.isObject(obj[key])) {
        return `${makeSpace(depth + 8, replacer)}${key}: ${stringify(obj[key], depth + 4)}`;
      }
      return `${makeSpace(depth + 8, replacer)}${key}: ${obj[key]}`;
    });
  return ['{', ...lines, `${makeSpace(depth + 4, replacer)}}`].join('\n');
};

const stylish = (tree) => {
  const iter = (obj, depth) => {
    const result = obj.map((node) => {
      const {
        keyName, type, value, changedValue,
      } = node;
      const string = stringify(value, depth);
      const changedString = stringify(changedValue, depth);
      const spaces = makeSpace(depth + 2);
      const addedValue = `${spaces}+ ${keyName}: ${string}`;
      const removedValue = `${spaces}- ${keyName}: ${string}`;
      const unchangedValue = `${spaces}  ${keyName}: ${string}`;
      const newValue = `${spaces}+ ${keyName}: ${changedString}`;
      switch (type) {
        case 'added':
          return addedValue;
        case 'removed':
          return removedValue;
        case 'unchanged':
          return unchangedValue;
        case 'changed':
          return `${removedValue}\n${newValue}`;
        case 'hasChild':
          return `${makeSpace(depth + 4)}${keyName}: ${iter(value, depth + 4)}`;
        default:
          throw new Error(`type ${type} is not supported`);
      }
    });
    return ['{', ...result, `${makeSpace(depth)}}`].join('\n');
  };
  return iter(tree, 0);
};

export default stylish;
