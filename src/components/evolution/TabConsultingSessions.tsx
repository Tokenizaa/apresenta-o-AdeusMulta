import React, { useState } from 'react';
import {
  ConsultingSession,
  KanbanCard,
  BusinessGoal,
} from '../../types/businessEvolution';
import {
  Users,
  Plus,
  Calendar,
  Award,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ArrowRight,
  FileSpreadsheet,
  Target,
  FileText,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TabConsultingSessionsProps {
  sessions: ConsultingSession[];
  cards: KanbanCard[];
  goals: BusinessGoal[];
  onAddSession: (session: Omit<ConsultingSession, 'id'>) => void;
  onNavigateToCard: (card: KanbanCard) => void;
}

export const TabConsultingSessions: React.FC<TabConsultingSessionsProps> = ({
  sessions,
  cards,
  goals,
  onAddSession,
  onNavigateToCard,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [expandedSessionId, setExpandedSessionId] = useState<string>(
    sessions[0]?.id || ''
  );

  // New Session Form State
  const [date, setDate] = useState(new Date().toLocaleDateString('pt-BR'));
  const [consultant, setConsultant] = useState('Consultora Sebrae');
  const [role, setRole] = useState('Especialista em Gestão e Startups');
  const [subject, setSubject] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [recommendationsText, setRecommendationsText] = useState('');
  const [decisionsText, setDecisionsText] = useState('');
  const [nextStepsText, setNextStepsText] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim()) return;

    const recommendations = recommendationsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const decisions = decisionsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const nextSteps = nextStepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddSession({
      date,
      consultant: consultant.trim() || 'Consultor Sebrae',
      consultantRole: role.trim() || 'Consultoria Sebrae',
      subject: subject.trim(),
      diagnosisSummary: diagnosis.trim(),
      recommendations,
      decisions,
      generatedActionIds: [],
      relatedGoalIds: [],
      documents: ['Ata_Consultoria.pdf'],
      nextSteps,
      evolutionSinceLast: {
        completedTasks: ['Revisão das ações do ciclo anterior'],
        delayedTasks: [],
        achievedGoals: [],
        pendingGoals: [],
        keyChanges: decisions,
        pendingDecisions: [],
      },
    });

    setSubject('');
    setDiagnosis('');
    setRecommendationsText('');
    setDecisionsText('');
    setNextStepsText('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Ciclos de Atendimento Sebrae
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Histórico & Atas das Consultorias
            </h3>
            <p className="text-xs text-slate-300">
              Cada sessão registra diagnósticos, decisões estratégicas, tarefas geradas e a evolução acumulada desde o último encontro.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Registrar Nova Consultoria</span>
          </button>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-4">
        {sessions.map((sess) => {
          const isExpanded = expandedSessionId === sess.id;
          const generatedCards = cards.filter((c) =>
            sess.generatedActionIds.includes(c.id)
          );
          const linkedGoals = goals.filter((g) =>
            sess.relatedGoalIds.includes(g.id)
          );

          return (
            <div
              key={sess.id}
              className="rounded-3xl bg-[#071d41]/90 border border-[#1351b4] shadow-xl text-white overflow-hidden transition-all"
            >
              {/* Session Header Card */}
              <div
                onClick={() =>
                  setExpandedSessionId(isExpanded ? '' : sess.id)
                }
                className="p-5 cursor-pointer hover:bg-[#0c326f]/50 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-black text-slate-950 bg-[#fbbf24] px-2.5 py-0.5 rounded-full">
                      {sess.date}
                    </span>
                    <span className="text-xs text-slate-300 font-bold">
                      Consultor: <strong className="text-white">{sess.consultant}</strong> ({sess.consultantRole})
                    </span>
                  </div>
                  <h4 className="text-base font-black text-white">
                    {sess.subject}
                  </h4>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-xs text-[#2684ff] font-bold">
                    {isExpanded ? 'Recolher detalhes' : 'Ver ata completa'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-300" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-300" />
                  )}
                </div>
              </div>

              {/* Session Body Details */}
              {isExpanded && (
                <div className="p-5 space-y-4 text-xs">
                  {/* Diagnosis & Recommendations */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-[#fbbf24] uppercase tracking-wider block">
                        Diagnóstico do Encontro
                      </span>
                      <p className="text-slate-200 leading-relaxed">
                        {sess.diagnosisSummary}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                        Recomendações Oficiais do Sebrae
                      </span>
                      <ul className="space-y-1.5 text-slate-200">
                        {sess.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-400 font-bold">•</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* "Desde a última consultoria" Framework */}
                  <div className="p-4 rounded-2xl bg-[#0c326f]/40 border border-[#2684ff]/40 space-y-3">
                    <span className="text-xs font-black uppercase tracking-wider text-slate-200 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#10b981]" />
                      <span>Painel "Desde a Última Consultoria" (Evolução Acumulada)</span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                        <span className="text-[11px] font-bold text-emerald-300">
                          Tarefas Concluídas ({sess.evolutionSinceLast.completedTasks.length})
                        </span>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          {sess.evolutionSinceLast.completedTasks.map((t, idx) => (
                            <li key={idx}>✓ {t}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                        <span className="text-[11px] font-bold text-[#2684ff]">
                          Metas & Mudanças Chave
                        </span>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          {sess.evolutionSinceLast.keyChanges.map((k, idx) => (
                            <li key={idx}>• {k}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-3 rounded-xl bg-slate-950/90 border border-slate-800 space-y-1">
                        <span className="text-[11px] font-bold text-amber-300">
                          Decisões Pendentes
                        </span>
                        <ul className="space-y-1 text-slate-300 text-[11px]">
                          {sess.evolutionSinceLast.pendingDecisions.length > 0 ? (
                            sess.evolutionSinceLast.pendingDecisions.map((p, idx) => (
                              <li key={idx}>? {p}</li>
                            ))
                          ) : (
                            <li className="text-slate-500 italic">Nenhuma pendência crítica</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Actions Generated & Next Steps */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-[#2684ff] uppercase tracking-wider block">
                        Ações Geradas para o Kanban ({generatedCards.length})
                      </span>
                      {generatedCards.length === 0 ? (
                        <span className="text-slate-400 italic">
                          Ações sincronizadas no quadro geral.
                        </span>
                      ) : (
                        <div className="space-y-1">
                          {generatedCards.map((c) => (
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
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block">
                        Próximos Passos Imediatos
                      </span>
                      <ul className="space-y-1 text-slate-200">
                        {sess.nextSteps.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-cyan-400 font-bold">→</span>
                            <span>{step}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal: Add Session */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-base font-black text-white">
              Registrar Atendimento / Consultoria Sebrae
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Data
                  </label>
                  <input
                    type="text"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Consultor(a)
                  </label>
                  <input
                    type="text"
                    required
                    value={consultant}
                    onChange={(e) => setConsultant(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Tema / Assunto Principal
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Validação de precificação e plano de 30 dias"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Diagnóstico e Pontos Analisados
                </label>
                <textarea
                  rows={2}
                  placeholder="Resumo do que foi diagnosticado..."
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Recomendações do Consultor (uma por linha)
                </label>
                <textarea
                  rows={3}
                  placeholder="Recomendação 1&#10;Recomendação 2"
                  value={recommendationsText}
                  onChange={(e) => setRecommendationsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Decisões Estratégicas Tomadas (uma por linha)
                </label>
                <textarea
                  rows={2}
                  placeholder="Decisão 1&#10;Decisão 2"
                  value={decisionsText}
                  onChange={(e) => setDecisionsText(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Próximos Passos
                </label>
                <textarea
                  rows={2}
                  placeholder="Passo 1&#10;Passo 2"
                  value={nextStepsText}
                  onChange={(e) => setNextStepsText(e.target.value)}
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
                  Salvar Atendimento
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
