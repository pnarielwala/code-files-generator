const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const API_CLIENTS_DIRECTORY = 'src/api'

const toPascalCase = string => {
  return string.substring(0, 1).toUpperCase() + string.substring(1)
}

const builderPrompt = () => {
  return inquirer
    .prompt([
      {
        name: 'resource',
        message: 'Which resource will it make requests to? (e.g. creditCards)',
        filter: input => input.trim(), // trim leading/trailing whitespace
        validate: input => {
          if (!input) {
            return false
          }

          const destinationFilename = path.join(
            process.cwd(),
            API_CLIENTS_DIRECTORY,
            `${input}Client`,
            `${input}Client.ts`,
          )

          if (fs.existsSync(destinationFilename)) {
            return 'Refusing to overwrite API client. Try a different name, or delete that API client and try again.'
          }

          return true
        },
      },
    ])
    .then(answers => {
      const { resource } = answers

      const apiClientName = `${resource}Client`

      const variables = {
        resource,
        pascalCaseResource: toPascalCase(resource),
        apiClientName,
      }

      return {
        variables,
        destinationDirectory: path.join(API_CLIENTS_DIRECTORY, apiClientName),
      }
    })
}

module.exports = builderPrompt
