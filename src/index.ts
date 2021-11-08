import chalk from 'chalk';
import copy from 'copy-template-dir';
import path from 'path';
import inquirer from 'inquirer';
import fs from 'fs';
import _ from 'lodash';
import os from 'os';
import prettier from 'prettier';
import fse from 'fs-extra';

import Validator from 'validatorjs';

const fetchConfigPath = () => {
  /**
   * recursively check for config file until you hit $HOME
   *
   * return undefined/false if no file is found
   */
  let currentDirectory = process.cwd();
  let basePath = path.resolve(currentDirectory);
  let parentLevel = 0;

  let configPath: string | undefined = undefined;

  do {
    const backPaths = [...new Array(parentLevel)].map(() => '..');
    basePath = path.resolve(currentDirectory, ...backPaths);

    const testConfigPath = path.resolve(basePath, 'tfgconfig.json');
    const exists = fs.existsSync(testConfigPath);

    if (exists) {
      configPath = testConfigPath;
      break;
    }
    parentLevel++;
  } while (basePath !== os.homedir());

  return configPath;
};

const fetchConfig = async (configPath: string) => {
  /**
   * recursively check for config file until you hit $HOME
   *
   * if config exists, use that
   * else prompt user to initialize config somewhere
   */

  try {
    const config = await require(configPath);
    const isConfigValid = validateConfig(config);
    if (!isConfigValid) {
      process.exit(1);
    }
    return config;
  } catch (e) {
    console.error('Configuration file is invalid: ', configPath);
  }
};

const validateConfig = (config: Config): boolean => {
  /**
   * validate the config to make sure it has the correct structure
   * and isn't missing any required values
   */

  const configRules = {
    templates: 'required',
  };

  const templateRules = {
    name: 'required|string',
    directory: 'required|string',
  };

  const variableRules = {
    prompt: 'required|string',
  };

  const configValidator = new Validator(config, configRules);

  const configFailed = configValidator.fails();
  if (configFailed) {
    console.error(
      '\n',
      chalk.red(`Invalid config:\n\t`),
      _.flatten(Object.values(configValidator.errors.all()))
        .map((value) => `- ${value}`)
        .join('\n\t'),
      '\n',
    );

    return !configFailed;
  }

  const failed = Object.entries(config.templates).some(
    ([templateKey, template]) => {
      const templateValidator = new Validator(template, templateRules);

      const variablesFailed = Object.entries(template.variables).some(
        ([variableKey, variable]) => {
          const variableValidator = new Validator(variable, variableRules);
          const failed = variableValidator.fails();
          if (failed) {
            console.error(
              '\n',
              chalk.red(`Invalid template variable: `),
              `"${templateKey}.variables.${variableKey}"\n\t`,
              _.flatten(Object.values(variableValidator.errors.all()))
                .map((value) => `- ${value}`)
                .join('\n\t'),
              '\n',
            );
          }

          return failed;
        },
      );

      const templateFailed = templateValidator.fails();
      if (templateFailed) {
        console.error(
          '\n',
          chalk.red(`Invalid template: `),
          `"${templateKey}"\n\t`,
          _.flatten(Object.values(templateValidator.errors.all()))
            .map((value) => `- ${value}`)
            .join('\n\t'),
          '\n',
        );
      }

      return templateFailed || variablesFailed;
    },
  );

  return !failed;
};

const createNewTemplateOption = () => {
  /**
   * create new template option object
   *
   * prompt for:
   * - Name
   * - Key
   * - Directory
   * - Variables
   *   - key
   *   - prompt
   * - Variables
   *   - key
   *   - prompt
   * ...
   */
};

const saveConfig = () => {
  /**
   * take config object and save
   *
   * note: try not to override js code if config is *.js
   */
};

const initializeConfig = (templateDir: string): string => {
  /**
   * prompt user to help create config and files/folder for templates
   *
   * then create the files
   */
  const relativeTemplateDir = path.relative(process.cwd(), templateDir);
  const filePath = path.resolve(process.cwd(), 'tfgconfig.json');
  const fileContents = `{
    "templates": {
      "simple-component": {
        "name": "Simple component",
        "directory": "${relativeTemplateDir}/simple-component",
        "variables": {
          "componentName": {
            "prompt": "Component name (e.g. Home)",
          },
        },
      },
    },
  }
  `;
  const prettyFileContents = prettier.format(fileContents, {
    parser: 'json',
  });
  fs.writeFileSync(filePath, prettyFileContents);

  return filePath;
};

const initializeTemplateDir = () => {
  let templateDir = path.resolve(process.cwd(), 'templates');
  fse.copy(
    path.resolve(__dirname, 'example'),
    templateDir,
    { overwrite: false, errorOnExist: true },
    (err) => {
      if (err) {
        templateDir = path.resolve(process.cwd(), '__templates__');
        fse.copy(path.resolve(__dirname, 'example'), templateDir);
      }
    },
  );

  return templateDir;
};

type Variable = {
  prompt: string;
};

type Template = {
  name: string;
  directory: string;
  variables: {
    [variable: string]: Variable;
  };
};

type Config = {
  templates: {
    [key: string]: Template;
  };
};

const fetchTemplateOptions = (config: Config): Array<[string, string]> => {
  /**
   * use config object to return template options
   * config.templates[key], config.template[key].name
   */

  return Object.entries(config.templates).map(([key, template]) => {
    return [key, template.name];
  });
};

const recordTemplateValues = async (template: Template) => {
  /**
   * prompt and record values for specific template
   */
  const variables = await inquirer.prompt(
    Object.entries(template.variables).map(([variable, { prompt }]) => ({
      type: 'input',
      name: variable,
      message: prompt,
    })),
  );

  return variables;
};

const generateTemplateFiles = () => {
  /**
   * create files/folders to be used as templates
   */
};

const generateFiles = (data: {
  config: Config;
  configPath: string;
  location: string;
  templateKey: string;
  variables: Object;
}) => {
  /**
   * create files/folders from selected template
   */
  const template = data.config.templates[data.templateKey];
  const templateDirectory = path.join(
    path.resolve(data.configPath, '..'),
    template.directory,
  );
  const destinationDirectory = path.join(process.cwd(), data.location);

  if (!fs.existsSync(templateDirectory)) {
    console.error(
      '\n',
      chalk.red(`Template directory "${templateDirectory}" does not exist.`),
      '\n',
      'Check your configuration.',
    );
    process.exit(1);
  }

  copy(
    templateDirectory,
    destinationDirectory,
    data.variables,
    (err, createdFiles) => {
      if (err) {
        throw err;
      }

      createdFiles.forEach((filePath) =>
        console.log(chalk.green('Created ') + filePath),
      );
    },
  );
};

export const runCmd = async () => {
  /**
   * main thread to run tfg
   */

  let configPath = fetchConfigPath();

  if (configPath === undefined) {
    const { shouldInit } = await inquirer.prompt({
      type: 'confirm',
      name: 'shouldInit',
      message: 'No config could be found. Would you like to initialize one?',
    });

    if (shouldInit) {
      const templateDir = initializeTemplateDir();

      configPath = initializeConfig(templateDir);

      console.log(chalk.green('Initialization Successful!'));
    } else {
      process.exit();
    }
  }

  const config = await fetchConfig(configPath);

  const options = fetchTemplateOptions(config);

  const { templateOption } = await inquirer.prompt({
    type: 'list',
    name: 'templateOption',
    message: 'What do you want to generate?',
    choices: options.map(([key, name]) => ({
      name,
      value: key,
    })),
  });

  const { location } = await inquirer.prompt({
    name: 'location',
    message: 'Where do you want to generate it? (e.g. src/components)',
    filter: (input) => _.trim(input, '/'), // trim leading/trailing whitespace and slashes
  });

  const variables = await recordTemplateValues(
    config.templates[templateOption],
  );

  generateFiles({
    config,
    configPath,
    templateKey: templateOption,
    location,
    variables,
  });
};

runCmd();
