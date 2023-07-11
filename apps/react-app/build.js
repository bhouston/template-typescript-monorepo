/* eslint-disable no-console */
import * as esbuild from 'esbuild';
import stylePlugin from 'esbuild-style-plugin';

const shared = {
  entryPoints: ['src/index.tsx'],
  bundle: true,
  target: ['es2020'],
  outfile: 'public/js/app.js',
  plugins: [stylePlugin({ postcssConfigFile: true })]
};

// if argument is 'dev' then watch files
if (process.argv[2] === '--dev') {
  // TODO: Add serving " --serve=8001 --servedir=public"
  // run esbuild in watch mode
  esbuild.build({
    ...shared,
    sourcemap: true,
    watch: {
      onRebuild(error, result) {
        if (error) console.error('watch build failed:', error);
        else console.log('watch build succeeded:', result);
      }
    }
  });
} else {
  esbuild.build({
    ...shared,
    bundle: true,
    minify: true
  });
}
