import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import react from '@vitejs/plugin-react';

// Helper function to get all tool directories
function getTools() {
  const toolsDir = resolve(import.meta.dirname, 'tools');
  try {
    return readdirSync(toolsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch {
    // Return empty if tools directory doesn't exist yet
    return [];
  }
}

// Dynamically generate input for Rollup
function getRollupInputs() {
  const inputs = {
    main: resolve(import.meta.dirname, 'index.html'),
  };

  const tools = getTools();
  tools.forEach((tool) => {
    inputs[tool] = resolve(import.meta.dirname, `tools/${tool}/index.html`);
  });

  return inputs;
}

export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: getRollupInputs(),
    },
  },
});
