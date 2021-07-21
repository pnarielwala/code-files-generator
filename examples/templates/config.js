const toPascalCase = (string) => {
  return string.substring(0, 1).toUpperCase() + string.substring(1);
};
module.exports = {
  templates: {
    'simple-component': {
      name: 'Simple component',
      directory: './simple-component',
      variables: {
        componentName: {
          displayName: 'Component name (e.g. Home)',
        },
      },
    },
    'api-client-name': {
      name: 'API client',
      directory: './api-client',
      variables: {
        resource: {
          displayName: 'Resource name (e.g. creditCards)',
          sideCarAnswers: (input, answers) => {
            answers.pascalCaseResource = toPascalCase(input);
          },
        },
      },
    },
  },
};
