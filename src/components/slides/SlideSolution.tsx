import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Cpu } from 'lucide-react';

interface SlideSolutionProps {
  slide: SlideData;
  revealedCount: number; // 0 = only titles, 1..4 = steps 1..4, 5 = AI highlight layer
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
          <span className="px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#00b0ff] border border-[#2684ff]/40 shadow-sm">
            {slide.stageTag}
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-300 font-medium">Pipeline Operacional Determinística</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-300 mt-2 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Main 4-Step Process Pipeline Horizontal Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-5 mb-6 relative">
        {slide.topics.map((topic, index) => {
          const isRevealed = revealedCount > index;
          const isCurrentlyActive = revealedCount === index + 1;

          return (
            <div key={topic.id} className="relative flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                onClick={() => onItemClick && onItemClick(index + 1)}
                className={`relative h-full rounded-2xl p-5 transition-all duration-300 flex flex-col cursor-pointer ${
                  isCurrentlyActive
                    ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#00b0ff] shadow-xl shadow-[#0c326f]/70 ring-2 ring-[#00b0ff]/30 scale-[1.02]'
                    : isRevealed
                    ? 'bg-gradient-to-b from-[#071d41]/90 to-[#030d1d]/90 border border-[#1351b4]/60 shadow-md hover:border-[#2684ff]/50'
                    : 'bg-[#071d41]/30 border border-slate-800/80 opacity-60 hover:opacity-90'
                }`}
              >
                {/* Step header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs ${
                        isCurrentlyActive
                          ? 'bg-[#00b0ff] text-slate-950 font-extrabold'
                          : isRevealed
                          ? 'bg-[#1351b4] text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      0{index + 1}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 bg-slate-800/80 px-2 py-0.5 rounded">
                      {topic.badge}
                    </span>
                  </div>

                  <DynamicIcon
                    name={topic.iconName}
                    className={`w-5 h-5 ${
                      isCurrentlyActive ? 'text-[#00b0ff]' : isRevealed ? 'text-[#2684ff]' : 'text-slate-500'
                    }`}
                  />
                </div>

                {/* Step Title */}
                <h3
                  className={`text-lg font-bold mb-2 tracking-tight ${
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
                        className="pt-2 border-t border-[#1351b4]/30"
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
                        className="py-4 text-center border-t border-dashed border-slate-800"
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

      {/* Layer Highlight: CAMADA DE IA (Enriquecimento de Linguagem) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        onClick={() => onItemClick && onItemClick(5)}
        className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
          revealedCount >= 5
            ? 'bg-gradient-to-r from-[#0c326f]/90 via-[#071d41]/90 to-[#0c326f]/90 border-[#2684ff] shadow-2xl shadow-[#1351b4]/40 ring-2 ring-[#00b0ff]/30'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`p-3 rounded-xl ${
                revealedCount >= 5
                  ? 'bg-gradient-to-br from-[#2684ff] to-[#00b0ff] text-slate-950 shadow-md shadow-[#2684ff]/50'
                  : 'bg-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#00b0ff] bg-[#0c326f]/60 px-2 py-0.5 rounded border border-[#2684ff]/30">
                  Camada de IA
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Enriquecimento de Linguagem
                </span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white mt-0.5">
                Segurança Institucional: IA como refinadora, não como juíza
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-semibold px-3 py-1 rounded-lg bg-emerald-950/40 border border-emerald-800/50">
              <ShieldCheck className="w-4 h-4" />
              Núcleo 100% Determinístico
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
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed bg-[#071d41]/60 p-4 rounded-xl border border-[#2684ff]/30">
                "{slide.highlightQuote}"
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
