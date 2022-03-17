import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const plain = (tree) => {
  const iter = (obj, acc) => {
    const result = obj.flatMap((node) => {
      const {
        keyName, type, value, changedValue,
      } = node;
      const oldValue = stringify(value);
      const newValue = stringify(changedValue);
      const newAcc = acc === '' ? `${keyName}` : `${acc}.${keyName}`;
      switch (type) {
        case 'added':
          return `Property '${newAcc}' was added with value: ${oldValue}`;
        case 'removed':
          return `Property '${newAcc}' was removed`;
        case 'changed':
          return `Property '${newAcc}' was updated. From ${oldValue} to ${newValue}`;
        case 'hasChild':
          return `${iter(value, `${newAcc}`)}`;
        case 'unchanged':
          return [];
        default:
          throw new Error(`type ${type} is not supported`);
      }
    });
    return [...result].join('\n');
  };
  return iter(tree, '');
};

export default plain;
