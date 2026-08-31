import React, { useState, useEffect } from 'react';
import {
  BusinessTab,
  KanbanCard,
  KanbanColumnId,
  DiagnosticItem,
  BusinessGoal,
  BusinessMetric,
  BusinessPlanSection,
  ConsultingSession,
  TimelineEvent,
  ProjectDocument,
} from '../../types/businessEvolution';
import {
  INITIAL_KANBAN_CARDS,
  INITIAL_DIAGNOSTIC_ITEMS,
  INITIAL_BUSINESS_GOALS,
  INITIAL_BUSINESS_METRICS,
  INITIAL_BUSINESS_PLAN_SECTIONS,
  INITIAL_CONSULTING_SESSIONS,
  INITIAL_TIMELINE_EVENTS,
  INITIAL_PROJECT_DOCUMENTS,
} from '../../data/initialBusinessEvolutionData';

import { BusinessEvolutionHeader } from './BusinessEvolutionHeader';
import { TabOverview } from './TabOverview';
import { TabKanban } from './TabKanban';
import { TabActionPlan } from './TabActionPlan';
import { TabDiagnostic } from './TabDiagnostic';
import { TabBusinessPlan } from './TabBusinessPlan';
import { TabGoals } from './TabGoals';
import { TabMetrics } from './TabMetrics';
import { TabConsultingSessions } from './TabConsultingSessions';
import { TabTimeline } from './TabTimeline';
import { TabDocuments } from './TabDocuments';
import { CardModal } from './CardModal';
import { ExportEvolutionModal } from './ExportEvolutionModal';

export const BusinessEvolutionWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<BusinessTab>('visao_geral');

  // Persistence in LocalStorage
  const [cards, setCards] = useState<KanbanCard[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_cards_v2');
      return saved ? JSON.parse(saved) : INITIAL_KANBAN_CARDS;
    } catch {
      return INITIAL_KANBAN_CARDS;
    }
  });

  const [diagnostics, setDiagnostics] = useState<DiagnosticItem[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_diagnostics_v2');
      return saved ? JSON.parse(saved) : INITIAL_DIAGNOSTIC_ITEMS;
    } catch {
      return INITIAL_DIAGNOSTIC_ITEMS;
    }
  });

  const [goals, setGoals] = useState<BusinessGoal[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_goals_v2');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_GOALS;
    } catch {
      return INITIAL_BUSINESS_GOALS;
    }
  });

  const [metrics, setMetrics] = useState<BusinessMetric[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_metrics_v2');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_METRICS;
    } catch {
      return INITIAL_BUSINESS_METRICS;
    }
  });

  const [sections, setSections] = useState<BusinessPlanSection[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_sections_v2');
      return saved ? JSON.parse(saved) : INITIAL_BUSINESS_PLAN_SECTIONS;
    } catch {
      return INITIAL_BUSINESS_PLAN_SECTIONS;
    }
  });

  const [sessions, setSessions] = useState<ConsultingSession[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_sessions_v2');
      return saved ? JSON.parse(saved) : INITIAL_CONSULTING_SESSIONS;
    } catch {
      return INITIAL_CONSULTING_SESSIONS;
    }
  });

  const [events, setEvents] = useState<TimelineEvent[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_events_v2');
      return saved ? JSON.parse(saved) : INITIAL_TIMELINE_EVENTS;
    } catch {
      return INITIAL_TIMELINE_EVENTS;
    }
  });

  const [documents, setDocuments] = useState<ProjectDocument[]>(() => {
    try {
      const saved = localStorage.getItem('sebrae_evolution_documents_v2');
      return saved ? JSON.parse(saved) : INITIAL_PROJECT_DOCUMENTS;
    } catch {
      return INITIAL_PROJECT_DOCUMENTS;
    }
  });

  // Save to LocalStorage effects
  useEffect(() => {
    localStorage.setItem('sebrae_evolution_cards_v2', JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_diagnostics_v2', JSON.stringify(diagnostics));
  }, [diagnostics]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_goals_v2', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_metrics_v2', JSON.stringify(metrics));
  }, [metrics]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_sections_v2', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_sessions_v2', JSON.stringify(sessions));
  }, [sessions]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_events_v2', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('sebrae_evolution_documents_v2', JSON.stringify(documents));
  }, [documents]);

  // Modal states
  const [activeEditingCard, setActiveEditingCard] = useState<KanbanCard | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);

  // Card Management Handlers
  const handleAddNewCard = (columnId: KanbanColumnId = 'planejado') => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      columnId,
      title: '',
      description: '',
      whyReason: '',
      assignee: 'Equipe Fundadora',
      deadline: '15 dias',
      priority: 'Alta',
      targetResult: '',
      checklist: [],
      comments: [],
      documents: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    setActiveEditingCard(newCard);
  };

  const handleSaveCard = (cardToSave: KanbanCard) => {
    const exists = cards.some((c) => c.id === cardToSave.id);
    let updatedCards: KanbanCard[];

    if (exists) {
      updatedCards = cards.map((c) =>
        c.id === cardToSave.id ? cardToSave : c
      );
    } else {
      updatedCards = [cardToSave, ...cards];
    }
    setCards(updatedCards);

    // If marked as 'concluido' or 'validado', add timeline event if not already present
    if (cardToSave.columnId === 'concluido' || cardToSave.columnId === 'validado') {
      setEvents((prev) => [
        {
          id: `evt-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          type: 'acao_concluida',
          title: `Ação Concluída: ${cardToSave.title}`,
          description: `Ação executada por ${cardToSave.assignee}. Resultado: ${cardToSave.actualResult || cardToSave.targetResult || 'Concluído'}`,
          author: cardToSave.assignee,
          badge: 'Execução',
        },
        ...prev,
      ]);
    }
  };

  const handleDeleteCard = (cardId: string) => {
    setCards((prev) => prev.filter((c) => c.id !== cardId));
  };

  const handleMoveCard = (cardId: string, targetColumn: KanbanColumnId) => {
    const card = cards.find((c) => c.id === cardId);
    if (!card) return;
    const oldColumn = card.columnId;
    if (oldColumn === targetColumn) return;

    const columnNames: Record<KanbanColumnId, string> = {
      ideias: 'Ideias',
      planejado: 'Planejado',
      em_andamento: 'Em andamento',
      aguardando: 'Aguardando',
      concluido: 'Concluído',
      validado: 'Validado',
    };

    setCards((prev) =>
      prev.map((c) =>
        c.id === cardId
          ? { ...c, columnId: targetColumn, updatedAt: Date.now() }
          : c
      )
    );

    // Auto-record status change in Timeline
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    setEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        date: formattedDate,
        type: targetColumn === 'concluido' || targetColumn === 'validado' ? 'validacao' : 'decisao',
        title: `Ação ${columnNames[targetColumn]}: "${card.title}"`,
        description: `Status alterado de "${columnNames[oldColumn]}" para "${columnNames[targetColumn]}". Responsável: ${card.assignee}. Prazo: ${card.deadline}.`,
        author: card.assignee || 'Gestor do Negócio',
        badge: columnNames[targetColumn],
      },
      ...prev,
    ]);
  };

  const handleToggleChecklistItem = (cardId: string, itemId: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const updatedChecklist = c.checklist.map((chk) =>
            chk.id === itemId ? { ...chk, completed: !chk.completed } : chk
          );
          return { ...c, checklist: updatedChecklist, updatedAt: Date.now() };
        }
        return c;
      })
    );
  };

  // Diagnostic Handlers
  const handleAddDiagnostic = (item: Omit<DiagnosticItem, 'id' | 'createdAt'>) => {
    const newItem: DiagnosticItem = {
      ...item,
      id: `diag-${Date.now()}`,
      createdAt: Date.now(),
    };
    setDiagnostics((prev) => [newItem, ...prev]);
  };

  const handleDeleteDiagnostic = (id: string) => {
    setDiagnostics((prev) => prev.filter((d) => d.id !== id));
  };

  const handleGenerateActionFromDiagnostic = (diag: DiagnosticItem) => {
    const newCard: KanbanCard = {
      id: `card-${Date.now()}`,
      columnId: 'planejado',
      title: `Tratar ${diag.category.replace('_', ' ')}: ${diag.title}`,
      description: `Ação originada do diagnóstico: ${diag.description || diag.title}`,
      whyReason: `Mitigar risco ou aproveitar oportunidade diagnosticada na consultoria Sebrae.`,
      assignee: 'Equipe Responsável',
      deadline: '15 dias',
      priority: diag.impact === 'Alto' ? 'Alta' : diag.impact === 'Médio' ? 'Média' : 'Baixa',
      targetResult: 'Registrar resultado e validação da melhoria implementada.',
      checklist: [
        { id: `chk-${Date.now()}-1`, text: 'Mapear plano de execução', completed: false },
        { id: `chk-${Date.now()}-2`, text: 'Testar com clientes ou dados reais', completed: false },
      ],
      comments: [
        {
          id: `com-${Date.now()}`,
          author: 'Diagnóstico Sebrae',
          text: `Ação vinculada ao diagnóstico: "${diag.title}".`,
          createdAt: Date.now(),
        },
      ],
      documents: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    setCards((prev) => [newCard, ...prev]);

    // Update diagnostic item with generated action id
    setDiagnostics((prev) =>
      prev.map((d) => (d.id === diag.id ? { ...d, generatedActionId: newCard.id } : d))
    );

    setActiveEditingCard(newCard);
  };

  // Goals Handlers
  const handleAddGoal = (goal: Omit<BusinessGoal, 'id'>) => {
    const newGoal: BusinessGoal = {
      ...goal,
      id: `goal-${Date.now()}`,
    };
    setGoals((prev) => [newGoal, ...prev]);

    setEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        date: new Date().toLocaleDateString('pt-BR'),
        type: 'meta_criada',
        title: `Nova Meta Cadastrada: ${newGoal.title}`,
        description: `Meta estabelecida com alvo de ${newGoal.targetValue} ${newGoal.unit} até ${newGoal.deadline}.`,
        author: newGoal.assignee,
        badge: 'Planejamento',
      },
      ...prev,
    ]);
  };

  const handleUpdateGoal = (updated: BusinessGoal) => {
    setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));

    if (updated.progress >= 100) {
      setEvents((prev) => [
        {
          id: `evt-${Date.now()}`,
          date: new Date().toLocaleDateString('pt-BR'),
          type: 'meta_concluida',
          title: `Meta Alcançada: ${updated.title}`,
          description: `Objetivo de ${updated.targetValue} ${updated.unit} atingido com sucesso!`,
          author: updated.assignee,
          badge: 'Conquista',
        },
        ...prev,
      ]);
    }
  };

  const handleDeleteGoal = (id: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== id));
  };

  // Metrics Handlers
  const handleAddMetric = (metric: Omit<BusinessMetric, 'id'>) => {
    const newMetric: BusinessMetric = {
      ...metric,
      id: `met-${Date.now()}`,
    };
    setMetrics((prev) => [newMetric, ...prev]);
  };

  const handleDeleteMetric = (id: string) => {
    setMetrics((prev) => prev.filter((m) => m.id !== id));
  };

  // Business Plan Sections Handlers
  const handleUpdateSection = (updated: BusinessPlanSection) => {
    setSections((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  // Consulting Sessions Handlers
  const handleAddSession = (session: Omit<ConsultingSession, 'id'>) => {
    const newSession: ConsultingSession = {
      ...session,
      id: `session-${Date.now()}`,
    };
    setSessions((prev) => [newSession, ...prev]);

    setEvents((prev) => [
      {
        id: `evt-${Date.now()}`,
        date: newSession.date,
        type: 'consultoria',
        title: `Consultoria Sebrae: ${newSession.subject}`,
        description: `Atendimento com ${newSession.consultant}. ${newSession.recommendations.length} recomendações registradas.`,
        author: newSession.consultant,
        badge: 'Sebrae',
      },
      ...prev,
    ]);
  };

  // Timeline Handlers
  const handleAddTimelineEvent = (evt: Omit<TimelineEvent, 'id'>) => {
    const newEvt: TimelineEvent = {
      ...evt,
      id: `evt-${Date.now()}`,
    };
    setEvents((prev) => [newEvt, ...prev]);
  };

  // Document Handlers
  const handleAddDocument = (doc: Omit<ProjectDocument, 'id'>) => {
    const newDoc: ProjectDocument = {
      ...doc,
      id: `doc-${Date.now()}`,
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  };

  const completedTasksCount = cards.filter(
    (c) => c.columnId === 'concluido' || c.columnId === 'validado'
  ).length;

  return (
    <div className="w-full max-w-7xl mx-auto space-y-4">
      {/* Workspace Header with Tabs and Global Actions */}
      <BusinessEvolutionHeader
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onNewAction={() => handleAddNewCard('planejado')}
        onNewGoal={() => {
          setActiveTab('metas');
        }}
        onExport={() => setShowExportModal(true)}
        totalCards={cards.length}
        activeGoalsCount={goals.filter((g) => g.status !== 'Alcançada').length}
        completedTasksCount={completedTasksCount}
      />

      {/* Main Workspace Body */}
      <main className="w-full">
        {activeTab === 'visao_geral' && (
          <TabOverview
            cards={cards}
            goals={goals}
            metrics={metrics}
            diagnostics={diagnostics}
            latestConsulting={sessions[0]}
            onNavigateTab={setActiveTab}
            onSelectCard={(c) => setActiveEditingCard(c)}
            onSelectGoal={() => setActiveTab('metas')}
          />
        )}

        {activeTab === 'kanban' && (
          <TabKanban
            cards={cards}
            goals={goals}
            planSections={sections}
            onAddCard={handleAddNewCard}
            onEditCard={(c) => setActiveEditingCard(c)}
            onDeleteCard={handleDeleteCard}
            onMoveCard={handleMoveCard}
            onToggleChecklistItem={handleToggleChecklistItem}
          />
        )}

        {activeTab === 'plano_acao' && (
          <TabActionPlan
            cards={cards}
            goals={goals}
            planSections={sections}
            onNewAction={() => handleAddNewCard('planejado')}
            onEditAction={(c) => setActiveEditingCard(c)}
            onDeleteAction={handleDeleteCard}
          />
        )}

        {activeTab === 'diagnostico' && (
          <TabDiagnostic
            diagnostics={diagnostics}
            cards={cards}
            onAddDiagnostic={handleAddDiagnostic}
            onDeleteDiagnostic={handleDeleteDiagnostic}
            onGenerateActionFromDiagnostic={handleGenerateActionFromDiagnostic}
          />
        )}

        {activeTab === 'plano_negocio' && (
          <TabBusinessPlan
            sections={sections}
            cards={cards}
            goals={goals}
            onUpdateSection={handleUpdateSection}
            onNavigateToCard={(c) => {
              setActiveEditingCard(c);
              setActiveTab('kanban');
            }}
          />
        )}

        {activeTab === 'metas' && (
          <TabGoals
            goals={goals}
            cards={cards}
            onAddGoal={handleAddGoal}
            onUpdateGoal={handleUpdateGoal}
            onDeleteGoal={handleDeleteGoal}
            onSelectCard={(c) => {
              setActiveEditingCard(c);
              setActiveTab('kanban');
            }}
          />
        )}

        {activeTab === 'indicadores' && (
          <TabMetrics
            metrics={metrics}
            onAddMetric={handleAddMetric}
            onDeleteMetric={handleDeleteMetric}
          />
        )}

        {activeTab === 'consultorias' && (
          <TabConsultingSessions
            sessions={sessions}
            cards={cards}
            goals={goals}
            onAddSession={handleAddSession}
            onNavigateToCard={(c) => {
              setActiveEditingCard(c);
              setActiveTab('kanban');
            }}
          />
        )}

        {activeTab === 'historico' && (
          <TabTimeline
            events={events}
            onAddEvent={handleAddTimelineEvent}
          />
        )}

        {activeTab === 'documentos' && (
          <TabDocuments
            documents={documents}
            onAddDocument={handleAddDocument}
            onDeleteDocument={handleDeleteDocument}
          />
        )}
      </main>

      {/* Global Card Modal (Kanban & 5W2H) */}
      {activeEditingCard && (
        <CardModal
          card={activeEditingCard}
          goals={goals}
          planSections={sections}
          onSave={handleSaveCard}
          onDelete={handleDeleteCard}
          onClose={() => setActiveEditingCard(null)}
        />
      )}

      {/* Global Export Modal */}
      {showExportModal && (
        <ExportEvolutionModal
          cards={cards}
          goals={goals}
          metrics={metrics}
          sections={sections}
          diagnostics={diagnostics}
          sessions={sessions}
          events={events}
          documents={documents}
          onClose={() => setShowExportModal(false)}
        />
      )}
    </div>
  );
};
