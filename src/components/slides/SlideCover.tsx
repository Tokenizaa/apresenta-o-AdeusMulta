import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { 
  Shield, 
  Building, 
  ArrowRight, 
  CheckCircle2, 
  TrendingUp, 
  Scale, 
  Sparkles, 
  Target,
  FileCheck
} from 'lucide-react';

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
  const agendaItems = [
    {
      id: 'ag1',
      number: '01',
      title: 'Tamanho do Problema',
      desc: 'Volume nacional e assimetria de informação',
      icon: TrendingUp,
      badge: 'SENATRAN / RENAINF',
    },
    {
      id: 'ag2',
      number: '02',
      title: 'Demanda Real por Recursos',
      desc: 'Evidências oficiais em órgãos públicos',
      icon: Scale,
      badge: 'DNIT • Detran • JARI',
    },
    {
      id: 'ag3',
      number: '03',
      title: 'Concorrência e Modelos',
      desc: 'Como o mercado está estruturado hoje',
      icon: Building,
      badge: 'Assessoria vs. IA',
    },
    {
      id: 'ag4',
      number: '04',
      title: 'Diferencial Tecnológico',
      desc: 'Análise estruturada e regras antes da redação',
      icon: Sparkles,
      badge: 'Adeus Multa',
    },
    {
      id: 'ag5',
      number: '05',
      title: 'Plano de Negócio & Ação',
      desc: 'Validação comercial e metas de 30 dias',
      icon: Target,
      badge: 'Sessão Sebrae',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Brand, Value Proposition & Meeting Context */}
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

          {/* Main Display Brand Name & Value Statement */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              ADEUS <span className="text-[#fbbf24]">MULTA</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-100 font-semibold leading-snug max-w-2xl">
              {slide.subtitle}
            </p>
          </div>

          {/* Executive Value Proposition Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0c326f]/60 border-l-4 border-l-[#fbbf24] border-t border-r border-b border-[#1351b4]/60 backdrop-blur-md shadow-xl max-w-2xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
              Proposta de Valor
            </span>
            <p className="text-base sm:text-lg text-white font-medium leading-relaxed">
              "Identificar e validar possíveis vícios jurídicos antes de gerar uma defesa técnica consistente e fundamentada."
            </p>
          </div>

          {/* Objective of the Meeting & Presenter Prompt */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-1">
            <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#071d41] border border-slate-700 text-xs text-slate-200">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Apresentação executiva e validação com o Sebrae</span>
            </div>
            <span className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>Pressione</span>
              <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#fbbf24] font-mono">Espaço</kbd>
              <span>para iniciar a apresentação</span>
            </span>
          </div>
        </motion.div>

        {/* Right Column: Executive Session Agenda */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4]/60 shadow-2xl backdrop-blur-xl">
            {/* Header of the Agenda */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Roteiro da Apresentação
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#fbbf24] bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                PAUTA EXECUTIVA
              </span>
            </div>

            {/* 5 Agenda Pillars */}
            <div className="space-y-2.5">
              {agendaItems.map((item, index) => {
                const IconComp = item.icon;
                const isHighlighted = revealedCount >= index + 1;

                return (
                  <div
                    key={item.id}
                    onClick={() => onItemClick && onItemClick(index + 1)}
                    className={`flex items-center gap-3.5 p-3 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#0c326f]/80 border-[#2684ff] shadow-md ring-1 ring-[#fbbf24]/30'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isHighlighted
                          ? 'bg-[#fbbf24] text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight truncate">
                          {item.number}. {item.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800 shrink-0">
                          {item.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-0.5 truncate">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom tag */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Apresentação focada e objetiva
              </span>
              <span className="text-slate-400 font-mono">5 etapas + Demonstração</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
