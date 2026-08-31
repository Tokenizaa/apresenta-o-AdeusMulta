import React, { useState } from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import {
  ExternalLink,
  Play,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Settings,
  Layers,
  Upload,
  Cpu,
  Search,
  FileCheck
} from 'lucide-react';

interface SlideLiveDemoProps {
  slide: SlideData;
  revealedCount: number;
  onItemClick?: (index: number) => void;
}

export const SlideLiveDemo: React.FC<SlideLiveDemoProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  // Use official platform URL or environment variable
  const defaultPlatformUrl =
    (import.meta as any).env?.VITE_ADEUS_MULTA_URL ||
    'https://ais-pre-jnkwagwbq4viqexx3aiiwf-571082489823.us-east1.run.app';

  const [platformUrl, setPlatformUrl] = useState(defaultPlatformUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [hasOpenedDemo, setHasOpenedDemo] = useState(false);

  const handleOpenPlatform = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasOpenedDemo(true);
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  };

  const stepsList = [
    {
      num: '1',
      title: 'Dados da multa',
      desc: 'Entrada das informações do auto e do condutor',
      icon: Layers,
    },
    {
      num: '2',
      title: 'Documentos',
      desc: 'Envio da notificação e registros disponíveis',
      icon: Upload,
    },
    {
      num: '3',
      title: 'Análise',
      desc: 'Conferência automática das regras e prazos legais',
      icon: Cpu,
    },
    {
      num: '4',
      title: 'Fundamentos encontrados',
      desc: 'Identificação dos pontos passíveis de defesa',
      icon: Search,
    },
    {
      num: '5',
      title: 'Defesa',
      desc: 'Montagem do documento completo e fundamentado',
      icon: FileCheck,
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
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-black tracking-wider uppercase rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-sm flex items-center gap-1.5 animate-pulse">
              <Play className="w-3.5 h-3.5 fill-current" />
              {slide.stageTag}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-xs text-slate-300 font-medium">Demonstração ao Vivo</span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditingUrl(!isEditingUrl);
            }}
            className="text-[11px] text-slate-400 hover:text-[#fbbf24] flex items-center gap-1 transition-colors"
            title="Configurar URL"
          >
            <Settings className="w-3 h-3" />
            <span>{isEditingUrl ? 'Salvar' : 'Configurar URL'}</span>
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-lg sm:text-xl text-[#fbbf24] mt-2 font-bold max-w-3xl">
            {slide.subtitle}
          </p>
        )}

        {/* URL editor if active */}
        {isEditingUrl && (
          <div className="mt-3 p-3 rounded-xl bg-slate-950 border border-slate-700 max-w-xl" onClick={(e) => e.stopPropagation()}>
            <label className="text-[10px] text-slate-400 block mb-1 uppercase font-bold">
              URL da Plataforma:
            </label>
            <input
              type="url"
              value={platformUrl}
              onChange={(e) => setPlatformUrl(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#2684ff]"
            />
          </div>
        )}
      </motion.div>

      {/* Main Visual Bridge Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center mb-6">
        {/* Left Column (lg:col-span-7): The 5 Clean Steps (1 ↓ 2 ↓ 3 ↓ 4 ↓ 5) */}
        <div className="lg:col-span-7 flex flex-col space-y-2.5">
          {stepsList.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={idx}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className="flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0c326f]/70 via-[#071d41]/80 to-[#030d1d]/80 border border-[#1351b4]/50 shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#fbbf24] text-slate-950 font-black text-base flex items-center justify-center flex-shrink-0 shadow-md">
                    {step.num}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300">
                      {step.desc}
                    </p>
                  </div>

                  <div className="p-2 rounded-xl bg-slate-900/60 text-emerald-400 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                </motion.div>

                {/* Arrow downward between steps */}
                {idx < stepsList.length - 1 && (
                  <div className="flex justify-center -my-1 text-[#2684ff] opacity-60">
                    ↓
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Right Column (lg:col-span-5): Big Action Button & Transition Note */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-5 flex flex-col justify-center"
        >
          <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#2684ff] shadow-2xl space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#fbbf24] bg-slate-950/80 px-3 py-1 rounded-full border border-[#fbbf24]/30">
                Ponte para a Demonstração
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                Vamos ver o produto em ação
              </h2>
              <p className="text-sm text-slate-200 leading-relaxed">
                Clique no botão abaixo para abrir a aplicação e acompanhar o fluxo da notificação até a defesa pronta.
              </p>
            </div>

            {/* Giant CTA Button */}
            <button
              id="btn-open-platform"
              onClick={handleOpenPlatform}
              className="w-full py-5 px-6 rounded-2xl font-black text-lg sm:text-xl flex items-center justify-center gap-3 bg-[#fbbf24] hover:bg-[#f59e0b] text-slate-950 transition-all duration-300 shadow-2xl shadow-[#fbbf24]/30 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
            >
              <span>ABRIR O ADEUS MULTA</span>
              <ExternalLink className="w-6 h-6 stroke-[3]" />
            </button>

            {/* Return note */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4 text-[#fbbf24]" />
                <span>
                  Após a demo: <strong className="text-white">Volte para esta aba</strong>
                </span>
              </div>
              <span className="text-[11px] text-emerald-400 font-bold">Avançar para Etapa 5</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Return banner after opening */}
      {hasOpenedDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-200"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>
              <strong>Demonstração aberta!</strong> Ao concluir a demonstração prática, retorne aqui para o plano de validação.
            </span>
          </div>
          <button
            onClick={() => onItemClick && onItemClick(1)}
            className="px-4 py-2 rounded-lg bg-emerald-500 text-slate-950 font-black hover:bg-emerald-400 transition-colors flex items-center gap-1.5 flex-shrink-0 text-xs"
          >
            <span>Ir para Etapa 5 (O Negócio)</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </motion.div>
      )}
    </div>
  );
};

