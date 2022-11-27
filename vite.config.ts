import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import linaria from '@linaria/rollup';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [linaria({
    include: ['**/*.{ts,tsx}'],
    babelOptions: {
      presets: ['@babel/preset-typescript', '@babel/preset-react'],
    },
  }), react(),],
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeGlobalsPolyfillPlugin({
          buffer: true,
          process: true,
        })
      ]
    }
  },
  build: {
    rollupOptions: {
        plugins: [
            // Enable rollup polyfills plugin
            // used during production bundling
            nodePolyfills()
        ]
    }
}
})
