import meow from 'meow';
import chalk from 'chalk';
import { linter as Linter } from 'standard-engine';

import options from './options';
import { k } from './utils';

const { input, help } = meow(
  chalk`
Usage:
  $ korra <option> [args]
`,
  {
    flags: {
      help: {
        alias: 'h'
      },
      version: {
        alias: 'v'
      }
    }
  }
);

export default () => {
  console.log(k);
  let linter = new Linter(options);
  let formatter = linter.eslint.CLIEngine.getFormatter('pretty');
  let lintOptions = {};

  linter.lintFiles(input, lintOptions, (error, { results }) => {
    if (error) {
      throw error;
    }
    console.log(formatter(results));
  });

  // let [command, ...args] = input;
  // console.log(args, help);
  // log(`Korra ${command}`);

  // switch (command) {
  //   case Commands.format:
  //   case Aliases.f:
  //     break;

  //   case Commands.lint:
  //   case Aliases.l:
  //     break;

  //   default:
  //     log(`Error Something weird happened => '${input.join(' ')}'.`);
  //     break;
  // }
};
