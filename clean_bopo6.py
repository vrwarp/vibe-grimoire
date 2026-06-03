import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    lines = f.readlines()

new_lines = []
skip = False
for line in lines:
    if "Side-Stacked Bopomofo" in line:
        skip = True
        continue
    if skip:
        if line.strip() == ")}":
            skip = False
        continue
    new_lines.append(line)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.writelines(new_lines)
