import os from 'os';
import path from 'path';
import chalk from 'chalk';
import { CLIEngine } from 'eslint';

// Useful constants
export const { log } = console;
export const noErrors = '✨ No errors';
export const korra = chalk.bold.cyan('Korra');
export const korraFix = chalk.bold.cyan('korra --fix');
export const tsParser = 'typescript-eslint-parser';
export const globbyIgnore = [
  '**/*.min.js',
  '**/bundle.js',
  'coverage/**',
  'node_modules/**',
  'vendor/**',
  'dist/**',
  'flow-typed/**'
];

// Default options for the CLIEngine
const cacheLocation = path.join(os.homedir() || os.tmpdir(), `.korra-cache/`);
const configFile = path.join(__dirname, '../eslintrc.json');

export const defaultOptions: CLIEngine.Options = {
  cacheLocation,
  configFile,
  cache: true,
  envs: [],
  fix: false,
  globals: [],
  ignore: false,
  plugins: [],
  useEslintrc: false,
  rules: {}
};
