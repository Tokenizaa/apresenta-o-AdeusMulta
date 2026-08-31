import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { FileCheck, Inbox, Scale, Info, Building2, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface SlideMarketDemandProps {
  slide: SlideData;
  revealedCount: number; // 0 = all muted, 1 = DNIT, 2 = Detran-GO, 3 = JARI-SP, 4 = conclusion & sources
  onItemClick?: (index: number) => void;
}

export const SlideMarketDemand: React.FC<SlideMarketDemandProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  const cards = [
    {
      id: 'dnit',
      number: '+26 mil',
      agency: 'DNIT',
      fullName: 'Departamento Nacional de Infraestrutura de Transportes',
      detail: 'recursos julgados pelas JARIs em 2024.',
      source: 'Fonte: DNIT (Relatório Anual JARI 2024)',
      badge: 'Federal / Rodovias',
      icon: FileCheck,
      color: '#2684ff',
    },
    {
      id: 'detrango',
      number: '~10 mil/mês',
      agency: 'Detran-GO',
      fullName: 'Departamento Estadual de Trânsito de Goiás',
      detail: 'recursos recebidos, conforme dado divulgado pelo órgão.',
      source: 'Fonte: Detran-GO (Divulgação Institucional)',
      badge: 'Estadual',
      icon: Inbox,
      color: '#fbbf24',
    },
    {
      id: 'jarisp',
      number: '~18 mil/mês',
      agency: 'JARI-SP',
      fullName: 'Junta Administrativa de Recursos de Infrações de São Paulo',
      detail: 'recursos analisados, conforme informação institucional.',
      source: 'Fonte: Prefeitura de SP / SMT / JARI',
      badge: 'Municipal / Capital',
      icon: Scale,
      color: '#10b981',
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
          <span className="text-xs text-slate-300 font-medium">Evidências de Demanda Ativa</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          O cidadão <span className="text-[#fbbf24]">já tenta contestar.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
          Dados oficiais de órgãos públicos comprovam a busca constante e real por revisão de autuações.
        </p>
      </motion.div>

      {/* 3 Prominent Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {cards.map((card, index) => {
          const isRevealed = revealedCount >= index + 1;
          const isCurrentlyActive = revealedCount === index + 1;
          const IconComponent = card.icon;

          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              onClick={() => onItemClick && onItemClick(index + 1)}
              id={`demand-card-${index}`}
              className={`relative rounded-3xl p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden ${
                isCurrentlyActive
                  ? 'bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-2xl shadow-[#0c326f]/80 ring-4 ring-[#fbbf24]/20 scale-[1.02]'
                  : isRevealed
                  ? 'bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-lg hover:border-[#2684ff]'
                  : 'bg-[#071d41]/40 border border-slate-800 opacity-60 hover:opacity-90'
              }`}
            >
              {/* Header inside card */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded bg-[#071d41] text-[#2684ff] border border-[#2684ff]/30">
                    {card.badge}
                  </span>
                  <div className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                    <IconComponent className="w-5 h-5 text-[#fbbf24]" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {card.agency}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
                    {card.fullName}
                  </p>
                </div>

                {/* Big Number Highlight */}
                <div className="py-3 px-4 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-center">
                  <span className="text-3xl sm:text-4xl lg:text-4xl font-black text-[#fbbf24] tracking-tight">
                    {card.number}
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200 mt-1 font-medium leading-snug">
                    {card.detail}
                  </p>
                </div>
              </div>

              {/* Card Footer: Official Source */}
              <div className="pt-4 mt-5 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-300">
                <span className="italic">{card.source}</span>
                {isRevealed && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* High-Impact Synthesis Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, delay: 0.35 }}
        onClick={() => onItemClick && onItemClick(4)}
        className={`mt-6 p-6 rounded-3xl transition-all duration-300 cursor-pointer ${
          revealedCount >= 4
            ? 'bg-gradient-to-r from-[#0c326f]/90 via-[#071d41] to-[#030d1d] border-2 border-[#10b981] shadow-2xl ring-2 ring-[#10b981]/20'
            : 'bg-[#071d41]/70 border border-[#1351b4]/60'
        }`}
      >
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-4xl">
            <span className="text-xs font-black uppercase tracking-wider text-[#10b981] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#10b981]" />
              Conclusão Estrutural de Demanda:
            </span>
            <p className="text-lg sm:text-xl font-extrabold text-white leading-snug">
              "A demanda existe. O processo ainda é complexo para quem não conhece o procedimento."
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-300 max-w-xs space-y-1">
            <div className="flex items-center gap-1 text-[#fbbf24] font-bold">
              <Info className="w-3.5 h-3.5" />
              <span>Rigor Metodológico</span>
            </div>
            <p className="leading-tight">
              Os números acima são de órgãos diferentes e não devem ser somados ou interpretados como estatística nacional consolidada.
            </p>
          </div>
        </div>

        {/* Sources Bar */}
        <div className="pt-4 mt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-300">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-slate-200">Fontes Oficiais:</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">SENATRAN</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">DNIT</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Detran-GO</span>
            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">Prefeitura de São Paulo / JARI</span>
          </div>
          <span className="text-[11px] text-slate-300 font-mono">
            Dados verificáveis e transparentes
          </span>
        </div>
      </motion.div>
    </div>
  );
};
