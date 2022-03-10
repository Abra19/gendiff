import { extname } from 'path';
import parsePath from './parsers.js';
import compareObj from './buildTree.js';

const genDiff = (path1, path2) => {
  const extension = extname(path1);
  const format = (extension === '.yaml') ? '.yml' : extension;
  const file1 = parsePath(path1, format);
  const file2 = parsePath(path2, format);
  return compareObj(file1, file2);
};

export default genDiff;
