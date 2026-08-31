import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import {
  ExternalLink,
  Play,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Monitor,
  FileText,
  Upload,
  Cpu,
  CheckCircle2,
  Layers,
  Settings,
  HelpCircle,
  Eye
} from 'lucide-react';

interface SlideLiveDemoProps {
  slide: SlideData;
  revealedCount: number; // 0: Initial callout; 1..4: Steps 1..4; 5: Big CTA "AGORA É DEMONSTRAÇÃO AO VIVO"
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
    (import.meta as any).env?.APP_URL ||
    'https://adeusmulta.com.br';

  const [platformUrl, setPlatformUrl] = useState(defaultPlatformUrl);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [hasOpenedDemo, setHasOpenedDemo] = useState(false);

  const isFinalDemoActive = revealedCount >= 5;

  const handleOpenPlatform = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasOpenedDemo(true);
    window.open(platformUrl, '_blank', 'noopener,noreferrer');
  };

  // Visual sequence guide to assist the presenter
  const demoSequence = [
    {
      num: '01',
      step: 'Entrada',
      desc: 'Dados da infração e informações do usuário',
      icon: Layers,
    },
    {
      num: '02',
      step: 'Documentos',
      desc: 'Upload e informações relevantes do auto',
      icon: Upload,
    },
    {
      num: '03',
      step: 'Análise',
      desc: 'Regras determinísticas + CTB estruturado',
      icon: Cpu,
    },
    {
      num: '04',
      step: 'Resultado',
      desc: 'Fundamentos jurídicos identificados',
      icon: CheckCircle2,
    },
    {
      num: '05',
      step: 'Defesa',
      desc: 'Documento final pronto para protocolo',
      icon: FileText,
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      {/* Slide Header with Live Demo Badge */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-500/50 shadow-sm flex items-center gap-1.5 animate-pulse">
              <Play className="w-3.5 h-3.5 fill-current" />
              {slide.stageTag}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-xs text-slate-300 font-medium">Transição Apresentação → Produto Real</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-[#00b0ff] bg-[#0c326f]/70 px-2.5 py-1 rounded border border-[#2684ff]/30 flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5" />
              Ambiente de Produção
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          {slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-300 mt-1 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Main Grid: Left Side 4 Step Reveals | Right Side Live Action Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Left Column (lg:col-span-7): The 4 Step Preparation Walkthrough */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-3">
          {/* Initial State Banner when revealedCount === 0 */}
          {revealedCount === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-6 rounded-2xl bg-gradient-to-br from-[#0c326f]/90 via-[#071d41]/95 to-[#030d1d]/95 border-2 border-[#2684ff] shadow-2xl flex flex-col justify-center items-center text-center space-y-4 my-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#1351b4] border border-[#00b0ff]/60 flex items-center justify-center text-[#00b0ff] shadow-lg shadow-[#1351b4]/60">
                <Play className="w-8 h-8 fill-current ml-1" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00b0ff] bg-slate-950/70 px-3 py-1 rounded-full border border-[#2684ff]/40">
                  ETAPA 04
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  DEMONSTRAÇÃO AO VIVO
                </h2>
                <p className="text-lg text-[#00b0ff] font-semibold mt-1">
                  "Agora vamos ver o produto funcionando."
                </p>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md">
                Pressione <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#00b0ff] font-mono">Espaço</kbd> ou clique para avançar o roteiro e abrir a plataforma.
              </p>
            </motion.div>
          )}

          {/* Steps 1 to 4 */}
          {slide.topics.map((topic, index) => {
            const isRevealed = revealedCount > index;
            const isCurrentlyActive = revealedCount === index + 1;

            if (revealedCount === 0) return null;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                onClick={() => onItemClick && onItemClick(index + 1)}
                className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                  isCurrentlyActive
                    ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-2 border-[#00b0ff] shadow-xl shadow-[#0c326f]/70 ring-2 ring-[#00b0ff]/30'
                    : isRevealed
                    ? 'bg-gradient-to-r from-[#071d41]/90 to-[#030d1d]/90 border border-[#1351b4]/60 shadow-md hover:border-[#2684ff]/50'
                    : 'bg-[#071d41]/30 border border-slate-800/80 opacity-50 hover:opacity-80'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                      isCurrentlyActive
                        ? 'bg-[#00b0ff] text-slate-950 font-black shadow-md'
                        : isRevealed
                        ? 'bg-[#1351b4] text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {topic.number}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                        {topic.number} — {topic.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                        {topic.badge}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {isRevealed ? (
                        <motion.p
                          key="revealed"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-xs sm:text-sm text-slate-200 mt-1 font-normal leading-relaxed"
                        >
                          "{topic.explanation}"
                        </motion.p>
                      ) : (
                        <p className="text-xs text-slate-400 mt-1">
                          Clique ou pressione Espaço para revelar
                        </p>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400 self-end sm:self-center flex-shrink-0">
                  <DynamicIcon name={topic.iconName} className="w-5 h-5" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column (lg:col-span-5): Big Call to Action & Live Product Bridge */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className={`h-full rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border ${
              isFinalDemoActive
                ? 'bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#00b0ff] shadow-2xl shadow-[#1351b4]/70 ring-4 ring-[#00b0ff]/20'
                : 'bg-gradient-to-b from-[#071d41]/80 to-[#030d1d]/90 border-[#1351b4]/50 shadow-xl'
            }`}
          >
            {/* Header of the Live Demo Bridge */}
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <h3 className="text-xs font-black uppercase tracking-wider text-slate-200">
                    {isFinalDemoActive ? 'Pronto para a Demonstração' : 'Ponte com a Aplicação'}
                  </h3>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsEditingUrl(!isEditingUrl);
                  }}
                  className="text-[11px] text-slate-400 hover:text-[#00b0ff] flex items-center gap-1 transition-colors"
                  title="Configurar URL da plataforma"
                >
                  <Settings className="w-3 h-3" />
                  <span>{isEditingUrl ? 'Salvar' : 'URL'}</span>
                </button>
              </div>

              {/* URL bar editor if toggled */}
              {isEditingUrl && (
                <div className="mb-4 p-3 rounded-xl bg-slate-950 border border-slate-700" onClick={(e) => e.stopPropagation()}>
                  <label className="text-[10px] text-slate-400 block mb-1 uppercase font-bold">
                    URL da Plataforma Adeus Multa:
                  </label>
                  <input
                    type="url"
                    value={platformUrl}
                    onChange={(e) => setPlatformUrl(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-[#00b0ff]"
                  />
                </div>
              )}

              {/* Main Callout Banner */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-[#2684ff]/30 mb-5">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#00b0ff]">
                  Ação ao Vivo no Google Meet
                </span>
                <h4 className="text-lg sm:text-xl font-extrabold text-white mt-1 leading-tight">
                  {isFinalDemoActive
                    ? 'AGORA É DEMONSTRAÇÃO AO VIVO'
                    : 'Apresentação como ponte para o produto'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {isFinalDemoActive
                    ? 'Abra a aplicação na nova aba e demonstre o onboarding e análise em 3 minutos.'
                    : 'O apresentador sairá temporariamente desta aba para interagir com o fluxo real.'}
                </p>
              </div>

              {/* Suggested Sequence Guide: 01 to 05 */}
              <div className="space-y-2 mb-6">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <Eye className="w-3 h-3 text-[#00b0ff]" />
                  Sequência Sugerida na Demo (3 a 5 min):
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {demoSequence.map((step, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-[#071d41]/60 border border-slate-800/80 text-xs"
                    >
                      <span className="text-[11px] font-mono font-bold text-[#2684ff]">
                        {step.num}
                      </span>
                      <span className="font-bold text-slate-200">{step.step}:</span>
                      <span className="text-slate-400 text-[11px] truncate">{step.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Big Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                id="btn-open-platform"
                onClick={handleOpenPlatform}
                className={`w-full py-4 px-6 rounded-2xl font-black text-base sm:text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl ${
                  isFinalDemoActive
                    ? 'bg-gradient-to-r from-[#1351b4] via-[#2684ff] to-[#00b0ff] text-white hover:brightness-110 shadow-[#1351b4]/80 scale-[1.02] ring-2 ring-white/20 active:scale-[0.99]'
                    : 'bg-[#1351b4] hover:bg-[#2684ff] text-white shadow-lg'
                }`}
              >
                <span>ABRIR O ADEUS MULTA</span>
                <ExternalLink className="w-5 h-5 font-bold stroke-[2.5]" />
              </button>

              {/* Instructions on returning to presentation */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4 text-[#00b0ff]" />
                  <span>
                    Após a demo: <strong className="text-white">Volte para esta aba</strong>
                  </span>
                </div>
                <span className="text-[11px] text-slate-400">Pressione Espaço para o Negócio</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Returning Banner */}
      {hasOpenedDemo && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-emerald-200"
        >
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>
              <strong>Demonstração iniciada em nova aba!</strong> Ao finalizar, retorne para esta tela para continuar a consultoria de negócios.
            </span>
          </div>
          <button
            onClick={() => onItemClick && onItemClick(5)}
            className="px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors flex items-center gap-1.5 flex-shrink-0 text-xs"
          >
            <span>Continuar para Etapa 5 (Negócio)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
