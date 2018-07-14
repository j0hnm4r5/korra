import { CLIEngine } from 'eslint';
import pkgConf from 'pkg-conf';
import globby from 'globby';

import { KorraOptions, LintResults } from './types';
import { globbyIgnore, defaultOptions, tsParser } from './constants';

function parseOptions(cwd = process.cwd()): CLIEngine.Options {
  let packageOptions = pkgConf.sync('korra', { cwd });
  let configurableKeys = ['rules', 'globals', 'plugins', 'envs', 'parser'];

  let options: KorraOptions = {};
  Object.keys(packageOptions).forEach(key => {
    if (configurableKeys.includes(key)) {
      options[key] = packageOptions[key];
    }
  });

  return {
    ...defaultOptions,
    ...options,
    cwd
  };
}

export default function lint(
  files: string[],
  fix: boolean,
  cwd?: string
): LintResults {
  let options = parseOptions(cwd);

  let globbyOptions = {
    ignore: globbyIgnore,
    gitignore: true
  };

  let paths = globby.sync(files, globbyOptions);

  let containsTypescript =
    paths.filter(file => file.includes('.ts')).length > 0;

  if (containsTypescript) {
    options.parser = tsParser;
  }

  if (fix) {
    options.fix = true;
  }

  let engine = new CLIEngine(options);
  let result;

  try {
    result = engine.executeOnFiles(paths);
  } catch (eslintError) {
    throw eslintError;
  }

  let formatter = engine.getFormatter('pretty');

  // Export additional objects for tests
  return {
    report: result,
    formatter,
    options,
    engine,
    outputFixes: CLIEngine.outputFixes
  };
}
