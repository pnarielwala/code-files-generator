import typescript from 'rollup-plugin-typescript2';
import executable from 'rollup-plugin-executable';
import shebang from 'rollup-plugin-add-shebang';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.bin.tfg,
      format: 'cjs',
    },
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
  plugins: [
    typescript({
      typescript: require('typescript'),
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
        },
      },
    }),
    executable(),
    shebang({
      include: 'dist/index.js',
    }),
    copy({
      targets: [{ src: 'src/example', dest: 'dist' }],
    }),
  ],
};
