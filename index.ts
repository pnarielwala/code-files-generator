import chalk from 'chalk';
import copy from 'copy-template-dir';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
import _ from 'lodash';

import config from './config';

(async () => {
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
    message:
      'Where do you want to generate it? (e.g. src/components/MyComponent)',
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

  const variablesConfig: Array<[string, { displayName: string }]> =
    Object.entries(config.templates[templateKey].variables);
  const variables = await inquirer.prompt(
    variablesConfig.map(([variable, { displayName }]) => ({
      type: 'input',
      name: variable,
      message: displayName,
    })),
  );

  const templateDirectory = path.join(
    process.cwd(),
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
