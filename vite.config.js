import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    'import.meta.env.REACT_APP_RENDER_GIT_COMMIT': JSON.stringify(process.env.REACT_APP_RENDER_GIT_COMMIT)
  }
});
