import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import { CheckCircle2, ShieldAlert, Check } from 'lucide-react';

interface SlideDifferentialProps {
  slide: SlideData;
  revealedCount: number; // 0..5 for elements 1..5, 6 for final impact quote
  onItemClick?: (index: number) => void;
}

export const SlideDifferential: React.FC<SlideDifferentialProps> = ({
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
          <span className="text-xs text-slate-300 font-medium">Tecnologia com regras reais</span>
        </div>

        {/* Highlight Main Title */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight max-w-4xl">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* The 5 Progressive Cards (REGRAS, LEGISLAÇÃO, DATA, DOCUMENTOS, IA) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 lg:gap-4 mb-6">
        {slide.topics.map((topic, index) => {
          const isRevealed = revealedCount > index;
          const isCurrentlyActive = revealedCount === index + 1;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.08 }}
              onClick={() => onItemClick && onItemClick(index + 1)}
              className={`relative rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                isCurrentlyActive
                  ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-xl shadow-[#0c326f]/80 ring-2 ring-[#fbbf24]/30 scale-[1.02]'
                  : isRevealed
                  ? 'bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-md hover:border-[#2684ff]'
                  : 'bg-[#071d41]/30 border border-slate-800 opacity-60 hover:opacity-90'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                      isCurrentlyActive
                        ? 'bg-[#fbbf24] text-slate-950 shadow-md'
                        : isRevealed
                        ? 'bg-[#1351b4] text-[#fbbf24] border border-[#2684ff]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    <DynamicIcon name={topic.iconName} className="w-4 h-4" />
                  </div>

                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                    {topic.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight mb-2">
                  {topic.title}
                </h3>
              </div>

              <div className="flex-1 flex flex-col justify-end mt-2">
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
                      <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
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
          );
        })}
      </div>

      {/* Highlight Conclusion Box (Step 6) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
        onClick={() => onItemClick && onItemClick(6)}
        className={`rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer border ${
          revealedCount >= 5
            ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-l-4 border-l-[#fbbf24] border-t border-r border-b border-[#2684ff] shadow-2xl shadow-[#1351b4]/50 ring-2 ring-[#fbbf24]/20'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-[#fbbf24] text-slate-950 flex-shrink-0 font-black">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-black text-white tracking-tight">
                "Primeiro verificamos. Depois escrevemos."
              </p>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5 font-medium">
                A inteligência artificial organiza e melhora o texto. Ela não inventa argumentos jurídicos.
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-emerald-300 bg-emerald-950/60 px-3.5 py-1.5 rounded-lg border border-emerald-500/40 flex-shrink-0">
            CONFIABILIDADE TÉCNICA
          </span>
        </div>
      </motion.div>
    </div>
  );
};

