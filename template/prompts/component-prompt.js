const fs = require('fs')
const path = require('path')
const _string = require('lodash/string')
const inquirer = require('inquirer')

const componentPrompt = () => {
  return inquirer
    .prompt([
      {
        name: 'location',
        message:
          'Where do you want to generate it? (e.g. src/components/MyComponent)',
        filter: input => _string.trim(input, '/'), // trim leading/trailing whitespace and slashes
        validate: input => {
          if (!input) {
            return false
          }

          const destinationDirectory = path.join(process.cwd(), input)

          if (fs.existsSync(destinationDirectory)) {
            return 'Refusing to overwrite directory. Try a different path, or delete that directory and try again.'
          }

          return true
        },
      },
    ])
    .then(answers => {
      const { location } = answers

      const variables = {
        componentName: location.substring(location.lastIndexOf('/') + 1),
      }

      return { variables, destinationDirectory: location }
    })
}

module.exports = componentPrompt
