import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import fs from 'fs'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const outputDir = env.VITE_NODE_TYPE ? `build-${env.VITE_NODE_TYPE}` : 'build';
  const publicDir = mode==="development"?"public":path.resolve(__dirname, 'public', env.VITE_NODE_TYPE);

  return {
    base: mode==="development"?'/':'', 
    publicDir,
    build: {
      outDir: outputDir,
    },
    plugins: [
      react(),
      {
        name: 'html-transform',
        transformIndexHtml(html) {
          html = html.replace(
            /<title>(.*?)<\/title>/,
            `<title>${env.VITE_NODE_TYPE === 'config' ? 'Konfigurátor' : env.VITE_NODE_TYPE === 'data'?'Datová vizualizace':'Hra'}</title>`
          );
          if (env.VITE_NODE_TYPE === 'config') {
            const jsonldContent = fs.readFileSync(path.resolve(__dirname, 'public', 'config/Configurator.jsonld'), 'utf-8');
            const jsonldScript = `<script type="application/ld+json">${jsonldContent}</script>`;
            html = html.replace('</head>', `${jsonldScript}\n</head>`);
          }
          return html;
        },
      },
    ],
  }
})