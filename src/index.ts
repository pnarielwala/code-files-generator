import chalk from 'chalk';
import copy from 'copy-template-dir';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
import _ from 'lodash';
import { createCommand } from 'commander';

const program = createCommand();

program
  .name('yarn generate')
  .usage('[options]')
  .requiredOption(
    '-c, --config <path-to-config>',
    'path to config file',
    `~/.code-files-gen-config.js`,
  )
  .parse(process.argv);

const options = program.opts();

(async () => {
  const configPath = options.config.replace(/^~/, String(process.env.HOME));

  if (!fs.existsSync(configPath)) {
    console.warn(
      chalk.yellow(
        '\nWarning: Pass in config file path or create a config file at ' +
          options.config,
      ),
    );
    process.exit(0);
  }

  const config = await require(configPath);

  const { templateKey } = await inquirer.prompt({
    type: 'list',
    name: 'templateKey',
    message: 'What do you want to generate?',
    choices: Object.entries(config.templates).map(([key, template]) => ({
      name: (template as { name: string }).name,
      value: key,
    })),
  });

  const { location } = await inquirer.prompt({
    name: 'location',
    message: 'Where do you want to generate it? (e.g. src/components)',
    filter: (input) => _.trim(input, '/'), // trim leading/trailing whitespace and slashes
    validate: (input) => {
      if (!input) {
        return false;
      }

      const destinationDirectory = path.join(process.cwd(), input);

      if (fs.existsSync(destinationDirectory)) {
        return 'Refusing to overwrite directory. Try a different path, or delete that directory and try again.';
      }

      return true;
    },
  });

  const variablesConfig: Array<
    [
      string,
      {
        displayName: string;
        sideCarAnswers?: (input: string, answers: any) => void;
      },
    ]
  > = Object.entries(config.templates[templateKey].variables);
  const variables = await inquirer.prompt(
    variablesConfig.map(([variable, { displayName, sideCarAnswers }]) => ({
      type: 'input',
      name: variable,
      message: displayName,
      filter: (input, answers) => {
        sideCarAnswers?.(input, answers);
        return input;
      },
    })),
  );

  const templateDirectory = path.join(
    path.dirname(configPath),
    config.templates[templateKey].directory,
  );
  const destinationDirectory = path.join(process.cwd(), location);

  copy(
    templateDirectory,
    destinationDirectory,
    variables,
    (err, createdFiles) => {
      if (err) {
        throw err;
      }

      createdFiles.forEach((filePath) =>
        console.log(chalk.green('Created ') + filePath),
      );
    },
  );
})();
