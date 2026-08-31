import React from 'react';
import { ConsultingNote } from '../../types/consultingNotes';
import {
  Layers,
  Clock,
  ArrowRight,
  AlertTriangle,
  Lightbulb,
  CheckCircle2
} from 'lucide-react';

interface ConsultingSummaryBarProps {
  notes: ConsultingNote[];
}

export const ConsultingSummaryBar: React.FC<ConsultingSummaryBarProps> = ({ notes }) => {
  const totalNotes = notes.length;
  const pendingNotes = notes.filter((n) => !n.completed).length;
  const completedNotes = notes.filter((n) => n.completed).length;
  const nextStepsCount = notes.filter((n) => n.nextStep && n.nextStep.trim().length > 0).length;
  const highPriorityCount = notes.filter((n) => n.priority === 'Alta' && !n.completed).length;
  const ideasCount = notes.filter(
    (n) => n.category === 'Ideias' || n.category === 'Produto' || n.category === 'Modelo de negócio'
  ).length;

  return (
    <div className="rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#1351b4] shadow-xl text-white">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#1351b4]/40">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
          <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200">
            Resumo da Consultoria
          </h4>
        </div>
        <span className="text-[11px] text-slate-400 font-medium">
          Atualizado automaticamente
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
        {/* Total de Anotações */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-[#1351b4]/40 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
            <Layers className="w-3.5 h-3.5 text-[#2684ff]" />
            <span>Total</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-white">{totalNotes}</span>
          <span className="text-[10px] text-slate-400">anotações</span>
        </div>

        {/* Pendências */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-[#1351b4]/40 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Pendências</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-amber-300">{pendingNotes}</span>
          <span className="text-[10px] text-slate-400">{completedNotes} concluídas</span>
        </div>

        {/* Próximos Passos */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-[#1351b4]/40 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            <span>Próximos passos</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">{nextStepsCount}</span>
          <span className="text-[10px] text-slate-400">ações mapeadas</span>
        </div>

        {/* Itens Prioritários */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-[#1351b4]/40 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
            <AlertTriangle className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Prioritários</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-[#fbbf24]">{highPriorityCount}</span>
          <span className="text-[10px] text-slate-400">alta prioridade</span>
        </div>

        {/* Ideias Registradas */}
        <div className="p-2.5 rounded-xl bg-slate-950/70 border border-[#1351b4]/40 col-span-2 sm:col-span-1 flex flex-col items-center justify-center">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-0.5">
            <Lightbulb className="w-3.5 h-3.5 text-purple-400" />
            <span>Ideias & Modelo</span>
          </div>
          <span className="text-xl sm:text-2xl font-black text-purple-300">{ideasCount}</span>
          <span className="text-[10px] text-slate-400">insights</span>
        </div>
      </div>
    </div>
  );
};
