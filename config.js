module.exports = {
  templates: {
    'simple-component': {
      name: 'Simple component',
      directory: 'template/templates/simple-component',
      variables: {
        componentName: {
          displayName: 'Component name',
          case: 'pascal', // pascal | camel | snake | kebab
        },
      },
    },
    'api-client-name': {
      name: 'API client',
      directory: 'template/templates/api-client',
      variables: {
        apiClientName: {
          displayName: 'Client name',
          case: 'pascal',
        },
        pascalCaseResource: {
          displayName: 'Resource name',
          case: 'pascal',
          transform: () => {},
        },
      },
    },
  },
};
