import { resolve } from 'path';
import { cwd } from 'process';
import yaml from 'js-yaml';
import { readFileSync } from 'fs';

const parseFormat = (format) => {
  switch (format) {
    case '.json':
      return JSON.parse;
    case '.yml':
      return yaml.load;
    default:
      throw new Error(`format ${format} is not supported`);
  }
};

const parsePath = (relPath, format) => {
  const dirname = cwd();
  const absPath = resolve(dirname, relPath);
  const content = readFileSync(absPath, 'utf-8');
  return parseFormat(format)(content);
};

export default parsePath;
