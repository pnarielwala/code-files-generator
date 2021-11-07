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

```json
// tfgconfig.json
{
  "templates": {
    "custom-component": {
      "name": "My Custom Component",
      "directory": "./templates/custom-component",
      "variables": {
        "componentName": {
          "displayName": "Component name?"
        }
      }
    },
    "simple-component": {
      "name": "Simple Component",
      "directory": "./internal/templates/custom-component",
      "variables": {
        "componentName": {
          "displayName": "Component name?"
        }
      }
    }
  }
}
```

### TODO

- [x] allow for config path
- [x] package for npm module
- [x] be able to install globally in development
- [ ] clean up readme
- [x] publish package
