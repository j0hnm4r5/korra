import updateNotifier from 'update-notifier';
import meow from 'meow';
import chalk from 'chalk';

import pkg from '../package';
import Engine from './engine';

updateNotifier({ pkg }).notify();

let { input, flags } = meow(
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
  console.log(chalk.bold.cyan('Korra'), pkg.version);

  let korra = new Engine();
  let formatter = korra.CLIEngine.getFormatter('pretty');

  if (input.length === 0) {
    input = ['**/*.js', '**/*.jsx'];
  }

  let report = korra.lint(input, flags.fix);

  if (flags.fix) {
    korra.outputFixes(report);
  }

  console.log(formatter(report.results));
};
