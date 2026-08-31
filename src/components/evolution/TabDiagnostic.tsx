import React, { useState } from 'react';
import {
  DiagnosticItem,
  DiagnosticCategory,
  KanbanCard,
} from '../../types/businessEvolution';
import {
  Activity,
  Plus,
  ShieldAlert,
  Sparkles,
  AlertTriangle,
  Flame,
  ArrowRight,
  CheckCircle2,
  Trash2,
  CheckSquare
} from 'lucide-react';

interface TabDiagnosticProps {
  diagnostics: DiagnosticItem[];
  cards: KanbanCard[];
  onAddDiagnostic: (item: Omit<DiagnosticItem, 'id' | 'createdAt'>) => void;
  onDeleteDiagnostic: (id: string) => void;
  onGenerateActionFromDiagnostic: (diag: DiagnosticItem) => void;
}

export const TabDiagnostic: React.FC<TabDiagnosticProps> = ({
  diagnostics,
  cards,
  onAddDiagnostic,
  onDeleteDiagnostic,
  onGenerateActionFromDiagnostic,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedCat, setSelectedCat] = useState<DiagnosticCategory>('problemas');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImpact, setNewImpact] = useState<'Alto' | 'Médio' | 'Baixo'>('Alto');

  const categories: {
    id: DiagnosticCategory;
    title: string;
    subtitle: string;
    badgeClass: string;
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    {
      id: 'pontos_fortes',
      title: 'Pontos Fortes',
      subtitle: 'Vantagens competitivas e competências já construídas',
      badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      icon: Sparkles,
    },
    {
      id: 'pontos_atencao',
      title: 'Pontos de Atenção',
      subtitle: 'Aspectos operacionais ou jurídicos que exigem cuidado',
      badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
      icon: AlertTriangle,
    },
    {
      id: 'problemas',
      title: 'Problemas',
      subtitle: 'Gargalos reais e hipóteses ainda não validadas',
      badgeClass: 'bg-red-950/80 text-red-300 border-red-500/40',
      icon: Flame,
    },
    {
      id: 'oportunidades',
      title: 'Oportunidades',
      subtitle: 'Potenciais de mercado, parcerias e novos canais',
      badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      icon: Activity,
    },
    {
      id: 'riscos',
      title: 'Riscos',
      subtitle: 'Fatores externos ou regulatórios que podem afetar o negócio',
      badgeClass: 'bg-orange-950/80 text-orange-300 border-orange-500/40',
      icon: ShieldAlert,
    },
    {
      id: 'prioridades',
      title: 'Prioridades',
      subtitle: 'Onde o foco e os recursos devem estar concentrados agora',
      badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
      icon: CheckSquare,
    },
  ];

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddDiagnostic({
      category: selectedCat,
      title: newTitle.trim(),
      description: newDesc.trim(),
      impact: newImpact,
    });

    setNewTitle('');
    setNewDesc('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-5">
      {/* Header Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Diagnóstico Estratégico do Negócio
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Matriz de Diagnóstico & Geração de Ações
            </h3>
            <p className="text-xs text-slate-300">
              Cada ponto identificado na consultoria pode gerar diretamente uma ação no Kanban e ser vinculado a uma meta.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Novo Item de Diagnóstico</span>
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const items = diagnostics.filter((d) => d.category === cat.id);

          return (
            <div
              key={cat.id}
              className="flex flex-col rounded-3xl bg-[#071d41]/80 border border-[#1351b4]/50 p-4 shadow-lg space-y-3"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <div className={`p-1.5 rounded-xl border ${cat.badgeClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider">
                      {cat.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[170px]">
                      {cat.subtitle}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-900 border border-slate-700 text-slate-300">
                  {items.length}
                </span>
              </div>

              {/* Items List */}
              <div className="space-y-2.5 flex-1">
                {items.length === 0 ? (
                  <div className="py-6 text-center border border-dashed border-slate-800 rounded-2xl">
                    <span className="text-[11px] text-slate-400 block">
                      Nenhum item cadastrado
                    </span>
                  </div>
                ) : (
                  items.map((item) => {
                    const generatedCard = cards.find(
                      (c) => c.id === item.generatedActionId
                    );

                    return (
                      <div
                        key={item.id}
                        className="p-3 rounded-2xl bg-gradient-to-b from-[#0c326f] to-[#071d41] border border-[#1351b4] hover:border-[#2684ff] shadow-sm space-y-2 text-white"
                      >
                        <div className="flex items-start justify-between gap-1">
                          <span
                            className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                              item.impact === 'Alto'
                                ? 'bg-[#fbbf24] text-slate-950'
                                : 'bg-[#2684ff] text-white'
                            }`}
                          >
                            Impacto {item.impact}
                          </span>

                          <button
                            onClick={() => onDeleteDiagnostic(item.id)}
                            className="p-1 text-slate-400 hover:text-red-400 transition-colors"
                            title="Excluir item"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>

                        <h5 className="text-xs font-bold text-white leading-snug">
                          {item.title}
                        </h5>

                        {item.description && (
                          <p className="text-[11px] text-slate-300 leading-relaxed">
                            {item.description}
                          </p>
                        )}

                        {/* Action Link or Generate Action Button */}
                        <div className="pt-2 border-t border-[#1351b4]/40">
                          {generatedCard ? (
                            <div className="flex items-center gap-1 text-[10px] text-emerald-300 font-bold bg-emerald-950/60 p-1.5 rounded-xl border border-emerald-500/30">
                              <CheckCircle2 className="w-3 h-3 text-[#10b981] flex-shrink-0" />
                              <span className="truncate">
                                Ação: {generatedCard.title}
                              </span>
                            </div>
                          ) : (
                            <button
                              onClick={() => onGenerateActionFromDiagnostic(item)}
                              className="w-full py-1 px-2 rounded-xl bg-[#1351b4] hover:bg-[#2684ff] text-[10px] font-black text-white flex items-center justify-center gap-1 shadow-sm transition-all"
                            >
                              <span>Gerar Ação no Kanban</span>
                              <ArrowRight className="w-3 h-3 text-[#fbbf24]" />
                            </button>
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

      {/* Modal: Add Diagnostic Item */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Novo Item de Diagnóstico
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Categoria
                </label>
                <select
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value as DiagnosticCategory)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                >
                  <option value="pontos_fortes">Pontos Fortes</option>
                  <option value="pontos_atencao">Pontos de Atenção</option>
                  <option value="problemas">Problemas</option>
                  <option value="oportunidades">Oportunidades</option>
                  <option value="riscos">Riscos</option>
                  <option value="prioridades">Prioridades</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Título / Constatação
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Aquisição de clientes ainda não validada"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Descrição & Contexto
                </label>
                <textarea
                  rows={3}
                  placeholder="Detalhes adicionais sobre o impacto no negócio..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Grau de Impacto
                </label>
                <select
                  value={newImpact}
                  onChange={(e) => setNewImpact(e.target.value as 'Alto' | 'Médio' | 'Baixo')}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                >
                  <option value="Alto">Alto</option>
                  <option value="Médio">Médio</option>
                  <option value="Baixo">Baixo</option>
                </select>
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
                  Salvar Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
