import path from 'path';

import Engine from '../src/engine';
import envs from './fixtures/envs/package';

describe('Korra Engine', () => {
  it('should pass a baseline test', () => {
    expect(true).toBe(true);
  });

  it('should read a valid package.json file', async () => {
    let engine = new Engine(path.join(__dirname, './fixtures/envs'));
    engine.lint('./engine.js');

    let [mongo, jquery] = envs.korra.envs;
    expect(engine.options.envs).toContain(mongo);
    expect(engine.options.envs).toContain(jquery);
  });
});
