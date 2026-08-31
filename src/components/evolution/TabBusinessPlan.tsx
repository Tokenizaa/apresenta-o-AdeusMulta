import React, { useState } from 'react';
import {
  BusinessPlanSection,
  KanbanCard,
  BusinessGoal,
} from '../../types/businessEvolution';
import {
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  FileText,
  Target,
  Plus,
  Edit2,
  ExternalLink,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';

interface TabBusinessPlanProps {
  sections: BusinessPlanSection[];
  cards: KanbanCard[];
  goals: BusinessGoal[];
  onUpdateSection: (updated: BusinessPlanSection) => void;
  onNavigateToCard: (card: KanbanCard) => void;
}

export const TabBusinessPlan: React.FC<TabBusinessPlanProps> = ({
  sections,
  cards,
  goals,
  onUpdateSection,
  onNavigateToCard,
}) => {
  const [selectedSectionId, setSelectedSectionId] = useState<string>(
    sections[0]?.id || 'sec-sumario'
  );
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState('');
  const [newPendingText, setNewPendingText] = useState('');

  const activeSection =
    sections.find((s) => s.id === selectedSectionId) || sections[0];

  const handleStartEdit = () => {
    setEditData(activeSection.filledData);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    onUpdateSection({
      ...activeSection,
      filledData: editData,
    });
    setIsEditing(false);
  };

  const handleAddPending = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPendingText.trim()) return;

    onUpdateSection({
      ...activeSection,
      pendingItems: [...activeSection.pendingItems, newPendingText.trim()],
    });
    setNewPendingText('');
  };

  const handleRemovePending = (idx: number) => {
    const updated = [...activeSection.pendingItems];
    updated.splice(idx, 1);
    onUpdateSection({
      ...activeSection,
      pendingItems: updated,
    });
  };

  return (
    <div className="space-y-4">
      {/* Official Sebrae Methodology Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] via-[#071d41] to-[#030d1d] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Estrutura Oficial de Plano de Negócios Sebrae
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Plano de Negócio Modular & Vivo
            </h3>
            <p className="text-xs text-slate-300">
              Metodologia padronizada pelo Sebrae Nacional (PNBOX / Manual de Elaboração), estruturada em 6 blocos integrados.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-emerald-500/30 text-xs font-bold text-emerald-300 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Fontes Oficiais Sebrae Homologadas</span>
          </div>
        </div>
      </div>

      {/* Main Container: Left Sections Menu & Right Section Detail View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        {/* Left (lg:col-span-4): Sections Navigator */}
        <div className="lg:col-span-4 space-y-2">
          <div className="p-3 rounded-2xl bg-[#071d41]/90 border border-[#1351b4]/40 text-xs font-bold text-slate-300 uppercase tracking-wider">
            Módulos do Plano de Negócio
          </div>

          <div className="space-y-2">
            {sections.map((section) => {
              const isSelected = section.id === activeSection.id;
              const relatedActionsCount = section.relatedActionIds.length;

              return (
                <div
                  key={section.id}
                  onClick={() => {
                    setSelectedSectionId(section.id);
                    setIsEditing(false);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer space-y-1.5 ${
                    isSelected
                      ? 'bg-[#1351b4] border-[#2684ff] shadow-lg ring-1 ring-[#2684ff]/30 text-white'
                      : 'bg-[#071d41]/80 hover:bg-[#0c326f]/70 border-[#1351b4]/40 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-slate-950/70 text-[#fbbf24] border border-[#fbbf24]/20">
                      {section.officialSebraeCode}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        section.currentStatus === 'Validado com Sebrae'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                          : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                      }`}
                    >
                      {section.currentStatus}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold leading-tight">
                    {section.title}
                  </h4>

                  <div className="flex items-center justify-between text-[10px] text-slate-300 pt-1">
                    <span>{section.pendingItems.length} pendências</span>
                    <span>{relatedActionsCount} ações vinculadas</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (lg:col-span-8): Active Section Workspace */}
        <div className="lg:col-span-8 p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] shadow-xl text-white space-y-4">
          {/* Section Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-[#fbbf24] uppercase tracking-wider">
                  {activeSection.officialSebraeCode}
                </span>
                <span className="text-xs text-slate-400">• {activeSection.sourceReference}</span>
              </div>
              <h3 className="text-lg font-black text-white">
                {activeSection.title}
              </h3>
              <p className="text-xs text-slate-300">{activeSection.subtitle}</p>
            </div>

            <div className="flex items-center gap-2">
              {isEditing ? (
                <button
                  onClick={handleSaveEdit}
                  className="px-3.5 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black shadow-md"
                >
                  Salvar Alterações
                </button>
              ) : (
                <button
                  onClick={handleStartEdit}
                  className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-white flex items-center gap-1.5"
                >
                  <Edit2 className="w-3.5 h-3.5 text-[#2684ff]" />
                  <span>Editar Conteúdo</span>
                </button>
              )}
            </div>
          </div>

          {/* Section Content & Editor */}
          <div className="space-y-2">
            <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-[#2684ff]" />
              <span>Informações Estruturadas</span>
            </h4>

            {isEditing ? (
              <textarea
                rows={8}
                value={editData}
                onChange={(e) => setEditData(e.target.value)}
                className="w-full p-3 rounded-2xl bg-slate-950 border border-slate-700 text-xs text-white leading-relaxed focus:outline-none focus:border-[#2684ff]"
              />
            ) : (
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs text-slate-200 whitespace-pre-line leading-relaxed font-sans">
                {activeSection.filledData}
              </div>
            )}
          </div>

          {/* Grid: Pending Items (Checklist) & Strategic Decisions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            {/* Pending Items Checklist */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                  Pendências & Lacunas ({activeSection.pendingItems.length})
                </span>
              </div>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeSection.pendingItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start justify-between gap-2 p-2 rounded-xl bg-slate-900/90 border border-slate-800"
                  >
                    <span>• {item}</span>
                    <button
                      onClick={() => handleRemovePending(idx)}
                      className="text-slate-400 hover:text-red-400 text-xs font-bold"
                      title="Remover"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>

              <form onSubmit={handleAddPending} className="flex gap-1.5 pt-1">
                <input
                  type="text"
                  placeholder="+ Adicionar pendência..."
                  value={newPendingText}
                  onChange={(e) => setNewPendingText(e.target.value)}
                  className="flex-1 px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-2.5 py-1 rounded-xl bg-[#2684ff] text-white text-xs font-bold"
                >
                  Add
                </button>
              </form>
            </div>

            {/* Decisions & Associated Actions */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2.5">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Decisões Validadas
              </span>

              <ul className="space-y-1.5 text-xs text-slate-300">
                {activeSection.decisions.map((dec, idx) => (
                  <li
                    key={idx}
                    className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-slate-200"
                  >
                    ✓ {dec}
                  </li>
                ))}
              </ul>

              {/* Related Actions from Kanban */}
              <div className="pt-2 border-t border-slate-900">
                <span className="text-[11px] font-bold text-slate-400 block mb-1">
                  Ações do Kanban Vinculadas:
                </span>
                <div className="space-y-1">
                  {cards
                    .filter((c) => activeSection.relatedActionIds.includes(c.id))
                    .map((c) => (
                      <div
                        key={c.id}
                        onClick={() => onNavigateToCard(c)}
                        className="p-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[11px] text-white flex items-center justify-between cursor-pointer"
                      >
                        <span className="truncate pr-2">{c.title}</span>
                        <span className="text-[9px] font-bold text-[#10b981]">
                          {c.columnId}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
