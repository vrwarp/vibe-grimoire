with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

block = """                    <span className="z-10 leading-none">
                      {displayData.hanzi}
                    </span>

                      </div>


                  </div>"""

replacement = """                    <span className="z-10 leading-none">
                      {displayData.hanzi}
                    </span>
                  </div>"""

content = content.replace(block, replacement)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
