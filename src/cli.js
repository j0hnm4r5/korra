import path from 'path';
import updateNotifier from 'update-notifier';
import meow from 'meow';
import chalk from 'chalk';
import eslint from 'eslint';

import pkg from '../package';
import { korra } from './utils';
import Engine from './engine';

updateNotifier({ pkg }).notify();

const defaultOptions = {
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs,
  cmd: 'korra',
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  }
};

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
  console.log(korra, pkg.version);

  let linter = new Engine(defaultOptions);
  let formatter = linter.CLIEngine.getFormatter('pretty');

  if (input === undefined || input.length === 0) {
    input = ['**/*.js', '**/*.jsx'];
  }

  let report = linter.lint(input, flags.fix);
  // console.log(report)

  if (flags.fix) {
    linter.outputFixes(report);
  }

  console.log(formatter(report.results));
};
