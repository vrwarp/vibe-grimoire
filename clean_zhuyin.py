with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

content = content.replace(" | 'zhuyin'", "")
content = content.replace("Pinyin & Zhuyin Typography Lab", "Pinyin Typography Lab")
content = content.replace("Pinyin Ruby & Zhuyin Layout Laboratory", "Pinyin Ruby Layout Laboratory")
content = content.replace("{layoutMethod !== 'zhuyin' && (", "")
content = content.replace("{layoutMethod === 'zhuyin' && <span className=\"text-amber-300 font-semibold font-semibold font-semibold\">Taiwanese Lateral Zhuyin Block</span>}", "")

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
