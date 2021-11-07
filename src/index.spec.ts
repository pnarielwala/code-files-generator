import { runCmd } from './index';

import fs from 'fs';
import chalk from 'chalk';

beforeEach(() => {
  process.exit = jest.fn<never, never>();
  console.warn = jest.fn();

  jest.clearAllMocks();
});

test('check for config file', () => {
  jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

  runCmd();

  const configPath = '/template-files-generator.config.js';
  expect(fs.existsSync).toHaveBeenCalledWith(
    String(process.env.HOME) + configPath,
  );

  expect(console.warn).toHaveBeenCalledWith(
    chalk.yellow(
      '\nWarning: Pass in config file path or create a config file at ' +
        `~${configPath}`,
    ),
  );
});

test('check for input config file', () => {
  jest.spyOn(fs, 'existsSync').mockReturnValueOnce(false);

  const configPath = './config.js';
  const origArgv = process.argv;
  process.argv.push(...['-c', configPath]);
  runCmd();

  expect(fs.existsSync).toHaveBeenCalledWith('./config.js');
  expect(console.warn).toHaveBeenCalledWith(
    chalk.yellow(
      '\nWarning: Pass in config file path or create a config file at ' +
        configPath,
    ),
  );
  process.argv = origArgv;
});
