import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import {
  Database,
  GitMerge,
  ShieldAlert,
  FileCheck,
  Sparkles,
  CheckCircle2,
  Lock,
  Server
} from 'lucide-react';

interface SlideDifferentialProps {
  slide: SlideData;
  revealedCount: number; // 0..5 for elements 1..5, 6 for final impact takeaway
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
          <span className="px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#00b0ff] border border-[#2684ff]/40 shadow-sm">
            {slide.stageTag}
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-300 font-medium">Arquitetura de Software & Barreira Técnica</span>
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

      {/* Enterprise / GovTech Architecture Diagram */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Left / Center: The 5 Connected Architectural Blocks */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {slide.topics.map((topic, index) => {
            const isRevealed罕 = revealedCount > index;
            const isCurrentlyActive = revealedCount === index + 1;
            const isKnowledgeBase = index === 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => onItemClick && onItemClick(index + 1)}
                className={`relative rounded-2xl p-5 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isKnowledgeBase ? 'sm:col-span-2' : ''
                } ${
                  isCurrentlyActive
                    ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-2 border-[#00b0ff] shadow-xl shadow-[#0c326f]/80 ring-2 ring-[#00b0ff]/30'
                    : isRevealed罕
                    ? 'bg-gradient-to-b from-[#071d41]/90 to-[#030d1d]/90 border border-[#1351b4]/60 shadow-md hover:border-[#2684ff]/50'
                    : 'bg-[#071d41]/30 border border-slate-800/80 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-2 rounded-xl ${
                        isCurrentlyActive
                          ? 'bg-[#00b0ff] text-slate-950 shadow-md'
                          : isRevealed罕
                          ? 'bg-[#1351b4] text-white'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <DynamicIcon name={topic.iconName} className="w-4 h-4" />
                    </div>
                    <h3 className="text-base font-bold text-white tracking-tight">
                      {topic.title}
                    </h3>
                  </div>

                  <span className="text-[10px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800/90 text-slate-300 border border-slate-700">
                    {topic.badge}
                  </span>
                </div>

                <div className="flex-1 flex flex-col justify-end">
                  <AnimatePresence mode="wait">
                    {isRevealed罕 ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="pt-2 border-t border-[#1351b4]/30"
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
                        className="py-2 text-center"
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

        {/* Right: Architectural Comparison & Visual Contrast Card */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          <div className="p-5 rounded-2xl bg-gradient-to-b from-[#071d41] to-[#030d1d] border border-[#1351b4]/50 shadow-xl flex-1 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-800">
              <Lock className="w-4 h-4 text-[#00b0ff]" />
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">
                Governança & Rigor
              </h4>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-red-950/30 border border-red-900/40 text-red-200">
                <div className="font-bold text-red-300 mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  Chatbot Genérico (GPT)
                </div>
                Alucina artigos revogados, inventa teses sem base factual e não possui controle de prazos.
              </div>

              <div className="p-3 rounded-xl bg-[#0c326f]/60 border border-[#2684ff]/40 text-slate-200">
                <div className="font-bold text-[#00b0ff] mb-1 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00b0ff]" />
                  Adeus Multa (GovTech)
                </div>
                FAIL CLOSED: Validação factual, regras determinísticas de trânsito e IA restrita à redação.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Impact Highlight Banner (Step 6) */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.4 }}
        onClick={() => onItemClick && onItemClick(6)}
        className={`rounded-2xl p-5 transition-all duration-300 cursor-pointer border ${
          revealedCount >= 6
            ? 'bg-gradient-to-r from-[#0c326f] via-[#1351b4]/60 to-[#0c326f] border-[#00b0ff] shadow-2xl shadow-[#1351b4]/50 ring-2 ring-[#00b0ff]/30'
            : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-80'
        }`}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#00b0ff] text-slate-950 flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 font-bold" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-white">
                "A IA escreve melhor. O sistema determina aplicabilidade com regras e conhecimento estruturado."
              </p>
              <p className="text-xs text-slate-300 mt-0.5">
                O diferencial estratégico que impede a concorrência com chatbots improvisados.
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-[#00b0ff] bg-slate-950/60 px-3 py-1.5 rounded-lg border border-[#2684ff]/30 flex-shrink-0">
            DEFENSABILIDADE COMPROVADA
          </span>
        </div>
      </motion.div>
    </div>
  );
};
