import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import {
  ConsultingNote,
  NoteCategory,
  NotePriority,
  PRESET_CATEGORIES,
} from '../../types/consultingNotes';
import { X, Check, Tag, Calendar, User, ArrowRight, AlertCircle } from 'lucide-react';

interface NoteEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Omit<ConsultingNote, 'id' | 'createdAt'> & { id?: string }) => void;
  initialNote?: ConsultingNote | null;
}

export const NoteEditorModal: React.FC<NoteEditorModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialNote,
}) => {
  const [category, setCategory] = useState<NoteCategory>('Produto');
  const [customCategory, setCustomCategory] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState<NotePriority>('Alta');
  const [nextStep, setNextStep] = useState('');
  const [assignee, setAssignee] = useState('');
  const [deadline, setDeadline] = useState('');
  const [notes, setNotes] = useState('');
  const [completed, setCompleted] = useState(false);

  const contentInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialNote) {
      setCategory(initialNote.category);
      setCustomCategory(initialNote.customCategory || '');
      setContent(initialNote.content);
      setPriority(initialNote.priority);
      setNextStep(initialNote.nextStep || '');
      setAssignee(initialNote.assignee || '');
      setDeadline(initialNote.deadline || '');
      setNotes(initialNote.notes || '');
      setCompleted(initialNote.completed);
    } else {
      setCategory('Produto');
      setCustomCategory('');
      setContent('');
      setPriority('Alta');
      setNextStep('');
      setAssignee('');
      setDeadline('');
      setNotes('');
      setCompleted(false);
    }

    if (isOpen) {
      setTimeout(() => {
        contentInputRef.current?.focus();
      }, 100);
    }
  }, [initialNote, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onSave({
      ...(initialNote?.id ? { id: initialNote.id } : {}),
      category,
      customCategory: category === 'Outros' ? customCategory.trim() : undefined,
      content: content.trim(),
      priority,
      nextStep: nextStep.trim() || undefined,
      assignee: assignee.trim() || undefined,
      deadline: deadline.trim() || undefined,
      notes: notes.trim() || undefined,
      completed,
    });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm"
      onKeyDown={handleKeyDown}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#10b981] rounded-3xl p-6 sm:p-7 shadow-2xl text-white relative max-h-[90vh] flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1351b4]/40">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-lg bg-[#10b981] text-slate-950 font-black text-xs uppercase tracking-wider">
              {initialNote ? 'Editar Registro' : '+ Nova Anotação'}
            </span>
            <span className="text-xs text-slate-300 font-medium">
              Consultoria Sebrae
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto space-y-4 py-4 pr-1">
          {/* Category & Priority Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Category Select */}
            <div className="sm:col-span-7">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] block mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Categoria *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as NoteCategory)}
                className="w-full bg-slate-900 border border-[#1351b4] rounded-xl px-3.5 py-2 text-sm text-white focus:outline-none focus:border-[#10b981] font-semibold"
              >
                {PRESET_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>

              {/* If "Outros", show custom category text input */}
              {category === 'Outros' && (
                <input
                  type="text"
                  placeholder="Especifique a categoria..."
                  value={customCategory}
                  onChange={(e) => setCustomCategory(e.target.value)}
                  className="mt-2 w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981]"
                />
              )}
            </div>

            {/* Priority Selector */}
            <div className="sm:col-span-5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#fbbf24] block mb-1.5 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Prioridade *
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {(['Alta', 'Média', 'Baixa'] as NotePriority[]).map((p) => {
                  const isSelected = priority === p;
                  let activeClass = '';
                  if (p === 'Alta') {
                    activeClass = isSelected
                      ? 'bg-[#fbbf24] text-slate-950 font-black shadow-md'
                      : 'bg-slate-900 text-amber-300 border-amber-500/30';
                  } else if (p === 'Média') {
                    activeClass = isSelected
                      ? 'bg-[#2684ff] text-white font-black shadow-md'
                      : 'bg-slate-900 text-blue-300 border-blue-500/30';
                  } else {
                    activeClass = isSelected
                      ? 'bg-slate-300 text-slate-950 font-black shadow-md'
                      : 'bg-slate-900 text-slate-400 border-slate-700';
                  }

                  return (
                    <button
                      type="button"
                      key={p}
                      onClick={() => setPriority(p)}
                      className={`py-2 rounded-xl text-xs font-bold border transition-all ${activeClass}`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Annotation / Content */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-200 block mb-1.5">
              Anotação / Ideia / Sugestão *
            </label>
            <textarea
              ref={contentInputRef}
              required
              rows={3}
              placeholder="Ex: Validar se devemos oferecer análise gratuita antes da contratação..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-slate-950 border border-[#1351b4] rounded-2xl p-3.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981] font-medium leading-relaxed"
            />
          </div>

          {/* Next Step & Responsible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1.5 flex items-center gap-1.5">
                <ArrowRight className="w-3.5 h-3.5" />
                Próximo Passo
              </label>
              <input
                type="text"
                placeholder="Ex: Testar no próximo grupo de usuários"
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-[#2684ff]" />
                Responsável
              </label>
              <input
                type="text"
                placeholder="Ex: Fundadores / Produto / Comercial"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981]"
              />
            </div>
          </div>

          {/* Deadline & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-300 block mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                Prazo Estimado
              </label>
              <input
                type="text"
                placeholder="Ex: 05/09/2026 ou 7 dias"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981]"
              />
            </div>

            <div className="flex items-center gap-3 pt-6">
              <label className="flex items-center gap-2.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={completed}
                  onChange={(e) => setCompleted(e.target.checked)}
                  className="w-4 h-4 rounded text-[#10b981] bg-slate-900 border-slate-700 focus:ring-0 focus:outline-none"
                />
                <span className="text-xs font-bold text-slate-200">
                  Marcar como concluído
                </span>
              </label>
            </div>
          </div>

          {/* Additional Notes / Observações */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
              Observações Adicionais
            </label>
            <textarea
              rows={2}
              placeholder="Comentários da consultora, riscos ou contexto..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-[#10b981]"
            />
          </div>

          {/* Action buttons footer */}
          <div className="flex items-center justify-between pt-4 border-t border-[#1351b4]/40 mt-4">
            <span className="text-[11px] text-slate-400">
              Dica: Pressione <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[#fbbf24]">Ctrl + Enter</kbd> para salvar rápido.
            </span>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-300 font-bold transition-all"
              >
                Cancelar
              </button>

              <button
                type="submit"
                disabled={!content.trim()}
                className="px-6 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-[#10b981]/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>{initialNote ? 'Salvar Alterações' : 'Adicionar Anotação'}</span>
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
