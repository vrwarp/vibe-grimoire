import re

with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

# Fix commas
content = re.sub(r',\s*}', ' }', content)

# Remove the Zhuyin button block
zhuyin_button_block = r'''              {\/\* Method C: Zhuyin Stacking \*\/}
              <button
                onClick=\{\(\) => setLayoutMethod\('zhuyin'\)\}
                className=\{`p-3 rounded-xl border text-left transition-all flex items-start gap-3 \$\{
                  layoutMethod === 'zhuyin'
                    \? 'bg-gradient-to-r from-amber-950\/40 to-slate-900 border-amber-500\/60 text-white'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                \}`\}
              >
                <div className="mt-1 h-4 w-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  \{layoutMethod === 'zhuyin' && <div className="h-1\.5 w-1\.5 rounded-full bg-amber-400"><\/div>\}
                <\/div>
                <div>
                  <span className="font-bold text-xs block text-amber-300">Strategy C: Bopomofo Side-Stacking<\/span>
                  <span className="text-\[11px\] text-slate-400 block mt-0\.5 leading-relaxed">
                    Side-stacks phonetic annotation labels on the right-hand side to bypass horizontal compression demands entirely\.
                  <\/span>
                <\/div>
              <\/button>'''

content = re.sub(zhuyin_button_block, '', content, flags=re.MULTILINE)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
