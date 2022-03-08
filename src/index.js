import { parsePath, formatter } from './parser.js';
import compareObj from './buildTree.js';

const genDiff = (path1, path2) => {
  const format = formatter(path1);
  const file1 = parsePath(path1);
  const file2 = parsePath(path2);
  if (format === 'json') {
    return compareObj(file1, file2);
  }
  return compareObj(file1, file2);
};

export default genDiff;
