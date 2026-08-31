import React, { useState } from 'react';
import {
  KanbanCard,
  KanbanColumnId,
  PriorityLevel,
  BusinessGoal,
  BusinessPlanSection,
} from '../../types/businessEvolution';
import { KANBAN_COLUMNS } from '../../data/initialBusinessEvolutionData';
import {
  X,
  CheckSquare,
  User,
  Calendar,
  Target,
  FileSpreadsheet,
  MessageSquare,
  Paperclip,
  Trash2,
  Plus,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface CardModalProps {
  card: KanbanCard;
  goals: BusinessGoal[];
  planSections: BusinessPlanSection[];
  onSave: (updated: KanbanCard) => void;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const CardModal: React.FC<CardModalProps> = ({
  card,
  goals,
  planSections,
  onSave,
  onDelete,
  onClose,
}) => {
  const [columnId, setColumnId] = useState<KanbanColumnId>(card.columnId);
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [whyReason, setWhyReason] = useState(card.whyReason || '');
  const [assignee, setAssignee] = useState(card.assignee);
  const [deadline, setDeadline] = useState(card.deadline);
  const [priority, setPriority] = useState<PriorityLevel>(card.priority);
  const [targetResult, setTargetResult] = useState(card.targetResult || '');
  const [actualResult, setActualResult] = useState(card.actualResult || '');
  const [relatedGoalId, setRelatedGoalId] = useState(card.relatedGoalId || '');
  const [relatedPlanSectionId, setRelatedPlanSectionId] = useState(
    card.relatedPlanSectionId || ''
  );

  // Checklist state
  const [checklist, setChecklist] = useState(card.checklist || []);
  const [newCheckItem, setNewCheckItem] = useState('');

  // Comments state
  const [comments, setComments] = useState(card.comments || []);
  const [newCommentAuthor, setNewCommentAuthor] = useState('Consultora Sebrae');
  const [newCommentText, setNewCommentText] = useState('');

  const handleAddChecklist = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCheckItem.trim()) return;

    setChecklist([
      ...checklist,
      { id: `chk-${Date.now()}`, text: newCheckItem.trim(), completed: false },
    ]);
    setNewCheckItem('');
  };

  const handleToggleCheck = (id: string) => {
    setChecklist(
      checklist.map((c) =>
        c.id === id ? { ...c, completed: !c.completed } : c
      )
    );
  };

  const handleRemoveCheck = (id: string) => {
    setChecklist(checklist.filter((c) => c.id !== id));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    setComments([
      ...comments,
      {
        id: `com-${Date.now()}`,
        author: newCommentAuthor.trim() || 'Equipe',
        text: newCommentText.trim(),
        createdAt: Date.now(),
      },
    ]);
    setNewCommentText('');
  };

  const handleSaveAll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSave({
      ...card,
      columnId,
      title: title.trim(),
      description: description.trim(),
      whyReason: whyReason.trim(),
      assignee: assignee.trim() || 'Responsável',
      deadline: deadline.trim() || '30 dias',
      priority,
      targetResult: targetResult.trim(),
      actualResult: actualResult.trim(),
      relatedGoalId: relatedGoalId || undefined,
      relatedPlanSectionId: relatedPlanSectionId || undefined,
      checklist,
      comments,
      updatedAt: Date.now(),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-2xl my-8 p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-[#fbbf24] block">
              Cartão Kanban & Matriz 5W2H
            </span>
            <h3 className="text-lg font-black text-white">
              {card.id ? 'Editar Ação Estratégica' : 'Nova Ação'}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveAll} className="space-y-4 text-xs">
          {/* Status Column & Priority row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Coluna do Kanban
              </label>
              <select
                value={columnId}
                onChange={(e) => setColumnId(e.target.value as KanbanColumnId)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
              >
                {KANBAN_COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.subtitle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as PriorityLevel)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              >
                <option value="Alta">Alta</option>
                <option value="Média">Média</option>
                <option value="Baixa">Baixa</option>
              </select>
            </div>
          </div>

          {/* Title (O Que) */}
          <div>
            <label className="font-bold text-slate-300 block mb-1">
              O Que Será Feito? (Título da Ação)
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex: Realizar teste comercial com 20 motoristas"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white font-bold focus:outline-none focus:border-[#2684ff]"
            />
          </div>

          {/* Description & Why (Por Que) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Descrição Detalhada (How / Scope)
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalhes operacionais de como será executada..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Por Que Será Feito? (Justificativa Estratégica)
              </label>
              <textarea
                rows={3}
                value={whyReason}
                onChange={(e) => setWhyReason(e.target.value)}
                placeholder="Por que essa ação é prioritária para o negócio..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Assignee (Quem) & Deadline (Quando) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Quem Fará? (Responsável)
              </label>
              <input
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                placeholder="Ex: Equipe Comercial / Fundador"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Quando Será Feito? (Prazo Limite)
              </label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="Ex: 10/09/2026 ou 15 dias"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              />
            </div>
          </div>

          {/* Target Result vs Actual Result (Como saberemos que deu certo) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-emerald-300 block mb-1">
                Como Saberemos Que Deu Certo? (Resultado Esperado)
              </label>
              <input
                type="text"
                value={targetResult}
                onChange={(e) => setTargetResult(e.target.value)}
                placeholder="Ex: Pelo menos 6 contratações pagas (30% conversão)"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="font-bold text-cyan-300 block mb-1">
                Resultado Alcançado (Após Validação)
              </label>
              <input
                type="text"
                value={actualResult}
                onChange={(e) => setActualResult(e.target.value)}
                placeholder="Ex: 8 contatados, 3 recursos gerados"
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Strategic Linkage: Related Goal & Related Business Plan Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 border-t border-slate-800">
            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Vincular a uma Meta Estratégica
              </label>
              <select
                value={relatedGoalId}
                onChange={(e) => setRelatedGoalId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              >
                <option value="">Nenhuma meta vinculada</option>
                {goals.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.title} ({g.progress}%)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">
                Vincular a Seção do Plano de Negócio
              </label>
              <select
                value={relatedPlanSectionId}
                onChange={(e) => setRelatedPlanSectionId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
              >
                <option value="">Nenhuma seção vinculada</option>
                {planSections.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.officialSebraeCode} - {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Checklist Section */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
              Checklist de Etapas ({checklist.filter((c) => c.completed).length}/{checklist.length})
            </span>

            <div className="space-y-1.5">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-2 p-1.5 rounded-lg bg-slate-900 border border-slate-800"
                >
                  <label className="flex items-center gap-2 cursor-pointer text-slate-200">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => handleToggleCheck(item.id)}
                      className="rounded accent-emerald-500"
                    />
                    <span className={item.completed ? 'line-through text-slate-400' : ''}>
                      {item.text}
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleRemoveCheck(item.id)}
                    className="text-slate-400 hover:text-red-400 px-1 font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              <input
                type="text"
                placeholder="+ Adicionar item ao checklist..."
                value={newCheckItem}
                onChange={(e) => setNewCheckItem(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none"
              />
              <button
                type="button"
                onClick={handleAddChecklist}
                className="px-3 py-1.5 rounded-xl bg-[#2684ff] text-white font-bold"
              >
                Add
              </button>
            </div>
          </div>

          {/* Comments & History Section */}
          <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <span className="font-bold text-slate-300 uppercase tracking-wider text-[11px] block">
              Comentários & Histórico da Ação ({comments.length})
            </span>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {comments.map((com) => (
                <div
                  key={com.id}
                  className="p-2 rounded-xl bg-slate-900 border border-slate-800 space-y-1"
                >
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <strong className="text-[#fbbf24]">{com.author}</strong>
                    <span>{new Date(com.createdAt).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <p className="text-slate-200">{com.text}</p>
                </div>
              ))}
            </div>

            <div className="space-y-1.5 pt-1">
              <input
                type="text"
                placeholder="Seu nome ou papel (Ex: Consultora Sebrae, Fundador)..."
                value={newCommentAuthor}
                onChange={(e) => setNewCommentAuthor(e.target.value)}
                className="w-full px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 focus:outline-none"
              />
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Escreva um comentário ou apontamento..."
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  className="flex-1 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddComment}
                  className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold"
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-800">
            {card.id ? (
              <button
                type="button"
                onClick={() => {
                  onDelete(card.id);
                  onClose();
                }}
                className="px-3 py-2 rounded-xl bg-red-950/60 hover:bg-red-900 text-red-300 font-bold flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Excluir Ação</span>
              </button>
            ) : (
              <div />
            )}

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-black shadow-lg"
              >
                Salvar Ação
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
