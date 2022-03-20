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

const makeExtension = (path) => extname(path).slice(1);

const genDiff = (path1, path2, format = 'stylish') => {
  const file1 = parseFile(readFile(path1), makeExtension(path1));
  const file2 = parseFile(readFile(path2), makeExtension(path2));
  const resultObj = buildDiffTree(file1, file2);
  return formatter(resultObj, format);
};

export default genDiff;
