const { defaults } = require('jest-config');
module.exports = {
  // ...
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  // ...
  testPathIgnorePatterns: ['/node_modules/', '/examples/', 'src/example'],
};
