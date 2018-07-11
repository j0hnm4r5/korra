import path from 'path';
import os from 'os';
import { CLIEngine } from 'eslint';
import pkgConf from 'pkg-conf';
import globby from 'globby';

import pkg from '../package';

export default class Engine {
  constructor() {
    let defaults = {
      version: pkg.version,
      eslintConfig: {
        configFile: path.join(__dirname, '../eslintrc.json')
      }
    };

    let cacheLocation = path.join(
      os.homedir() || os.tmpdir(),
      `.korra-v${defaults.version}-cache/`
    );

    this.eslintConfig = {
      cache: true,
      cacheLocation,
      envs: [],
      fix: false,
      globals: [],
      ignore: false,
      plugins: [],
      useEslintrc: false,
      rules: {},
      ...defaults.eslintConfig
    };

    this.options = this.parseoptions();
    this.CLIEngine = new CLIEngine(this.options.eslintConfig);
    this.outputFixes = CLIEngine.outputFixes;
  }

  parseoptions() {
    let options = {
      eslintConfig: { ...this.eslintConfig },
      cwd: process.cwd(),
      ignore: [
        '**/*.min.js',
        '**/bundle.js',
        'coverage/**',
        'node_modules/**',
        'vendor/**',
        'dist/**'
      ]
    };

    let packageOptions = pkgConf.sync('korra');
    let configurableKeys = ['rules', 'globals', 'plugins', 'envs', 'parser'];

    configurableKeys.forEach(key => {
      if (key in packageOptions) {
        switch (key) {
          case 'rules':
            options.eslintConfig.rules = {
              ...packageOptions.rules,
              ...this.eslintConfig.rules
            };
            break;

          case 'parser':
            options.eslintConfig.parser = packageOptions.parser;
            break;

          case 'globals':
            options.eslintConfig.globals = this.eslintConfig.globals.concat(
              packageOptions.globals
            );
            break;

          case 'plugins':
            options.eslintConfig.plugins = this.eslintConfig.plugins.concat(
              packageOptions.plugins
            );
            break;

          case 'envs':
            options.eslintConfig.envs = this.eslintConfig.envs.concat(
              packageOptions.envs
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
      ignore: this.options.ignore,
      gitignore: true
    };

    let paths = globby.sync(files, globbyOptions);
    let result;

    if (fix) {
      this.CLIEngine.options.fix = true;
    }

    try {
      result = this.CLIEngine.executeOnFiles(paths);
    } catch (eslintError) {
      throw eslintError;
    }

    return result;
  }
}
