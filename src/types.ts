import { CLIEngine, Linter } from 'eslint';
import { AnyJson } from 'pkg-conf';

type Rule = {
  [name: string]: Linter.RuleLevel | Linter.RuleLevelAndOptions;
};

export type KorraOptions = {
  [key: string]: AnyJson | undefined;
  rules?: Rule;
  globals?: string[];
  plugins?: string[];
  envs?: string[];
  parser?: string;
};

export type LintResults = {
  report: CLIEngine.LintReport;
  formatter: CLIEngine.Formatter;
  options: CLIEngine.Options;
  engine: CLIEngine;
  outputFixes: typeof CLIEngine.outputFixes;
};
