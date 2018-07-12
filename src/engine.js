import path from 'path';
import os from 'os';
import fs from 'fs';
import { CLIEngine } from 'eslint';
import pkgConf from 'pkg-conf';
import globby from 'globby';

import pkg from '../package';

export default class Engine {
  constructor() {
    let cacheLocation = path.join(
      os.homedir() || os.tmpdir(),
      `.korra-v${pkg.version}-cache/`
    );

    this.defaultOptions = {
      cache: true,
      cacheLocation,
      envs: [],
      fix: false,
      globals: [],
      ignore: false,
      plugins: [],
      useEslintrc: false,
      rules: {},
      extends: [],
      configFile: path.join(__dirname, '../eslintrc.json')
    };

    this.options = this.parseoptions();
    this.outputFixes = CLIEngine.outputFixes;
  }

  parseoptions() {
    let options = {
      ...this.defaultOptions
    };

    let packageOptions = pkgConf.sync('korra');
    let configurableKeys = [
      'rules',
      'globals',
      'plugins',
      'envs',
      'parser',
      'extends'
    ];

    configurableKeys.forEach(key => {
      if (key in packageOptions) {
        switch (key) {
          case 'rules':
            options.rules = {
              ...packageOptions.rules,
              ...this.defaultOptions.rules
            };
            break;

          case 'parser':
            options.parser = packageOptions.parser;
            break;

          case 'globals':
            options.globals = this.defaultOptions.globals.concat(
              packageOptions.globals
            );
            break;

          case 'plugins':
            options.plugins = this.defaultOptions.plugins.concat(
              packageOptions.plugins
            );
            break;

          case 'envs':
            options.envs = this.defaultOptions.envs.concat(packageOptions.envs);
            break;

          case 'extends':
            options.extends = this.defaultOptions.extends.concat(
              packageOptions.extends
            );
            break;

          default:
            throw new Error('Unexpected key in "configurableKeys"');
        }
      }
    });

    return options;
  }

  lint(files, fix) {
    let globbyOptions = {
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

    let paths = globby.sync(files, globbyOptions);
    let result;

    if (fix) {
      this.options.fix = true;
    }

    this.CLIEngine = new CLIEngine(this.options);

    try {
      result = this.CLIEngine.executeOnFiles(paths);
    } catch (eslintError) {
      throw eslintError;
    }

    return result;
  }
}
