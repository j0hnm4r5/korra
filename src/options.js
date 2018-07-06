import path from 'path';
import eslint from 'eslint';
import pkg from '../package';

export default {
  version: pkg.version,
  homepage: pkg.homepage,
  bugs: pkg.bugs,
  eslint,
  cmd: 'korra',
  eslintConfig: {
    configFile: path.join(__dirname, 'eslintrc.json')
  },
  cwd: ''
};
