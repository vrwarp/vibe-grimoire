import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# Remove stray definitions
content = re.sub(r'const bopomofoStr = line\.bopomofo\[cIdx\] \|\| "";\n', '', content)
content = re.sub(r'const bopomofoStr = line\.bopomofo\[cIdx\];\n', '', content)
content = re.sub(r'\{\/\* Side-Stacked Bopomofo \*\/\}\n\s*\{displayData\.bopomofo\.split\(""\)\.map\(\(char, index\) => \(\n\s*<span key=\{index\} className="relative">\n\s*\{char\}\n\s*<\/span>\n\s*\)\)\}\n', '', content)


with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
