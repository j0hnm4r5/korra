import path from 'path';
import os from 'os';
import { CLIEngine } from 'eslint';
import pkgConf from 'pkg-conf';
import globby from 'globby';

import pkg from '../package';

function parseOptions(cwd = process.cwd()) {
  const cacheLocation = path.join(
    os.homedir() || os.tmpdir(),
    `.korra-v${pkg.version}-cache/`
  );

  const configFile = path.join(__dirname, '../eslintrc.json');

  const defaultOptions = {
    cache: true,
    cwd,
    cacheLocation,
    envs: [],
    fix: false,
    globals: [],
    ignore: false,
    plugins: [],
    useEslintrc: false,
    rules: {},
    extends: [],
    configFile
  };

  const packageOptions = pkgConf.sync('korra', { cwd });
  const configurableKeys = [
    'rules',
    'globals',
    'plugins',
    'envs',
    'parser',
    'extends'
  ];

  const options = {};
  Object.keys(packageOptions).forEach(key => {
    if (configurableKeys.includes(key)) {
      options[key] = packageOptions[key];
    }
  });

  return {
    ...defaultOptions,
    ...options
  };
}

function lint(files, fix, cwd) {
  const globbyOptions = {
    ignore: [
      '**/*.min.js',
      '**/bundle.js',
      'coverage/**',
      'node_modules/**',
      'vendor/**',
      'dist/**',
      'flow-typed/**'
    ],
    gitignore: true
  };

  const paths = globby.sync(files, globbyOptions);
  const options = parseOptions(cwd);
  let result;

  if (fix) {
    options.fix = true;
  }

  const engine = new CLIEngine(options);

  try {
    result = engine.executeOnFiles(paths);
  } catch (eslintError) {
    throw eslintError;
  }

  const formatter = engine.getFormatter('pretty');

  // Export additional objects for tests
  return { report: result, formatter, options, engine };
}

export default {
  lint,
  outputFixes: CLIEngine.outputFixes
};
