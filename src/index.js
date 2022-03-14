import { extname } from 'path';
import parsePath from './parsers.js';
import compareObj from './comparator.js';

const genDiff = (path1, path2, format = 'stylish') => {
  const extension = extname(path1);
  const parcingFormat = (extension === '.yaml') ? '.yml' : extension;
  const file1 = parsePath(path1, parcingFormat);
  const file2 = parsePath(path2, parcingFormat);
  return compareObj(file1, file2, format);
};

export default genDiff;
