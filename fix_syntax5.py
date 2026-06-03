with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

block = """                    {/* Visual Quadrant Lines */}
                    {showGuides && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                        <div className="h-full w-[1px] border-l border-dashed border-slate-700"></div>
                        <div className="w-full h-[1px] border-t border-dashed border-slate-700 absolute"></div>
                        <div className="absolute inset-2 border border-dotted border-slate-800 rounded-lg"></div>
                      </div>


                    <span className="z-10 leading-none">"""

replacement = """                    {/* Visual Quadrant Lines */}
                    {showGuides && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                        <div className="h-full w-[1px] border-l border-dashed border-slate-700"></div>
                        <div className="w-full h-[1px] border-t border-dashed border-slate-700 absolute"></div>
                        <div className="absolute inset-2 border border-dotted border-slate-800 rounded-lg"></div>
                      </div>
                    )}

                    <span className="z-10 leading-none">"""

content = content.replace(block, replacement)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
