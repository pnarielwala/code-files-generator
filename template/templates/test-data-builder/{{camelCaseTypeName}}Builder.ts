import { {{typeName}}T } from 'types/{{typeName}}'

const base{{typeName}}: {{typeName}}T = {
}

export const {{aOrAn}}{{typeName}} = (overrides: Partial<{{typeName}}T> = {}): {{typeName}}T => {
  return { ...base{{typeName}}, ...overrides }
}
