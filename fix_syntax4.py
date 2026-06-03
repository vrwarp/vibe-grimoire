with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

block = """                      {showGuides && (
                        <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[1px] border-b border-dashed border-indigo-500/30 -bottom-1 pointer-events-none">
                          <span className="absolute -left-10 -bottom-1 text-[7px] text-slate-500 font-mono">P_BASELINE</span>
                        </div>

                    </div>"""

replacement = """                      {showGuides && (
                        <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[1px] border-b border-dashed border-indigo-500/30 -bottom-1 pointer-events-none">
                          <span className="absolute -left-10 -bottom-1 text-[7px] text-slate-500 font-mono">P_BASELINE</span>
                        </div>
                      )}
                    </div>"""

content = content.replace(block, replacement)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
