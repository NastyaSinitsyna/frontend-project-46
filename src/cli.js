import { program } from 'commander';

import gendiff from './gendiff.js';

import stylish from '../formatters/stylish.js';

import plain from '../formatters/plain.js';

import json from '../formatters/json.js';

export default () => {
  program
    .description(`Compares two configuration files and shows a difference.`)
    .version('0.0.1', '-V, --version', 'output the current version')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action(function (filepath1, filepath2) {
      if (this.opts().format === 'stylish') {
        console.log(stylish(gendiff(filepath1, filepath2)));
      } else if (this.opts().format === 'plain') {
        console.log(plain(gendiff(filepath1, filepath2)));
      } else if (this.opts().format === 'json') {
        console.log(json(gendiff(filepath1, filepath2)));
      } else {
        console.log('error: unknown format');
      }
    })
    .parse(process.argv);
};
