#!/usr/bin/env node

import { program } from 'commander';

program
  .description(`Compares two configuration files and shows a difference.`)
  .version('0.0.1', '-V, --version', 'output the current version')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format');
  
program.parse();


