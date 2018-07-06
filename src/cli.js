import updateNotifier from 'update-notifier';
import meow from 'meow';
import chalk from 'chalk';
import { linter as Linter } from 'standard-engine';

import pkg from '../package';
import options from './options';
import { korra } from './utils';

updateNotifier({ pkg }).notify();

export default () => {
  console.log(korra, version);

  const { input } = meow(
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

  let linter = new Linter(options);
  let formatter = linter.eslint.CLIEngine.getFormatter('pretty');
  let lintOptions = {};

  linter.lintFiles(input, lintOptions, (error, { results }) => {
    if (error) {
      console.error(error);
    }
    console.log(formatter(results));
  });
};
