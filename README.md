# template-files-generator

Tool to make it easy to create file/code templates and generate them for any given target directory with a config file and templates directory.

## Installation

### Install package globally

```bash
$ yarn global add template-files-generator

OR

$ yarn add template-files-generator -D
```

## Usage

```bash
$ yarn tfg

// OR

$ npx template-files-generator
```

## Configuration

`tfgconfig.json`

```json
{
  "templates": {
    "custom-component": {
      "name": "My Custom Component",
      "directory": "./templates/custom-component",
      "variables": {
        "componentName": {
          "prompt": "Component name?"
        }
      }
    },
    "simple-component": {
      "name": "Simple Component",
      "directory": "./internal/templates/custom-component",
      "variables": {
        "componentName": {
          "prompt": "Component name?",
          "defaultCase": "camel"
        }
      }
    }
  }
}
```

## Inspriation

Partially inspired by the [generate-template-files](https://www.npmjs.com/package/generate-template-files) tool, but was looking for a simpler approach without having to write much configuration in javascript. But check out [generate-template-files](https://www.npmjs.com/package/generate-template-files) for a more robust and configurable template file generator!
