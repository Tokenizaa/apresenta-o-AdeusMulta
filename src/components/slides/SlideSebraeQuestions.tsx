import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import {
  HelpCircle,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Building2,
  CheckCircle,
  Edit3,
  RotateCcw,
  Target
} from 'lucide-react';

interface SlideSebraeQuestionsProps {
  slide: SlideData;
  revealedCount: number; // 0..5 reveals questions 1..5; 6 reveals final Sebrae closing board
  onItemClick?: (index: number) => void;
}

export const SlideSebraeQuestions: React.FC<SlideSebraeQuestionsProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  // Live editable state for the 3 consultant actions
  const [action1, setAction1] = useState('');
  const [action2, setAction2] = useState('');
  const [action3, setAction3] = useState('');
  const [isEditing, setIsEditing] = useState(true);

  const showFinalBoard = revealedCount >= 6;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      {/* Slide Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#00b0ff] border border-[#2684ff]/40 shadow-sm">
              {slide.stageTag}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-xs text-slate-300 font-medium">Modelagem & Tração Comercial</span>
          </div>

          <button
            onClick={() => onItemClick && onItemClick(showFinalBoard ? 5 : 6)}
            className="flex items-center gap-2 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-semibold text-[#00b0ff] hover:bg-slate-800 transition-colors"
          >
            {showFinalBoard ? 'Ver 5 Eixos de Negócio' : 'Ver Pergunta dos 30 Dias'}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          {showFinalBoard ? 'O que você faria nos próximos 30 dias?' : slide.title}
        </h1>
        {slide.subtitle && !showFinalBoard && (
          <p className="text-base sm:text-lg text-slate-300 mt-1 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
        {showFinalBoard && (
          <p className="text-base sm:text-lg text-slate-300 mt-1 font-normal max-w-3xl">
            Se você estivesse começando esse negócio hoje, quais seriam as três coisas que faria nos primeiros 30 dias?
          </p>
        )}
      </motion.div>

      {/* Conditional View: 5 Strategic Questions vs Final Closing Board */}
      <AnimatePresence mode="wait">
        {!showFinalBoard ? (
          <motion.div
            key="questions-view"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            className="space-y-3"
          >
            <div className="grid grid-cols-1 gap-3">
              {slide.topics.map((topic, index) => {
                const isRevealed = revealedCount > index;
                const isCurrentlyActive = revealedCount === index + 1;

                return (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.07 }}
                    onClick={() => onItemClick && onItemClick(index + 1)}
                    className={`rounded-2xl p-4 sm:p-5 transition-all duration-300 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
                      isCurrentlyActive
                        ? 'bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-2 border-[#00b0ff] shadow-xl shadow-[#0c326f]/70 ring-2 ring-[#00b0ff]/30'
                        : isRevealed
                        ? 'bg-gradient-to-r from-[#071d41]/90 to-[#030d1d]/90 border border-[#1351b4]/60 shadow-md hover:border-[#2684ff]/50'
                        : 'bg-[#071d41]/30 border border-slate-800/80 opacity-60 hover:opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-sm flex-shrink-0 ${
                          isCurrentlyActive
                            ? 'bg-[#00b0ff] text-slate-950 font-bold'
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
                            {topic.title}
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
                              className="text-sm sm:text-base text-[#00b0ff] font-semibold mt-1"
                            >
                              "{topic.explanation}"
                            </motion.p>
                          ) : (
                            <p className="text-xs text-slate-400 mt-1">
                              Clique para destacar a pergunta
                            </p>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-400">
                        <DynamicIcon name={topic.iconName} className="w-5 h-5" />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Prompt to reveal Closing Board */}
            <div className="pt-3 flex justify-end">
              <button
                onClick={() => onItemClick && onItemClick(6)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1351b4] to-[#2684ff] text-white font-bold text-sm shadow-lg shadow-[#1351b4]/50 hover:brightness-110 transition-all"
              >
                <span>Avançar para a Pergunta dos 30 Dias</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ) : (
          /* SLIDE FINAL / ENCERRAMENTO COM O SEBRAE */
          <motion.div
            key="final-board"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Main Question Card in Institutional Blue */}
            <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#0c326f] border-2 border-[#2684ff] shadow-2xl shadow-[#1351b4]/60 backdrop-blur-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#00b0ff] bg-slate-950/60 px-3 py-1 rounded-full border border-[#2684ff]/30">
                  <Target className="w-3.5 h-3.5" />
                  Pergunta Estratégica para o Sebrae
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#00b0ff]" />
                    {isEditing ? 'Concluir Anotações' : 'Editar Ações ao Vivo'}
                  </button>
                </div>
              </div>

              <blockquote className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white leading-snug tracking-tight my-4">
                "{slide.closingQuestion}"
              </blockquote>

              {/* 3 Action Lines for the Consultant's 30-Day Plan */}
              <div className="mt-6 space-y-3">
                <div className="p-4 rounded-xl bg-slate-950/70 border border-[#2684ff]/40 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#2684ff] text-slate-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                    01
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action1}
                      placeholder="01 ________________________________ (1ª prioridade)"
                      onChange={(e) => setAction1(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#00b0ff]/60 text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-[#00b0ff] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-slate-100 font-semibold flex-1">
                      {action1 || '01 ________________________________'}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-[#2684ff]/40 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#2684ff] text-slate-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                    02
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action2}
                      placeholder="02 ________________________________ (2ª prioridade)"
                      onChange={(e) => setAction2(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#00b0ff]/60 text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-[#00b0ff] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-slate-100 font-semibold flex-1">
                      {action2 || '02 ________________________________'}
                    </p>
                  )}
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-[#2684ff]/40 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#2684ff] text-slate-950 font-black text-sm flex items-center justify-center flex-shrink-0">
                    03
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action3}
                      placeholder="03 ________________________________ (3ª prioridade)"
                      onChange={(e) => setAction3(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#00b0ff]/60 text-white text-sm sm:text-base font-semibold focus:outline-none focus:border-[#00b0ff] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-slate-100 font-semibold flex-1">
                      {action3 || '03 ________________________________'}
                    </p>
                  )}
                </div>
              </div>

              {/* Subtitle / Closing Takeaway */}
              <div className="mt-6 pt-5 border-t border-[#1351b4]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-slate-300">
                <p className="font-medium italic">
                  "{slide.closingTakeaway}"
                </p>
                <span className="text-emerald-400 font-bold flex items-center gap-1.5 flex-shrink-0">
                  <CheckCircle className="w-4 h-4" />
                  Pronto para a Consultoria
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
