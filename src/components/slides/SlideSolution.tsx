import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface SlideSolutionProps {
  slide: SlideData;
  revealedCount: number; // 0 = only titles, 1..5 = steps 1..5, 6 = highlight quote
  onItemClick?: (index: number) => void;
}

export const SlideSolution: React.FC<SlideSolutionProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      {/* Slide Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3.5 py-1 text-xs font-black tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#2684ff] border border-[#2684ff]/40 shadow-sm">
            {slide.stageTag}
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-300 font-medium">O caminho da análise</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Visual Sequence Pipeline Indicator */}
      <div className="hidden lg:flex items-center justify-between mb-4 px-4 py-2 rounded-xl bg-[#071d41]/60 border border-[#1351b4]/40 text-xs font-bold text-slate-300">
        <span className={revealedCount >= 1 ? 'text-[#fbbf24]' : 'text-slate-500'}>01 MULTA</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={revealedCount >= 2 ? 'text-[#fbbf24]' : 'text-slate-500'}>02 DOCUMENTOS</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={revealedCount >= 3 ? 'text-emerald-400' : 'text-slate-500'}>03 CONFERÊNCIA</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={revealedCount >= 4 ? 'text-emerald-400' : 'text-slate-500'}>04 FUNDAMENTOS</span>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600" />
        <span className={revealedCount >= 5 ? 'text-[#fbbf24]' : 'text-slate-500'}>05 DEFESA</span>
      </div>

      {/* Main 5-Step Process Pipeline Horizontal Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4 mb-6 relative">
        {slide.topics.map((topic, index) => {
          const isRevealed = revealedCount > index;
          const isCurrentlyActive = revealedCount === index + 1;

          return (
            <div key={topic.id} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                onClick={() => onItemClick && onItemClick(index + 1)}
                className={`relative h-full rounded-2xl p-4 sm:p-5 transition-all duration-300 flex flex-col cursor-pointer ${
                  isCurrentlyActive
                    ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-xl shadow-[#0c326f]/80 ring-2 ring-[#fbbf24]/30 scale-[1.02]'
                    : isRevealed
                    ? 'bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-md hover:border-[#2684ff]'
                    : 'bg-[#071d41]/30 border border-slate-800 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Step header */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs ${
                      isCurrentlyActive
                        ? 'bg-[#fbbf24] text-slate-950 shadow-sm'
                        : isRevealed
                        ? 'bg-[#1351b4] text-[#fbbf24]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{index + 1}
                  </span>

                  <DynamicIcon
                    name={topic.iconName}
                    className={`w-5 h-5 ${
                      isCurrentlyActive ? 'text-[#fbbf24]' : isRevealed ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  />
                </div>

                {/* Step Title */}
                <h3
                  className={`text-base sm:text-lg font-bold mb-1.5 tracking-tight ${
                    isCurrentlyActive ? 'text-white' : isRevealed ? 'text-slate-100' : 'text-slate-300'
                  }`}
                >
                  {topic.title}
                </h3>

                {/* Explanation text */}
                <div className="flex-1 flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {isRevealed ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-2 border-t border-[#1351b4]/40"
                      >
                        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                          {topic.explanation}
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-3 text-center border-t border-dashed border-slate-800"
                      >
                        <span className="text-[11px] text-slate-400">Clique para revelar</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Layer Highlight: Como usamos Inteligência Artificial */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        onClick={() => onItemClick && onItemClick(6)}
        className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
          revealedCount >= 5
            ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-[#2684ff] shadow-2xl shadow-[#1351b4]/50 ring-2 ring-[#fbbf24]/20'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                revealedCount >= 5
                  ? 'bg-[#fbbf24] text-slate-950 shadow-md shadow-[#fbbf24]/40 font-black'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#fbbf24] bg-slate-950 px-2.5 py-0.5 rounded border border-[#fbbf24]/30">
                  Uso Controlado de IA
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  Redação e Organização
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                A inteligência artificial melhora o texto, mas não decide qual argumento jurídico usar
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-bold px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-500/40">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Regras Verificadas
            </span>
          </div>
        </div>

        <AnimatePresence>
          {revealedCount >= 5 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="mt-4 pt-4 border-t border-[#1351b4]/40"
            >
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-[#071d41]/80 p-4 rounded-xl border border-l-4 border-l-[#fbbf24] border-[#1351b4]">
                "{slide.highlightQuote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

