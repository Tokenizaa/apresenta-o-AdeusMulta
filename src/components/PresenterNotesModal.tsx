import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, FileText, CheckCircle, Target, Lightbulb } from 'lucide-react';
import { SlideData } from '../types/presentation';

interface PresenterNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  slide: SlideData;
  slideIndex: number;
  totalSlides: number;
}

export const PresenterNotesModal: React.FC<PresenterNotesModalProps> = ({
  isOpen,
  onClose,
  slide,
  slideIndex,
  totalSlides,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="w-full max-w-md bg-[#071d41] border-l border-[#1351b4]/50 p-6 flex flex-col h-full shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#1351b4]/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0c326f] text-[#00b0ff] border border-[#2684ff]/30">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Roteiro do Apresentador</h3>
                <p className="text-xs text-slate-300">
                  {slideIndex === 0 ? 'Capa de Abertura' : `Etapa 0${slideIndex} de 0${totalSlides - 1}`} • {slide.stageTag}
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Fechar (N)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 py-6 space-y-6">
            {/* Objective */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-[#1351b4]/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-[#00b0ff]">
                <Target className="w-4 h-4" />
                <span>Objetivo do Slide</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-medium">
                {slide.presenterNotes.objective}
              </p>
            </div>

            {/* Talking Points */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-slate-300">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Pontos-Chave de Fala</span>
              </div>
              <ul className="space-y-2.5">
                {slide.presenterNotes.talkingPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00b0ff] mt-2 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sebrae Focus */}
            <div className="p-4 rounded-xl bg-[#0c326f]/50 border border-[#2684ff]/40 space-y-2">
              <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-emerald-300">
                <CheckCircle className="w-4 h-4" />
                <span>Foco na Consultoria Sebrae</span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
                {slide.presenterNotes.sebraeFocus}
              </p>
            </div>
          </div>

          {/* Footer note */}
          <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 text-center">
            Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-900 text-[#00b0ff] font-mono">N</kbd> para fechar ou abrir estas notas a qualquer momento.
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
