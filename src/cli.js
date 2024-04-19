import { program } from 'commander';
import gendiff from './gendiff.js';

export default () => {
  program
    .description(`Compares two configuration files and shows a difference.`)
    .version('0.0.1', '-V, --version', 'output the current version')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format')
    .action((filepath1, filepath2) => {
      console.log(gendiff(filepath1, filepath2));
    });

  return program.parse();
};
