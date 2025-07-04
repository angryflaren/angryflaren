import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  /**
   * Указываем базовый путь, так как сайт будет в подпапке.
   * Это название вашего репозитория.
   */

  plugins: [react()],

  // Настройки для сборки статического сайта
  build: {
    outDir: 'dist',
  },

  // Псевдоним для удобных импортов
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
