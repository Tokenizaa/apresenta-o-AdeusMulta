export type NoteCategory =
  | 'Produto'
  | 'Tecnologia'
  | 'Modelo de negócio'
  | 'Mercado'
  | 'Clientes'
  | 'Marketing'
  | 'Vendas'
  | 'Financeiro'
  | 'Jurídico'
  | 'Gestão'
  | 'Sebrae'
  | 'Parcerias'
  | 'Ideias'
  | 'Dúvidas'
  | 'Próximos passos'
  | 'Outros';

export type NotePriority = 'Alta' | 'Média' | 'Baixa';

export interface ConsultingNote {
  id: string;
  category: NoteCategory;
  customCategory?: string;
  content: string;
  priority: NotePriority;
  nextStep?: string;
  assignee?: string;
  deadline?: string;
  notes?: string;
  completed: boolean;
  createdAt: number;
}

export const PRESET_CATEGORIES: NoteCategory[] = [
  'Produto',
  'Tecnologia',
  'Modelo de negócio',
  'Mercado',
  'Clientes',
  'Marketing',
  'Vendas',
  'Financeiro',
  'Jurídico',
  'Gestão',
  'Sebrae',
  'Parcerias',
  'Ideias',
  'Dúvidas',
  'Próximos passos',
  'Outros',
];

export const INITIAL_DEFAULT_NOTES: ConsultingNote[] = [
  {
    id: 'note-1',
    category: 'Produto',
    content: 'Validar se devemos oferecer análise gratuita prévia antes da contratação da defesa completa.',
    priority: 'Alta',
    nextStep: 'Testar com o primeiro grupo piloto de 10 motoristas.',
    assignee: 'Equipe de Produto',
    deadline: '05/09/2026',
    notes: 'Aumenta a taxa de conversão gerando valor imediato na conferência do auto.',
    completed: false,
    createdAt: Date.now() - 3600000 * 3,
  },
  {
    id: 'note-2',
    category: 'Modelo de negócio',
    content: 'Definir precificação inicial: taxa fixa por recurso ou porcentagem sobre valor economizado da multa.',
    priority: 'Alta',
    nextStep: 'Simular cenários de preço entre R$ 29 e R$ 79 por defesa.',
    assignee: 'Fundadores',
    deadline: '10/09/2026',
    notes: 'Consultora sugeriu modelo pré-pago sem mensalidade fixa.',
    completed: false,
    createdAt: Date.now() - 3600000 * 2,
  },
  {
    id: 'note-3',
    category: 'Parcerias',
    content: 'Mapear associações de motoristas de aplicativo, cooperativas de vans e despachantes locais.',
    priority: 'Média',
    nextStep: 'Agendar 3 conversas com líderes de frotas e motoristas parceiros.',
    assignee: 'Comercial',
    deadline: '15/09/2026',
    notes: 'Canal de distribuição B2B2C com menor custo de aquisição de clientes.',
    completed: false,
    createdAt: Date.now() - 3600000 * 1,
  },
  {
    id: 'note-4',
    category: 'Sebrae',
    content: 'Inscrever a Adeus Multa no programa Sebrae Startup / InovAtiva para mentorias de tração.',
    priority: 'Alta',
    nextStep: 'Verificar edital aberto com a consultora.',
    assignee: 'Gestão',
    deadline: '12/09/2026',
    notes: 'Acesso a rede de mentores jurídicos e validação contínua.',
    completed: false,
    createdAt: Date.now() - 1800000,
  }
];
