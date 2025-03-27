import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  console.log("Loaded Env Variables in vite.config.js:", env); // Debugging

  return {
    define: {
      'import.meta.env': JSON.stringify(env) // Manually load environment variables
    }
  };
});
