import React, { useState } from 'react';
import { BusinessMetric } from '../../types/businessEvolution';
import {
  BarChart3,
  Plus,
  TrendingUp,
  TrendingDown,
  Minus,
  Edit2,
  Trash2
} from 'lucide-react';

interface TabMetricsProps {
  metrics: BusinessMetric[];
  onAddMetric: (metric: Omit<BusinessMetric, 'id'>) => void;
  onDeleteMetric: (id: string) => void;
}

export const TabMetrics: React.FC<TabMetricsProps> = ({
  metrics,
  onAddMetric,
  onDeleteMetric,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState<
    'Clientes' | 'Financeiro' | 'Marketing' | 'Operações' | 'Vendas' | 'Outros'
  >('Vendas');
  const [currentVal, setCurrentVal] = useState('');
  const [targetVal, setTargetVal] = useState('');
  const [unit, setUnit] = useState('%');
  const [trend, setTrend] = useState<'up' | 'down' | 'neutral'>('up');
  const [period, setPeriod] = useState('Mensal');
  const [notes, setNotes] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMetric({
      name: name.trim(),
      category,
      currentValue: currentVal.trim(),
      targetValue: targetVal.trim(),
      unit: unit.trim(),
      trend,
      period: period.trim(),
      notes: notes.trim(),
    });

    setName('');
    setCurrentVal('');
    setTargetVal('');
    setNotes('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart3 className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Gestão por Indicadores (KPIs)
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Painel de Indicadores do Negócio
            </h3>
            <p className="text-xs text-slate-300">
              Monitore métricas de clientes, vendas, finanças, marketing e produtividade de forma contínua.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Novo Indicador</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.id}
            className="p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] hover:border-[#2684ff] shadow-lg text-white space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-950 border border-slate-700 text-[#2684ff]">
                  {metric.category}
                </span>

                <div className="flex items-center gap-1">
                  <span
                    className={`flex items-center gap-0.5 text-xs font-black ${
                      metric.trend === 'up'
                        ? 'text-emerald-400'
                        : metric.trend === 'down'
                        ? 'text-amber-400'
                        : 'text-slate-400'
                    }`}
                  >
                    {metric.trend === 'up' && <TrendingUp className="w-3.5 h-3.5" />}
                    {metric.trend === 'down' && <TrendingDown className="w-3.5 h-3.5" />}
                    {metric.trend === 'neutral' && <Minus className="w-3.5 h-3.5" />}
                    <span className="text-[10px] uppercase">{metric.trend}</span>
                  </span>

                  <button
                    onClick={() => onDeleteMetric(metric.id)}
                    className="p-1 rounded text-slate-400 hover:text-red-400 ml-1"
                    title="Excluir indicador"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h4 className="text-sm font-bold text-white">
                {metric.name}
              </h4>
            </div>

            {/* Current vs Target values */}
            <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-1 text-center">
              <span className="text-2xl sm:text-3xl font-black text-white block">
                {metric.currentValue}
              </span>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
                <span>Alvo: <strong className="text-emerald-400">{metric.targetValue}</strong></span>
                <span>•</span>
                <span>{metric.period}</span>
              </div>
            </div>

            {metric.notes && (
              <p className="text-[11px] text-slate-300 italic pt-1 border-t border-slate-800">
                Nota: {metric.notes}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Modal: Add Metric */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Cadastrar Novo Indicador
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Nome do Indicador
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Custo de Aquisição de Clientes (CAC)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(
                        e.target.value as
                          | 'Clientes'
                          | 'Financeiro'
                          | 'Marketing'
                          | 'Operações'
                          | 'Vendas'
                          | 'Outros'
                      )
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Clientes">Clientes</option>
                    <option value="Vendas">Vendas</option>
                    <option value="Financeiro">Financeiro</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Operações">Operações</option>
                    <option value="Outros">Outros</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Tendência Esperada
                  </label>
                  <select
                    value={trend}
                    onChange={(e) =>
                      setTrend(e.target.value as 'up' | 'down' | 'neutral')
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="up">Alta (Crescimento)</option>
                    <option value="down">Baixa (Redução de custo/tempo)</option>
                    <option value="neutral">Estabilidade</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Atual
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: R$ 14,50 ou 28%"
                    value={currentVal}
                    onChange={(e) => setCurrentVal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Valor Alvo
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: R$ 9,00 ou 35%"
                    value={targetVal}
                    onChange={(e) => setTargetVal(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Período / Periodicidade
                </label>
                <input
                  type="text"
                  placeholder="Ex: Mensal, Por recurso, Diário"
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Notas Explicativas
                </label>
                <input
                  type="text"
                  placeholder="Detalhes sobre a fonte do dado..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
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
                  Salvar Indicador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
