import { program } from 'commander';

import getFormatDiff from '../formatters/index.js';

export default () => {
  program
    .description(`Compares two configuration files and shows a difference.`)
    .version('0.0.1', '-V, --version', 'output the current version')
    .arguments('<filepath1> <filepath2>')
    .option('-f, --format <type>', 'output format', 'stylish')
    .action((filepath1, filepath2) => {
      const options = program.opts();
      const { format } = options;
      console.log(getFormatDiff(filepath1, filepath2, format));
    })
    .parse(process.argv);
};
