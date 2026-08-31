import React from 'react';
import { motion } from 'motion/react';
import {
  KanbanCard,
  BusinessGoal,
  BusinessMetric,
  DiagnosticItem,
  ConsultingSession,
  BusinessTab,
} from '../../types/businessEvolution';
import {
  TrendingUp,
  Target,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Sparkles,
  Users,
  Calendar,
  Layers,
  ChevronRight,
  Award
} from 'lucide-react';

interface TabOverviewProps {
  cards: KanbanCard[];
  goals: BusinessGoal[];
  metrics: BusinessMetric[];
  diagnostics: DiagnosticItem[];
  latestConsulting?: ConsultingSession;
  onNavigateTab: (tab: BusinessTab) => void;
  onSelectCard: (card: KanbanCard) => void;
  onSelectGoal: (goal: BusinessGoal) => void;
}

export const TabOverview: React.FC<TabOverviewProps> = ({
  cards,
  goals,
  metrics,
  diagnostics,
  latestConsulting,
  onNavigateTab,
  onSelectCard,
  onSelectGoal,
}) => {
  const pendingCards = cards.filter(
    (c) => c.columnId !== 'concluido' && c.columnId !== 'validado'
  );
  const inProgressCards = cards.filter((c) => c.columnId === 'em_andamento');
  const completedCards = cards.filter(
    (c) => c.columnId === 'concluido' || c.columnId === 'validado'
  );
  const highPriorityCards = pendingCards.filter((c) => c.priority === 'Alta');

  const activeGoals = goals.filter((g) => g.status !== 'Alcançada');
  const achievedGoals = goals.filter((g) => g.status === 'Alcançada');

  const topProblems = diagnostics.filter((d) => d.category === 'problemas' || d.category === 'riscos');
  const topPriorities = diagnostics.filter((d) => d.category === 'prioridades');

  return (
    <div className="space-y-5">
      {/* Top Banner: Current Business Situation & Status */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-[#1351b4]/40">
          <div className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
              Situação Atual do Negócio
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-[#2684ff]" />
            <span>Fase: <strong>Validação de Tração Comercial & Piloto de 30 Dias</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-8 space-y-2">
            <h3 className="text-lg sm:text-xl font-black text-white leading-snug">
              Adeus Multa: Defesa Administrativa de Trânsito com Rigor Técnico e IA
            </h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              O motor de conferência de inconsistências materiais do CTB está pronto e validado. O foco estratégico atual é validar a máquina de aquisição com 20 motoristas de aplicativo e estruturar o plano financeiro no modelo oficial do Sebrae.
            </p>
          </div>

          <div className="md:col-span-4 grid grid-cols-2 gap-2.5">
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-[#1351b4]/50 text-center">
              <span className="text-[11px] text-slate-400 font-bold block">Progresso Geral</span>
              <span className="text-2xl font-black text-[#10b981]">65%</span>
              <span className="text-[10px] text-slate-400 block">Metas em curso</span>
            </div>
            <div className="p-3 rounded-2xl bg-slate-950/80 border border-[#1351b4]/50 text-center">
              <span className="text-[11px] text-slate-400 font-bold block">Ações Ativas</span>
              <span className="text-2xl font-black text-[#fbbf24]">{pendingCards.length}</span>
              <span className="text-[10px] text-slate-400 block">{highPriorityCards.length} prioritárias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Since Last Consulting Session (Evolução desde a última consultoria) */}
      {latestConsulting && (
        <div className="p-5 rounded-3xl bg-gradient-to-br from-[#071d41] to-[#030d1d] border border-[#2684ff]/40 shadow-lg text-white">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3 pb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-[#fbbf24]" />
              <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-200">
                Evolução Desde a Última Consultoria ({latestConsulting.date})
              </h4>
            </div>
            <button
              onClick={() => onNavigateTab('consultorias')}
              className="text-xs font-bold text-[#2684ff] hover:text-[#00b0ff] flex items-center gap-1 transition-colors"
            >
              <span>Ver ata e recomendações</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Concluído */}
            <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Ações Finalizadas</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-200">
                {latestConsulting.evolutionSinceLast.completedTasks.map((t, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold">•</span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Metas em Andamento */}
            <div className="p-3 rounded-2xl bg-blue-950/40 border border-blue-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#2684ff] mb-1.5">
                <Target className="w-3.5 h-3.5" />
                <span>Metas em Andamento</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-200">
                {latestConsulting.evolutionSinceLast.pendingGoals.map((g, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#2684ff] font-bold">•</span>
                    <span>{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Decisões e Próximos Passos */}
            <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-500/30">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#fbbf24] mb-1.5">
                <Award className="w-3.5 h-3.5" />
                <span>Decisões Chave</span>
              </div>
              <ul className="space-y-1 text-xs text-slate-200">
                {latestConsulting.evolutionSinceLast.keyChanges.map((k, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-[#fbbf24] font-bold">•</span>
                    <span>{k}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Grid: Active Goals + Priority Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left (lg:col-span-7): Priority Tasks & Actions in Progress */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#fbbf24]" />
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Próximos Passos & Ações Prioritárias ({pendingCards.length})
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('kanban')}
              className="text-xs font-bold text-[#2684ff] hover:text-[#00b0ff] flex items-center gap-1"
            >
              <span>Abrir Kanban</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {pendingCards.slice(0, 4).map((card) => (
              <div
                key={card.id}
                onClick={() => onSelectCard(card)}
                className="p-4 rounded-2xl bg-gradient-to-r from-[#0c326f]/90 to-[#071d41]/90 border border-[#1351b4] hover:border-[#2684ff] transition-all cursor-pointer shadow-md flex items-start justify-between gap-3"
              >
                <div className="space-y-1.5 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        card.priority === 'Alta'
                          ? 'bg-[#fbbf24] text-slate-950 font-black'
                          : 'bg-[#2684ff] text-white'
                      }`}
                    >
                      {card.priority}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Prazo: <strong className="text-white">{card.deadline}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      Resp: <strong className="text-white">{card.assignee}</strong>
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white leading-snug">
                    {card.title}
                  </h4>

                  {card.targetResult && (
                    <p className="text-xs text-emerald-300 font-medium flex items-center gap-1">
                      <ArrowRight className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                      <span>{card.targetResult}</span>
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-slate-300">
                    {card.columnId.replace('_', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right (lg:col-span-5): Metas & Key Business Metrics */}
        <div className="lg:col-span-5 space-y-4">
          {/* Metas em Curso */}
          <div className="p-4 sm:p-5 rounded-3xl bg-[#071d41]/80 border border-[#1351b4]/50 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-[#10b981]" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Metas Estratégicas ({goals.length})
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('metas')}
                className="text-xs font-bold text-[#2684ff] hover:text-[#00b0ff]"
              >
                Gerenciar
              </button>
            </div>

            <div className="space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => onSelectGoal(goal)}
                  className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/40 transition-all cursor-pointer space-y-2"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white truncate pr-2">
                      {goal.title}
                    </span>
                    <span className="text-xs font-black text-[#10b981]">
                      {goal.progress}%
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#10b981] to-[#059669] rounded-full transition-all duration-500"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>
                      Atual: <strong className="text-white">{goal.currentValue} {goal.unit}</strong> / Alvo: <strong className="text-white">{goal.targetValue} {goal.unit}</strong>
                    </span>
                    <span>Prazo: {goal.deadline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Metrics Glance */}
          <div className="p-4 rounded-3xl bg-[#071d41]/80 border border-[#1351b4]/50 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#fbbf24]" />
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-wider text-white">
                  Indicadores-Chave
                </h3>
              </div>
              <button
                onClick={() => onNavigateTab('indicadores')}
                className="text-xs font-bold text-[#2684ff] hover:text-[#00b0ff]"
              >
                Ver todos
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {metrics.slice(0, 4).map((metric) => (
                <div
                  key={metric.id}
                  className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-center"
                >
                  <span className="text-[10px] text-slate-400 truncate block">
                    {metric.name}
                  </span>
                  <span className="text-base font-black text-white">
                    {metric.currentValue}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    Alvo: {metric.targetValue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
