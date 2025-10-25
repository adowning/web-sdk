
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'pixi-vue',
      fileName: (format) => `pixi-vue.${format}.js`,
    },
    rollupOptions: {
      external: ['vue', 'pixi.js'],
      output: {
        globals: {
          vue: 'Vue',
          'pixi.js': 'PIXI',
        },
      },
    },
  },
});
