import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { Database, AlertTriangle, ShieldCheck, FileWarning, Search, ChevronRight } from 'lucide-react';

interface SlideProblemSizeProps {
  slide: SlideData;
  revealedCount: number; // 0 = only initial, 1 = source & volume, 2 = central problem highlight, 3 = summary
  onItemClick?: (index: number) => void;
}

export const SlideProblemSize: React.FC<SlideProblemSizeProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
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
          <span className="text-xs text-slate-300 font-medium">Cenário Nacional & Dados Oficiais</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Milhões de infrações. <span className="text-[#fbbf24]">Pouca orientação para contestar.</span>
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Main Grid: Official Data Card & The Central Problem Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Card: SENATRAN / RENAINF Official Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          onClick={() => onItemClick && onItemClick(1)}
          className={`lg:col-span-5 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden relative ${
            revealedCount >= 1
              ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#2684ff] shadow-xl ring-2 ring-[#2684ff]/20'
              : 'bg-[#071d41]/60 border border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          {/* Background watermark badge */}
          <div className="absolute -right-6 -bottom-6 text-slate-800/20 select-none pointer-events-none">
            <Database className="w-48 h-48" />
          </div>

          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-lg bg-[#071d41] border border-[#2684ff]/50 text-xs font-bold text-[#fbbf24] flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                <span>Base Oficial</span>
              </span>
              <span className="text-[11px] font-mono text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">
                RENAINF / BR
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                Volume Nacional de
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1 leading-tight">
                Infrações de trânsito
              </h2>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-[#fbbf24] text-xs font-black uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Fonte Oficial Reconhecida</span>
              </div>
              <p className="text-sm text-slate-200 font-semibold leading-snug">
                Dados oficiais nacionais disponíveis na SENATRAN/RENAINF
              </p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              O Registro Nacional de Infrações de Trânsito centraliza e registra diariamente o fluxo contínuo de autuações de órgãos municipais, estaduais e federais em todo o território nacional.
            </p>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between relative z-10 text-[11px] text-slate-300">
            <span>Fonte: <strong>SENATRAN / RENAINF</strong></span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              Registro público
            </span>
          </div>
        </motion.div>

        {/* Right Card: The Core Problem Analysis */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
          onClick={() => onItemClick && onItemClick(2)}
          className={`lg:col-span-7 rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
            revealedCount >= 2
              ? 'bg-gradient-to-b from-[#071d41] to-[#030d1d] border-2 border-[#fbbf24] shadow-2xl shadow-[#0c326f]/60 ring-4 ring-[#fbbf24]/10'
              : 'bg-[#071d41]/50 border border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="space-y-6 relative z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#fbbf24] animate-pulse" />
                <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                  Diagnóstico Central do Problema
                </span>
              </div>
              <span className="text-xs font-bold text-slate-300 bg-slate-900 border border-slate-800 px-3 py-1 rounded-full">
                Passo 2 de 2
              </span>
            </div>

            {/* Prominent High-Contrast Quote Block */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0c326f]/90 to-[#071d41]/90 border-l-4 border-l-[#fbbf24] border-t border-r border-b border-[#1351b4]/70 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 block mb-2">
                O Ponto Chave:
              </span>
              <p className="text-lg sm:text-xl lg:text-2xl text-white font-extrabold leading-relaxed">
                "O problema não é a falta de multas. É a dificuldade de identificar quando uma autuação possui um vício que pode ser contestado."
              </p>
            </div>

            {/* 3 Reality Breakdown Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <FileWarning className="w-4 h-4 text-[#fbbf24] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Vícios Formais Ocultos</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    Prazos de expedição, aferição metrológica vencida ou dados incomuns no auto.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start gap-3">
                <Search className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-white">Falta de Diagnóstico Prévio</h4>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    O cidadão não sabe avaliar se vale a pena contestar antes de recorrer.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer source note */}
          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <span className="italic">
              Fonte: <strong>SENATRAN / RENAINF</strong>
            </span>
            <span className="text-[#fbbf24] font-bold text-[11px]">
              Metodologia de análise objetiva
            </span>
          </div>
        </motion.div>
      </div>

      {/* Interactive Helper Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-6 p-3.5 rounded-2xl bg-[#071d41]/80 border border-[#1351b4]/40 flex items-center justify-between text-xs text-slate-300"
      >
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>
            <strong>Foco no Sebrae:</strong> Demonstrar com dados oficiais que o volume é alto e a assimetria de informação é o verdadeiro gargalo.
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-300 text-[11px] font-mono">
          <span>Pressione</span>
          <kbd className="px-2 py-0.5 bg-slate-900 border border-slate-700 rounded text-[#fbbf24]">Espaço</kbd>
          <span>para avançar</span>
        </div>
      </motion.div>
    </div>
  );
};
