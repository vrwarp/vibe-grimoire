import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# I will simply do a string replace for the entire lingering block
block = """                    {/* Side-Stacked Bopomofo */}
                    {layoutMethod === 'zhuyin' && (
                      <div
                        className="absolute flex flex-col items-center justify-center text-amber-300 font-mono select-none animate-fade-in"
                        style={{
                          right: `-${hanziSize * 0.28}px`,
                          height: '100%',
                          width: `${hanziSize * 0.22}px`,
                          fontSize: `${hanziSize * 0.22}px`,
                          lineHeight: 1.1,
                        }}
                      >
                        {displayData.bopomofo.split("").map((char, index) => (
                          <span key={index} className="relative">
                            {char}
                          </span>
                        ))}

                        {showGuides && (
                          <div className="absolute inset-y-0 -left-1 border-l border-dashed border-amber-500/20 pointer-events-none"></div>
                        )}
                      </div>
                    )}"""

content = content.replace(block, "")

# remove bopomofo from custom entry displayData
bopo_data = 'bopomofo: "ㄅㄧㄢˋ",'
content = content.replace(bopo_data, "")

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
