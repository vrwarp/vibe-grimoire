with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# I removed the closing bracket of the showGuides condition earlier by accident
block1 = """                              {showGuides && (
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-dashed border-white flex items-center justify-center">
                                  <div className="h-full w-0 border-l border-white"></div>
                                  <div className="w-full h-0 border-t border-white absolute"></div>
                                </div>


                              <span className="leading-none z-10">{char}</span>"""

replacement1 = """                              {showGuides && (
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-dashed border-white flex items-center justify-center">
                                  <div className="h-full w-0 border-l border-white"></div>
                                  <div className="w-full h-0 border-t border-white absolute"></div>
                                </div>
                              )}

                              <span className="leading-none z-10">{char}</span>"""

content = content.replace(block1, replacement1)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
