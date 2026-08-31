import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { ArrowDown, CheckCircle2, ShieldCheck, Sparkles, AlertCircle, Bot, Users } from 'lucide-react';

interface SlideDifferentiationProps {
  slide: SlideData;
  revealedCount: number; // 0 = initial, 1 = Tradicional, 2 = Apenas IA, 3 = Adeus Multa (full flow), 4 = Highlight statement
  onItemClick?: (index: number) => void;
}

export const SlideDifferentiation: React.FC<SlideDifferentiationProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  const adeusMultaSteps = [
    { title: 'Fatos + documentos', desc: 'Entrada completa do caso concreto', badge: 'Entrada' },
    { title: 'Mapeamento do caso', desc: 'Identificação de datas, locais e tipo', badge: 'Triagem' },
    { title: 'Regras jurídicas', desc: 'Cruzamento com normas do CTB e CONTRAN', badge: 'Legislação' },
    { title: 'Identificação de possíveis vícios', desc: 'Busca determinística de irregularidades', badge: 'Análise' },
    { title: 'Teses compatíveis', desc: 'Seleção apenas de teses juridicamente válidas', badge: 'Filtro' },
    { title: 'Validação jurídica', desc: 'Conferência técnica antes da redação', badge: 'Validação' },
    { title: 'Defesa personalizada', desc: 'Documento estruturado e fundamentado', badge: 'Resultado' },
  ];

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
          <span className="text-xs text-slate-300 font-medium">Comparação de Fluxos de Trabalho</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Não somos <span className="text-[#fbbf24]">apenas um gerador de recursos.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
          A diferença reside na conferência analítica e na validação jurídica antes de qualquer redação.
        </p>
      </motion.div>

      {/* 3-Column Comparative Visual Diagram */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
        {/* Column 1: Modelo Tradicional */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => onItemClick && onItemClick(1)}
          className={`md:col-span-3 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
            revealedCount >= 1
              ? 'bg-[#071d41]/90 border border-slate-700 shadow-lg'
              : 'bg-[#071d41]/40 border border-slate-800 opacity-60'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Users className="w-4 h-4 text-slate-300" />
              <h3 className="text-sm font-bold text-slate-200">
                Modelo tradicional
              </h3>
            </div>

            {/* Vertical Flow */}
            <div className="space-y-2.5 flex flex-col items-center">
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-bold text-slate-200">
                Pessoa
              </div>
              <ArrowDown className="w-4 h-4 text-slate-400" />
              <div className="w-full p-3 rounded-xl bg-slate-900 border border-slate-700 text-center text-xs font-bold text-[#2684ff]">
                Especialista
              </div>
              <ArrowDown className="w-4 h-4 text-slate-400" />
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-bold text-slate-200">
                Texto da defesa
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] text-slate-300 text-center">
            Processo manual e dependente de agenda
          </div>
        </motion.div>

        {/* Column 2: Modelo baseado apenas em IA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          onClick={() => onItemClick && onItemClick(2)}
          className={`md:col-span-3 rounded-3xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
            revealedCount >= 2
              ? 'bg-[#071d41]/90 border border-amber-900/60 shadow-lg'
              : 'bg-[#071d41]/40 border border-slate-800 opacity-60'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Bot className="w-4 h-4 text-[#fbbf24]" />
              <h3 className="text-sm font-bold text-slate-200">
                Modelo apenas em IA
              </h3>
            </div>

            {/* Vertical Flow */}
            <div className="space-y-2.5 flex flex-col items-center">
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-bold text-slate-200">
                Pessoa
              </div>
              <ArrowDown className="w-4 h-4 text-[#fbbf24]" />
              <div className="w-full p-3 rounded-xl bg-amber-950/40 border border-amber-500/40 text-center text-xs font-bold text-[#fbbf24]">
                IA (Genérica)
              </div>
              <ArrowDown className="w-4 h-4 text-[#fbbf24]" />
              <div className="w-full p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-center text-xs font-bold text-slate-200">
                Texto da defesa
              </div>
            </div>
          </div>

          <div className="pt-4 mt-6 border-t border-slate-800 text-[11px] text-amber-300 text-center flex items-center justify-center gap-1">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>Risco de teses incompatíveis</span>
          </div>
        </motion.div>

        {/* Column 3: Adeus Multa (The Winning Complete Pipeline) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          onClick={() => onItemClick && onItemClick(3)}
          className={`md:col-span-6 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
            revealedCount >= 3
              ? 'bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#10b981] shadow-2xl shadow-[#0c326f]/90 ring-4 ring-[#10b981]/20'
              : 'bg-[#071d41]/60 border border-slate-800 opacity-70 hover:opacity-100'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse" />
                <h3 className="text-base font-black text-white">
                  Adeus Multa
                </h3>
              </div>
              <span className="text-xs font-black tracking-wider uppercase px-2.5 py-0.5 rounded bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                Lógica Estruturada
              </span>
            </div>

            {/* 7 Connected Multi-Step Flow */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {adeusMultaSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 flex items-start gap-2.5"
                >
                  <span className="w-5 h-5 rounded-full bg-[#1351b4] text-[#fbbf24] text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white">{step.title}</h4>
                    <p className="text-[10px] text-slate-300 mt-0.5 leading-tight">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-200">
            <span className="font-bold text-emerald-400 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              Análise analítica antes do texto
            </span>
            <span className="text-[11px] text-slate-300">
              7 etapas de validação
            </span>
          </div>
        </motion.div>
      </div>

      {/* Prominent Golden Highlight Statement Box */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.3 }}
        onClick={() => onItemClick && onItemClick(4)}
        className={`mt-6 p-5 sm:p-6 rounded-3xl transition-all duration-300 cursor-pointer ${
          revealedCount >= 4
            ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#fbbf24] shadow-2xl ring-4 ring-[#fbbf24]/20'
            : 'bg-[#071d41]/80 border border-[#1351b4]/60'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-[#fbbf24]">
              <Sparkles className="w-4 h-4 text-[#fbbf24]" />
              <span>Princípio Tecnológico Fundamental</span>
            </div>

            <div className="space-y-1 text-white text-base sm:text-lg font-bold leading-relaxed">
              <p>• <span className="text-[#fbbf24]">A IA não escolhe a tese jurídica.</span></p>
              <p>• O sistema identifica e valida as possibilidades.</p>
              <p>• A IA ajuda a transformar a análise em uma defesa clara e bem estruturada.</p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 max-w-xs shrink-0">
            <span className="font-bold text-white block mb-1">Para o Sebrae:</span>
            A tecnologia não é um wrapper genérico de IA; ela possui regras determinísticas proprietárias.
          </div>
        </div>
      </motion.div>
    </div>
  );
};
