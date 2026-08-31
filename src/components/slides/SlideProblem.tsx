import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import { AlertCircle, HelpCircle, ArrowRight, ShieldAlert } from 'lucide-react';

interface SlideProblemProps {
  slide: SlideData;
  revealedCount: number; // 0 = only titles, 1 = item 1 text, 2 = item 2 text, 3 = item 3 text
  onItemClick?: (index: number) => void;
}

export const SlideProblem: React.FC<SlideProblemProps> = ({
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
        className="mb-8 sm:mb-10"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#00b0ff] border border-[#2684ff]/40 shadow-sm">
            {slide.stageTag}
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-300 font-medium">Diagnóstico de Assimetria de Informação</span>
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

      {/* 3 Prominent Institutional Cards with Large Numbers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {slide.topics.map((topic, index) => {
          const isRevealed = revealedCount > index;
          const isCurrentlyActive = revealedCount === index + 1;

          return (
            <motion.div
              key={topic.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              onClick={() => onItemClick && onItemClick(index + 1)}
              id={`problem-card-${index}`}
              className={`relative rounded-2xl p-6 sm:p-7 transition-all duration-300 flex flex-col cursor-pointer overflow-hidden ${
                isCurrentlyActive
                  ? 'bg-gradient-to-b from-[#0c326f]/90 to-[#071d41]/95 border-2 border-[#00b0ff] shadow-2xl shadow-[#0c326f]/60 ring-4 ring-[#00b0ff]/20 scale-[1.02]'
                  : isRevealed
                  ? 'bg-gradient-to-b from-[#071d41]/80 to-[#030d1d]/85 border border-[#1351b4]/60 shadow-lg hover:border-[#2684ff]/60'
                  : 'bg-[#071d41]/40 border border-slate-800/80 opacity-60 hover:opacity-90'
              }`}
            >
              {/* Background large decorative number */}
              <div className="absolute right-4 top-2 select-none pointer-events-none text-7xl sm:text-8xl font-black text-[#1351b4]/10">
                {topic.number}
              </div>

              {/* Card Top: Number pill + Icon */}
              <div className="flex items-center justify-between mb-5 relative z-10">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-base transition-colors ${
                      isCurrentlyActive
                        ? 'bg-[#00b0ff] text-slate-950 shadow-lg shadow-[#00b0ff]/40'
                        : isRevealed
                        ? 'bg-[#1351b4] text-white border border-[#2684ff]/60'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {topic.number}
                  </div>
                  {topic.badge && (
                    <span className="text-[11px] font-bold tracking-wider uppercase px-2.5 py-1 rounded bg-[#0c326f]/60 text-[#2684ff] border border-[#2684ff]/30">
                      {topic.badge}
                    </span>
                  )}
                </div>

                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-300">
                  <DynamicIcon
                    name={topic.iconName}
                    className={`w-5 h-5 transition-colors ${
                      isCurrentlyActive ? 'text-[#00b0ff]' : isRevealed ? 'text-[#2684ff]' : 'text-slate-500'
                    }`}
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className={`text-xl sm:text-2xl font-bold mb-3 transition-colors relative z-10 ${
                  isCurrentlyActive
                    ? 'text-white'
                    : isRevealed
                    ? 'text-slate-100'
                    : 'text-slate-300'
                }`}
              >
                {topic.title}
              </h3>

              {/* Explanation Area */}
              <div className="flex-1 flex flex-col justify-between mt-2 relative z-10">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.div
                      key="revealed"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="pt-3 border-t border-[#1351b4]/40"
                    >
                      <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal">
                        "{topic.explanation}"
                      </p>
                      {isCurrentlyActive && (
                        <div className="mt-4 flex items-center gap-2 text-xs font-bold text-[#00b0ff]">
                          <span className="w-2 h-2 rounded-full bg-[#00b0ff] animate-ping" />
                          <span>Em discussão no momento</span>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="py-6 text-center border-t border-dashed border-slate-800/80"
                    >
                      <span className="text-xs text-slate-400 flex items-center justify-center gap-1.5 font-medium">
                        Clique ou pressione Espaço para revelar
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
