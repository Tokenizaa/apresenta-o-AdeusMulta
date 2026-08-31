import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { Shield, CheckCircle2, Building, Check } from 'lucide-react';

interface SlideCoverProps {
  slide: SlideData;
  revealedCount: number;
  onItemClick?: (index: number) => void;
}

export const SlideCover: React.FC<SlideCoverProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Title & Mission */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Institutional Gov.br Header Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1351b4]/30 border border-[#2684ff]/40 text-[#2684ff] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#fbbf24]" />
              Iniciativa Brasileira
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              Sessão Estratégica Sebrae
            </span>
          </div>

          {/* Main Display Brand Name */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              ADEUS <span className="text-[#fbbf24]">MULTA</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-100 font-semibold leading-snug max-w-xl">
              {slide.subtitle}
            </p>
          </div>

          {/* Highlight Quote Box with Yellow Accent Border */}
          <div className="p-5 rounded-2xl bg-[#0c326f]/50 border-l-4 border-l-[#fbbf24] border-t border-r border-b border-[#1351b4]/60 backdrop-blur-md shadow-xl max-w-xl">
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed italic">
              "{slide.highlightQuote}"
            </p>
          </div>

          {/* Presenter Action Prompt */}
          <div className="flex items-center gap-3 pt-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#071d41] border border-slate-700 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Apresentação executiva em 5 etapas</span>
            </div>
            <span className="text-xs text-slate-400">
              Pressione <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#fbbf24] font-mono">Espaço</kbd> para iniciar
            </span>
          </div>
        </motion.div>

        {/* Right Column: Simple 4-Step Flow */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4]/60 shadow-2xl backdrop-blur-xl">
            {/* Header of the diagram */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Como o sistema funciona
                </span>
              </div>
              <span className="text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded border border-emerald-500/30">
                PROCESSO DIRETO
              </span>
            </div>

            {/* 4 Connected Flow Steps */}
            <div className="space-y-3 relative">
              {slide.topics.map((topic, index) => {
                const isStepRevealed = revealedCount >= index + 1;

                return (
                  <div key={topic.id} className="relative">
                    {/* Connecting vertical line */}
                    {index < slide.topics.length - 1 && (
                      <div className="absolute left-6 top-10 w-0.5 h-6 bg-gradient-to-b from-[#1351b4] to-slate-800 z-0" />
                    )}

                    <div
                      onClick={() => onItemClick && onItemClick(index + 1)}
                      className={`relative z-10 flex items-center gap-4 p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                        isStepRevealed
                          ? 'bg-[#0c326f]/80 border-[#2684ff] shadow-md ring-1 ring-[#fbbf24]/30'
                          : 'bg-slate-900/70 border-slate-800 opacity-80 hover:opacity-100 hover:border-slate-700'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 transition-colors ${
                          isStepRevealed
                            ? 'bg-[#fbbf24] text-slate-950 shadow-sm shadow-[#fbbf24]/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {topic.number}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-bold text-white tracking-tight">
                            {topic.title}
                          </h4>
                          <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-slate-800 text-emerald-300 border border-emerald-500/30 flex-shrink-0">
                            {topic.badge}
                          </span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5 leading-snug line-clamp-2">
                          {topic.explanation}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom tag */}
            <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Baseada na legislação de trânsito
              </span>
              <span className="text-slate-400">Verificação + Redação</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
