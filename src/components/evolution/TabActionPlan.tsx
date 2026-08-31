import React, { useState } from 'react';
import {
  KanbanCard,
  BusinessGoal,
  BusinessPlanSection,
} from '../../types/businessEvolution';
import {
  CheckSquare,
  Plus,
  Target,
  User,
  Calendar,
  HelpCircle,
  Award,
  Edit2,
  Trash2,
  FileSpreadsheet,
  ArrowRight,
  Filter
} from 'lucide-react';

interface TabActionPlanProps {
  cards: KanbanCard[];
  goals: BusinessGoal[];
  planSections: BusinessPlanSection[];
  onNewAction: () => void;
  onEditAction: (card: KanbanCard) => void;
  onDeleteAction: (cardId: string) => void;
}

export const TabActionPlan: React.FC<TabActionPlanProps> = ({
  cards,
  goals,
  planSections,
  onNewAction,
  onEditAction,
  onDeleteAction,
}) => {
  const [filterColumn, setFilterColumn] = useState<string>('todos');
  const [filterPriority, setFilterPriority] = useState<string>('todos');

  const filteredCards = cards.filter((c) => {
    const matchesCol = filterColumn === 'todos' || c.columnId === filterColumn;
    const matchesPrio = filterPriority === 'todos' || c.priority === filterPriority;
    return matchesCol && matchesPrio;
  });

  return (
    <div className="space-y-4">
      {/* Header Banner: 5W2H Methodology */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CheckSquare className="w-4 h-4 text-[#10b981]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Metodologia 5W2H de Execução
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Plano de Ação Estruturado
            </h3>
            <p className="text-xs text-slate-300">
              Transformando as recomendações da consultoria em ações com responsável, prazo, justificativa e métrica de sucesso.
            </p>
          </div>

          <button
            onClick={onNewAction}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Nova Ação 5W2H</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#071d41]/80 border border-[#1351b4]/40">
        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="font-bold text-slate-400">Status:</span>
          <select
            value={filterColumn}
            onChange={(e) => setFilterColumn(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
          >
            <option value="todos">Todos os Status</option>
            <option value="ideias">Ideias</option>
            <option value="planejado">Planejado</option>
            <option value="em_andamento">Em andamento</option>
            <option value="aguardando">Aguardando</option>
            <option value="concluido">Concluído</option>
            <option value="validado">Validado</option>
          </select>

          <span className="font-bold text-slate-400 ml-2">Prioridade:</span>
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none"
          >
            <option value="todos">Todas</option>
            <option value="Alta">Alta</option>
            <option value="Média">Média</option>
            <option value="Baixa">Baixa</option>
          </select>
        </div>

        <span className="text-xs text-slate-400 font-bold">
          {filteredCards.length} ações listadas
        </span>
      </div>

      {/* 5W2H Action Cards Table / Grid */}
      <div className="space-y-3">
        {filteredCards.map((card) => {
          const relatedGoal = goals.find((g) => g.id === card.relatedGoalId);
          const relatedSection = planSections.find((s) => s.id === card.relatedPlanSectionId);

          return (
            <div
              key={card.id}
              className="p-4 sm:p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] hover:border-[#2684ff] shadow-md transition-all space-y-3 text-white"
            >
              {/* Card Header: Title, Priority, Status & Action buttons */}
              <div className="flex flex-wrap items-start justify-between gap-2 pb-2.5 border-b border-slate-800">
                <div className="space-y-1 max-w-3xl">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                        card.priority === 'Alta'
                          ? 'bg-[#fbbf24] text-slate-950'
                          : card.priority === 'Média'
                          ? 'bg-[#2684ff] text-white'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      Prioridade {card.priority}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                      Status: {card.columnId.replace('_', ' ')}
                    </span>
                    {relatedGoal && (
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>Meta: {relatedGoal.title}</span>
                      </span>
                    )}
                  </div>

                  <h4 className="text-base font-black text-white">
                    {card.title}
                  </h4>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onEditAction(card)}
                    className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1 border border-slate-700"
                  >
                    <Edit2 className="w-3 h-3 text-[#2684ff]" />
                    <span>Editar 5W2H</span>
                  </button>
                  <button
                    onClick={() => onDeleteAction(card.id)}
                    className="p-1.5 rounded-xl bg-slate-900 hover:bg-red-950/60 text-slate-400 hover:text-red-400 border border-slate-800"
                    title="Excluir ação"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 5W2H Matrix Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                {/* O QUE & POR QUE */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    1. O Que & Por Que (What & Why)
                  </span>
                  <p className="text-slate-200 font-medium leading-relaxed">
                    {card.description}
                  </p>
                  {card.whyReason && (
                    <p className="text-[11px] text-amber-300/90 italic pt-1 border-t border-slate-900">
                      Motivo: {card.whyReason}
                    </p>
                  )}
                </div>

                {/* QUEM & QUANDO */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    2. Quem & Quando (Who & When)
                  </span>
                  <div className="space-y-1 text-slate-200 font-medium">
                    <p className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#2684ff]" />
                      <span>{card.assignee}</span>
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#fbbf24]" />
                      <span>Prazo: {card.deadline}</span>
                    </p>
                  </div>
                </div>

                {/* COMO SABEREMOS QUE DEU CERTO */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    3. Resultado Esperado
                  </span>
                  <p className="text-emerald-300 font-medium leading-relaxed">
                    {card.targetResult || 'Critério de validação a definir'}
                  </p>
                  {card.actualResult && (
                    <p className="text-[11px] text-cyan-300 pt-1 border-t border-slate-900">
                      Alcançado: {card.actualResult}
                    </p>
                  )}
                </div>

                {/* VÍNCULO & DOCUMENTOS */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    4. Vínculo Estratégico
                  </span>
                  <div className="text-[11px] space-y-1">
                    {relatedSection ? (
                      <p className="text-[#2684ff]">
                        {relatedSection.title}
                      </p>
                    ) : (
                      <p className="text-slate-400">Sem seção vinculada</p>
                    )}
                    {card.documents.length > 0 && (
                      <p className="text-slate-300 truncate">
                        Doc: {card.documents.join(', ')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
