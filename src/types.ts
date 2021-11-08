export type StringCase =
  | 'snake'
  | 'pascal'
  | 'camel'
  | 'lower'
  | 'dot'
  | 'kebab'
  | 'sentence'
  | 'title'
  | 'path';

export type Variable = {
  prompt: string;
  defaultCase?: StringCase;
};

export type Template = {
  name: string;
  directory: string;
  variables: {
    [variable: string]: Variable;
  };
};

export type Config = {
  templates: {
    [key: string]: Template;
  };
};
