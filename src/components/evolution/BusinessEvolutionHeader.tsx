import React from 'react';
import { motion } from 'motion/react';
import { BusinessTab } from '../../types/businessEvolution';
import {
  LayoutDashboard,
  Kanban,
  CheckSquare,
  Activity,
  FileSpreadsheet,
  Target,
  BarChart3,
  Users,
  History,
  FolderOpen,
  Plus,
  FileDown,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

interface BusinessEvolutionHeaderProps {
  activeTab: BusinessTab;
  onSelectTab: (tab: BusinessTab) => void;
  onNewAction: () => void;
  onNewGoal: () => void;
  onExport: () => void;
  totalCards: number;
  activeGoalsCount: number;
  completedTasksCount: number;
}

export const BusinessEvolutionHeader: React.FC<BusinessEvolutionHeaderProps> = ({
  activeTab,
  onSelectTab,
  onNewAction,
  onNewGoal,
  onExport,
  totalCards,
  activeGoalsCount,
  completedTasksCount,
}) => {
  const tabs: { id: BusinessTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'visao_geral', label: 'Visão Geral', icon: LayoutDashboard },
    { id: 'kanban', label: 'Kanban', icon: Kanban },
    { id: 'plano_acao', label: 'Plano de Ação', icon: CheckSquare },
    { id: 'diagnostico', label: 'Diagnóstico', icon: Activity },
    { id: 'plano_negocio', label: 'Plano de Negócio', icon: FileSpreadsheet },
    { id: 'metas', label: 'Metas', icon: Target },
    { id: 'indicadores', label: 'Indicadores', icon: BarChart3 },
    { id: 'consultorias', label: 'Consultorias', icon: Users },
    { id: 'historico', label: 'Histórico', icon: History },
    { id: 'documentos', label: 'Documentos', icon: FolderOpen },
  ];

  return (
    <div className="w-full mb-5 space-y-3">
      {/* Top Bar: Title, Sebrae Official Badge & Global Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 text-xs font-black tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#2684ff] border border-[#2684ff]/40 shadow-sm">
              ETAPA 05 • ACOMPANHAMENTO DO NEGÓCIO
            </span>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Metodologia Oficial Sebrae
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mt-1">
            Sistema de Acompanhamento e Evolução do Negócio
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 font-normal">
            Transformando a consultoria do Sebrae em diagnóstico, metas, plano de ação contínuo e evolução mensurável.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onExport}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-[#2684ff] text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
            title="Exportar relatório completo da evolução"
          >
            <FileDown className="w-3.5 h-3.5 text-[#fbbf24]" />
            <span>Exportar Relatório</span>
          </button>

          <button
            onClick={onNewGoal}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-[#2684ff]/50 hover:bg-[#0c326f]/60 text-xs font-bold text-[#2684ff] hover:text-white flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Target className="w-3.5 h-3.5" />
            <span>+ Nova Meta</span>
          </button>

          <button
            onClick={onNewAction}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Nova Ação (5W2H)</span>
          </button>
        </div>
      </div>

      {/* Navigation Tabs Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-[#1351b4]/40 scrollbar-thin">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-[#1351b4] text-white shadow-md border border-[#2684ff] ring-1 ring-[#2684ff]/30'
                  : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#fbbf24]' : 'text-slate-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
