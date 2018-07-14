import { LintResults } from './types';
import { log, noErrors, korraFix } from './constants';

export default function logger(results: LintResults, fix: boolean) {
  let { report, formatter, outputFixes } = results;
  let {
    errorCount,
    warningCount,
    fixableErrorCount,
    fixableWarningCount
  } = report;

  if (fix) {
    outputFixes(report);
  } else if (fixableErrorCount > 0 || fixableWarningCount > 0) {
    let total = fixableErrorCount + fixableWarningCount;
    log(
      `Found ${total} fixable ${
        total > 1 ? 'issues' : 'issue'
      } => Run ${korraFix}`
    );
  }

  if (
    errorCount === 0 &&
    warningCount === 0 &&
    fixableErrorCount === 0 &&
    fixableWarningCount === 0
  ) {
    log(noErrors);
    return;
  }

  log(formatter(report.results));
}
