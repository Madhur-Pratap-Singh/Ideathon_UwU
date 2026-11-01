import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dotenv from 'dotenv';
import { handleCompanionRequest } from './server/apiHandler.js';

dotenv.config();

function aiCompanionPlugin() {
  return {
    name: 'ai-companion-backend-middleware',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.startsWith('/api/companion')) {
          handleCompanionRequest(req, res);
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), aiCompanionPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
