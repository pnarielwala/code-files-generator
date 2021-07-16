#!/usr/bin/env node

const chalk = require('chalk');
const copy = require('copy-template-dir');
const path = require('path');
const inquirer = require('inquirer');

const componentPrompt = require('./prompts/component-prompt');
const testDataBuilderPrompt = require('./prompts/test-data-builder-prompt');
const apiClientPrompt = require('./prompts/api-client-prompt');

const templates = {
  'simple-component': componentPrompt,
  'redux-component': componentPrompt,
  'test-data-builder': testDataBuilderPrompt,
  'api-client': apiClientPrompt,
  // Add new prompts here! The key should match your a directory name in "templates".
};

inquirer
  .prompt([
    {
      type: 'list',
      name: 'templateKey',
      message: 'What do you want to generate?',
      choices: [
        { name: 'Simple component', value: 'simple-component' },
        { name: 'Redux-connected component', value: 'redux-component' },
        { name: 'Test data builder', value: 'test-data-builder' },
        { name: 'API client', value: 'api-client' },
        // Add new choices here! The `value` should match a key in the `templates` object.
      ],
    },
  ])
  .then((answers) => {
    const { templateKey } = answers;

    const templatePrompt = templates[templateKey];

    templatePrompt().then(({ variables, destinationDirectory }) => {
      const templateDirectory = path.join(
        process.cwd(),
        'template/templates',
        templateKey,
      );
      destinationDirectory = path.join(process.cwd(), destinationDirectory);

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
    });
  });
