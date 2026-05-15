import './style.css';

// Discover all index.html files inside the tools directory
const tools = import.meta.glob('./tools/*/index.html');

const toolListEl = document.getElementById('tool-list');

if (toolListEl) {
  const toolEntries = Object.keys(tools);

  // Clear loading state
  toolListEl.innerHTML = '';

  if (toolEntries.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'px-6 py-12 text-center text-gray-500 italic font-mono';
    emptyState.innerHTML = `
      <i class="fa-solid fa-triangle-exclamation text-yellow-500/50 text-3xl mb-4 block"></i>
      No grimoire modules detected in current sector.
    `;
    toolListEl.appendChild(emptyState);
  } else {
    // Array of technical icons to randomly assign
    const techIcons = [
      'fa-bolt-lightning',
      'fa-microchip',
      'fa-code',
      'fa-terminal',
      'fa-flask-vial',
      'fa-dna',
      'fa-atom',
      'fa-brain',
      'fa-satellite-dish',
      'fa-robot'
    ];

    toolEntries.forEach((path, index) => {
      // Extract the tool directory name from the path: './tools/tool-name/index.html'
      const match = path.match(/\.\/tools\/([^/]+)\/index\.html/);
      if (match && match[1]) {
        const folderName = match[1];

        // Format the folder name to be more readable
        const displayName = folderName
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const randomIcon = techIcons[index % techIcons.length];

        // Create the list item
        const li = document.createElement('li');
        li.className = 'group transition-all duration-300';

        const a = document.createElement('a');
        a.href = `./tools/${folderName}/index.html`;
        a.className = 'block px-6 py-6 glass-hover group-hover:pl-8 transition-all duration-300';

        a.innerHTML = `
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div class="flex-shrink-0 w-12 h-12 glass flex items-center justify-center rounded-xl border border-white/10 group-hover:border-neonCyan/50 transition-colors">
                <i class="fa-solid ${randomIcon} text-xl text-gray-400 group-hover:text-neonCyan transition-colors"></i>
              </div>
              <div class="ml-6">
                <p class="text-xl font-semibold text-gray-200 group-hover:text-white transition-colors tracking-tight">${displayName}</p>
                <p class="text-xs font-mono text-gray-500 group-hover:text-neonCyan/70 transition-colors uppercase tracking-widest mt-1">Module // ${folderName.replace(/-/g, '_')}</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <span class="text-[10px] font-mono text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity uppercase">Initialize >></span>
              <div class="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 group-hover:bg-neonCyan/10 transition-colors">
                <i class="fa-solid fa-chevron-right text-sm text-gray-600 group-hover:text-neonCyan transition-all transform group-hover:translate-x-1"></i>
              </div>
            </div>
          </div>
        `;

        li.appendChild(a);
        toolListEl.appendChild(li);
      }
    });
  }
}
