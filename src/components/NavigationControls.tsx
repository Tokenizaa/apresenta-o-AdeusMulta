import React from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface NavigationControlsProps {
  slideIndex: number;
  totalSlides: number;
  revealedCount: number;
  totalStepsInCurrentSlide: number;
  onPrev: () => void;
  onNext: () => void;
  isFirstStepOverall: boolean;
  isLastStepOverall: boolean;
  onSelectSlide: (index: number) => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  slideIndex,
  totalSlides,
  revealedCount,
  totalStepsInCurrentSlide,
  onPrev,
  onNext,
  isFirstStepOverall,
  isLastStepOverall,
  onSelectSlide,
}) => {
  const isSlideFullyRevealed = revealedCount >= totalStepsInCurrentSlide;
  const isFinalSlide = slideIndex === totalSlides - 1;

  let nextLabel = "Revelar Próximo";
  if (isSlideFullyRevealed) {
    if (isFinalSlide) {
      nextLabel = "Apresentação Concluída";
    } else {
      nextLabel = "Próxima Etapa";
    }
  } else if (revealedCount === 0) {
    nextLabel = "Iniciar Revelação";
  }

  return (
    <div className="relative z-30 border-t border-[#1351b4]/40 bg-[#071d41]/95 backdrop-blur-md px-6 py-3.5">
      {/* Top progress bar line in GovTech Cyan/Blue */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-slate-950 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-[#1351b4] via-[#2684ff] to-[#00b0ff] transition-all duration-300 ease-out"
          style={{
            width: `${((slideIndex + (revealedCount / (totalStepsInCurrentSlide || 1))) / totalSlides) * 100}%`,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Step indicator pills */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-300">Progresso do Slide:</span>
            <div className="flex items-center gap-1.5 bg-slate-950 p-1.5 rounded-full border border-slate-800">
              {Array.from({ length: totalStepsInCurrentSlide }).map((_, stepIdx) => {
                const isRevealed = stepIdx < revealedCount;
                const isCurrent = stepIdx === revealedCount - 1;
                return (
                  <div
                    key={stepIdx}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      isCurrent
                        ? 'w-6 bg-[#00b0ff] shadow-sm shadow-[#00b0ff]/50'
                        : isRevealed
                        ? 'w-2.5 bg-[#2684ff]'
                        : 'w-2 bg-slate-800'
                    }`}
                    title={`Passo ${stepIdx + 1}`}
                  />
                );
              })}
            </div>
          </div>

          <span className="hidden md:inline-block text-xs text-slate-400">
            • Navegue com <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[#00b0ff] text-[10px] font-mono">Espaço</kbd> ou <kbd className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-[#00b0ff] text-[10px] font-mono">→</kbd>
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <button
            id="nav-btn-prev"
            onClick={onPrev}
            disabled={isFirstStepOverall}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 border transition-all duration-150 ${
              isFirstStepOverall
                ? 'opacity-30 cursor-not-allowed border-slate-800 text-slate-600 bg-slate-950'
                : 'border-slate-800 hover:border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white shadow-sm'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>

          <button
            id="nav-btn-next"
            onClick={onNext}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold flex items-center gap-2.5 transition-all duration-200 shadow-lg ${
              isSlideFullyRevealed && !isFinalSlide
                ? 'bg-gradient-to-r from-[#1351b4] via-[#2684ff] to-[#00b0ff] hover:brightness-110 text-white shadow-[#1351b4]/50'
                : isLastStepOverall
                ? 'bg-slate-900 text-[#00b0ff] border border-[#2684ff]/40 shadow-none'
                : 'bg-gradient-to-r from-[#1351b4] to-[#2684ff] hover:brightness-110 text-white shadow-[#1351b4]/40 active:scale-[0.98]'
            }`}
          >
            <span>{nextLabel}</span>
            {isSlideFullyRevealed && !isFinalSlide ? (
              <ArrowRight className="w-4 h-4 text-white font-bold" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white font-bold" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
