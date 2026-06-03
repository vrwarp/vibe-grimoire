with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

block = """                              {showGuides && (
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-dashed border-white flex items-center justify-center">
                                  <div className="h-full w-0 border-l border-white"></div>
                                  <div className="w-full h-0 border-t border-white absolute"></div>
                                </div>


                              <span className="leading-none z-10">{char}</span>"""

replacement = """                              {showGuides && (
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-dashed border-white flex items-center justify-center">
                                  <div className="h-full w-0 border-l border-white"></div>
                                  <div className="w-full h-0 border-t border-white absolute"></div>
                                </div>
                              )}

                              <span className="leading-none z-10">{char}</span>"""

content = content.replace(block, replacement)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
