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

test('testing gendiff', () => {
  const actual1 = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual1).toBe(result);
});
