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

function logger(korra, report) {
  let formatter = korra.CLIEngine.getFormatter('pretty');
  let {
    errorCount,
    warningCount,
    fixableErrorCount,
    fixableWarningCount
  } = report;

  if (flags.fix) {
    korra.outputFixes(report);
  } else if (fixableErrorCount > 0 || fixableWarningCount > 0) {
    let total = fixableErrorCount + fixableWarningCount;
    console.log(
      `Found ${total} fixable ${
        total > 1 ? 'issues' : 'issue'
      } => Run ${chalk.bold.cyan('korra --fix')}`
    );
  }

  if (
    errorCount === 0 &&
    warningCount === 0 &&
    fixableErrorCount === 0 &&
    fixableWarningCount === 0
  ) {
    console.log('✨ No errors');
    return;
  }

  console.log(formatter(report.results));
}

export default () => {
  console.log(chalk.bold.cyan('Korra'), pkg.version);

  let korra = new Engine();

  if (input.length === 0) {
    input = ['**/*.js', '**/*.jsx'];
  }

  let report = korra.lint(input, flags.fix);
  logger(korra, report);
};
