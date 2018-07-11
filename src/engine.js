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
        configFile: path.join(__dirname, 'eslintrc.json')
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
        if (key === 'rules') {
          options.eslintConfig.rules = {
            ...packageOptions.rules,
            ...this.eslintConfig.rules
          };
        } else if (key === 'parser') {
          options.eslintConfig.parser = packageOptions.parser;
        } else {
          // The other options map to arrays
          options.eslintConfig[key] = this.eslintConfig[key].concat(
            packageOptions[key]
          );
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
