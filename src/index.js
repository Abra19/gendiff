import { extname } from 'path';
import parsePath from './parsers.js';
import { compareJSONObj, compareYMLObj } from './buildTree.js';

const genDiff = (path1, path2) => {
  const extension = extname(path1);
  const format = (extension === '.yaml') ? '.yml' : extension;
  const file1 = parsePath(path1, format);
  const file2 = parsePath(path2, format);
  switch (format) {
    case '.json':
      return compareJSONObj(file1, file2);
    case '.yml':
      return compareYMLObj(file1, file2);
    default:
      throw new Error(`format ${format} is not supported`);
  }
};

export default genDiff;
