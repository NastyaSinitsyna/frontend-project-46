#!/usr/bin/env node

import { program } from 'commander';

import gendiff from '../index.js';

program
  .description(`Compares two configuration files and shows a difference.`)
  .version('0.0.1', '-V, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const { format } = program.opts();
    console.log(gendiff(filepath1, filepath2, format));
  });

program.parse(process.argv);
