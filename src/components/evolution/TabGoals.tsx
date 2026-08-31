import React, { useState } from 'react';
import {
  BusinessGoal,
  KanbanCard,
} from '../../types/businessEvolution';
import {
  Target,
  Plus,
  CheckCircle2,
  Clock,
  User,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Edit2,
  Trash2
} from 'lucide-react';

interface TabGoalsProps {
  goals: BusinessGoal[];
  cards: KanbanCard[];
  onAddGoal: (goal: Omit<BusinessGoal, 'id'>) => void;
  onUpdateGoal: (goal: BusinessGoal) => void;
  onDeleteGoal: (id: string) => void;
  onSelectCard: (card: KanbanCard) => void;
}

export const TabGoals: React.FC<TabGoalsProps> = ({
  goals,
  cards,
  onAddGoal,
  onUpdateGoal,
  onDeleteGoal,
  onSelectCard,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<BusinessGoal | null>(null);

  // New Goal Form state
  const [title, setTitle] = useState('');
  const [indicator, setIndicator] = useState('');
  const [currentVal, setCurrentVal] = useState<number>(0);
  const [targetVal, setTargetVal] = useState<number>(100);
  const [unit, setUnit] = useState('clientes');
  const [deadline, setDeadline] = useState('30 dias');
  const [assignee, setAssignee] = useState('Equipe Fundadora');
  const [planSection, setPlanSection] = useState('Plano de Marketing & Comercial');

  const handleSaveNewGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const progress = targetVal > 0 ? Math.min(100, Math.round((currentVal / targetVal) * 100)) : 0;

    onAddGoal({
      title: title.trim(),
      indicator: indicator.trim() || 'Métrica de resultado',
      currentValue: currentVal,
      targetValue: targetVal,
      unit: unit.trim() || 'unid',
      deadline: deadline.trim() || '30 dias',
      assignee: assignee.trim() || 'Equipe',
      progress,
      relatedActionIds: [],
      relatedPlanSection: planSection,
      status: progress >= 100 ? 'Alcançada' : 'Em andamento',
    });

    setTitle('');
    setIndicator('');
    setCurrentVal(0);
    setTargetVal(100);
    setShowAddModal(false);
  };

  const handleSaveEditGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingGoal) return;

    const progress = editingGoal.targetValue > 0
      ? Math.min(100, Math.round((editingGoal.currentValue / editingGoal.targetValue) * 100))
      : 0;

    onUpdateGoal({
      ...editingGoal,
      progress,
      status: progress >= 100 ? 'Alcançada' : 'Em andamento',
    });

    setEditingGoal(null);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Target className="w-4 h-4 text-[#10b981]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Gestão por Metas & Resultados Chave (OKRs)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Metas Estratégicas do Negócio
            </h3>
            <p className="text-xs text-slate-300">
              Metas vinculadas diretamente ao plano de negócio e sustentadas pelas ações do Kanban.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Nova Meta</span>
          </button>
        </div>
      </div>

      {/* Goals List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {goals.map((goal) => {
          const linkedCards = cards.filter((c) => goal.relatedActionIds.includes(c.id));

          return (
            <div
              key={goal.id}
              className="p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] hover:border-[#2684ff] shadow-lg text-white space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      goal.status === 'Alcançada'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                        : 'bg-blue-950 text-blue-300 border border-blue-500/40'
                    }`}
                  >
                    {goal.status}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingGoal(goal)}
                      className="p-1 rounded text-slate-400 hover:text-white"
                      title="Editar meta"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDeleteGoal(goal.id)}
                      className="p-1 rounded text-slate-400 hover:text-red-400"
                      title="Excluir meta"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h4 className="text-sm font-black text-white leading-snug">
                  {goal.title}
                </h4>

                <p className="text-xs text-slate-300 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-[#fbbf24]" />
                  <span>Indicador: <strong>{goal.indicator}</strong></span>
                </p>
              </div>

              {/* Progress & Values */}
              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300">
                    Atual: <strong className="text-white">{goal.currentValue} {goal.unit}</strong>
                  </span>
                  <span className="text-slate-300">
                    Alvo: <strong className="text-emerald-400">{goal.targetValue} {goal.unit}</strong>
                  </span>
                  <span className="text-xs font-black text-[#10b981]">
                    {goal.progress}%
                  </span>
                </div>

                <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3 text-[#2684ff]" />
                    <span>{goal.assignee}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-[#fbbf24]" />
                    <span>{goal.deadline}</span>
                  </span>
                </div>
              </div>

              {/* Linked Actions */}
              <div className="pt-2 border-t border-slate-800 text-xs">
                <span className="text-[10px] font-bold text-slate-400 block mb-1">
                  Ações do Kanban Vinculadas ({linkedCards.length}):
                </span>
                {linkedCards.length === 0 ? (
                  <span className="text-[11px] text-slate-500 italic">
                    Nenhuma ação vinculada ainda
                  </span>
                ) : (
                  <div className="space-y-1">
                    {linkedCards.map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onSelectCard(c)}
                        className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-900 border border-slate-800 text-[11px] text-white flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate pr-1">{c.title}</span>
                        <span className="text-[9px] font-bold text-[#10b981]">
                          {c.columnId}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Add Goal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Nova Meta Estratégica
            </h3>

            <form onSubmit={handleSaveNewGoal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Descrição da Meta
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Validar demanda comercial com 20 clientes"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Indicador de Medição
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Recursos pagos gerados"
                  value={indicator}
                  onChange={(e) => setIndicator(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Atual
                  </label>
                  <input
                    type="number"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Alvo
                  </label>
                  <input
                    type="number"
                    value={targetVal}
                    onChange={(e) => setTargetVal(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Unidade
                  </label>
                  <input
                    type="text"
                    value={unit}
                    onChange={(e) => setUnit(e.target.value)}
                    placeholder="clientes, %"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Prazo
                  </label>
                  <input
                    type="text"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    placeholder="Ex: 30 dias"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Responsável
                  </label>
                  <input
                    type="text"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                    placeholder="Ex: Equipe Fundadora"
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-black"
                >
                  Criar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Edit Goal */}
      {editingGoal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Atualizar Progresso da Meta
            </h3>

            <form onSubmit={handleSaveEditGoal} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Título da Meta
                </label>
                <input
                  type="text"
                  value={editingGoal.title}
                  onChange={(e) =>
                    setEditingGoal({ ...editingGoal, title: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Atual ({editingGoal.unit})
                  </label>
                  <input
                    type="number"
                    value={editingGoal.currentValue}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        currentValue: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Alvo ({editingGoal.unit})
                  </label>
                  <input
                    type="number"
                    value={editingGoal.targetValue}
                    onChange={(e) =>
                      setEditingGoal({
                        ...editingGoal,
                        targetValue: Number(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingGoal(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-black"
                >
                  Salvar Progresso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
