with open('tools/pinyin-typography-lab/App.jsx', 'r') as f:
    content = f.read()

block = """                      {showEnglishWorship && (
                        <p className="text-xs sm:text-sm md:text-base font-light italic opacity-75 max-w-xl mx-auto line-clamp-2 px-4 leading-snug">
                          {AMAZING_GRACE_SLIDES[worshipSlideIdx].english}
                        </p>

                    </div>"""

replacement = """                      {showEnglishWorship && (
                        <p className="text-xs sm:text-sm md:text-base font-light italic opacity-75 max-w-xl mx-auto line-clamp-2 px-4 leading-snug">
                          {AMAZING_GRACE_SLIDES[worshipSlideIdx].english}
                        </p>
                      )}
                    </div>"""

content = content.replace(block, replacement)

with open('tools/pinyin-typography-lab/App.jsx', 'w') as f:
    f.write(content)
