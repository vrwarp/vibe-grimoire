import { useState, useMemo, useEffect } from "react";
import {

  Sparkles,
  Layers,
  BookOpen,

  Maximize2,

  Settings,
  Tv,
  ChevronLeft,
  ChevronRight,

  Maximize,
  Minimize2,


  ArrowDownUp
} from 'lucide-react';

const TEXTBOOK_SAMPLES = [
  {
    title: "Quiet Night Thought (静夜思)",
    author: "Li Bai (李白)",
    lines: [
      { hanzi: "床前明月光", pinyin: ["chuáng", "qián", "míng", "yuè", "guāng"], bopomofo: ["ㄔㄨㄤˊ", "ㄑㄧㄢˊ", "ㄇㄧㄥˊ", "ㄩㄝˋ", "ㄍㄨㄤ"] },
      { hanzi: "疑是地上霜", pinyin: ["yí", "shì", "dì", "shàng", "shuāng"], bopomofo: ["ㄧˊ", "ㄕˋ", "ㄉㄧˋ", "ㄕㄤˋ", "ㄕㄨㄤ"] },
      { hanzi: "举头望明月", pinyin: ["jǔ", "tóu", "wàng", "míng", "yuè"], bopomofo: ["ㄐㄩˇ", "ㄊㄡˊ", "ㄨㄤˋ", "ㄇㄧˊ", "ㄩㄝˋ"] },
      { hanzi: "低头思故乡", pinyin: ["dī", "tóu", "sī", "gù", "xiāng"], bopomofo: ["ㄉㄧ", "ㄊㄡˊ", "ㄙ", "ㄍㄨˋ", "ㄒㄧㄤ"] }
    ]
  },
  {
    title: "Spring Dawn (春晓)",
    author: "Meng Haoran (孟浩然)",
    lines: [
      { hanzi: "春眠不觉晓", pinyin: ["chūn", "mián", "bù", "jué", "xiǎo"], bopomofo: ["ㄔㄨㄣ", "ㄇㄧㄢˊ", "ㄅㄨˋ", "ㄐㄩㄝˊ", "ㄒㄧㄠˇ"] },
      { hanzi: "处处闻啼鸟", pinyin: ["chù", "chù", "wén", "tí", "niǎo"], bopomofo: ["ㄔㄨˋ", "ㄔㄨˋ", "ㄨㄣˊ", "ㄊㄧˊ", "ㄋㄧㄠˇ"] },
      { hanzi: "夜来风雨声", pinyin: ["yè", "lái", "fēng", "yǔ", "shēng"], bopomofo: ["ㄧㄝˋ", "ㄌㄞˊ", "ㄈㄥ", "ㄩˇ", "ㄕㄥ"] },
      { hanzi: "花落知多少", pinyin: ["huā", "luò", "zhī", "duō", "shǎo"], bopomofo: ["ㄏㄨㄚ", "ㄌㄨㄛˋ", "ㄓ", "ㄉㄨㄛ", "ㄕㄠˇ"] }
    ]
  }
];

const PRESETS = [
  { hanzi: "窗", pinyin: "chuāng", bopomofo: "ㄔㄨㄤˉ", desc: "6-letter long horizontal syllable containing medial, nucleus, and nasal coda." },
  { hanzi: "双", pinyin: "shuāng", bopomofo: "ㄕㄨㄤˉ", desc: "Complex double-consonant initial with nasal diphthong ending." },
  { hanzi: "强", pinyin: "qiáng", bopomofo: "ㄑㄧㄤˊ", desc: "5-letter nasal syllable prone to adjacent horizontal collision." },
  { hanzi: "绿", pinyin: "lǜ", bopomofo: "ㄌㄩˋ", desc: "Syllable utilizing a high-diacritic umlaut stacking challenge." },
  { hanzi: "知", pinyin: "zhī", bopomofo: "ㄓˉ", desc: "Standard short syllable to contrast alongside extended syllables." }
];

const AMAZING_GRACE_SLIDES = [
  {
    slideNumber: 1,
    type: "Verse 1",
    english: "Amazing grace, how sweet the sound, that saved a wretch like me.",
    lines: [
      { hanzi: "奇异恩典何等甘甜", pinyin: ["qí", "yì", "ēn", "diǎn", "hé", "děng", "gān", "tián"], bopomofo: ["ㄑㄧˊ", "ㄧˋ", "ㄣ", "ㄉㄧㄢˇ", "ㄏㄜˊ", "ㄉㄥˇ", "ㄍㄢ", "ㄊㄧㄢˊ"] },
      { hanzi: "我罪已得赦免", pinyin: ["wǒ", "zuì", "yǐ", "dé", "shè", "miǎn"], bopomofo: ["ㄨㄛˇ", "ㄗㄨㄟˋ", "ㄧˇ", "ㄉㄜˊ", "ㄕㄜˋ", "ㄇㄧㄢˇ"] },
      { hanzi: "前我失丧今被寻回", pinyin: ["qián", "wǒ", "shī", "sàng", "jīn", "bèi", "xún", "huí"], bopomofo: ["ㄑㄧㄢˊ", "ㄨㄛˇ", "ㄕ", "ㄙㄤˋ", "ㄐㄧㄣ", "ㄅㄟˋ", "ㄒㄩㄣˊ", "ㄏㄨㄟˊ"] },
      { hanzi: "瞎眼今得看见", pinyin: ["xiā", "yǎn", "jīn", "dé", "kàn", "jiàn"], bopomofo: ["ㄒㄧㄚ", "ㄧǎn", "ㄐㄧㄣ", "ㄉㄜˊ", "ㄎㄢˋ", "ㄐㄧㄢˋ"] }
    ]
  },
  {
    slideNumber: 2,
    type: "Verse 2",
    english: "'Twas grace that taught my heart to fear, and grace my fears relieved.",
    lines: [
      { hanzi: "如此恩典使我敬畏", pinyin: ["rú", "cǐ", "ēn", "diǎn", "shǐ", "wǒ", "jìng", "wèi"], bopomofo: ["ㄖㄨˊ", "ㄘˇ", "ㄣ", "ㄉㄧㄢˇ", "ㄕˇ", "ㄨㄛˇ", "ㄐㄧㄥˋ", "ㄨㄟˋ"] },
      { hanzi: "使我心得安慰", pinyin: ["shǐ", "wǒ", "xīn", "dé", "ān", "wèi"], bopomofo: ["ㄕˇ", "ㄨㄛˇ", "ㄒㄧㄣ", "ㄉㄜˊ", "ㄢ", "ㄨㄟˋ"] },
      { hanzi: "初信之时即蒙恩惠", pinyin: ["chū", "xìn", "zhī", "shí", "jí", "méng", "ēn", "huì"], bopomofo: ["ㄔㄨ", "ㄒㄧㄣˋ", "ㄓ", "ㄕˊ", "ㄐㄧˊ", "ㄇㄥˊ", "ㄣ", "ㄏㄨㄟˋ"] },
      { hanzi: "真是何等宝贵", pinyin: ["zhēn", "shì", "hé", "děng", "bǎo", "guì"], bopomofo: ["ㄓㄣ", "ㄕˋ", "ㄏㄜˊ", "ㄉㄥˇ", "ㄅㄠˇ", "ㄍㄨㄟˋ"] }
    ]
  },
  {
    slideNumber: 3,
    type: "Verse 3",
    english: "Through many dangers, toils and snares, I have already come.",
    lines: [
      { hanzi: "许多危险试炼网罗", pinyin: ["xǔ", "duō", "wēi", "xiǎn", "shì", "liàn", "wǎng", "luó"], bopomofo: ["ㄒㄩˇ", "ㄉㄨㄛ", "ㄨㄟ", "ㄒㄧㄢˇ", "ㄕˋ", "ㄌㄧㄢˋ", "ㄨㄤˇ", "ㄌㄨㄛˊ"] },
      { hanzi: "我已安然经过", pinyin: ["wǒ", "yǐ", "ān", "rán", "jīng", "guò"], bopomofo: ["ㄨㄛˇ", "ㄧˇ", "ㄢ", "ㄖㄢˊ", "ㄐㄧㄥ", "ㄍㄨㄛˋ"] },
      { hanzi: "靠主恩典安全不怕", pinyin: ["kào", "zhǔ", "ēn", "diǎn", "ān", "quán", "bú", "pà"], bopomofo: ["ㄎㄠˋ", "zhǔ", "ㄣ", "ㄉㄧㄢˇ", "ㄢ", "ㄑㄩㄢˊ", "ㄅㄨˊ", "ㄆㄚˋ"] },
      { hanzi: "更引导我归家", pinyin: ["gèng", "yǐn", "dǎo", "wǒ", "guī", "jiā"], bopomofo: ["ㄍㄥˋ", "ㄧㄣˇ", "ㄉㄠˇ", "ㄨㄛˇ", "ㄍㄨㄟ", "ㄐㄧㄚ"] }
    ]
  },
  {
    slideNumber: 4,
    type: "Verse 4",
    english: "When we've been there ten thousand years, bright shining as the sun.",
    lines: [
      { hanzi: "将来禧年圣徒欢聚", pinyin: ["jiāng", "lái", "xǐ", "nián", "shèng", "tú", "huān", "jù"], bopomofo: ["ㄐㄧㄤ", "ㄌㄞˊ", "ㄒㄧˇ", "ㄋㄧㄢˊ", "ㄕㄥˋ", "ㄊㄨˊ", "ㄏㄨㄢ", "ㄐㄩˇ"] },
      { hanzi: "恩光爱谊千年", pinyin: ["ēn", "guāng", "ài", "yì", "qiān", "nián"], bopomofo: ["ㄣ", "ㄍㄨㄤ", "ㄞˋ", "ㄧˋ", "ㄑㄧㄢ", "ㄋㄧㄢˊ"] },
      { hanzi: "喜乐颂赞在父座前", pinyin: ["xǐ", "lè", "sòng", "zàn", "zài", "fù", "zuò", "qián"], bopomofo: ["ㄒㄧˇ", "ㄌㄜˋ", "ㄙㄨㄥˋ", "ㄗㄢˋ", "ㄗㄞˋ", "ㄈㄨˋ", "ㄗㄨㄛˋ", "ㄑㄧㄢˊ"] },
      { hanzi: "深望那日快现", pinyin: ["shēn", "wàng", "nà", "rì", "kuài", "xiàn"], bopomofo: ["ㄕㄣ", "ㄨㄤˋ", "ㄋㄚˋ", "ㄖˋ", "ㄎㄨㄞˋ", "ㄒㄧㄢˋ"] }
    ]
  }
];

const WORSHIP_THEMES = {
  midnight: {
    name: "Midnight Grace",
    bg: "bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-900",
    text: "text-slate-100",
    pinyinColor: "text-indigo-300",
    border: "border-indigo-500/20",
    accent: "text-indigo-400"
  },
  gold: {
    name: "Golden Cathedral",
    bg: "bg-gradient-to-br from-stone-950 via-amber-950 to-neutral-900",
    text: "text-amber-100/95",
    pinyinColor: "text-amber-400",
    border: "border-amber-500/20",
    accent: "text-amber-300"
  },
  forest: {
    name: "Green Pastures",
    bg: "bg-gradient-to-b from-zinc-950 via-emerald-950/80 to-stone-900",
    text: "text-stone-100",
    pinyinColor: "text-emerald-300",
    border: "border-emerald-500/20",
    accent: "text-emerald-400"
  },
  minimalist: {
    name: "Sanctuary Slate",
    bg: "bg-gradient-to-tr from-zinc-950 to-zinc-900",
    text: "text-slate-200",
    pinyinColor: "text-sky-300/90",
    border: "border-slate-800",
    accent: "text-sky-400"
  }
};

export default function App() {
  const [activePreset, setActivePreset] = useState(PRESETS[0]);
  const [layoutMethod, setLayoutMethod] = useState('variable'); // 'variable' | 'overhang' | 'zhuyin'
  const [activeTab, setActiveTab] = useState('worship'); // Tab focus

  // Custom micro-tuning controls
  const [fontWidth, setFontWidth] = useState(65); // Range: 30% to 120%
  const [fontWeight, setFontWeight] = useState(500); // Range: 100 to 1000
  const [letterSpacing, setLetterSpacing] = useState(-0.04); // Range: -0.25em to 0.25em
  const [squeezeTarget, setSqueezeTarget] = useState('smart'); // 'smart' | 'proportional' | 'global'

  // NEW state variable: Pinyin Vertical Offset (customizable gap relative to baseline)
  const [pinyinOffset, setPinyinOffset] = useState(4); // Range: -20px to 60px

  // Base scales and offsets
  const [pinyinFontSize, setPinyinFontSize] = useState(13); // Range: 8px to 24px
  const [gridSquareSize, setGridSquareSize] = useState(48); // Range: 36px to 80px
  const [showGuides, setShowGuides] = useState(false);
  const [hanziSize, setHanziSize] = useState(140); // Sandbox scale
  const [activeTextbook, setActiveTextbook] = useState(TEXTBOOK_SAMPLES[0]);

  // Worship slide states
  const [worshipSlideIdx, setWorshipSlideIdx] = useState(0);
  const [worshipTheme, setWorshipTheme] = useState('midnight');
  const [worshipRatio, setWorshipRatio] = useState('16:9'); // '16:9' or '4:3'
  const [showEnglishWorship, setShowEnglishWorship] = useState(true);
  const [isFullscreenWorship, setIsFullscreenWorship] = useState(false);
  const [worshipTextScale, setWorshipTextScale] = useState(1.1); // Widescreen typography scalar

  const [customHanzi, setCustomHanzi] = useState("");
  const [customPinyin, setCustomPinyin] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (activeTab !== 'worship') return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        e.preventDefault();
        setWorshipSlideIdx((prev) => (prev + 1) % AMAZING_GRACE_SLIDES.length);
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setWorshipSlideIdx((prev) => (prev - 1 + AMAZING_GRACE_SLIDES.length) % AMAZING_GRACE_SLIDES.length);
      } else if (e.key === 'Escape' && isFullscreenWorship) {
        setIsFullscreenWorship(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeTab, isFullscreenWorship]);

  const displayData = useMemo(() => {
    if (customHanzi.trim() && customPinyin.trim()) {
      return {
        hanzi: customHanzi.trim().charAt(0),
        pinyin: customPinyin.trim().toLowerCase(),
        bopomofo: "ㄅㄧㄢˋ",
        desc: "Custom User Syllable Entry"
      };
    }
    return activePreset;
  }, [activePreset, customHanzi, customPinyin]);

  const getPinyinStyle = (pinyinStr, isTextbook = false, isWorship = false) => {
    const len = pinyinStr.length;
    let activeWidth = 100;
    let activeTracking = 0;
    let activeWeight = 400;

    if (layoutMethod === 'variable') {
      if (squeezeTarget === 'global') {
        activeWidth = fontWidth;
        activeTracking = letterSpacing;
        activeWeight = fontWeight;
      } else if (squeezeTarget === 'smart') {
        if (len >= 5) {
          activeWidth = fontWidth;
          activeTracking = letterSpacing;
          activeWeight = fontWeight;
        } else {
          activeWidth = 100;
          activeTracking = 0;
          activeWeight = 400;
        }
      } else if (squeezeTarget === 'proportional') {
        if (len <= 3) {
          activeWidth = 100;
          activeTracking = 0;
          activeWeight = 400;
        } else if (len === 4) {
          activeWidth = 100 - (100 - fontWidth) * 0.35;
          activeTracking = letterSpacing * 0.35;
          activeWeight = 400 + (fontWeight - 400) * 0.35;
        } else {
          activeWidth = fontWidth;
          activeTracking = letterSpacing;
          activeWeight = fontWeight;
        }
      }
    }

    let baseSize = pinyinFontSize;
    if (isWorship) {
      baseSize = pinyinFontSize * 2.2 * worshipTextScale;
    } else if (!isTextbook) {
      baseSize = hanziSize * 0.32;
    }

    return {
      fontSize: `${baseSize}px`,
      fontWeight: Math.round(activeWeight),
      letterSpacing: `${activeTracking}em`,
      transform: `scaleX(${activeWidth / 100})`,
      transformOrigin: 'bottom center',
      whiteSpace: 'nowrap',
    };
  };

  const getWeightLabel = (w) => {
    if (w <= 150) return `${w} (Thin)`;
    if (w <= 250) return `${w} (Extra Light)`;
    if (w <= 350) return `${w} (Light)`;
    if (w <= 450) return `${w} (Regular)`;
    if (w <= 550) return `${w} (Medium)`;
    if (w <= 650) return `${w} (Semibold)`;
    if (w <= 750) return `${w} (Bold)`;
    if (w <= 850) return `${w} (Extra Bold)`;
    return `${w} (Black)`;
  };

  const currentTheme = WORSHIP_THEMES[worshipTheme];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">

      {/* HEADER BAR */}
      <header className="border-b border-slate-850 bg-slate-900/90 backdrop-blur-md px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold tracking-tight text-xl shadow-lg shadow-indigo-500/20">
            Pÿ
          </div>
          <div>
            <h1 className="text-base font-bold tracking-tight text-white flex items-center gap-2">
              Pinyin & Zhuyin Typography Lab
              <span className="text-[10px] bg-indigo-500/10 text-indigo-300 font-mono px-2 py-0.5 rounded border border-indigo-500/20 font-bold uppercase tracking-wider font-semibold">V4.7 Offset Precision</span>
            </h1>
            <p className="text-xs text-slate-400">Micro-tune horizontal character scaling, tracking compensation, and vertical Pinyin offsets dynamically.</p>
          </div>
        </div>

        {/* REGRESSION TARGET TRACKING */}
        <div className="flex flex-col sm:items-end text-xs">
          <span className="text-slate-500 font-mono">Reference State Inspected:</span>
          <span className="text-amber-400 font-semibold font-mono flex items-center gap-1.5 mt-0.5">
            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse"></span>
            Screenshot 2026-06-03 at 00.42.19.jpg (Aligning Baselines)
          </span>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT PANEL: INTERACTIVE CONFIGURATIONS */}
        <section className="lg:col-span-4 flex flex-col gap-6">

          {/* STEP 1: INTERACTIVE SYLLABLE SELECTOR */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              1. Choose a Test Syllable
            </h2>

            <div className="grid grid-cols-5 gap-1.5">
              {PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCustomHanzi("");
                    setCustomPinyin("");
                    setActivePreset(p);
                  }}
                  className={`p-2 rounded-lg border text-center transition-all ${
                    activePreset.hanzi === p.hanzi && !customHanzi
                      ? 'bg-indigo-500/15 border-indigo-500/60 text-white shadow-md'
                      : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                  }`}
                >
                  <div className="text-lg font-serif font-bold">{p.hanzi}</div>
                  <div className="text-[10px] font-mono mt-0.5 text-indigo-400 truncate">{p.pinyin}</div>
                </button>
              ))}
            </div>

            <div className="border-t border-slate-800/60 pt-3 space-y-2">
              <span className="block text-[11px] text-slate-400 font-semibold">Or Custom Syllable Core:</span>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  maxLength={1}
                  placeholder="Hanzi (e.g. 霜)"
                  value={customHanzi}
                  onChange={(e) => setCustomHanzi(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-serif"
                />
                <input
                  type="text"
                  placeholder="Pinyin (e.g. shuāng)"
                  value={customPinyin}
                  onChange={(e) => setCustomPinyin(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-mono"
                />
              </div>
            </div>

            <p className="text-xs text-slate-400 bg-slate-950/80 p-3 rounded-lg border border-slate-850/60 leading-relaxed">
              <strong className="text-indigo-400 font-semibold">Syllable Specs:</strong> {displayData.desc}
            </p>
          </div>

          {/* STEP 2: CHOOSE RENDERING LAYOUT MECHANIC */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-3">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-400" />
              2. Select Layout Strategy
            </h2>

            <div className="flex flex-col gap-2">

              {/* Method A: Variable Font Compression */}
              <button
                onClick={() => setLayoutMethod('variable')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  layoutMethod === 'variable'
                    ? 'bg-gradient-to-r from-indigo-950/40 to-slate-900 border-indigo-500/60 text-white'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="mt-1 h-4 w-4 rounded-full border-2 border-indigo-500 flex items-center justify-center">
                  {layoutMethod === 'variable' && <div className="h-1.5 w-1.5 rounded-full bg-indigo-400"></div>}
                </div>
                <div>
                  <span className="font-bold text-xs block text-indigo-300">Strategy A: Variable Font Squeeze</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5 leading-relaxed">
                    Uses physical font stretching scale-factors with stroke weight compensation to pull letters inward without structural distortion.
                  </span>
                </div>
              </button>

              {/* Method B: Overhang Standard */}
              <button
                onClick={() => setLayoutMethod('overhang')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  layoutMethod === 'overhang'
                    ? 'bg-gradient-to-r from-teal-950/40 to-slate-900 border-teal-500/60 text-white'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="mt-1 h-4 w-4 rounded-full border-2 border-teal-500 flex items-center justify-center">
                  {layoutMethod === 'overhang' && <div className="h-1.5 w-1.5 rounded-full bg-teal-400"></div>}
                </div>
                <div>
                  <span className="font-bold text-xs block text-teal-300">Strategy B: W3C CLREQ Overhang</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5 leading-relaxed">
                    Allows the Pinyin text to extend over adjacent character bounds up to a defined margin limit to preserve regular tracking.
                  </span>
                </div>
              </button>

              {/* Method C: Zhuyin Stacking */}
              <button
                onClick={() => setLayoutMethod('zhuyin')}
                className={`p-3 rounded-xl border text-left transition-all flex items-start gap-3 ${
                  layoutMethod === 'zhuyin'
                    ? 'bg-gradient-to-r from-amber-950/40 to-slate-900 border-amber-500/60 text-white'
                    : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="mt-1 h-4 w-4 rounded-full border-2 border-amber-500 flex items-center justify-center">
                  {layoutMethod === 'zhuyin' && <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>}
                </div>
                <div>
                  <span className="font-bold text-xs block text-amber-300">Strategy C: Bopomofo Side-Stacking</span>
                  <span className="text-[11px] text-slate-400 block mt-0.5 leading-relaxed">
                    Side-stacks phonetic annotation labels on the right-hand side to bypass horizontal compression demands entirely.
                  </span>
                </div>
              </button>

            </div>
          </div>

          {/* STEP 3: CONTROLS & ADJUSTMENTS */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
            <h2 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Settings className="h-4 w-4 text-indigo-400" />
                3. Micro-Typography Tuning
              </span>
              <button
                onClick={() => {
                  setFontWidth(65);
                  setFontWeight(500);
                  setLetterSpacing(-0.04);
                  setPinyinOffset(4);
                  setPinyinFontSize(13);
                  setGridSquareSize(48);
                  setHanziSize(140);
                  setSqueezeTarget('smart');
                }}
                className="text-[10px] text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-2 py-0.5 rounded transition-all"
              >
                Reset Controls
              </button>
            </h2>

            {/* SQUEEZE APPLICATION SELECTOR */}
            <div className="space-y-1.5 border-b border-slate-800/60 pb-3">
              <span className="block text-xs text-slate-300">Squeeze Strategy Application</span>
              <div className="grid grid-cols-3 gap-1 bg-slate-950 p-1 rounded-lg border border-slate-850">
                <button
                  onClick={() => setSqueezeTarget('smart')}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                    squeezeTarget === 'smart'
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Smart (≥5 letters)
                </button>
                <button
                  onClick={() => setSqueezeTarget('proportional')}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                    squeezeTarget === 'proportional'
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Proportional
                </button>
                <button
                  onClick={() => setSqueezeTarget('global')}
                  className={`py-1 text-[10px] font-semibold rounded-md transition-all ${
                    squeezeTarget === 'global'
                      ? 'bg-indigo-500 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Global All
                </button>
              </div>
            </div>

            {/* NEW: Pinyin Vertical Offset modifier slider */}
            <div className="space-y-1 bg-slate-950/40 p-2.5 rounded-lg border border-slate-850/60">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 flex items-center gap-1.5">
                  <ArrowDownUp className="h-3.5 w-3.5 text-indigo-400" />
                  Pinyin Vertical Offset
                </span>
                <span className="font-mono text-indigo-400 font-semibold">{pinyinOffset}px</span>
              </div>
              <input
                type="range"
                min="-20"
                max="60"
                step="1"
                value={pinyinOffset}
                onChange={(e) => setPinyinOffset(parseInt(e.target.value))}
                className="w-full accent-indigo-400 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[9px] text-slate-500 font-mono">
                <span>Tight (-20px)</span>
                <span>Default (4px)</span>
                <span>Spaced (60px)</span>
              </div>
            </div>

            {/* Scale X slider */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Optical Width Squeeze</span>
                <span className="font-mono text-indigo-400">{fontWidth}% width</span>
              </div>
              <input
                type="range"
                min="30"
                max="120"
                step="1"
                value={fontWidth}
                onChange={(e) => setFontWidth(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Stroke Thickness Compensation */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Stroke Weight Compensation</span>
                <span className="font-mono text-indigo-400">{getWeightLabel(fontWeight)}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={fontWeight}
                onChange={(e) => setFontWeight(parseInt(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Letter spacing tracking */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Letter Tracking (Kern)</span>
                <span className="font-mono text-indigo-400">{letterSpacing.toFixed(3)}em</span>
              </div>
              <input
                type="range"
                min="-0.250"
                max="0.250"
                step="0.005"
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Phonetic Font Size Scale */}
            <div className="space-y-1 border-t border-slate-800/60 pt-3">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Pinyin Base Size</span>
                <span className="font-mono text-teal-400">{pinyinFontSize}px</span>
              </div>
              <input
                type="range"
                min="8"
                max="24"
                step="1"
                value={pinyinFontSize}
                onChange={(e) => setPinyinFontSize(parseInt(e.target.value))}
                className="w-full accent-teal-500 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Hanzi Grid Size Scale */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300">Hanzi Grid Width</span>
                <span className="font-mono text-teal-400">{gridSquareSize}px</span>
              </div>
              <input
                type="range"
                min="36"
                max="80"
                step="1"
                value={gridSquareSize}
                onChange={(e) => setGridSquareSize(parseInt(e.target.value))}
                className="w-full accent-teal-500 bg-slate-950 h-1 rounded-lg cursor-pointer"
              />
            </div>

            {/* Font / Layout Guides toggle */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
              <span className="text-xs text-slate-400">Show Grid & Alignment Guides</span>
              <button
                onClick={() => setShowGuides(!showGuides)}
                className={`text-[10px] font-mono px-2 py-1 rounded transition-all border ${
                  showGuides
                    ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    : 'bg-slate-950 text-slate-500 border-slate-850'
                }`}
              >
                {showGuides ? 'ACTIVE' : 'MUTED'}
              </button>
            </div>
          </div>

        </section>

        {/* RIGHT PANEL: LIVE TYPOGRAPHIC STAGE */}
        <section className="lg:col-span-8 flex flex-col gap-6">

          {/* NAVIGATION TABS */}
          <div className="flex bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveTab('worship')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'worship'
                  ? 'bg-slate-950 text-white shadow-lg border-b border-indigo-500/50'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tv className="h-4 w-4 text-indigo-400" />
              Church Worship Slide
            </button>
            <button
              onClick={() => setActiveTab('textbook')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'textbook'
                  ? 'bg-slate-950 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="h-4 w-4 text-teal-400" />
              School Textbook Simulator
            </button>
            <button
              onClick={() => setActiveTab('single')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-xs font-semibold rounded-lg transition-all ${
                activeTab === 'single'
                  ? 'bg-slate-950 text-white shadow-lg'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Maximize2 className="h-4 w-4 text-purple-400" />
              Interactive Glyph Sandbox
            </button>
          </div>

          {/* TAB 1: CHURCH WORSHIP SLIDE SIMULATOR */}
          {activeTab === 'worship' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-200 flex items-center gap-1.5">
                    <Tv className="h-4 w-4 text-indigo-400" />
                    Amazing Grace Worship Slide Engine
                  </h3>
                  <p className="text-xs text-slate-400">Live projection simulator configured to solve baseline vertical spacing limits.</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="font-bold text-slate-200">Theme:</span>
                    <select
                      value={worshipTheme}
                      onChange={(e) => setWorshipTheme(e.target.value)}
                      className="bg-transparent border-none text-indigo-400 font-medium focus:outline-none cursor-pointer text-xs"
                    >
                      {Object.keys(WORSHIP_THEMES).map((k) => (
                        <option key={k} value={k} className="bg-slate-950 text-slate-200">{WORSHIP_THEMES[k].name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-slate-950 px-2 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="font-bold text-slate-200">Ratio:</span>
                    <button
                      onClick={() => setWorshipRatio(worshipRatio === '16:9' ? '4:3' : '16:9')}
                      className="text-indigo-400 font-mono font-bold"
                    >
                      {worshipRatio}
                    </button>
                  </div>

                  <button
                    onClick={() => setIsFullscreenWorship(true)}
                    className="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all flex items-center gap-1 text-xs font-semibold"
                    title="Launch Presentation Mode"
                  >
                    <Maximize className="h-3.5 w-3.5" />
                    Present
                  </button>
                </div>
              </div>

              {/* DYNAMIC PRESENTATION ASPECT CONTAINER */}
              <div className="flex flex-col items-center justify-center p-2 bg-slate-950 rounded-xl border border-slate-850">

                {/* 16:9 / 4:3 Aspect Frame wrapper */}
                <div
                  className={`w-full relative overflow-hidden rounded-lg shadow-2xl transition-all duration-300 ${currentTheme.bg} ${currentTheme.text}`}
                  style={{
                    aspectRatio: worshipRatio === '16:9' ? '16/9' : '4/3',
                    maxWidth: '100%'
                  }}
                >
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,rgba(0,0,0,0.4)_100%)]"></div>

                  {/* Corner accent lines */}
                  <div className={`absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 opacity-20 ${currentTheme.border}`}></div>
                  <div className={`absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 opacity-20 ${currentTheme.border}`}></div>
                  <div className={`absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 opacity-20 ${currentTheme.border}`}></div>
                  <div className={`absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 opacity-20 ${currentTheme.border}`}></div>

                  <div className="absolute top-4 right-6 text-[10px] font-mono tracking-widest opacity-40">
                    {AMAZING_GRACE_SLIDES[worshipSlideIdx].type}
                  </div>

                  {/* MAIN LYRIC AREA */}
                  <div className="h-full w-full flex flex-col justify-between p-6 sm:p-10 text-center select-none">

                    <div className="opacity-45 text-[10px] sm:text-xs font-serif italic tracking-wider">
                      Amazing Grace • 奇异恩典
                    </div>

                    {/* Lyric Lines Block */}
                    <div className="my-auto flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8">
                      {AMAZING_GRACE_SLIDES[worshipSlideIdx].lines.map((line, lIdx) => (
                        <div
                          key={lIdx}
                          className="flex flex-wrap justify-center items-end"
                          style={{ gap: `${gridSquareSize * 0.45 * worshipTextScale}px` }}
                        >
                          {line.hanzi.split("").map((char, cIdx) => {
                            const pinyinStr = line.pinyin[cIdx] || "";
                            const bopomofoStr = line.bopomofo[cIdx] || "";
                            const isLong = pinyinStr.length >= 5;

                            return (
                              <div
                                key={cIdx}
                                className="flex flex-col items-center relative"
                                style={{ width: `${gridSquareSize * 1.1 * worshipTextScale}px` }}
                              >
                                {/* Pinyin Annotation Layer with dynamic Vertical Offset customizability */}
                                {layoutMethod !== 'zhuyin' && (
                                  <span
                                    className="absolute text-center tracking-normal font-sans"
                                    style={{
                                      // Default top calculation modified by our new customizable pixel offset
                                      top: `-${(pinyinFontSize * 1.8 * worshipTextScale) + pinyinOffset}px`,
                                      ...getPinyinStyle(pinyinStr, false, true),
                                      color: isLong ? '#fcd34d' : 'inherit',
                                      textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                                    }}
                                  >
                                    {pinyinStr}
                                  </span>
                                )}

                                {/* Base Chinese Character */}
                                <div
                                  className="font-serif relative z-10 font-bold transition-all"
                                  style={{
                                    fontSize: `${gridSquareSize * 1.1 * worshipTextScale}px`,
                                    lineHeight: '1.1',
                                    textShadow: '0 2px 8px rgba(0,0,0,0.6)'
                                  }}
                                >
                                  {char}

                                  {/* Lateral Zhuyin Stacking Option */}
                                  {layoutMethod === 'zhuyin' && (
                                    <div
                                      className="absolute h-full flex flex-col justify-center items-center font-mono leading-none font-medium opacity-90"
                                      style={{
                                        right: `-${gridSquareSize * 0.4 * worshipTextScale}px`,
                                        fontSize: `${gridSquareSize * 0.28 * worshipTextScale}px`,
                                        width: `${gridSquareSize * 0.3 * worshipTextScale}px`,
                                        color: '#fbbf24'
                                      }}
                                    >
                                      {bopomofoStr.split("").map((bChar, bIdx) => (
                                        <span key={bIdx} className="block">{bChar}</span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>

                    {/* Optional English subtitle */}
                    <div className="h-6 sm:h-10 flex items-center justify-center">
                      {showEnglishWorship && (
                        <p className="text-xs sm:text-sm md:text-base font-light italic opacity-75 max-w-xl mx-auto line-clamp-2 px-4 leading-snug">
                          {AMAZING_GRACE_SLIDES[worshipSlideIdx].english}
                        </p>
                      )}
                    </div>

                  </div>

                  {/* LEFT/RIGHT CLICK NAVIGATION */}
                  <button
                    onClick={() => setWorshipSlideIdx((prev) => (prev - 1 + AMAZING_GRACE_SLIDES.length) % AMAZING_GRACE_SLIDES.length)}
                    className="absolute inset-y-0 left-0 w-12 sm:w-16 flex items-center justify-start pl-2 sm:pl-4 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-r from-black/25 to-transparent text-white"
                  >
                    <ChevronLeft className="h-8 w-8 drop-shadow" />
                  </button>
                  <button
                    onClick={() => setWorshipSlideIdx((prev) => (prev + 1) % AMAZING_GRACE_SLIDES.length)}
                    className="absolute inset-y-0 right-0 w-12 sm:w-16 flex items-center justify-end pr-2 sm:pr-4 opacity-0 hover:opacity-100 transition-opacity bg-gradient-to-l from-black/25 to-transparent text-white"
                  >
                    <ChevronRight className="h-8 w-8 drop-shadow" />
                  </button>

                </div>

                {/* BOTTOM NAVIGATION DOTS & CONTROLS */}
                <div className="w-full flex items-center justify-between p-3 mt-1 text-xs">
                  <div className="flex items-center gap-1.5">
                    {AMAZING_GRACE_SLIDES.map((slide, idx) => (
                      <button
                        key={idx}
                        onClick={() => setWorshipSlideIdx(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === worshipSlideIdx ? 'w-6 bg-indigo-500' : 'w-2 bg-slate-800 hover:bg-slate-700'
                        }`}
                        title={`Go to ${slide.type}`}
                      />
                    ))}
                  </div>

                  <span className="text-slate-500 font-mono text-[11px]">
                    Slide {worshipSlideIdx + 1} of {AMAZING_GRACE_SLIDES.length} • Press <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-indigo-400 font-mono">Space</kbd> / <kbd className="bg-slate-900 border border-slate-800 px-1 py-0.5 rounded text-indigo-400 font-mono">⇄ Keys</kbd>
                  </span>
                </div>

              </div>

              {/* INTEGRATED TUNING CONTROLS FOR WORSHIP SETTING */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="space-y-1">
                  <span className="block text-xs font-semibold text-slate-300">Worship Large Print Scale:</span>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="0.8"
                      max="1.5"
                      step="0.05"
                      value={worshipTextScale}
                      onChange={(e) => setWorshipTextScale(parseFloat(e.target.value))}
                      className="w-full accent-indigo-500 bg-slate-900 h-1 cursor-pointer"
                    />
                    <span className="text-xs font-mono text-indigo-400 shrink-0 w-8">{(worshipTextScale * 100).toFixed(0)}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between border-l border-slate-850 pl-0 md:pl-4">
                  <span className="text-xs text-slate-300">English Helper Subtitle:</span>
                  <button
                    onClick={() => setShowEnglishWorship(!showEnglishWorship)}
                    className={`text-[10px] font-mono px-3 py-1 rounded-lg border transition-all ${
                      showEnglishWorship
                        ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30 font-bold'
                        : 'bg-slate-900 text-slate-500 border-slate-800'
                    }`}
                  >
                    {showEnglishWorship ? "VISIBLE" : "MUTED"}
                  </button>
                </div>

                <div className="flex items-center justify-between border-l border-slate-850 pl-0 md:pl-4">
                  <div className="text-xs">
                    <span className="text-slate-300 block font-semibold">Active Strategy:</span>
                    <span className="text-[10px] text-indigo-400 uppercase font-mono">
                      {layoutMethod === 'variable' ? `Variable Squeeze (${squeezeTarget})` : layoutMethod}
                    </span>
                  </div>
                  <span className="text-[10px] bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-400 font-mono">
                    W3C Standardized
                  </span>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: TEXTBOOK POEM LINE-BREAKER SIMULATOR */}
          {activeTab === 'textbook' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-200">Scale-Responsive Textbook Layout</h3>
                  <p className="text-xs text-slate-400">Testing grid containment for adjacent multi-vowel syllables.</p>
                </div>
                <div className="flex gap-2">
                  {TEXTBOOK_SAMPLES.map((sample, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTextbook(sample)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                        activeTextbook.title === sample.title
                          ? 'bg-indigo-500 text-white'
                          : 'bg-slate-950 text-slate-400 border border-slate-850 hover:text-slate-200'
                      }`}
                    >
                      {sample.title.split(" ")[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* SIMULATED GRID WORKSPACE */}
              <div className="bg-slate-950 border border-slate-850 rounded-xl p-6 overflow-x-auto">
                <div className="text-center mb-6">
                  <h4 className="text-base font-serif font-bold text-white">{activeTextbook.title}</h4>
                  <span className="text-xs text-slate-500">{activeTextbook.author}</span>
                </div>

                <div className="flex flex-col items-center gap-8 min-w-[450px] py-4">
                  {activeTextbook.lines.map((line, lIdx) => (
                    <div key={lIdx} className="flex justify-center" style={{ gap: `${gridSquareSize * 0.4}px` }}>

                      {line.hanzi.split("").map((char, cIdx) => {
                        const pinyinStr = line.pinyin[cIdx];
                        const bopomofoStr = line.bopomofo[cIdx];
                        const isLong = pinyinStr.length >= 5;

                        return (
                          <div
                            key={cIdx}
                            className="flex flex-col items-center relative"
                            style={{ width: `${gridSquareSize}px` }}
                          >

                            {/* Standard / Variable / Overhang Pinyin Rendering */}
                            {layoutMethod !== 'zhuyin' && (
                              <span
                                className="absolute text-center select-none font-sans transition-all leading-none"
                                style={{
                                  // Customizable Offset applied on vertical position of the textbook annotation
                                  top: `-${pinyinFontSize + 8 + pinyinOffset}px`,
                                  ...getPinyinStyle(pinyinStr, true),
                                  color: isLong ? '#a5b4fc' : '#cbd5e1',
                                }}
                              >
                                {pinyinStr}
                              </span>
                            )}

                            {/* Standard Grid Square with dynamic width/height limits */}
                            <div
                              className="bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-center font-serif text-slate-100 relative shadow-inner"
                              style={{
                                width: `${gridSquareSize}px`,
                                height: `${gridSquareSize}px`,
                                fontSize: `${gridSquareSize * 0.55}px`
                              }}
                            >

                              {/* Internal diagonal guidelines inside characters */}
                              {showGuides && (
                                <div className="absolute inset-0 pointer-events-none opacity-[0.03] border border-dashed border-white flex items-center justify-center">
                                  <div className="h-full w-0 border-l border-white"></div>
                                  <div className="w-full h-0 border-t border-white absolute"></div>
                                </div>
                              )}

                              <span className="leading-none z-10">{char}</span>

                              {/* Lateral Zhuyin Column */}
                              {layoutMethod === 'zhuyin' && (
                                <div
                                  className="absolute h-full flex flex-col justify-center items-center font-mono leading-none text-amber-300"
                                  style={{
                                    right: `-${gridSquareSize * 0.35}px`,
                                    fontSize: `${gridSquareSize * 0.2}px`,
                                    width: `${gridSquareSize * 0.25}px`
                                  }}
                                >
                                  {bopomofoStr.split("").map((bChar, bIdx) => (
                                    <span key={bIdx} className="block">{bChar}</span>
                                  ))}
                                </div>
                              )}

                            </div>

                          </div>
                        );
                      })}

                    </div>
                  ))}
                </div>

              </div>

              {/* DYNAMIC COLLISION WARNING SYSTEM */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 flex items-center justify-between text-xs gap-4">
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 block">Squeeze Sizing Metric Guard:</span>
                  <p className="text-slate-400 text-[11px]">
                    At <span className="text-indigo-400 font-mono">{fontWidth}%</span> squeeze and <span className="text-indigo-400 font-mono">{letterSpacing}em</span> tracking, the longest syllable (*chuāng* - 6 letters) spans approximately <span className="text-indigo-300 font-bold font-mono">{Math.max(15, Math.round(6 * (pinyinFontSize * (fontWidth / 100) * 0.55 + letterSpacing * 12)))}px</span> horizontally.
                  </p>
                </div>
                {6 * (pinyinFontSize * (fontWidth / 100) * 0.55 + letterSpacing * 12) > gridSquareSize && layoutMethod === 'variable' ? (
                  <span className="bg-amber-500/10 border border-amber-500/30 text-amber-400 px-2.5 py-1 rounded font-mono font-bold text-[10px] uppercase shrink-0">
                    Slight Overflow Risk
                  </span>
                ) : (
                  <span className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded font-mono font-bold text-[10px] uppercase shrink-0">
                    Perfect Container Fit!
                  </span>
                )}
              </div>

            </div>
          )}

          {/* TAB 3: INDIVIDUAL HIGH-FIDELITY SANDBOX */}
          {activeTab === 'single' && (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col items-center justify-center relative overflow-hidden min-h-[500px]">

              {/* STATUS INDICATOR */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-full bg-indigo-500 animate-pulse"></div>
                <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                  Pristine Text Rendering Engine (Active)
                </span>
              </div>

              <div className="absolute top-4 right-4 text-[10px] font-mono bg-slate-950 px-3 py-1 rounded-full border border-slate-850">
                LAYOUT ENGINE: <span className="text-indigo-400 font-bold">{layoutMethod.toUpperCase()}</span>
              </div>

              {/* LIVE DYNAMIC CANVAS */}
              <div className="relative border border-slate-800/80 bg-slate-950 rounded-2xl p-8 shadow-inner flex flex-col items-center justify-center w-full max-w-lg my-12 min-h-[280px]">

                {/* W3C Overhang guide bands */}
                {layoutMethod === 'overhang' && showGuides && (
                  <div className="absolute inset-y-0 w-[140px] border-l border-r border-dashed border-teal-500/30 bg-teal-500/[0.01] pointer-events-none flex justify-between px-1">
                    <span className="text-[7px] text-teal-500/40 font-mono rotate-90 origin-top-left translate-y-12 whitespace-nowrap">OVERHANG BOUNDARY</span>
                    <span className="text-[7px] text-teal-500/40 font-mono rotate-90 origin-top-left translate-y-12 whitespace-nowrap">OVERHANG BOUNDARY</span>
                  </div>
                )}

                {/* THE TYPOGRAPHIC CONTAINER */}
                <div className="relative flex flex-col items-center justify-center">

                  {/* Dynamic Top Pinyin Display */}
                  {layoutMethod !== 'zhuyin' && (
                    <div
                      className="absolute select-none font-sans transition-all text-center"
                      style={{
                        // Customizable Offset applied to the isolated Sandbox mode as well
                        top: `-${(hanziSize * 0.48) + pinyinOffset * 1.5}px`,
                        ...getPinyinStyle(displayData.pinyin, false),
                        color: '#a5b4fc',
                      }}
                    >
                      {displayData.pinyin}

                      {/* Typographic baseline line rendering inside sandbox */}
                      {showGuides && (
                        <div className="absolute left-1/2 -translate-x-1/2 w-[140%] h-[1px] border-b border-dashed border-indigo-500/30 -bottom-1 pointer-events-none">
                          <span className="absolute -left-10 -bottom-1 text-[7px] text-slate-500 font-mono">P_BASELINE</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Chinese Character Base Frame Underlay */}
                  <div
                    className="relative border border-slate-800 rounded-xl flex items-center justify-center select-none text-slate-100 font-serif shadow-2xl transition-all"
                    style={{
                      width: `${hanziSize}px`,
                      height: `${hanziSize}px`,
                      fontSize: `${hanziSize * 0.8}px`,
                      backgroundColor: 'rgba(2, 6, 23, 0.4)',
                    }}
                  >
                    {/* Visual Quadrant Lines */}
                    {showGuides && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                        <div className="h-full w-[1px] border-l border-dashed border-slate-700"></div>
                        <div className="w-full h-[1px] border-t border-dashed border-slate-700 absolute"></div>
                        <div className="absolute inset-2 border border-dotted border-slate-800 rounded-lg"></div>
                      </div>
                    )}

                    <span className="z-10 leading-none">
                      {displayData.hanzi}
                    </span>

                    {/* Side-Stacked Bopomofo */}
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
                    )}

                  </div>

                </div>

              </div>

              {/* REPORTING & METRICS INFO BOX */}
              <div className="w-full max-w-lg bg-slate-950 p-4 rounded-xl border border-slate-850 text-xs font-mono text-slate-400 space-y-2">
                <div className="flex justify-between border-b border-slate-900 pb-2">
                  <span>Hanzi Container Size: <strong className="text-slate-200">{hanziSize}px</strong></span>
                  <span>Offset Modifer: <strong className="text-indigo-400">{pinyinOffset}px</strong></span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-[11px] pt-1">
                  <div>
                    <span className="block text-slate-500">Active Layout Strategy:</span>
                    {layoutMethod === 'variable' && <span className="text-indigo-300 font-semibold">Variable Squeeze Compensation</span>}
                    {layoutMethod === 'overhang' && <span className="text-teal-300 font-semibold font-semibold">W3C 0.5em Overhang Boundary</span>}
                    {layoutMethod === 'zhuyin' && <span className="text-amber-300 font-semibold font-semibold font-semibold">Taiwanese Lateral Zhuyin Block</span>}
                  </div>
                  <div>
                    <span className="block text-slate-500">Horizontal Fit Security:</span>
                    <span className="text-emerald-400 font-bold">100% Correct Letter Proportions</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </section>

      </main>

      {/* FULLSCREEN WORSHIP PRESENTATION MODAL OVERLAY */}
      {isFullscreenWorship && (
        <div className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-black transition-all">

          {/* TOP FLOATING IMMERSIVE CONTROLS */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between text-slate-400 z-10 select-none">
            <div className="flex items-center gap-3">
              <span className="text-xs tracking-wider uppercase font-semibold text-indigo-400">Church Sanctuary Screen Mockup</span>
              <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-slate-300">{worshipRatio} Aspect</span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs">Slide {worshipSlideIdx + 1} of {AMAZING_GRACE_SLIDES.length}</span>
              <button
                onClick={() => setIsFullscreenWorship(false)}
                className="p-1.5 bg-white/10 hover:bg-white/20 hover:text-white text-slate-300 rounded-lg transition-all text-xs flex items-center gap-1"
              >
                <Minimize2 className="h-4 w-4" />
                Exit Presentation
              </button>
            </div>
          </div>

          {/* MAIN PROJECTION SURFACE AREA */}
          <div
            className={`w-full max-w-6xl relative overflow-hidden flex flex-col justify-between p-12 text-center rounded-lg shadow-2xl transition-all duration-300 ${currentTheme.bg} ${currentTheme.text}`}
            style={{
              aspectRatio: worshipRatio === '16:9' ? '16/9' : '4/3',
              transform: 'scale(0.92)'
            }}
          >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.015)_0%,rgba(0,0,0,0.5)_100%)]"></div>

            <div className="opacity-45 text-sm font-serif italic tracking-wider uppercase mt-4">
              Amazing Grace • 奇异恩典
            </div>

            {/* Centered Lyrics Block */}
            <div className="my-auto flex flex-col justify-center items-center gap-10">
              {AMAZING_GRACE_SLIDES[worshipSlideIdx].lines.map((line, lIdx) => (
                <div
                  key={lIdx}
                  className="flex flex-wrap justify-center items-end"
                  style={{ gap: `${gridSquareSize * 0.7 * worshipTextScale}px` }}
                >
                  {line.hanzi.split("").map((char, cIdx) => {
                    const pinyinStr = line.pinyin[cIdx] || "";
                    const bopomofoStr = line.bopomofo[cIdx] || "";
                    const isLong = pinyinStr.length >= 5;

                    return (
                      <div
                        key={cIdx}
                        className="flex flex-col items-center relative"
                        style={{ width: `${gridSquareSize * 1.5 * worshipTextScale}px` }}
                      >
                        {/* Pinyin Annotation Layer with dynamic Vertical Offset customizability (compensated for fullscreen mode scale) */}
                        {layoutMethod !== 'zhuyin' && (
                          <span
                            className="absolute text-center tracking-normal font-sans"
                            style={{
                              top: `-${(pinyinFontSize * 2.8 * worshipTextScale) + (pinyinOffset * 2.2)}px`,
                              ...getPinyinStyle(pinyinStr, false, true),
                              fontSize: `${pinyinFontSize * 2.8 * worshipTextScale}px`,
                              color: isLong ? '#fcd34d' : 'inherit',
                              textShadow: '0 4px 6px rgba(0,0,0,0.6)'
                            }}
                          >
                            {pinyinStr}
                          </span>
                        )}

                        {/* Base Chinese Character */}
                        <div
                          className="font-serif relative z-10 font-bold transition-all"
                          style={{
                            fontSize: `${gridSquareSize * 1.7 * worshipTextScale}px`,
                            lineHeight: '1.1',
                            textShadow: '0 4px 12px rgba(0,0,0,0.7)'
                          }}
                        >
                          {char}

                          {/* Lateral Zhuyin Stacking Option */}
                          {layoutMethod === 'zhuyin' && (
                            <div
                              className="absolute h-full flex flex-col justify-center items-center font-mono leading-none font-medium opacity-90"
                              style={{
                                right: `-${gridSquareSize * 0.55 * worshipTextScale}px`,
                                fontSize: `${gridSquareSize * 0.45 * worshipTextScale}px`,
                                width: `${gridSquareSize * 0.45 * worshipTextScale}px`,
                                color: '#fbbf24'
                              }}
                            >
                              {bopomofoStr.split("").map((bChar, bIdx) => (
                                <span key={bIdx} className="block">{bChar}</span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            {/* Optional English subtitle */}
            <div className="h-16 flex items-center justify-center">
              {showEnglishWorship && (
                <p className="text-lg md:text-xl font-light italic opacity-85 max-w-2xl mx-auto leading-relaxed">
                  {AMAZING_GRACE_SLIDES[worshipSlideIdx].english}
                </p>
              )}
            </div>

          </div>

          {/* SIDE CLICK NAVIGATION OVERLAYS */}
          <button
            onClick={() => setWorshipSlideIdx((prev) => (prev - 1 + AMAZING_GRACE_SLIDES.length) % AMAZING_GRACE_SLIDES.length)}
            className="absolute left-0 top-0 bottom-0 w-1/5 flex items-center justify-start pl-8 text-white/30 hover:text-white/80 transition-colors bg-gradient-to-r from-black/60 to-transparent"
          >
            <ChevronLeft className="h-16 w-16" />
          </button>

          <button
            onClick={() => setWorshipSlideIdx((prev) => (prev + 1) % AMAZING_GRACE_SLIDES.length)}
            className="absolute right-0 top-0 bottom-0 w-1/5 flex items-center justify-end pr-8 text-white/30 hover:text-white/80 transition-colors bg-gradient-to-l from-black/60 to-transparent"
          >
            <ChevronRight className="h-16 w-16" />
          </button>

          {/* FOOTER HELPER TIPS */}
          <div className="absolute bottom-6 text-xs text-slate-500 select-none">
            Use <kbd className="bg-slate-900 px-1 py-0.5 rounded text-indigo-400 font-mono">⇄ Keys</kbd> or tap sides to navigate slides. Press <kbd className="bg-slate-900 px-1 py-0.5 rounded text-indigo-400 font-mono">ESC</kbd> to exit.
          </div>

        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-850 bg-slate-900/60 p-4 text-center text-xs text-slate-500">
        Pinyin Ruby & Zhuyin Layout Laboratory V4.7 • Custom Vertical Offset Metrics Engine Enabled
      </footer>

    </div>
  );
}
