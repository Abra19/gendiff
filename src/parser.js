import { resolve } from 'path';
import { cwd } from 'process';
import { readFileSync } from 'fs';

export const formatter = (relPath) => {
  const index = relPath.lastIndexOf('.');
  return relPath.slice(index + 1);
};

export const parsePath = (relPath) => {
  const dirname = cwd();
  const absPath = resolve(dirname, relPath);
  const content = readFileSync(absPath, 'utf-8');
  const parsedContent = JSON.parse(content);
  return parsedContent;
};
