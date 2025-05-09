import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Asegura que las rutas sean relativas
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000', // Proxy para las rutas de Flask
    },
  },
});
