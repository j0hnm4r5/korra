import meow from 'meow';
import chalk from 'chalk';

import { log, Commands, Aliases } from './utils';

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
  let [command, ...args] = input;
  console.log(args, help);
  log(`Korra ${command}`);

  switch (command) {
    case Commands.format:
    case Aliases.f:
      break;

    case Commands.lint:
    case Aliases.l:
      break;

    default:
      log(`Error Something weird happened => '${input.join(' ')}'.`);
      break;
  }
};
