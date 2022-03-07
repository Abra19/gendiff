#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();
const options = program.opts();

program.name('gendiff')
  .version('1.0.0', '-V, --version', 'output the version number')
  .description('Compares two configuration files and shows a difference.')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format <type>', 'output format')
  .arguments('<filepath1> <filepath2>')
  .action((path1, path2) => {
    const diff = genDiff(path1, path2, options.format);
    console.log(diff);
  });

program.parse(process.argv);
