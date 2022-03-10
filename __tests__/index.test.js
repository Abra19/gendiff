import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const result = readFile('resultJSON.txt').trim();

const formats = ['.json', '.yml'];

test.each(formats)('testing gendiff for %s', (format) => {
  const actual = genDiff(getFixturePath(`file1${format}`), getFixturePath(`file2${format}`));
  expect(actual).toBe(result);
});
