# template-files-generator

Tool to make it easy to create file/code templates and generate them for any given target directory with a config file and templates directory.

## Installation

### Install package globally

```bash
$ yarn global add template-files-generator
```

### Add configuration file

```bash
$ touch ~/template-files-generator.config.js
```

```js
export default {
  templates: {
    'simple-component': {
      name: 'Simple component',
      directory: './code-templates/simple-component',
      variables: {
        componentName: {
          displayName: 'Component name',
        },
      },
    },
  },
};
```

## Usage

```bash
$ tfg

// OR

$ npx template-files-generator
```

## Configuration

[TODO]

### TODO

- [x] allow for config path
- [x] package for npm module
- [x] be able to install globally in development
- [ ] clean up readme
- [ ] publish package
