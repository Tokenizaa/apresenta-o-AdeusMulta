export type KanbanColumnId =
  | 'ideias'
  | 'planejado'
  | 'em_andamento'
  | 'aguardando'
  | 'concluido'
  | 'validado';

export interface KanbanColumn {
  id: KanbanColumnId;
  title: string;
  subtitle: string;
  color: string;
  badgeClass: string;
}

export type PriorityLevel = 'Alta' | 'Média' | 'Baixa';

export interface ActionChecklistItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface ActionComment {
  id: string;
  author: string;
  text: string;
  createdAt: number;
}

export interface KanbanCard {
  id: string;
  columnId: KanbanColumnId;
  title: string;
  description: string;
  objective?: string;
  whyReason?: string; // 5W2H: Por que será feito?
  assignee: string; // 5W2H: Quem fará?
  deadline: string; // 5W2H: Quando será feito?
  priority: PriorityLevel;
  targetResult?: string; // 5W2H: Como saberemos que deu certo?
  actualResult?: string;
  notes?: string;
  checklist: ActionChecklistItem[];
  comments: ActionComment[];
  documents: string[];
  relatedGoalId?: string;
  relatedPlanSectionId?: string;
  createdAt: number;
  updatedAt: number;
}

export type DiagnosticCategory =
  | 'pontos_fortes'
  | 'pontos_atencao'
  | 'problemas'
  | 'oportunidades'
  | 'riscos'
  | 'prioridades';

export interface DiagnosticItem {
  id: string;
  category: DiagnosticCategory;
  title: string;
  description: string;
  impact: 'Alto' | 'Médio' | 'Baixo';
  generatedActionId?: string;
  createdAt: number;
}

export interface BusinessGoal {
  id: string;
  title: string;
  indicator: string;
  currentValue: number;
  targetValue: number;
  unit: string;
  deadline: string;
  assignee: string;
  progress: number; // 0 to 100
  relatedActionIds: string[];
  relatedPlanSection?: string;
  status: 'Em andamento' | 'Alcançada' | 'Pendente';
}

export interface BusinessMetric {
  id: string;
  name: string;
  category: 'Clientes' | 'Financeiro' | 'Marketing' | 'Operações' | 'Vendas' | 'Outros';
  currentValue: string;
  targetValue: string;
  unit: string;
  trend: 'up' | 'down' | 'neutral';
  period: string;
  notes?: string;
}

export interface BusinessPlanSection {
  id: string;
  officialSebraeCode: string;
  title: string;
  subtitle: string;
  currentStatus: 'Não iniciado' | 'Em estruturação' | 'Validado com Sebrae' | 'Completo';
  filledData: string;
  pendingItems: string[];
  documents: string[];
  decisions: string[];
  relatedActionIds: string[];
  sourceReference: string;
}

export interface ConsultingSession {
  id: string;
  date: string;
  consultant: string;
  consultantRole: string;
  subject: string;
  diagnosisSummary: string;
  recommendations: string[];
  decisions: string[];
  generatedActionIds: string[];
  relatedGoalIds: string[];
  documents: string[];
  nextSteps: string[];
  evolutionSinceLast: {
    completedTasks: string[];
    delayedTasks: string[];
    achievedGoals: string[];
    pendingGoals: string[];
    keyChanges: string[];
    pendingDecisions: string[];
  };
}

export interface TimelineEvent {
  id: string;
  date: string;
  type:
    | 'consultoria'
    | 'decisao'
    | 'meta_criada'
    | 'meta_concluida'
    | 'acao_concluida'
    | 'mudanca'
    | 'documento'
    | 'validacao';
  title: string;
  description: string;
  author: string;
  badge?: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  category:
    | 'Plano de Negócio'
    | 'Estudo de Mercado'
    | 'Pesquisa'
    | 'Apresentação'
    | 'Planilha Financeira'
    | 'Contrato'
    | 'Oficial Sebrae'
    | 'Outro';
  source: string;
  url?: string;
  tags: string[];
  createdAt: string;
  relatedTarget?: string;
}

export type BusinessTab =
  | 'visao_geral'
  | 'kanban'
  | 'plano_acao'
  | 'diagnostico'
  | 'plano_negocio'
  | 'metas'
  | 'indicadores'
  | 'consultorias'
  | 'historico'
  | 'documentos';
