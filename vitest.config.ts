import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue(), tsconfigPaths()],
  test: {
    alias: {
      '@/': new URL('./src/', import.meta.url).pathname,
    },
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{js,ts,vue}', '!src/**/types.ts'],
    },
    restoreMocks: true,
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./vitest.setup.ts'],
  },
});
