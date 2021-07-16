const fs = require('fs')
const path = require('path')
const inquirer = require('inquirer')

const BUILDERS_DIRECTORY = 'src/__test-utils__/builders'

const toCamelCase = string => {
  return string.substring(0, 1).toLowerCase() + string.substring(1)
}

const builderPrompt = () => {
  return inquirer
    .prompt([
      {
        name: 'typeName',
        message:
          'Which TypeScript type do you want to use to generate a builder? (e.g. MyType)',
        filter: input => input.trim(), // trim leading/trailing whitespace
        validate: input => {
          if (!input) {
            return false
          }

          const destinationFilename = path.join(
            process.cwd(),
            BUILDERS_DIRECTORY,
            `${toCamelCase(input)}Builder.ts`,
          )

          if (fs.existsSync(destinationFilename)) {
            return 'Refusing to overwrite builder. Try a different type, or delete that builder and try again.'
          }

          return true
        },
      },
    ])
    .then(answers => {
      const { typeName } = answers

      const variables = {
        typeName,
        camelCaseTypeName: toCamelCase(typeName),
        aOrAn: ['a', 'e', 'i', 'o', 'u'].includes(
          typeName.substring(0, 1).toLowerCase(),
        )
          ? 'an'
          : 'a',
      }

      return { variables, destinationDirectory: BUILDERS_DIRECTORY }
    })
}

module.exports = builderPrompt
