import {defineConfig} from '@rsbuild/core';
import {pluginReact} from '@rsbuild/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [pluginReact()],
  tools: {
    postcss(config) {
      config.postcssOptions?.plugins?.push(tailwindcss);
    },
  },
  output: {
    assetPrefix: './',
    cleanDistPath: true,
    distPath: {
      root: '../dist'
    }
  }
});
