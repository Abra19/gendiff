import { cwd } from 'process';
import { resolve, extname } from 'path';
import { readFileSync } from 'fs';
import parseFile from './parsers.js';
import buildDiffTree from './buildDiff.js';
import formatter from './formatters/index.js';

const readFile = (relPath) => {
  const dirname = cwd();
  const absPath = resolve(dirname, relPath);
  const content = readFileSync(absPath, 'utf-8');
  return content;
};

const compareObj = (obj1, obj2, format) => {
  const resultObj = buildDiffTree(obj1, obj2);
  return formatter(resultObj, format);
};

const genDiff = (path1, path2, format = 'stylish') => {
  const extension1 = extname(path1).slice(1);
  const extension2 = extname(path2).slice(1);
  const file1 = parseFile(readFile(path1), extension1);
  const file2 = parseFile(readFile(path2), extension2);
  return compareObj(file1, file2, format);
};

export default genDiff;
