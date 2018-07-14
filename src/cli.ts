#!/usr/bin/env node
import updateNotifier from 'update-notifier';
import meow from 'meow';
import chalk from 'chalk';

import lint from './engine';
import logger from './logger';
import { log, korra } from './constants';

function main() {
  let { input, flags, pkg } = meow(
    chalk`
  Usage:
  $ korra [files]
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

  updateNotifier({ pkg }).notify();

  // Korra x.x.x
  log(korra, pkg.version);

  if (input.length === 0) {
    input = ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'];
  }

  let results = lint(input, flags.fix);
  logger(results, flags.fix);
}

main();
