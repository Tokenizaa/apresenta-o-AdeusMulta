import React from 'react';
import { motion } from 'motion/react';
import { ConsultingNote } from '../../types/consultingNotes';
import {
  CheckCircle2,
  Circle,
  Edit2,
  Trash2,
  Copy,
  ChevronUp,
  ChevronDown,
  ArrowRight,
  Calendar,
  User,
  Info,
  AlertCircle
} from 'lucide-react';

interface NoteCardProps {
  note: ConsultingNote;
  index: number;
  totalNotes: number;
  onEdit: (note: ConsultingNote) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onDuplicate: (note: ConsultingNote) => void;
  onMoveUp: (index: number) => void;
  onMoveDown: (index: number) => void;
}

export const NoteCard: React.FC<NoteCardProps> = ({
  note,
  index,
  totalNotes,
  onEdit,
  onDelete,
  onToggleComplete,
  onDuplicate,
  onMoveUp,
  onMoveDown,
}) => {
  const displayCategory =
    note.category === 'Outros' && note.customCategory
      ? note.customCategory
      : note.category;

  // Category specific color accent badges
  const getCategoryBadgeClass = (cat: string) => {
    switch (cat) {
      case 'Produto':
      case 'Tecnologia':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40';
      case 'Modelo de negócio':
      case 'Vendas':
      case 'Financeiro':
        return 'bg-amber-950/80 text-[#fbbf24] border-amber-500/40';
      case 'Sebrae':
      case 'Gestão':
      case 'Parcerias':
        return 'bg-[#0c326f] text-[#2684ff] border-[#2684ff]/40';
      case 'Ideias':
        return 'bg-purple-950/80 text-purple-300 border-purple-500/40';
      case 'Jurídico':
        return 'bg-indigo-950/80 text-indigo-300 border-indigo-500/40';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getPriorityBadge = (p: string) => {
    if (p === 'Alta') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#fbbf24] text-slate-950 shadow-sm">
          <AlertCircle className="w-3 h-3 stroke-[2.5]" />
          Alta
        </span>
      );
    }
    if (p === 'Média') {
      return (
        <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#2684ff] text-white">
          Média
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
        Baixa
      </span>
    );
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25 }}
      className={`rounded-2xl p-4 sm:p-5 transition-all duration-200 border relative ${
        note.completed
          ? 'bg-slate-900/60 border-slate-800/80 opacity-75'
          : 'bg-gradient-to-br from-[#0c326f]/90 via-[#071d41]/95 to-[#030d1d]/95 border-[#1351b4] shadow-lg hover:border-[#2684ff]'
      }`}
    >
      {/* Top Header Row: Category Badge + Priority + Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800/70">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md border ${getCategoryBadgeClass(
              note.category
            )}`}
          >
            {displayCategory}
          </span>

          <div className="flex items-center gap-1.5 text-xs text-slate-300">
            <span className="text-[11px] text-slate-400">Prioridade:</span>
            {getPriorityBadge(note.priority)}
          </div>
        </div>

        {/* Action icons bar */}
        <div className="flex items-center gap-1">
          {/* Reorder Up/Down */}
          <button
            onClick={() => onMoveUp(index)}
            disabled={index === 0}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            title="Mover para cima"
          >
            <ChevronUp className="w-4 h-4" />
          </button>
          <button
            onClick={() => onMoveDown(index)}
            disabled={index === totalNotes - 1}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors"
            title="Mover para baixo"
          >
            <ChevronDown className="w-4 h-4" />
          </button>

          <div className="w-px h-3.5 bg-slate-700 mx-1" />

          {/* Duplicate */}
          <button
            onClick={() => onDuplicate(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#fbbf24] hover:bg-slate-800 transition-all"
            title="Duplicar anotação"
          >
            <Copy className="w-3.5 h-3.5" />
          </button>

          {/* Edit */}
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-[#2684ff] hover:bg-slate-800 transition-all"
            title="Editar anotação"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>

          {/* Delete */}
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/40 transition-all"
            title="Excluir anotação"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Reading Area (High Contrast White / Off-White Card) */}
      <div className="my-2">
        <p
          className={`text-sm sm:text-base font-semibold leading-relaxed ${
            note.completed
              ? 'line-through text-slate-400'
              : 'text-white'
          }`}
        >
          "{note.content}"
        </p>
      </div>

      {/* Details Row: Próximo Passo, Prazo, Responsável, Observações */}
      <div className="mt-3.5 pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-12 gap-2.5 text-xs">
        {/* Próximo Passo (Highlighted with Green) */}
        {note.nextStep && (
          <div className="sm:col-span-12 flex items-start gap-2 bg-emerald-950/40 border border-emerald-500/30 rounded-xl px-3 py-2 text-emerald-200">
            <ArrowRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-emerald-400 uppercase text-[10px] tracking-wider block">
                Próximo passo:
              </span>
              <span className="font-semibold text-emerald-100">{note.nextStep}</span>
            </div>
          </div>
        )}

        {/* Responsible */}
        {note.assignee && (
          <div className="sm:col-span-6 flex items-center gap-1.5 text-slate-300">
            <User className="w-3.5 h-3.5 text-[#2684ff]" />
            <span className="text-slate-400">Responsável:</span>
            <span className="font-bold text-white">{note.assignee}</span>
          </div>
        )}

        {/* Deadline */}
        {note.deadline && (
          <div className="sm:col-span-6 flex items-center gap-1.5 text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span className="text-slate-400">Prazo:</span>
            <span className="font-bold text-[#fbbf24]">{note.deadline}</span>
          </div>
        )}

        {/* Observações */}
        {note.notes && (
          <div className="sm:col-span-12 flex items-start gap-1.5 text-slate-300 pt-1 text-[11px]">
            <Info className="w-3.5 h-3.5 text-slate-400 flex-shrink-0 mt-0.5" />
            <span className="italic text-slate-300">{note.notes}</span>
          </div>
        )}
      </div>

      {/* Card Action Footer: Quick [Editar] [Concluir] [Excluir] bar */}
      <div className="mt-3 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => onToggleComplete(note.id)}
          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
            note.completed
              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
              : 'bg-slate-900 text-slate-300 hover:text-emerald-300 hover:bg-slate-800 border border-slate-700'
          }`}
        >
          {note.completed ? (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Concluído</span>
            </>
          ) : (
            <>
              <Circle className="w-3.5 h-3.5 text-slate-400" />
              <span>Marcar como concluído</span>
            </>
          )}
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(note)}
            className="text-xs font-semibold text-slate-400 hover:text-white px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800 transition-colors"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="text-xs font-semibold text-red-400 hover:text-red-300 px-2.5 py-1 rounded bg-red-950/20 hover:bg-red-950/50 border border-red-900/30 transition-colors"
          >
            Excluir
          </button>
        </div>
      </div>
    </motion.div>
  );
};
