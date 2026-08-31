import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { BookOpen, CheckSquare, Search, Sparkles, ShieldCheck, Cpu, Code2, CheckCircle2 } from 'lucide-react';

interface SlideTechDifferentialProps {
  slide: SlideData;
  revealedCount: number; // 0 = initial, 1 = Pilar 1, 2 = Pilar 2, 3 = Pilar 3, 4 = Pilar 4
  onItemClick?: (index: number) => void;
}

export const SlideTechDifferential: React.FC<SlideTechDifferentialProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  const pillars = [
    {
      id: 'pilar1',
      number: '01',
      title: '1. Conhecimento jurídico estruturado',
      subtitle: 'Base Normativa',
      description: 'Leis, resoluções, procedimentos e argumentos organizados em uma base estruturada.',
      icon: BookOpen,
      badge: 'Base Estruturada',
      color: '#2684ff',
    },
    {
      id: 'pilar2',
      number: '02',
      title: '2. Regras verificáveis',
      subtitle: 'Lógica Determinística',
      description: 'O sistema utiliza regras determinísticas para identificar situações que podem gerar argumentos.',
      icon: CheckSquare,
      badge: 'Regras Objetivas',
      color: '#fbbf24',
    },
    {
      id: 'pilar3',
      number: '03',
      title: '3. Análise específica do caso',
      subtitle: 'Caso Concreto',
      description: 'A defesa não é simplesmente um modelo genérico preenchido. O sistema considera múltiplos fatores combinados.',
      formula: 'infração + fatos + documentos + procedimento + órgão + temporalidade',
      icon: Search,
      badge: 'Multidimensional',
      color: '#10b981',
    },
    {
      id: 'pilar4',
      number: '04',
      title: '4. IA como apoio',
      subtitle: 'Redação & Clareza',
      description: 'A IA melhora a redação e a compreensão.',
      highlight: 'Não substitui a lógica jurídica do sistema.',
      icon: Sparkles,
      badge: 'Camada de Texto',
      color: '#f59e0b',
    },
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
          <span className="text-xs text-slate-300 font-medium">Os 4 Pilares da Tecnologia</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          O diferencial está na análise, <span className="text-[#fbbf24]">não apenas no texto.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
          Como construímos uma barreira técnica determinística combinando regras jurídicas formais e processamento de linguagem natural.
        </p>
      </motion.div>

      {/* 4 Architectural Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
        {pillars.map((pillar, index) => {
          const isRevealed = revealedCount >= index + 1;
          const isCurrentlyActive = revealedCount === index + 1;
          const IconComponent = pillar.icon;

          return (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              onClick={() => onItemClick && onItemClick(index + 1)}
              className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                isCurrentlyActive
                  ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-2xl ring-4 ring-[#fbbf24]/20 scale-[1.02]'
                  : isRevealed
                  ? 'bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-lg hover:border-[#2684ff]'
                  : 'bg-[#071d41]/40 border border-slate-800 opacity-60 hover:opacity-90'
              }`}
            >
              {/* Background Pillar Number Watermark */}
              <div className="absolute right-3 top-1 text-6xl font-black text-slate-800/20 select-none pointer-events-none">
                {pillar.number}
              </div>

              <div className="space-y-4 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-center">
                    <IconComponent className="w-5 h-5 text-[#fbbf24]" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    {pillar.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-black text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <span className="text-xs text-[#2684ff] font-bold block mt-0.5">
                    {pillar.subtitle}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {pillar.description}
                </p>

                {pillar.formula && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-[#fbbf24] leading-relaxed break-words font-bold">
                    {pillar.formula}
                  </div>
                )}

                {pillar.highlight && (
                  <div className="p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs font-extrabold text-emerald-300">
                    {pillar.highlight}
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300 relative z-10">
                <span>Pilar {pillar.number}</span>
                {isRevealed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Synthesis Footnote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 rounded-2xl bg-[#071d41]/80 border border-[#1351b4]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>Resumo para a Consultora:</strong> A barreira competitiva é a base de regras e a análise de conformidade do caso, não a ferramenta de texto.
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <span>Próxima etapa:</span>
          <span className="text-[#fbbf24] font-bold">Demonstração Prática na Plataforma</span>
        </div>
      </motion.div>
    </div>
  );
};
