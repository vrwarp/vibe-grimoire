# Vibe Grimoire Agent Instructions

This repository is a Vite Multi-Page Application (MPA) designed to host a collection of single-page "vibe-coded" tools. It uses Tailwind CSS for styling and PostCSS.

## Repository Structure

- `index.html`: The main landing page directory.
- `main.js`: Dynamically discovers and lists tools on the home page using `import.meta.glob`.
- `vite.config.js`: Dynamically parses the `tools/` directory and configures Rollup to build multiple entry points.
- `tools/`: The directory containing all the tools.
  - `tools/<tool-name>/`: A directory dedicated to a specific tool.
  - `tools/<tool-name>/index.html`: The main entry point for a tool.

## Adding a New Tool

To add a new tool to the Grimoire, follow these steps:

1.  **Create a Directory:** Create a new directory under the `tools/` folder. The name of the directory will be used to generate the tool's display name on the home page (e.g., `tools/my-new-tool` becomes "My New Tool").
2.  **Add `index.html`:** Create an `index.html` file inside your new tool's directory. This file must contain the complete HTML for the tool.
3.  **Include Styling/Scripts:** You can write inline CSS/JS or reference external files. Tailwind CSS via CDN is recommended for simplicity, but the project is also configured to process Tailwind classes if you prefer to build them into the project.
4.  **Add "Back to Tools" Link:** It is highly recommended to include a navigation link back to the root directory (`../../`) at the top of your tool's UI so users can return to the main directory.
    ```html
    <a href="../../" class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center">
        <i class="fa-solid fa-arrow-left mr-2"></i> Back to Tools
    </a>
    ```
5.  **No Configuration Needed:** You do NOT need to modify `vite.config.js` or `main.js`. The build process and the home page will automatically detect the new directory as long as it contains an `index.html` file.
6.  **Verify:** Run `npm run dev` to see your tool locally, or `npm run build` to ensure it compiles correctly.
