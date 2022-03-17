import stylish from './stylish.js';
import plain from './plain.js';

const formatter = (obj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    default:
      throw new Error(`format ${format} is not supported`);
  }
};

export default formatter;
