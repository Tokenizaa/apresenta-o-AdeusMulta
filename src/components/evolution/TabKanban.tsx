import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  KanbanCard,
  KanbanColumnId,
  PriorityLevel,
  BusinessGoal,
  BusinessPlanSection,
} from '../../types/businessEvolution';
import { KANBAN_COLUMNS } from '../../data/initialBusinessEvolutionData';
import {
  Plus,
  MoreVertical,
  CheckCircle2,
  Clock,
  User,
  Target,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Layers,
  FileSpreadsheet,
  CheckSquare,
  MessageSquare,
  Paperclip,
  Trash2,
  Edit2
} from 'lucide-react';

interface TabKanbanProps {
  cards: KanbanCard[];
  goals: BusinessGoal[];
  planSections: BusinessPlanSection[];
  onAddCard: (columnId: KanbanColumnId) => void;
  onEditCard: (card: KanbanCard) => void;
  onDeleteCard: (cardId: string) => void;
  onMoveCard: (cardId: string, targetColumn: KanbanColumnId) => void;
  onToggleChecklistItem: (cardId: string, itemId: string) => void;
}

export const TabKanban: React.FC<TabKanbanProps> = ({
  cards,
  goals,
  planSections,
  onAddCard,
  onEditCard,
  onDeleteCard,
  onMoveCard,
  onToggleChecklistItem,
}) => {
  const [filterPriority, setFilterPriority] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredCards = cards.filter((card) => {
    const matchesPriority =
      filterPriority === 'todos' || card.priority === filterPriority;
    const matchesSearch =
      card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.assignee.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesPriority && matchesSearch;
  });

  const getColumnCards = (columnId: KanbanColumnId) =>
    filteredCards.filter((c) => c.columnId === columnId);

  const getNextColumn = (current: KanbanColumnId): KanbanColumnId | null => {
    const order: KanbanColumnId[] = [
      'ideias',
      'planejado',
      'em_andamento',
      'aguardando',
      'concluido',
      'validado',
    ];
    const idx = order.indexOf(current);
    return idx < order.length - 1 ? order[idx + 1] : null;
  };

  const getPrevColumn = (current: KanbanColumnId): KanbanColumnId | null => {
    const order: KanbanColumnId[] = [
      'ideias',
      'planejado',
      'em_andamento',
      'aguardando',
      'concluido',
      'validado',
    ];
    const idx = order.indexOf(current);
    return idx > 0 ? order[idx - 1] : null;
  };

  return (
    <div className="space-y-4">
      {/* Kanban Filter & Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#071d41]/90 border border-[#1351b4]/40">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-bold text-slate-300">Filtros:</span>
          <div className="flex items-center gap-1">
            {['todos', 'Alta', 'Média', 'Baixa'].map((p) => (
              <button
                key={p}
                onClick={() => setFilterPriority(p)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  filterPriority === p
                    ? 'bg-[#2684ff] text-white'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {p === 'todos' ? 'Todas Prioridades' : p}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Buscar tarefas, responsáveis..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2684ff] w-48 sm:w-64"
          />
          <button
            onClick={() => onAddCard('planejado')}
            className="px-3 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1 shadow-md transition-all"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Novo Cartão</span>
          </button>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-3.5 overflow-x-auto pb-4">
        {KANBAN_COLUMNS.map((col) => {
          const colCards = getColumnCards(col.id);

          return (
            <div
              key={col.id}
              className="flex flex-col rounded-3xl bg-[#071d41]/70 border border-[#1351b4]/40 p-3 min-w-[280px] sm:min-w-[290px] xl:min-w-0 shadow-lg"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: col.color }}
                  />
                  <h3 className="text-xs font-black text-white uppercase tracking-wider">
                    {col.title}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 border border-slate-700 text-slate-300">
                    {colCards.length}
                  </span>
                </div>

                <button
                  onClick={() => onAddCard(col.id)}
                  title={`Adicionar cartão em ${col.title}`}
                  className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Column Cards List */}
              <div className="flex-1 space-y-2.5 overflow-y-auto max-h-[calc(100vh-340px)] pr-1">
                {colCards.length === 0 ? (
                  <div className="py-8 text-center border-2 border-dashed border-slate-800/80 rounded-2xl p-3">
                    <span className="text-[11px] text-slate-400 block mb-1">
                      Nenhuma ação aqui
                    </span>
                    <button
                      onClick={() => onAddCard(col.id)}
                      className="text-[11px] text-[#2684ff] font-bold hover:underline"
                    >
                      + Criar primeiro
                    </button>
                  </div>
                ) : (
                  colCards.map((card) => {
                    const completedChecks = card.checklist.filter((c) => c.completed).length;
                    const totalChecks = card.checklist.length;
                    const prevCol = getPrevColumn(card.columnId);
                    const nextCol = getNextColumn(card.columnId);
                    const relatedGoal = goals.find((g) => g.id === card.relatedGoalId);
                    const relatedSection = planSections.find((s) => s.id === card.relatedPlanSectionId);

                    return (
                      <div
                        key={card.id}
                        className="p-3.5 rounded-2xl bg-gradient-to-b from-[#0c326f] to-[#071d41] border border-[#1351b4] hover:border-[#2684ff] transition-all shadow-md space-y-2.5 group"
                      >
                        {/* Badges: Priority + Related tags */}
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                              card.priority === 'Alta'
                                ? 'bg-[#fbbf24] text-slate-950'
                                : card.priority === 'Média'
                                ? 'bg-[#2684ff] text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {card.priority}
                          </span>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => onEditCard(card)}
                              className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white"
                              title="Editar / Ver Detalhes 5W2H"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => onDeleteCard(card.id)}
                              className="p-1 rounded hover:bg-red-950/60 text-slate-400 hover:text-red-400"
                              title="Excluir"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                        {/* Card Title & Description */}
                        <div onClick={() => onEditCard(card)} className="cursor-pointer space-y-1">
                          <h4 className="text-xs font-bold text-white leading-tight hover:text-[#fbbf24] transition-colors">
                            {card.title}
                          </h4>
                          <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                            {card.description}
                          </p>
                        </div>

                        {/* Related Goal or Business Plan Section Tags */}
                        {(relatedGoal || relatedSection) && (
                          <div className="flex flex-wrap gap-1 pt-1 border-t border-[#1351b4]/30">
                            {relatedGoal && (
                              <span className="text-[9px] font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <Target className="w-2.5 h-2.5" />
                                <span className="truncate max-w-[120px]">{relatedGoal.title}</span>
                              </span>
                            )}
                            {relatedSection && (
                              <span className="text-[9px] font-bold text-[#2684ff] bg-blue-950/70 border border-blue-500/30 px-1.5 py-0.5 rounded flex items-center gap-1">
                                <FileSpreadsheet className="w-2.5 h-2.5" />
                                <span className="truncate max-w-[100px]">{relatedSection.title.split('.')[1] || relatedSection.title}</span>
                              </span>
                            )}
                          </div>
                        )}

                        {/* Checklist Progress if items exist */}
                        {totalChecks > 0 && (
                          <div className="space-y-1 pt-1">
                            <div className="flex items-center justify-between text-[10px] text-slate-400">
                              <span className="flex items-center gap-1">
                                <CheckSquare className="w-3 h-3 text-[#10b981]" />
                                Checklist ({completedChecks}/{totalChecks})
                              </span>
                              <span className="font-bold text-slate-300">
                                {Math.round((completedChecks / totalChecks) * 100)}%
                              </span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#10b981] rounded-full transition-all"
                                style={{ width: `${(completedChecks / totalChecks) * 100}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Assignee and Deadline Footer */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#1351b4]/30 text-[10px] text-slate-400">
                          <span className="flex items-center gap-1 truncate max-w-[110px]" title={card.assignee}>
                            <User className="w-3 h-3 text-[#2684ff]" />
                            <span className="truncate text-slate-300">{card.assignee}</span>
                          </span>

                          <span className="flex items-center gap-1" title="Prazo">
                            <Calendar className="w-3 h-3 text-[#fbbf24]" />
                            <span className="text-slate-300">{card.deadline}</span>
                          </span>
                        </div>

                        {/* Column Shift Buttons */}
                        <div className="flex items-center justify-between pt-1 border-t border-[#1351b4]/40">
                          {prevCol ? (
                            <button
                              onClick={() => onMoveCard(card.id, prevCol)}
                              className="text-[10px] font-bold text-slate-400 hover:text-white flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-slate-900 hover:bg-slate-800"
                              title={`Mover para ${prevCol.replace('_', ' ')}`}
                            >
                              <ArrowLeft className="w-3 h-3" />
                              <span>Voltar</span>
                            </button>
                          ) : (
                            <div />
                          )}

                          {nextCol ? (
                            <button
                              onClick={() => onMoveCard(card.id, nextCol)}
                              className="text-[10px] font-bold text-[#10b981] hover:text-emerald-300 flex items-center gap-0.5 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 hover:bg-emerald-900/80"
                              title={`Avançar para ${nextCol.replace('_', ' ')}`}
                            >
                              <span>Avançar</span>
                              <ArrowRight className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] font-bold text-cyan-400 flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              Validado
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
