import path from 'path';
import os from 'os';
import eslint from 'eslint';
import pkgConf from 'pkg-conf';
import globby from 'globby';

export default class Engine {
  constructor(options) {
    let m = options.version && options.version.match(/^(\d+)\./);
    let majorVersion = (m && m[1]) || '0';

    let cache = path.join(
      os.homedir() || os.tmpdir(),
      `.${this.cmd}-v${majorVersion}-cache/`
    );

    this.eslintConfig = Object.assign(
      {
        cache: true,
        cacheLocation,
        envs: [],
        fix: false,
        globals: [],
        ignore: false,
        plugins: [],
        useEslintrc: false,
        rules: {}
      },
      options.eslintConfig
    );

    this.cmd = options.cmd;
    this.options = this.parseoptions();
    this.CLIEngine = new eslint.CLIEngine(this.options.eslintConfig);
    this.outputFixes = eslint.CLIEngine.outputFixes;
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
        'vendor/**'
      ]
    };

    let packageoptions = pkgConf.sync(this.cmd, {
      cwd: options.cwd
    });

    let configurableKeys = ['rules', 'globals', 'plugins', 'envs', 'parser'];

    configurableKeys.forEach(key => {
      if (key in packageoptions) {
        if (key === 'rules') {
          options.eslintConfig.rules = Object.assign(
            packageoptions.rules,
            this.eslintConfig.rules
          );
        } else if (key === 'parser') {
          options.eslintConfig.parser = packageoptions.parser;
        } else {
          // The other options map to arrays
          options.eslintConfig[key] = this.eslintConfig[key].concat(
            packageoptions[key]
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
