import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { DynamicIcon } from '../DynamicIcon';
import {
  ArrowRight,
  CheckCircle,
  Edit3,
  Target,
  Sparkles,
  HelpCircle
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

  const showFinalBoard = revealedCount >= 5;

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
            <span className="px-3.5 py-1 text-xs font-black tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#2684ff] border border-[#2684ff]/40 shadow-sm">
              {slide.stageTag}
            </span>
            <div className="h-4 w-px bg-slate-700" />
            <span className="text-xs text-slate-300 font-medium">Validação Estratégica</span>
          </div>

          <button
            onClick={() => onItemClick && onItemClick(showFinalBoard ? 0 : 5)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-700 text-xs font-bold text-[#fbbf24] hover:bg-slate-800 transition-colors"
          >
            {showFinalBoard ? 'Ver os 5 Pontos de Negócio' : 'Ver Pergunta dos 30 Dias'}
          </button>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mt-2">
          {showFinalBoard ? 'Pergunta Estratégica para a Consultoria' : slide.title}
        </h1>
        {slide.subtitle && (
          <p className="text-base sm:text-lg text-slate-200 mt-1 font-normal max-w-3xl">
            {slide.subtitle}
          </p>
        )}
      </motion.div>

      {/* Main Grid: Left Side 5 Points | Right Side 30-Day Question Board */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-6">
        {/* Left Column (lg:col-span-6 or 7): The 5 Business Points */}
        <div className="lg:col-span-6 flex flex-col space-y-2.5">
          {slide.topics.map((topic, index) => {
            const isRevealed = revealedCount > index;
            const isCurrentlyActive = revealedCount === index + 1;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                onClick={() => onItemClick && onItemClick(index + 1)}
                className={`rounded-2xl p-3.5 sm:p-4 transition-all duration-300 cursor-pointer flex items-center justify-between gap-3 ${
                  isCurrentlyActive
                    ? 'bg-gradient-to-r from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-xl shadow-[#0c326f]/80 ring-2 ring-[#fbbf24]/30'
                    : isRevealed
                    ? 'bg-gradient-to-r from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-md hover:border-[#2684ff]'
                    : 'bg-[#071d41]/30 border border-slate-800 opacity-60 hover:opacity-90'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs flex-shrink-0 ${
                      isCurrentlyActive
                        ? 'bg-[#fbbf24] text-slate-950 shadow-md'
                        : isRevealed
                        ? 'bg-[#1351b4] text-[#fbbf24]'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    0{index + 1}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                        {topic.title}
                      </h3>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/30">
                        {topic.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed font-normal">
                      {topic.explanation}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-900/60 text-emerald-400 flex-shrink-0">
                  <DynamicIcon name={topic.iconName} className="w-4 h-4" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column (lg:col-span-6): The 30-Day Question Board */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="h-full rounded-3xl p-6 sm:p-7 bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#2684ff] shadow-2xl flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#1351b4]/40">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#fbbf24] bg-slate-950 px-3 py-1 rounded-full border border-[#fbbf24]/30">
                  <Target className="w-3.5 h-3.5" />
                  Pergunta Final para o Sebrae
                </span>

                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>{isEditing ? 'Concluir Anotações' : 'Anotar ao Vivo'}</span>
                </button>
              </div>

              {/* Main Question Quote */}
              <blockquote className="text-lg sm:text-xl lg:text-2xl font-black text-white leading-snug tracking-tight my-2">
                "{slide.closingQuestion}"
              </blockquote>

              {/* 3 Action Lines for the 30-Day Plan */}
              <div className="mt-5 space-y-2.5">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-[#1351b4]/50 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#fbbf24] text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    01
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action1}
                      placeholder="01 ________________________________ (1ª prioridade)"
                      onChange={(e) => setAction1(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#2684ff]/40 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#fbbf24] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-100 font-semibold flex-1 truncate">
                      {action1 || '01 ________________________________'}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-[#1351b4]/50 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#fbbf24] text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    02
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action2}
                      placeholder="02 ________________________________ (2ª prioridade)"
                      onChange={(e) => setAction2(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#2684ff]/40 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#fbbf24] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-100 font-semibold flex-1 truncate">
                      {action2 || '02 ________________________________'}
                    </p>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-[#1351b4]/50 flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#fbbf24] text-slate-950 font-black text-xs flex items-center justify-center flex-shrink-0">
                    03
                  </span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={action3}
                      placeholder="03 ________________________________ (3ª prioridade)"
                      onChange={(e) => setAction3(e.target.value)}
                      className="flex-1 bg-transparent border-b border-[#2684ff]/40 text-white text-xs sm:text-sm font-semibold focus:outline-none focus:border-[#fbbf24] placeholder:text-slate-500 px-1 py-0.5"
                    />
                  ) : (
                    <p className="text-xs sm:text-sm text-slate-100 font-semibold flex-1 truncate">
                      {action3 || '03 ________________________________'}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Final Closing Takeaway Banner */}
            <div className="mt-5 pt-4 border-t border-[#1351b4]/40 flex items-center justify-between gap-3">
              <p className="text-sm sm:text-base font-extrabold text-[#fbbf24]">
                "{slide.closingTakeaway}"
              </p>
              <span className="text-emerald-300 font-bold text-xs flex items-center gap-1.5 flex-shrink-0 bg-emerald-950/60 px-3 py-1 rounded-lg border border-emerald-500/40">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                Consultoria Sebrae
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

