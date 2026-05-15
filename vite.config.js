import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync } from 'fs';

// Helper function to get all tool directories
function getTools() {
  const toolsDir = resolve(__dirname, 'tools');
  try {
    return readdirSync(toolsDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);
  } catch (e) {
    // Return empty if tools directory doesn't exist yet
    return [];
  }
}

// Dynamically generate input for Rollup
function getRollupInputs() {
  const inputs = {
    main: resolve(__dirname, 'index.html'),
  };

  const tools = getTools();
  tools.forEach((tool) => {
    inputs[tool] = resolve(__dirname, `tools/${tool}/index.html`);
  });

  return inputs;
}

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: getRollupInputs(),
    },
  },
});
