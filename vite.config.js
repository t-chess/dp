import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const outputDir = env.VITE_NODE_TYPE ? `build-${env.VITE_NODE_TYPE}` : 'build';

  return {
    build: {
      outDir: outputDir,
    },
    plugins: [react()],
  }
})