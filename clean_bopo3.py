import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# Remove zhuyin rendering block
zhuyin_render_block = r'''                                  {\/\* Lateral Zhuyin Stacking Option \*\/}
                                  \{layoutMethod === 'zhuyin' && \(
                                    <div
                                      className="absolute h-full flex flex-col justify-center items-center font-mono leading-none font-medium opacity-90"
                                      style=\{\{
                                        right: `-\$\{gridSquareSize \* 0\.4 \* worshipTextScale\}px`,
                                        fontSize: `\$\{gridSquareSize \* 0\.28 \* worshipTextScale\}px`,
                                        width: `\$\{gridSquareSize \* 0\.3 \* worshipTextScale\}px`,
                                        color: '#fbbf24'
                                      \}\}
                                    >
                                      \{bopomofoStr\.split\(""\)\.map\(\(bChar, bIdx\) => \(
                                        <span key=\{bIdx\} className="block">\{bChar\}<\/span>
                                      \)\)\}
                                    <\/div>
                                  \)\}'''

content = re.sub(zhuyin_render_block, '', content, flags=re.MULTILINE)

zhuyin_render_block2 = r'''                              {\/\* Lateral Zhuyin Column \*\/}
                              \{layoutMethod === 'zhuyin' && \(
                                <div
                                  className="absolute h-full flex flex-col justify-center items-center font-mono leading-none text-amber-300"
                                  style=\{\{
                                    right: `-\$\{gridSquareSize \* 0\.35\}px`,
                                    fontSize: `\$\{gridSquareSize \* 0\.2\}px`,
                                    width: `\$\{gridSquareSize \* 0\.25\}px`
                                  \}\}
                                >
                                  \{bopomofoStr\.split\(""\)\.map\(\(bChar, bIdx\) => \(
                                    <span key=\{bIdx\} className="block">\{bChar\}<\/span>
                                  \)\)\}
                                <\/div>
                              \)\}'''

content = re.sub(zhuyin_render_block2, '', content, flags=re.MULTILINE)


zhuyin_render_block3 = r'''                    {\/\* Side-Stacked Bopomofo \*\/}
                    \{layoutMethod === 'zhuyin' && \(
                      <div
                        className="absolute flex flex-col items-center justify-center text-amber-300 font-mono select-none animate-fade-in"
                        style=\{\{
                          right: `-\$\{hanziSize \* 0\.28\}px`,
                          height: '100%',
                          width: `\$\{hanziSize \* 0\.22\}px`,
                          fontSize: `\$\{hanziSize \* 0\.22\}px`,
                          lineHeight: 1\.1,
                        \}\}
                      >
                        \{displayData\.bopomofo\.split\(""\)\.map\(\(char, index\) => \(
                          <span key=\{index\} className="relative">
                            \{char\}
                          <\/span>
                        \)\)\}

                        \{showGuides && \(
                          <div className="absolute inset-y-0 -left-1 border-l border-dashed border-amber-500\/20 pointer-events-none"><\/div>
                        \)\}
                      <\/div>
                    \)\}'''

content = re.sub(zhuyin_render_block3, '', content, flags=re.MULTILINE)


zhuyin_render_block4 = r'''                          {\/\* Lateral Zhuyin Stacking Option \*\/}
                          \{layoutMethod === 'zhuyin' && \(
                            <div
                              className="absolute h-full flex flex-col justify-center items-center font-mono leading-none font-medium opacity-90"
                              style=\{\{
                                right: `-\$\{gridSquareSize \* 0\.55 \* worshipTextScale\}px`,
                                fontSize: `\$\{gridSquareSize \* 0\.45 \* worshipTextScale\}px`,
                                width: `\$\{gridSquareSize \* 0\.45 \* worshipTextScale\}px`,
                                color: '#fbbf24'
                              \}\}
                            >
                              \{bopomofoStr\.split\(""\)\.map\(\(bChar, bIdx\) => \(
                                <span key=\{bIdx\} className="block">\{bChar\}<\/span>
                              \)\)\}
                            <\/div>
                          \)\}'''

content = re.sub(zhuyin_render_block4, '', content, flags=re.MULTILINE)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
