import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# Remove the bopomofo properties from array elements
content = re.sub(r',\s*bopomofo:\s*\[[^\]]+\]', '', content)
content = re.sub(r',\s*bopomofo:\s*"[^"]+"', '', content)
content = re.sub(r'bopomofo:\s*"[^"]+",\s*', '', content)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
