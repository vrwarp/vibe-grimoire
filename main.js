import './style.css';

// Discover all index.html files inside the tools directory
const tools = import.meta.glob('./tools/*/index.html');

const toolListEl = document.getElementById('tool-list');

if (toolListEl) {
  const toolEntries = Object.keys(tools);

  if (toolEntries.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'px-6 py-8 text-center text-gray-500 italic';
    emptyState.textContent = 'No tools found yet. Add some to the tools directory!';
    toolListEl.appendChild(emptyState);
  } else {
    toolEntries.forEach((path) => {
      // Extract the tool directory name from the path: './tools/tool-name/index.html'
      const match = path.match(/\.\/tools\/([^/]+)\/index\.html/);
      if (match && match[1]) {
        const folderName = match[1];

        // Format the folder name to be more readable (e.g., 'transparent-png-maker' -> 'Transparent Png Maker')
        const displayName = folderName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        // Create the list item
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.href = `./tools/${folderName}/index.html`;
        a.className = 'block hover:bg-gray-50 transition duration-150 ease-in-out';

        a.innerHTML = `
          <div class="px-4 py-4 sm:px-6 flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0 bg-indigo-100 text-indigo-600 rounded-md p-3">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div class="ml-4">
                <p class="text-lg font-medium text-indigo-600 truncate">${displayName}</p>
              </div>
            </div>
            <div>
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>
        `;

        li.appendChild(a);
        toolListEl.appendChild(li);
      }
    });
  }
}
