import path from 'path';

import korra from '../src/engine';
import envs from './fixtures/envs/package';
import parser from './fixtures/parser/package.json';

describe('Korra korra', () => {
  it('should pass a baseline test', () => {
    expect(true).toBe(true);
  });

  it('should set envs from package.json', () => {
    let { options } = korra.lint(
      './korra.js',
      false,
      path.join(__dirname, './fixtures/envs')
    );

    const [mongo, jquery] = envs.korra.envs;
    expect(options.envs).toContain(mongo);
    expect(options.envs).toContain(jquery);
  });

  it('should set parser from package.json', () => {
    let { options } = korra.lint(
      './korra.js',
      false,
      path.join(__dirname, './fixtures/parser')
    );

    const tsParser = parser.korra.parser;
    expect(options.parser).toBe(tsParser);
  });
});
