import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Volume2,
  Sparkles,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Layers,
  Eye,
  EyeOff,
  ChevronRight,
  ChevronDown,
  RotateCcw,
  Languages,
  ArrowRight,
  BookMarked,
  Info,
  SlidersHorizontal,
  GraduationCap,
  Lightbulb,
} from 'lucide-react';
import { TOPICS, QUIZ_QUESTIONS, TopicItem, ExampleItem } from './topicsData.ts';

export default function App() {
  // Navigation & tabs
  const [activeTab, setActiveTab] = useState<'study' | 'flashcards' | 'quiz' | 'allPhrases'>('study');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'figuras' | 'adverbios' | 'determinantes'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopicId, setActiveTopicId] = useState<number>(1);

  // Global preference: click-to-reveal vs show all translations
  const [globalRevealTranslations, setGlobalRevealTranslations] = useState<boolean>(false);

  // Set of revealed item IDs for granular click-to-reveal
  const [revealedIds, setRevealedIds] = useState<Record<string, boolean>>({});

  // Active modal for clicked phrase / sentence translation
  const [modalItem, setModalItem] = useState<{
    es: string;
    hy: string;
    explanationEs?: string;
    explanationHy?: string;
    topicTitleEs?: string;
    topicTitleHy?: string;
  } | null>(null);

  // Flashcards state
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlashcardFlipped, setIsFlashcardFlipped] = useState(false);
  const [knownCardsCount, setKnownCardsCount] = useState<number>(0);

  // Quiz state
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizResults, setShowQuizResults] = useState(false);

  // Speech synthesis for Spanish audio
  const playSpanishAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  // Toggle reveal for a specific element ID
  const toggleReveal = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setRevealedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Open full translation preview modal
  const openTranslationModal = (
    es: string,
    hy: string,
    explanationEs?: string,
    explanationHy?: string,
    topicTitleEs?: string,
    topicTitleHy?: string,
    e?: React.MouseEvent
  ) => {
    if (e) e.stopPropagation();
    setModalItem({
      es,
      hy,
      explanationEs,
      explanationHy,
      topicTitleEs,
      topicTitleHy,
    });
  };

  // Filter topics based on category and search
  const filteredTopics = useMemo(() => {
    return TOPICS.filter((topic) => {
      const matchesCategory =
        selectedCategory === 'all' || topic.category === selectedCategory;

      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;

      const q = searchQuery.toLowerCase().trim();
      const inTitleEs = topic.titleEs.toLowerCase().includes(q);
      const inTitleHy = topic.titleHy.toLowerCase().includes(q);
      const inDefEs = topic.definitionEs.toLowerCase().includes(q);
      const inDefHy = topic.definitionHy.toLowerCase().includes(q);
      const inExamples = topic.examples.some(
        (ex) =>
          ex.es.toLowerCase().includes(q) ||
          ex.hy.toLowerCase().includes(q) ||
          (ex.explanationEs && ex.explanationEs.toLowerCase().includes(q)) ||
          (ex.explanationHy && ex.explanationHy.toLowerCase().includes(q))
      );
      const inQuick = topic.quickExamples?.some(
        (qe) => qe.es.toLowerCase().includes(q) || qe.hy.toLowerCase().includes(q)
      );

      return inTitleEs || inTitleHy || inDefEs || inDefHy || inExamples || inQuick;
    });
  }, [selectedCategory, searchQuery]);

  // All individual phrase items across all topics for the Flashcards / Phrase list
  const allPhraseCards = useMemo(() => {
    const list: {
      id: string;
      topicNum: number;
      topicEs: string;
      topicHy: string;
      category: string;
      es: string;
      hy: string;
      explanationEs?: string;
      explanationHy?: string;
    }[] = [];

    TOPICS.forEach((t) => {
      // Include definition
      list.push({
        id: `def-${t.id}`,
        topicNum: t.id,
        topicEs: t.titleEs,
        topicHy: t.titleHy,
        category: t.categoryLabel.es,
        es: `${t.titleEs}: ${t.definitionEs}`,
        hy: `${t.titleHy}: ${t.definitionHy}`,
        explanationEs: t.importantRule?.es,
        explanationHy: t.importantRule?.hy,
      });

      // Include examples
      t.examples.forEach((ex) => {
        list.push({
          id: ex.id,
          topicNum: t.id,
          topicEs: t.titleEs,
          topicHy: t.titleHy,
          category: t.categoryLabel.es,
          es: ex.es,
          hy: ex.hy,
          explanationEs: ex.explanationEs,
          explanationHy: ex.explanationHy,
        });
      });
    });

    return list;
  }, []);

  const activeTopic = useMemo(() => {
    return TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];
  }, [activeTopicId]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-amber-500 selection:text-slate-950">
      {/* Top Banner / Navigation */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Languages className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                  Español <span className="text-amber-400 font-serif">⇄</span> Հայերեն
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-full">
                  14 Դաս
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Սեղմեք իսպաներեն տեքստի վրա՝ հայերեն թարգմանությունը բացելու համար 👆
              </p>
            </div>
          </div>

          {/* Mode Selector Tabs */}
          <nav className="flex items-center p-1 bg-slate-800/80 rounded-xl border border-slate-700/60 shadow-inner">
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'study'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Դասեր (14)</span>
            </button>
            <button
              onClick={() => setActiveTab('allPhrases')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'allPhrases'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Բոլոր արտահայտությունները</span>
            </button>
            <button
              onClick={() => setActiveTab('flashcards')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'flashcards'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Քարտեր (Ֆլեշքարտ)</span>
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'quiz'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Թեստ / Վիկտորինա</span>
            </button>
          </nav>
        </div>

        {/* Global Toolbar */}
        <div className="bg-slate-900/60 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>
              Ինտերակտիվ ռեժիմ․ <strong className="text-slate-200">Սեղմեք ցանկացած իսպաներեն նախադասության վրա</strong>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setGlobalRevealTranslations(!globalRevealTranslations)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-medium transition-colors"
            >
              {globalRevealTranslations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-amber-400" />
                  <span>Թարգմանությունները թաքցնել (Ինտերակտիվ սեղմումով)</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Միանգամից ցուցադրել բոլոր թարգմանությունները</span>
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* ===================== STUDY TAB ===================== */}
        {activeTab === 'study' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Sidebar: Topic Selector & Search */}
            <aside className="lg:col-span-4 space-y-4">
              {/* Search bar */}
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Փնտրել իսպաներեն կամ հայերեն..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white text-xs"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: 'all', label: 'Բոլորը (14)' },
                  { id: 'figuras', label: '1-9. Գեղարվեստական հնարքներ' },
                  { id: 'adverbios', label: '10-12. Մակբայներ' },
                  { id: 'determinantes', label: '13-14. Ցուցական/Ստացական' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id as any)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:bg-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Topic List */}
              <div className="bg-slate-900/70 border border-slate-800/80 rounded-2xl p-2 max-h-[640px] overflow-y-auto space-y-1.5">
                {filteredTopics.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs">
                    Ոչինչ չի գտնվել «{searchQuery}» հարցումով
                  </div>
                ) : (
                  filteredTopics.map((topic) => {
                    const isSelected = activeTopicId === topic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopicId(topic.id)}
                        className={`w-full text-left p-3 rounded-xl transition-all border flex items-start gap-3 ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500/40 shadow-sm shadow-amber-500/5'
                            : 'bg-slate-950/40 border-slate-800/60 hover:bg-slate-800/40 hover:border-slate-700/60'
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-extrabold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {topic.id}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-1">
                            <h3
                              className={`text-sm font-bold truncate ${
                                isSelected ? 'text-amber-400' : 'text-slate-100'
                              }`}
                            >
                              {topic.titleEs}
                            </h3>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-medium">
                              {topic.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 truncate mt-0.5">
                            {topic.titleHy}
                          </p>
                        </div>
                        <ChevronRight
                          className={`w-4 h-4 shrink-0 transition-transform mt-1 ${
                            isSelected ? 'text-amber-400 translate-x-0.5' : 'text-slate-600'
                          }`}
                        />
                      </button>
                    );
                  })
                )}
              </div>
            </aside>

            {/* Right Main Column: Active Topic Detailed View */}
            <div className="lg:col-span-8 space-y-6">
              {/* Topic Header Card */}
              <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-black text-sm">
                      {activeTopic.id}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-800 text-amber-300 border border-slate-700">
                      {activeTopic.categoryLabel.es} • {activeTopic.categoryLabel.hy}
                    </span>
                  </div>

                  {/* Audio & Full reveal button */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => playSpanishAudio(activeTopic.titleEs, e)}
                      title="Լսել իսպաներեն արտասանությունը"
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 border border-slate-700 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() =>
                        openTranslationModal(
                          activeTopic.titleEs,
                          activeTopic.titleHy,
                          activeTopic.definitionEs,
                          activeTopic.definitionHy,
                          `Դաս ${activeTopic.id} • ${activeTopic.titleEs}`,
                          activeTopic.titleHy
                        )
                      }
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors shadow-sm"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Դիտել ամբողջ թարգմանությունը</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Title */}
                <div
                  onClick={() => toggleReveal(`title-${activeTopic.id}`)}
                  className="cursor-pointer group p-3.5 rounded-xl bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 transition-all mb-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-amber-400/90 font-bold uppercase tracking-wider block">
                        Իսպաներեն անվանում (Սեղմեք թարգմանության համար)
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors">
                        {activeTopic.titleEs}
                      </h2>
                    </div>
                    <span className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 group-hover:bg-amber-500 group-hover:text-slate-950 transition-all font-semibold">
                      {globalRevealTranslations || revealedIds[`title-${activeTopic.id}`]
                        ? 'Թաքցնել'
                        : 'Թարգմանել 👆'}
                    </span>
                  </div>

                  {/* Armenian Title reveal */}
                  {(globalRevealTranslations || revealedIds[`title-${activeTopic.id}`]) && (
                    <div className="mt-3 pt-3 border-t border-slate-700/60 animate-in fade-in slide-in-from-top-1 duration-200">
                      <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
                        Հայերեն թարգմանություն
                      </span>
                      <p className="text-xl font-bold text-emerald-300 font-sans">
                        {activeTopic.titleHy}
                      </p>
                    </div>
                  )}
                </div>

                {/* Definition Box */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Spanish Definition */}
                  <div
                    onClick={() => toggleReveal(`def-${activeTopic.id}`)}
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 hover:border-amber-500/40 cursor-pointer group transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        Español (Սեղմեք թարգմանության համար)
                      </span>
                      <button
                        onClick={(e) => playSpanishAudio(activeTopic.definitionEs, e)}
                        className="p-1 hover:text-amber-400 text-slate-400"
                        title="Լսել"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed text-slate-200 font-medium">
                      {activeTopic.definitionEs}
                    </p>
                    {activeTopic.additionalNotesEs && (
                      <p className="text-xs text-slate-400 mt-2 italic whitespace-pre-line border-t border-slate-800 pt-2">
                        {activeTopic.additionalNotesEs}
                      </p>
                    )}
                  </div>

                  {/* Armenian Definition */}
                  <div
                    className={`p-4 rounded-xl border transition-all ${
                      globalRevealTranslations || revealedIds[`def-${activeTopic.id}`]
                        ? 'bg-emerald-950/20 border-emerald-500/40'
                        : 'bg-slate-950/30 border-slate-800/60 opacity-60 hover:opacity-100 cursor-pointer'
                    }`}
                    onClick={() => toggleReveal(`def-${activeTopic.id}`)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <Languages className="w-3.5 h-3.5" />
                        Հայերեն (Թարգմանություն և բացատրություն)
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {globalRevealTranslations || revealedIds[`def-${activeTopic.id}`]
                          ? 'Բացված է'
                          : 'Սեղմեք բացելու համար 👆'}
                      </span>
                    </div>

                    {globalRevealTranslations || revealedIds[`def-${activeTopic.id}`] ? (
                      <div>
                        <p className="text-sm leading-relaxed text-emerald-100 font-sans">
                          {activeTopic.definitionHy}
                        </p>
                        {activeTopic.additionalNotesHy && (
                          <p className="text-xs text-emerald-200/80 mt-2 border-t border-emerald-500/20 pt-2 whitespace-pre-line">
                            {activeTopic.additionalNotesHy}
                          </p>
                        )}
                      </div>
                    ) : (
                      <div className="py-4 text-center text-slate-400 text-xs">
                        <p className="font-medium text-slate-300">
                          Սեղմեք այստեղ կամ իսպաներեն բլոկի վրա՝
                        </p>
                        <p className="text-[11px] text-slate-500 mt-1">
                          Հայերեն մանրամասն սահմանումը տեսնելու համար
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Examples Pills (if available, e.g. antítesis or adverbios) */}
                {activeTopic.quickExamples && (
                  <div className="mt-4 pt-4 border-t border-slate-800/80">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      Հիմնական զույգեր / Բառեր (Սեղմեք յուրաքանչյուրի վրա)․
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeTopic.quickExamples.map((item, idx) => {
                        const key = `quick-${activeTopic.id}-${idx}`;
                        const isRevealed = globalRevealTranslations || revealedIds[key];
                        return (
                          <div
                            key={idx}
                            onClick={() => toggleReveal(key)}
                            className={`cursor-pointer px-3 py-1.5 rounded-lg border text-xs transition-all flex items-center gap-2 ${
                              isRevealed
                                ? 'bg-amber-500/10 border-amber-500/40 text-amber-200'
                                : 'bg-slate-800/80 border-slate-700 hover:border-slate-600 text-slate-200'
                            }`}
                          >
                            <span className="font-semibold">{item.es}</span>
                            <span className="text-slate-500 font-serif">→</span>
                            <span className={isRevealed ? 'text-emerald-300 font-bold' : 'text-slate-500'}>
                              {isRevealed ? item.hy : '??? (սեղմեք)'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Examples Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <BookMarked className="w-5 h-5 text-amber-400" />
                    <h3 className="text-lg font-bold text-white">
                      Օրինակներ և Վերլուծություն (Ejemplos)
                    </h3>
                  </div>
                  <span className="text-xs text-slate-400">
                    Ընդհանուր {activeTopic.examples.length} օրինակ
                  </span>
                </div>

                <div className="space-y-3">
                  {activeTopic.examples.map((ex, index) => {
                    const isRevealed = globalRevealTranslations || revealedIds[ex.id];
                    return (
                      <div
                        key={ex.id}
                        className={`rounded-2xl border transition-all overflow-hidden ${
                          isRevealed
                            ? 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-500/5'
                            : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80'
                        }`}
                      >
                        {/* Spanish Clickable Trigger */}
                        <div
                          onClick={() => toggleReveal(ex.id)}
                          className="p-4 sm:p-5 cursor-pointer hover:bg-slate-800/30 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20">
                                  Ejemplo {index + 1}
                                </span>
                                <span className="text-[11px] text-slate-400">
                                  Սեղմեք թարգմանությունը բացելու / թաքցնելու համար 👆
                                </span>
                              </div>
                              <p className="text-base sm:text-lg font-bold text-white tracking-wide">
                                {ex.es}
                              </p>
                              {ex.explanationEs && (
                                <p className="text-xs text-slate-400 leading-relaxed">
                                  <span className="text-slate-300 font-semibold">Explicación: </span>
                                  {ex.explanationEs}
                                </p>
                              )}
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                              <button
                                onClick={(e) => playSpanishAudio(ex.es, e)}
                                title="Լսել իսպաներեն"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                              >
                                <Volume2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) =>
                                  openTranslationModal(
                                    ex.es,
                                    ex.hy,
                                    ex.explanationEs,
                                    ex.explanationHy,
                                    `${activeTopic.titleEs} • Օրինակ ${index + 1}`,
                                    activeTopic.titleHy,
                                    e
                                  )
                                }
                                title="Մեծ պատուհանով բացել"
                                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                              >
                                <Sparkles className="w-4 h-4 text-amber-400" />
                              </button>
                              <div className="p-1 text-slate-400">
                                {isRevealed ? (
                                  <ChevronDown className="w-5 h-5 text-amber-400" />
                                ) : (
                                  <ChevronRight className="w-5 h-5" />
                                )}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Armenian Translation Reveal Area */}
                        {isRevealed && (
                          <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-3 border-t border-slate-800 bg-emerald-950/20 animate-in fade-in duration-200">
                            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-emerald-500/30">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                                  Հայերեն թարգմանություն
                                </span>
                              </div>
                              <p className="text-base font-semibold text-emerald-200 font-sans">
                                {ex.hy}
                              </p>
                              {ex.explanationHy && (
                                <p className="text-xs text-slate-300 mt-2 pt-2 border-t border-slate-800 font-sans leading-relaxed">
                                  {ex.explanationHy}
                                </p>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comparison / Grammar Tables if present */}
              {activeTopic.comparisonTable && (
                <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 overflow-hidden">
                  <div className="flex items-center gap-2 mb-3">
                    <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-white">
                      Համեմատական աղյուսակ / Կառուցվածք
                    </h4>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-700 bg-slate-800/50">
                          <th className="p-3 font-bold text-amber-300">
                            {activeTopic.comparisonTable.col1Title.es}
                          </th>
                          <th className="p-3 font-bold text-emerald-300">
                            {activeTopic.comparisonTable.col2Title.es}
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {activeTopic.comparisonTable.rows.map((row, idx) => {
                          const rowKey = `table-${activeTopic.id}-${idx}`;
                          const isRevealed = globalRevealTranslations || revealedIds[rowKey];
                          return (
                            <tr
                              key={idx}
                              onClick={() => toggleReveal(rowKey)}
                              className="hover:bg-slate-800/30 cursor-pointer transition-colors"
                            >
                              <td className="p-3 text-slate-200">
                                <div className="font-medium">{row.col1.es}</div>
                                {isRevealed && (
                                  <div className="text-[11px] text-slate-400 mt-1">
                                    {row.col1.hy}
                                  </div>
                                )}
                              </td>
                              <td className="p-3 text-slate-200">
                                <div className="font-medium">{row.col2.es}</div>
                                {isRevealed && (
                                  <div className="text-[11px] text-emerald-300 mt-1">
                                    {row.col2.hy}
                                  </div>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-3 italic">
                    💡 Սեղմեք աղյուսակի ցանկացած տողի վրա՝ հայերեն բացատրությունը տեսնելու համար։
                  </p>
                </div>
              )}

              {/* Special Breakdown Analysis (Topic 14: Mi hermana lee este libro muy despacio) */}
              {activeTopic.breakdownAnalysis && (
                <div className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <h4 className="text-base font-bold text-white">
                      Վերջին խմբերը տարբերելու համալիր օրինակ (Recap)
                    </h4>
                  </div>
                  <div
                    onClick={() => toggleReveal('topic14-breakdown')}
                    className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 cursor-pointer hover:border-amber-500/50 transition-all mb-4"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-amber-300">
                        {activeTopic.breakdownAnalysis.phrase.es}
                      </p>
                      <span className="text-xs text-slate-400">Սեղմեք թարգմանելու 👆</span>
                    </div>
                    {(globalRevealTranslations || revealedIds['topic14-breakdown']) && (
                      <p className="text-sm font-semibold text-emerald-300 mt-1.5 pt-1.5 border-t border-slate-800">
                        {activeTopic.breakdownAnalysis.phrase.hy}
                      </p>
                    )}
                  </div>

                  {/* Individual word breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeTopic.breakdownAnalysis.parts.map((part, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-extrabold text-amber-400">
                            {part.word}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-slate-700">
                            {part.tagEs} / {part.tagHy}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300">{part.noteEs}</p>
                        <p className="text-xs text-slate-400 italic font-sans">{part.noteHy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Important Rule / Recognition Guide */}
              {(activeTopic.howToRecognize || activeTopic.importantRule) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeTopic.howToRecognize && (
                    <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-blue-400 font-bold text-xs">
                        <HelpCircle className="w-4 h-4" />
                        <span>Ինչպե՞ս ճանաչել (Cómo reconocerla)</span>
                      </div>
                      <p className="text-xs text-slate-200">{activeTopic.howToRecognize.es}</p>
                      <p className="text-xs text-blue-200/80 font-sans border-t border-blue-500/20 pt-1.5">
                        {activeTopic.howToRecognize.hy}
                      </p>
                    </div>
                  )}

                  {activeTopic.importantRule && (
                    <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <Lightbulb className="w-4 h-4" />
                        <span>Կարևոր կանոն (Importante)</span>
                      </div>
                      <p className="text-xs text-slate-200 whitespace-pre-line">
                        {activeTopic.importantRule.es}
                      </p>
                      <p className="text-xs text-amber-200/80 font-sans border-t border-amber-500/20 pt-1.5 whitespace-pre-line">
                        {activeTopic.importantRule.hy}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Bottom Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  disabled={activeTopicId === 1}
                  onClick={() => {
                    setActiveTopicId((prev) => Math.max(1, prev - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  ← Նախորդ դասը
                </button>
                <span className="text-xs text-slate-400">
                  Դաս {activeTopicId} / 14
                </span>
                <button
                  disabled={activeTopicId === 14}
                  onClick={() => {
                    setActiveTopicId((prev) => Math.min(14, prev + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                >
                  Հաջորդ դասը →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ===================== ALL PHRASES BANK TAB ===================== */}
        {activeTab === 'allPhrases' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-400" />
                    Բոլոր արտահայտությունների բազա (Սեղմեք թարգմանության համար)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Ընդհանուր {allPhraseCards.length} նախադասություն և օրինակ 14 դասերից։ Սեղմեք ցանկացած իսպաներեն տողի վրա։
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setGlobalRevealTranslations(!globalRevealTranslations)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors"
                  >
                    {globalRevealTranslations ? 'Թաքցնել բոլորը' : 'Բացել բոլոր թարգմանությունները'}
                  </button>
                </div>
              </div>

              {/* Quick filter within phrases */}
              <div className="relative mb-4">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Փնտրել արտահայտություններում (օրինակ՝ luna, tictac, despacio, լուսին, ժամացույց)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                />
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {allPhraseCards
                  .filter(
                    (p) =>
                      !searchQuery.trim() ||
                      p.es.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      p.hy.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((phrase) => {
                    const isRevealed = globalRevealTranslations || revealedIds[phrase.id];
                    return (
                      <div
                        key={phrase.id}
                        onClick={() => toggleReveal(phrase.id)}
                        className={`p-4 rounded-xl border cursor-pointer transition-all ${
                          isRevealed
                            ? 'bg-slate-900/90 border-amber-500/40 shadow-sm'
                            : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                            Դաս {phrase.topicNum} • {phrase.topicEs}
                          </span>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={(e) => playSpanishAudio(phrase.es, e)}
                              className="p-1 hover:text-amber-400 text-slate-400 transition-colors"
                              title="Լսել իսպաներեն"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-[10px] text-slate-500 font-medium">
                              {isRevealed ? 'Բացված' : 'Սեղմեք 👆'}
                            </span>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-white">{phrase.es}</p>

                        {isRevealed ? (
                          <div className="mt-2.5 pt-2 border-t border-slate-800">
                            <p className="text-xs font-semibold text-emerald-300 font-sans">
                              {phrase.hy}
                            </p>
                            {phrase.explanationHy && (
                              <p className="text-[11px] text-slate-400 mt-1 font-sans">
                                {phrase.explanationHy}
                              </p>
                            )}
                          </div>
                        ) : (
                          <div className="mt-2 text-[11px] text-slate-500 italic">
                            Սեղմեք՝ հայերեն թարգմանությունը տեսնելու համար
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* ===================== FLASHCARDS TAB ===================== */}
        {activeTab === 'flashcards' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="text-center space-y-1">
              <h2 className="text-2xl font-black text-white flex items-center justify-center gap-2">
                <RotateCcw className="w-6 h-6 text-amber-400" />
                Ինտերակտիվ Քարտեր (Ֆլեշքարտեր)
              </h2>
              <p className="text-xs text-slate-400">
                Նայեք իսպաներենին, մտածեք թարգմանության մասին, ապա սեղմեք քարտի վրա՝ հայերենը բացելու համար։
              </p>
            </div>

            {/* Progress Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Քարտ {currentFlashcardIndex + 1} / {allPhraseCards.length}
              </span>
              <div className="w-48 bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-amber-500 h-full transition-all duration-300"
                  style={{
                    width: `${((currentFlashcardIndex + 1) / allPhraseCards.length) * 100}%`,
                  }}
                />
              </div>
              <span className="text-amber-400 font-bold">
                Յուրացված՝ {knownCardsCount}
              </span>
            </div>

            {/* Flashcard Component */}
            {allPhraseCards[currentFlashcardIndex] && (
              <div
                onClick={() => setIsFlashcardFlipped(!isFlashcardFlipped)}
                className="cursor-pointer min-h-[300px] sm:min-h-[340px] rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-slate-800 hover:border-amber-500/60 shadow-2xl flex flex-col justify-between transition-all transform active:scale-[0.99] relative overflow-hidden group"
              >
                {/* Top Card Info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">
                    Դաս {allPhraseCards[currentFlashcardIndex].topicNum} •{' '}
                    {allPhraseCards[currentFlashcardIndex].topicEs}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) =>
                        playSpanishAudio(allPhraseCards[currentFlashcardIndex].es, e)
                      }
                      title="Լսել արտասանությունը"
                      className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <span className="text-xs text-slate-500">
                      {isFlashcardFlipped ? 'Շրջված է (Հայերեն)' : 'Սեղմեք շրջելու համար 🔄'}
                    </span>
                  </div>
                </div>

                {/* Card Center Content */}
                <div className="my-auto py-6 text-center">
                  {!isFlashcardFlipped ? (
                    <div className="space-y-4">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500/80">
                        Español (Իսպաներեն)
                      </span>
                      <p className="text-xl sm:text-2xl font-extrabold text-white leading-relaxed px-4">
                        «{allPhraseCards[currentFlashcardIndex].es}»
                      </p>
                      <p className="text-xs text-slate-400 font-medium">
                        👆 Սեղմեք այստեղ՝ հայերեն թարգմանությունն ու բացատրությունը տեսնելու համար
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
                      <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400">
                        Հայերեն թարգմանություն
                      </span>
                      <p className="text-xl sm:text-2xl font-bold text-emerald-300 font-sans leading-relaxed px-4">
                        «{allPhraseCards[currentFlashcardIndex].hy}»
                      </p>
                      {allPhraseCards[currentFlashcardIndex].explanationHy && (
                        <p className="text-xs text-slate-300 max-w-md mx-auto font-sans leading-relaxed pt-2 border-t border-slate-800">
                          {allPhraseCards[currentFlashcardIndex].explanationHy}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Bottom Hint */}
                <div className="text-center text-xs text-slate-500">
                  {isFlashcardFlipped ? 'Սեղմեք կրկին իսպաներենը տեսնելու համար' : 'Հիշե՞լ եք իմաստը։'}
                </div>
              </div>
            )}

            {/* Flashcard Action Buttons */}
            <div className="flex items-center justify-between gap-3">
              <button
                onClick={() => {
                  setIsFlashcardFlipped(false);
                  setCurrentFlashcardIndex((prev) =>
                    prev > 0 ? prev - 1 : allPhraseCards.length - 1
                  );
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-bold text-slate-200 transition-colors"
              >
                ← Նախորդ քարտը
              </button>
              <button
                onClick={() => {
                  setKnownCardsCount((prev) => prev + 1);
                  setIsFlashcardFlipped(false);
                  setCurrentFlashcardIndex((prev) => (prev + 1) % allPhraseCards.length);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Գիտեմ (Հաջորդը)</span>
              </button>
              <button
                onClick={() => {
                  setIsFlashcardFlipped(false);
                  setCurrentFlashcardIndex((prev) => (prev + 1) % allPhraseCards.length);
                }}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-xs font-bold text-slate-950 transition-colors flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20"
              >
                <span>Բաց թողնել →</span>
              </button>
            </div>
          </div>
        )}

        {/* ===================== QUIZ TAB ===================== */}
        {activeTab === 'quiz' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-amber-400" />
                    Ստուգիչ Թեստ (Վիկտորինա)
                  </h2>
                  <p className="text-xs text-slate-400 mt-1">
                    Ստուգեք Ձեր գիտելիքները 14 դասերի վերաբերյալ։ Պատասխանեք հարցերին և ստացեք ակնթարթային բացատրություն։
                  </p>
                </div>
                <button
                  onClick={() => {
                    setQuizAnswers({});
                    setShowQuizResults(false);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 border border-slate-700 transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Սկսել նորից</span>
                </button>
              </div>

              {/* Questions List */}
              <div className="space-y-6">
                {QUIZ_QUESTIONS.map((q, qIndex) => {
                  const userAnswer = quizAnswers[q.id];
                  const hasAnswered = userAnswer !== undefined;

                  return (
                    <div
                      key={q.id}
                      className="p-5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-4"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 text-xs font-bold flex items-center justify-center">
                            {qIndex + 1}
                          </span>
                          <span className="text-xs font-bold text-slate-400">
                            Հարց {qIndex + 1} / {QUIZ_QUESTIONS.length}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-white mb-1">{q.questionEs}</p>
                        <p className="text-xs text-emerald-300 font-sans">{q.questionHy}</p>
                      </div>

                      {/* Options */}
                      <div className="space-y-2">
                        {q.options.map((opt, optIndex) => {
                          const isSelected = userAnswer === optIndex;
                          let btnStyle =
                            'bg-slate-900 border-slate-800 text-slate-200 hover:border-slate-700';

                          if (hasAnswered) {
                            if (opt.isCorrect) {
                              btnStyle =
                                'bg-emerald-950/50 border-emerald-500 text-emerald-200 font-bold';
                            } else if (isSelected && !opt.isCorrect) {
                              btnStyle =
                                'bg-red-950/50 border-red-500 text-red-200 line-through';
                            } else {
                              btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500';
                            }
                          }

                          return (
                            <button
                              key={optIndex}
                              disabled={hasAnswered}
                              onClick={() =>
                                setQuizAnswers((prev) => ({ ...prev, [q.id]: optIndex }))
                              }
                              className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                            >
                              <div className="space-y-0.5">
                                <p className="font-semibold text-slate-100">{opt.textEs}</p>
                                <p className="text-[11px] text-slate-400">{opt.textHy}</p>
                              </div>
                              {hasAnswered && opt.isCorrect && (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                              )}
                              {hasAnswered && isSelected && !opt.isCorrect && (
                                <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Explanation after answer */}
                      {hasAnswered && (
                        <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1 animate-in fade-in duration-200">
                          <p className="font-bold text-amber-400">Բացատրություն (Explicación):</p>
                          <p className="text-slate-300">{q.explanation.es}</p>
                          <p className="text-emerald-300 font-sans">{q.explanation.hy}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ===================== EXPANDED TRANSLATION MODAL ===================== */}
      {modalItem && (
        <div
          onClick={() => setModalItem(null)}
          className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-lg bg-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                  <Languages className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {modalItem.topicTitleEs || 'Իսպաներեն ⇄ Հայերեն թարգմանություն'}
                  </h3>
                  {modalItem.topicTitleHy && (
                    <p className="text-xs text-slate-400">{modalItem.topicTitleHy}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => setModalItem(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Spanish Phrase */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Իսպաներեն (Español)
                </span>
                <button
                  onClick={(e) => playSpanishAudio(modalItem.es, e)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>Լսել</span>
                </button>
              </div>
              <p className="text-lg font-extrabold text-white leading-relaxed">
                {modalItem.es}
              </p>
              {modalItem.explanationEs && (
                <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80">
                  {modalItem.explanationEs}
                </p>
              )}
            </div>

            {/* Armenian Translation */}
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/40 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block">
                Հայերեն թարգմանություն
              </span>
              <p className="text-lg font-bold text-emerald-200 font-sans leading-relaxed">
                {modalItem.hy}
              </p>
              {modalItem.explanationHy && (
                <p className="text-xs text-emerald-300/80 font-sans pt-2 border-t border-emerald-500/20">
                  {modalItem.explanationHy}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setModalItem(null)}
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-colors"
              >
                Փակել (Cerrar)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-900 bg-slate-950/80 py-4 text-center text-xs text-slate-500">
        <p>
          Español ⇄ Հայերեն: 14 Դաս — Գեղարվեստական հնարքներ, մակբայներ և ցուցականներ
        </p>
      </footer>
    </div>
  );
}
