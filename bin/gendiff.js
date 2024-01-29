#!/usr/bin/env node

import { program } from 'commander';
import fs from 'node:fs';
import path from 'node:path';

import fileParse from './parse.js';

program
  .description(`Compares two configuration files and shows a difference.`)
  .version('0.0.1', '-V, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const absFilepath1 = path.resolve(process.cwd(), filepath1);
    const absFilepath2 = path.resolve(process.cwd(), filepath2);

    const file1Content = fileParse(fs.readFileSync(absFilepath1, 'utf8'));
    console.log({ file1Content });
    const file2Content = fileParse(fs.readFileSync(absFilepath2, 'utf8'));
    console.log({ file2Content });
  });

program.parse();
