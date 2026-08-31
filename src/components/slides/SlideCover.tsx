import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { 
  Shield, 
  User, 
  FileText, 
  CheckSquare, 
  FileCheck, 
  ArrowRight,
  Sparkles,
  Building
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
  const steps = [
    {
      id: 'step1',
      number: '01',
      title: 'Motorista',
      desc: 'Recebe a autuação e quer saber se existe algum erro ou motivo para recorrer.',
      icon: User,
      badge: 'Início',
    },
    {
      id: 'step2',
      number: '02',
      title: 'Documentos',
      desc: 'Informa os dados da multa e anexa a notificação recebida.',
      icon: FileText,
      badge: 'Dados',
    },
    {
      id: 'step3',
      number: '03',
      title: 'Conferência',
      desc: 'O sistema confere os fatos com a legislação e as regras do Código de Trânsito.',
      icon: CheckSquare,
      badge: 'Regras',
    },
    {
      id: 'step4',
      number: '04',
      title: 'Defesa',
      desc: 'Gera o documento de defesa com base nos fundamentos encontrados.',
      icon: FileCheck,
      badge: 'Resultado',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Brand & Value Proposition */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col justify-center space-y-6"
        >
          {/* Institutional Gov.br Header Badge */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#1351b4]/30 border border-[#2684ff]/40 text-[#2684ff] text-xs font-bold uppercase tracking-wider shadow-sm">
              <Shield className="w-3.5 h-3.5 text-[#fbbf24]" />
              Iniciativa Brasileira
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold">
              <Building className="w-3.5 h-3.5 text-emerald-400" />
              Apresentação Sebrae
            </span>
          </div>

          {/* Main Display Brand Name & Subtitle */}
          <div className="space-y-3">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-none">
              ADEUS <span className="text-[#fbbf24]">MULTA</span>
            </h1>
            <p className="text-xl sm:text-2xl text-slate-100 font-semibold leading-snug">
              {slide.subtitle}
            </p>
          </div>

          {/* High-Contrast Core Value Box */}
          <div className="p-5 sm:p-6 rounded-2xl bg-[#0c326f]/60 border-l-4 border-l-[#fbbf24] border-t border-r border-b border-[#1351b4]/60 backdrop-blur-md shadow-xl max-w-xl space-y-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-400 block">
              Princípio do Sistema
            </span>
            <p className="text-lg sm:text-xl text-white font-bold leading-relaxed">
              "{slide.highlightQuote || 'Primeiro verificamos as regras. Depois geramos a defesa.'}"
            </p>
          </div>

          {/* Interactive Keyboard Cue */}
          <div className="flex items-center gap-3 text-xs text-slate-300 pt-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Pressione <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#fbbf24] font-mono">Espaço</kbd> ou clique nas etapas ao lado para explorar</span>
          </div>
        </motion.div>

        {/* Right Column: 4 Steps Flow */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 flex flex-col justify-center"
        >
          <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4]/60 shadow-2xl backdrop-blur-xl">
            {/* Header of Flow */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#fbbf24]" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                  Como funciona o sistema
                </span>
              </div>
              <span className="text-[11px] font-bold text-[#fbbf24] bg-slate-900 px-2.5 py-0.5 rounded border border-slate-700">
                FLUXO EM 4 PASSOS
              </span>
            </div>

            {/* 4 Steps Grid */}
            <div className="space-y-3">
              {steps.map((step, index) => {
                const IconComp = step.icon;
                const isHighlighted = revealedCount >= index + 1;

                return (
                  <div
                    key={step.id}
                    onClick={() => onItemClick && onItemClick(index + 1)}
                    className={`flex items-start gap-3.5 p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isHighlighted
                        ? 'bg-[#0c326f]/80 border-[#2684ff] shadow-md ring-1 ring-[#fbbf24]/30'
                        : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900/90 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        isHighlighted
                          ? 'bg-[#fbbf24] text-slate-950 shadow-sm'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      <IconComp className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="text-sm font-bold text-white tracking-tight">
                          {step.number}. {step.title}
                        </h4>
                        <span className="text-[10px] font-mono text-slate-300 bg-slate-950 px-2 py-0.5 rounded border border-slate-800 shrink-0">
                          {step.badge}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Note */}
            <div className="mt-4 pt-3.5 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                Tecnologia pronta e funcional
              </span>
              <span className="text-slate-400 font-mono">Etapa 00 de 07</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
