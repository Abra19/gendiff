import { test, expect } from '@jest/globals';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';
import stylish from '../src/formatters/stylish.js';
import plain from '../src/formatters/plain.js';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');
const result1 = readFile('resultStylish.txt').trim();
const result2 = readFile('resultPlain.txt').trim();
const result3 = readFile('resultJSON.txt').trim();

const extensions = ['.json', '.yml', '.yaml'];

test.each(extensions)('testing gendiff for %s', (extension) => {
  const actual1 = genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`, 'stylish'));
  expect(actual1).toBe(result1);
  const actual2 = genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`));
  expect(actual2).toBe(result1);
  const actual3 = genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`), 'plain');
  expect(actual3).toBe(result2);
  const actual4 = genDiff(getFixturePath(`file1${extension}`), getFixturePath(`file2${extension}`), 'json');
  expect(actual4).toBe(result3);
});

test('not supported file extension', () => {
  expect(() => {
    genDiff(getFixturePath('file1.txt'), getFixturePath('file2.txt'));
  }).toThrow();
});

test('not supported operation', () => {
  const tree = [{ keyName: 'name', type: 'notSupported' }];
  expect(() => {
    stylish(tree);
  }).toThrow();
  expect(() => {
    plain(tree);
  }).toThrow();
});

test('not supported formatter', () => {
  const tree = [{ keyName: 'name', type: 'added', value: true }];
  expect(() => {
    formatter(tree, 'txt');
  }).toThrow();
});
