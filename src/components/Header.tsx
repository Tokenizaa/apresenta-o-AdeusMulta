import React from 'react';
import { Maximize2, Minimize2, HelpCircle, FileText, RotateCcw, Shield, Sparkles } from 'lucide-react';
import { SlideData } from '../types/presentation';

interface HeaderProps {
  currentSlide: SlideData;
  slideIndex: number;
  totalSlides: number;
  revealedCount: number;
  totalStepsInCurrentSlide: number;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
  onToggleNotes: () => void;
  onToggleShortcuts: () => void;
  onResetSlide: () => void;
  onSelectSlide: (index: number) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentSlide,
  slideIndex,
  totalSlides,
  revealedCount,
  totalStepsInCurrentSlide,
  isFullscreen,
  onToggleFullscreen,
  onToggleNotes,
  onToggleShortcuts,
  onResetSlide,
  onSelectSlide,
}) => {
  const stageLabels = [
    '00 Capa',
    '01 Problema',
    '02 Demanda',
    '03 Concorrência',
    '04 Diferencial',
    '05 Tecnologia',
    '06 Demo Ao Vivo',
    '07 Gestão & Metas'
  ];

  return (
    <header className="relative z-30 flex items-center justify-between px-6 py-3.5 border-b border-[#1351b4]/40 bg-[#071d41]/90 backdrop-blur-md">
      {/* Brand & Context */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1351b4] to-[#2684ff] flex items-center justify-center shadow-md shadow-[#1351b4]/40 text-white font-black text-sm">
            AM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-white text-base">Adeus Multa</span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-[#0c326f] text-[#00b0ff] border border-[#2684ff]/40">
                GovTech
              </span>
            </div>
            <p className="text-[11px] text-slate-300 font-medium">Sessão Estratégica Sebrae</p>
          </div>
        </div>

        <div className="hidden md:block h-6 w-px bg-slate-700/80" />

        {/* Stage quick tabs selector */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-950/70 px-2.5 py-1 rounded-xl border border-slate-800">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              id={`nav-dot-${idx}`}
              onClick={() => onSelectSlide(idx)}
              className={`text-xs font-semibold px-2.5 py-1 rounded-lg transition-all duration-200 ${
                idx === slideIndex
                  ? 'bg-[#1351b4] text-white shadow-sm border border-[#2684ff]/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
              title={`Ir para ${stageLabels[idx] || `Slide ${idx + 1}`}`}
            >
              {stageLabels[idx] || `0${idx}`}
            </button>
          ))}
        </div>
      </div>

      {/* Progress & Slide Counter */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className="bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-1.5">
            <span className="text-slate-400">Etapa:</span>
            <span className="font-bold text-white tracking-wide">
              {slideIndex === 0 ? 'Capa' : `0${slideIndex}`} <span className="text-slate-500">/</span> {`0${totalSlides - 1}`}
            </span>
          </div>

          <div className="hidden sm:flex bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-1.5 items-center gap-1.5">
            <span className="text-slate-400">Revelados:</span>
            <span className="font-bold text-[#00b0ff] tracking-wide">
              {revealedCount} <span className="text-slate-500">/</span> {totalStepsInCurrentSlide}
            </span>
          </div>
        </div>

        {/* Quick action buttons */}
        <div className="flex items-center gap-1.5">
          <button
            id="header-btn-notes"
            onClick={onToggleNotes}
            className="p-2 rounded-lg bg-slate-900 hover:bg-[#0c326f] text-slate-300 hover:text-white border border-slate-800 transition-colors flex items-center gap-1.5 text-xs font-semibold"
            title="Notas do Apresentador (N)"
          >
            <FileText className="w-4 h-4 text-[#00b0ff]" />
            <span className="hidden xl:inline">Roteiro Sebrae</span>
          </button>

          <button
            id="header-btn-reset"
            onClick={onResetSlide}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
            title="Reiniciar revelação deste slide (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            id="header-btn-shortcuts"
            onClick={onToggleShortcuts}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
            title="Atalhos do Teclado (?)"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          <button
            id="header-btn-fullscreen"
            onClick={onToggleFullscreen}
            className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors"
            title={isFullscreen ? "Sair da Tela Cheia (F)" : "Modo Apresentação / Tela Cheia (F)"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
