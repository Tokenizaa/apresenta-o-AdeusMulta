import {
  KanbanColumn,
  KanbanCard,
  DiagnosticItem,
  BusinessGoal,
  BusinessMetric,
  BusinessPlanSection,
  ConsultingSession,
  TimelineEvent,
  ProjectDocument,
} from '../types/businessEvolution';

export const KANBAN_COLUMNS: KanbanColumn[] = [
  {
    id: 'ideias',
    title: 'Ideias',
    subtitle: 'Ainda em avaliação e triagem',
    color: '#8b5cf6',
    badgeClass: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
  },
  {
    id: 'planejado',
    title: 'Planejado',
    subtitle: 'Aprovadas para execução',
    color: '#3b82f6',
    badgeClass: 'bg-blue-950/80 text-blue-300 border-blue-500/40',
  },
  {
    id: 'em_andamento',
    title: 'Em andamento',
    subtitle: 'Sendo executadas agora',
    color: '#fbbf24',
    badgeClass: 'bg-amber-950/80 text-amber-300 border-amber-500/40',
  },
  {
    id: 'aguardando',
    title: 'Aguardando',
    subtitle: 'Depende de terceiros ou validação',
    color: '#f97316',
    badgeClass: 'bg-orange-950/80 text-orange-300 border-orange-500/40',
  },
  {
    id: 'concluido',
    title: 'Concluído',
    subtitle: 'Ações finalizadas',
    color: '#10b981',
    badgeClass: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
  },
  {
    id: 'validado',
    title: 'Validado',
    subtitle: 'Resultado medido e comprovado',
    color: '#06b6d4',
    badgeClass: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
  },
];

export const INITIAL_KANBAN_CARDS: KanbanCard[] = [
  {
    id: 'card-1',
    columnId: 'em_andamento',
    title: 'Realizar teste comercial com 20 motoristas de aplicativo',
    description: 'Apresentar a análise preliminar gratuita do auto de infração e mensurar a taxa de conversão para recurso completo.',
    objective: 'Validar a proposta de valor e a disposição de pagamento dos motoristas autônomos.',
    whyReason: 'Reduzir a incerteza do modelo de negócio e estimar o CAC real.',
    assignee: 'Equipe Comercial / Fundador',
    deadline: '10/09/2026',
    priority: 'Alta',
    targetResult: 'Pelo menos 6 contratações pagas (30% de conversão)',
    actualResult: '8 motoristas contatados, 3 recursos gerados até o momento.',
    notes: 'Priorizar motoristas com autuações gravíssimas ou suspensão iminente da CNH.',
    checklist: [
      { id: 'chk-1', text: 'Mapear 20 motoristas em grupos locais', completed: true },
      { id: 'chk-2', text: 'Realizar diagnóstico prévio do auto de infração', completed: true },
      { id: 'chk-3', text: 'Apresentar minuta de defesa pelo sistema', completed: false },
      { id: 'chk-4', text: 'Coletar feedback de valor percebido e preço', completed: false },
    ],
    comments: [
      {
        id: 'com-1',
        author: 'Consultora Sebrae',
        text: 'Focar na dor de perda da CNH para quem depende do volante para trabalhar.',
        createdAt: Date.now() - 86400000 * 2,
      },
    ],
    documents: ['Roteiro de Entrevista com Motoristas.pdf'],
    relatedGoalId: 'goal-1',
    relatedPlanSectionId: 'sec-mercado',
    createdAt: Date.now() - 86400000 * 4,
    updatedAt: Date.now() - 3600000 * 5,
  },
  {
    id: 'card-2',
    columnId: 'planejado',
    title: 'Simular precificação: Taxa Fixa (R$ 39-79) vs Percentual de Sucesso',
    description: 'Modelar cenários de fluxo de caixa considerando custo de processamento e margem de contribuição por defesa.',
    objective: 'Definir o preço base da fase inicial sem complexidade jurídica de cobrança no êxito.',
    whyReason: 'A cobrança fixa elimina o risco de inadimplência e simplifica o onboarding do motorista.',
    assignee: 'Financeiro',
    deadline: '15/09/2026',
    priority: 'Alta',
    targetResult: 'Planilha financeira oficial Sebrae preenchida com DRE projetado.',
    notes: 'Recomendação Sebrae: iniciar com preço único e claro.',
    checklist: [
      { id: 'chk-21', text: 'Calcular custos de servidor, tokens de IA e taxas de pagamento', completed: true },
      { id: 'chk-22', text: 'Comparar com despachantes tradicionais (R$ 150 - R$ 400)', completed: false },
      { id: 'chk-23', text: 'Definir pacote promocional de lançamento', completed: false },
    ],
    comments: [],
    documents: ['Planilha_Financeira_Sebrae.xlsx'],
    relatedGoalId: 'goal-2',
    relatedPlanSectionId: 'sec-financeiro',
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now() - 86400000 * 1,
  },
  {
    id: 'card-3',
    columnId: 'aguardando',
    title: 'Acordo piloto com associação local de motoristas de van e aplicativo',
    description: 'Estabelecer canal de indicação B2B2C com desconto exclusivo para cooperados.',
    objective: 'Criar canal de distribuição com custo de aquisição (CAC) reduzido.',
    whyReason: 'Parcerias institucionais trazem credibilidade imediata ao Adeus Multa.',
    assignee: 'Comercial & Parcerias',
    deadline: '20/09/2026',
    priority: 'Média',
    targetResult: '1 termo de parceria piloto assinado com 50+ motoristas na base.',
    notes: 'Aguardando retorno da diretoria da Associação Metropolitana de Transporte.',
    checklist: [
      { id: 'chk-31', text: 'Apresentar o produto em reunião de diretoria', completed: true },
      { id: 'chk-32', text: 'Elaborar termo de cooperação simples', completed: true },
      { id: 'chk-33', text: 'Validar aprovação jurídica do Sebrae / Jurídico', completed: false },
    ],
    comments: [],
    documents: ['Minuta_Termo_Cooperacao.pdf'],
    relatedGoalId: 'goal-1',
    relatedPlanSectionId: 'sec-marketing',
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now() - 86400000 * 2,
  },
  {
    id: 'card-4',
    columnId: 'validado',
    title: 'Mapeamento de 25 teses formais do CTB e Resoluções Contran',
    description: 'Catalogar regras de nulidade de auto de infração (prazos do Art. 281, aferição de etilômetro, radar e sinalização).',
    objective: 'Garantir que a geração de recursos tenha fundamentação jurídica real e auditada.',
    whyReason: 'Diferencial central: primeiro checamos as regras, depois redigimos.',
    assignee: 'Especialista em Trânsito / Jurídico',
    deadline: '28/08/2026',
    priority: 'Alta',
    targetResult: '25 teses catalogadas com artigos, prazos e jurisprudência correspondente.',
    actualResult: '32 teses estruturadas no banco de conhecimento do sistema.',
    checklist: [
      { id: 'chk-41', text: 'Art. 281 CTB - Notificação de Autuação (30 dias)', completed: true },
      { id: 'chk-42', text: 'Resolução Contran 798/2020 - Medidores de Velocidade', completed: true },
      { id: 'chk-43', text: 'Art. 280 CTB - Requisitos mínimos do Auto de Infração', completed: true },
    ],
    comments: [
      {
        id: 'com-41',
        author: 'Consultor Técnico',
        text: 'Base técnica sólida concluída e integrada ao fluxo de conferência.',
        createdAt: Date.now() - 86400000 * 5,
      },
    ],
    documents: ['Catalogo_Teses_CTB_Contran.pdf'],
    relatedGoalId: 'goal-3',
    relatedPlanSectionId: 'sec-operacional',
    createdAt: Date.now() - 86400000 * 10,
    updatedAt: Date.now() - 86400000 * 3,
  },
  {
    id: 'card-5',
    columnId: 'ideias',
    title: 'Módulo de acompanhamento automático do protocolo no Detran',
    description: 'Notificar o motorista por WhatsApp sobre as etapas do julgamento na JARI e Cetran.',
    objective: 'Aumentar a fidelização e retenção para futuros serviços de trânsito.',
    whyReason: 'Gera valor no pós-venda enquanto o recurso é julgado pelos órgãos de trânsito.',
    assignee: 'Tecnologia / Produto',
    deadline: '30/10/2026',
    priority: 'Baixa',
    targetResult: 'Especificação técnica do webhook de consulta pública.',
    checklist: [
      { id: 'chk-51', text: 'Investigar APIs públicas de Detrans estaduais', completed: false },
      { id: 'chk-52', text: 'Avaliar custo de integração via mensageria WhatsApp', completed: false },
    ],
    comments: [],
    documents: [],
    relatedPlanSectionId: 'sec-sumario',
    createdAt: Date.now() - 86400000 * 2,
    updatedAt: Date.now() - 86400000 * 2,
  },
];

export const INITIAL_DIAGNOSTIC_ITEMS: DiagnosticItem[] = [
  {
    id: 'diag-1',
    category: 'pontos_fortes',
    title: 'Conferência técnica prévia com checagem de regras reais do CTB',
    description: 'Ao invés de redigir textos genéricos, o sistema valida primeiro inconsistências materiais do auto (prazos, aferição do Inmetro e preenchimento).',
    impact: 'Alto',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'diag-2',
    category: 'pontos_atencao',
    title: 'Comunicação jurídica acessível para o cidadão leigo',
    description: 'O motorista não compreende termos como "intempestividade" ou "decadência do direito de punir"; a linguagem deve ser clara e orientativa.',
    impact: 'Alto',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'diag-3',
    category: 'problemas',
    title: 'Canal de aquisição de clientes ainda não escalado (CAC incerto)',
    description: 'O custo para atingir o motorista no momento exato em que ele recebe a notificação da multa ainda precisa de canais validados.',
    impact: 'Alto',
    generatedActionId: 'card-1',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'diag-4',
    category: 'oportunidades',
    title: 'Parcerias com frotas, motoristas de aplicativo e cooperativas (B2B2C)',
    description: 'Aproximadamente 1,5 milhão de motoristas no Brasil trabalham com mobilidade e têm o sustento ameaçado por pontuação na CNH.',
    impact: 'Alto',
    generatedActionId: 'card-3',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'diag-5',
    category: 'riscos',
    title: 'Expectativa irreal de "anulação garantida" pelo cliente',
    description: 'Risco de frustração se o usuário achar que o recurso anula qualquer infração sem mérito. O sistema deve deixar clara a base legal.',
    impact: 'Médio',
    createdAt: Date.now() - 86400000 * 4,
  },
  {
    id: 'diag-6',
    category: 'prioridades',
    title: 'Validar conversão de 20 clientes reais nos primeiros 30 dias',
    description: 'Foco total em tração comercial com produto mínimo viável antes de desenvolver automações complexas.',
    impact: 'Alto',
    generatedActionId: 'card-1',
    createdAt: Date.now() - 86400000 * 4,
  },
];

export const INITIAL_BUSINESS_GOALS: BusinessGoal[] = [
  {
    id: 'goal-1',
    title: 'Validar demanda comercial do produto com motoristas autônomos',
    indicator: 'Recursos pagos gerados',
    currentValue: 3,
    targetValue: 20,
    unit: 'clientes',
    deadline: '30/09/2026',
    assignee: 'Equipe Fundadora',
    progress: 15,
    relatedActionIds: ['card-1', 'card-3'],
    relatedPlanSection: 'Plano de Marketing & Comercial',
    status: 'Em andamento',
  },
  {
    id: 'goal-2',
    title: 'Concluir Plano Financeiro e DRE projetado no modelo Sebrae',
    indicator: 'Planilha Sebrae validada',
    currentValue: 80,
    targetValue: 100,
    unit: '%',
    deadline: '15/09/2026',
    assignee: 'Financeiro',
    progress: 80,
    relatedActionIds: ['card-2'],
    relatedPlanSection: 'Plano Financeiro',
    status: 'Em andamento',
  },
  {
    id: 'goal-3',
    title: 'Auditar 100% das regras automáticas de trânsito contra o CTB',
    indicator: 'Teses formais validadas',
    currentValue: 32,
    targetValue: 30,
    unit: 'teses',
    deadline: '28/08/2026',
    assignee: 'Especialista em Trânsito',
    progress: 100,
    relatedActionIds: ['card-4'],
    relatedPlanSection: 'Plano Operacional',
    status: 'Alcançada',
  },
];

export const INITIAL_BUSINESS_METRICS: BusinessMetric[] = [
  {
    id: 'met-1',
    name: 'Taxa de Conversão da Análise para Recurso',
    category: 'Vendas',
    currentValue: '28%',
    targetValue: '35%',
    unit: '%',
    trend: 'up',
    period: 'Últimos 15 dias',
    notes: 'Medido no grupo piloto de motoristas de aplicativo.',
  },
  {
    id: 'met-2',
    name: 'Tempo Médio de Geração da Defesa',
    category: 'Operações',
    currentValue: '3.2 min',
    targetValue: '2.0 min',
    unit: 'minutos',
    trend: 'down',
    period: 'Média por recurso',
    notes: 'Da leitura do auto até o PDF pronto para assinatura.',
  },
  {
    id: 'met-3',
    name: 'Custo de Aquisição de Cliente (CAC Estimado)',
    category: 'Marketing',
    currentValue: 'R$ 14,50',
    targetValue: 'R$ 9,00',
    unit: 'R$',
    trend: 'down',
    period: 'Testes de tráfego / Parcerias',
    notes: 'Parcerias com associações diminuem o CAC para próximo de R$ 4,00.',
  },
  {
    id: 'met-4',
    name: 'Ticket Médio Projetado por Recurso',
    category: 'Financeiro',
    currentValue: 'R$ 49,00',
    targetValue: 'R$ 59,00',
    unit: 'R$',
    trend: 'up',
    period: 'Preço único',
    notes: 'Defesa prévia + JARI em pacote único.',
  },
  {
    id: 'met-5',
    name: 'NPS e Satisfação do Motorista com a Clareza',
    category: 'Clientes',
    currentValue: '88',
    targetValue: '90',
    unit: 'pontos',
    trend: 'up',
    period: 'Pós-atendimento',
    notes: 'Avaliação da clareza dos argumentos apresentados.',
  },
];

export const INITIAL_BUSINESS_PLAN_SECTIONS: BusinessPlanSection[] = [
  {
    id: 'sec-sumario',
    officialSebraeCode: 'SEBRAE-PN-01',
    title: '1. Sumário Executivo & Identificação do Negócio',
    subtitle: 'Resumo estruturado da proposta, missão, enquadramento jurídico e diferenciais.',
    currentStatus: 'Validado com Sebrae',
    filledData: `• Denominação: Adeus Multa (Defesa Legal com IA e Regras do CTB)
• Missão: Democratizar o direito constitucional à ampla defesa para condutores brasileiros através de tecnologia acessível, rigor técnico e transparência.
• Setor: Legaltech / Tecnologia aplicada à defesa administrativa de trânsito.
• Enquadramento: Simples Nacional (ME / Startup).
• Proposta de Valor: Geração de recursos de trânsito formalmente corretos, auditados pelo CTB e prontos para protocolo em minutos.`,
    pendingItems: [
      'Definir formalização societária e registro de marca no INPI.',
    ],
    documents: ['Sumario_Executivo_Adeus_Multa.pdf'],
    decisions: [
      'Posicionamento como plataforma tecnológica que empodera o próprio motorista a protocolar sua defesa.',
    ],
    relatedActionIds: ['card-1', 'card-4'],
    sourceReference: 'Manual do Plano de Negócios Sebrae — Bloco 1',
  },
  {
    id: 'sec-mercado',
    officialSebraeCode: 'SEBRAE-PN-02',
    title: '2. Análise de Mercado (Clientes, Concorrentes e Fornecedores)',
    subtitle: 'Estudo do público-alvo, comportamento do consumidor e análise de concorrência.',
    currentStatus: 'Em estruturação',
    filledData: `• Público-Alvo Principal: Motoristas profissionais (aplicativo, taxistas, entregadores, frotistas e motoristas de caminhão) e condutores urbanos frequentes.
• Comportamento: 70%+ dos motoristas desistem de recorrer por burocracia ou por achar que "nunca dá em nada".
• Análise da Concorrência:
  - Despachantes físicos: Atendimento presencial, custo alto (R$ 150 a R$ 400), prazos longos (dias).
  - Modelos da internet: Recursos genéricos com teses copiadas, sem análise do auto ou das resoluções do Contran.
  - Vantagem Adeus Multa: Rapidez (minutos), custo acessível (R$ 39 a R$ 59) e checagem prévia de consistência.`,
    pendingItems: [
      'Entrevistar 20 motoristas adicionais para mensurar sensibilidade a preço.',
      'Mapear volume mensal de multas lavradas no Detran estadual alvo.',
    ],
    documents: ['Estudo_Concorrencia_e_Publico.pdf'],
    decisions: [
      'Foco prioritário nos motoristas autônomos que não podem perder pontos na CNH.',
    ],
    relatedActionIds: ['card-1', 'card-3'],
    sourceReference: 'Metodologia Sebrae de Análise de Mercado (Clientes, Concorrentes e Fornecedores)',
  },
  {
    id: 'sec-marketing',
    officialSebraeCode: 'SEBRAE-PN-03',
    title: '3. Plano de Marketing (4 Ps: Produto, Preço, Praça e Promoção)',
    subtitle: 'Estratégia comercial, canais de distribuição e comunicação com o condutor.',
    currentStatus: 'Em estruturação',
    filledData: `• Produto: Relatório de inconsistências do auto + Minuta de defesa administrativa em PDF estruturada com fundamentação no CTB e jurisprudência dos tribunais.
• Preço: R$ 49,00 por defesa individual (com pacote de Defesa Prévia + JARI por R$ 79,00).
• Praça (Canais): Web app responsivo (mobile-first), parcerias com associações de classe e despachantes conveniados.
• Promoção: Conteúdo educativo nas redes sobre direitos do motorista, Google Ads focado na busca ("como recorrer de multa de velocidade/bafômetro") e programa de indicação entre motoristas.`,
    pendingItems: [
      'Criar calculador gratuito de pontuação e prazos como ímã de leads.',
      'Fechar primeiro acordo com associação de motoristas parceiros.',
    ],
    documents: ['Plano_de_Marketing_4Ps_Sebrae.pdf'],
    decisions: [
      'Iniciar sem cobrança no êxito (cobrança fixa por serviço prestado para garantir receita imediata).',
    ],
    relatedActionIds: ['card-2', 'card-3'],
    sourceReference: 'Sebrae — Os 4 Ps do Plano de Marketing',
  },
  {
    id: 'sec-operacional',
    officialSebraeCode: 'SEBRAE-PN-04',
    title: '4. Plano Operacional (Processos, Capacidade e Recursos)',
    subtitle: 'Estrutura técnica, motor de checagem do CTB, fluxo de atendimento e segurança.',
    currentStatus: 'Validado com Sebrae',
    filledData: `• Fluxo Operacional:
  1. Upload do Auto de Infração / Notificação de Penalidade.
  2. Extração OCR e validação estruturada dos campos obrigatórios (Art. 280 CTB).
  3. Checagem de nulidades pelo motor de regras determinísticas (prazos, etilômetro, radares).
  4. Redação técnica da defesa com auxílio de IA supervisionada.
  5. Entrega do PDF com instruções passo a passo para envio ao Detran/JARI.
• Capacidade: 5.000 defesas/mês na infraestrutura atual em nuvem.`,
    pendingItems: [
      'Aprimorar OCR para autos de infração manuscritos ou fotos com baixa iluminação.',
    ],
    documents: ['Fluxograma_Processos_Operacionais.pdf'],
    decisions: [
      'Regra inviolável: A IA nunca inventa leis ou dados; toda regra jurídica vem de base de conhecimento auditada.',
    ],
    relatedActionIds: ['card-4'],
    sourceReference: 'Manual Sebrae de Planejamento Operacional e Processos',
  },
  {
    id: 'sec-financeiro',
    officialSebraeCode: 'SEBRAE-PN-05',
    title: '5. Plano Financeiro (Custos, Faturamento e Ponto de Equilíbrio)',
    subtitle: 'Projeção de receitas, custos fixos, custos variáveis, margem e payback.',
    currentStatus: 'Em estruturação',
    filledData: `• Investimento Inicial Estimado: R$ 15.000 (desenvolvimento inicial, infraestrutura em nuvem, registro de marca e marketing piloto).
• Custo Variável por Recurso: R$ 3,20 (processamento de IA, taxas de pagamento e geração de PDF).
• Custos Fixos Mensais: R$ 1.800 (servidores, domínio, ferramentas e contabilidade).
• Ponto de Equilíbrio (Break-Even): ~45 defesas/mês ao preço médio de R$ 49,00.
• Margem de Contribuição: ~93% sobre a receita direta.`,
    pendingItems: [
      'Finalizar projeção de DRE para 12 meses na planilha oficial Sebrae.',
      'Estimar necessidade de capital de giro para campanhas pagas.',
    ],
    documents: ['Planilha_Financeira_Sebrae.xlsx'],
    decisions: [
      'Margem de contribuição alta permite investimento contínuo em aquisição de clientes.',
    ],
    relatedActionIds: ['card-2'],
    sourceReference: 'Metodologia Sebrae de Viabilidade e Planejamento Financeiro',
  },
  {
    id: 'sec-fofa',
    officialSebraeCode: 'SEBRAE-PN-06',
    title: '6. Avaliação Estratégica & Matriz FOFA (SWOT)',
    subtitle: 'Forças, Oportunidades, Fraquezas, Ameaças e plano de mitigação de riscos.',
    currentStatus: 'Validado com Sebrae',
    filledData: `• FORÇAS (Internas): Rigor jurídico (conferência antes da redação), agilidade instantânea, custo acessível e foco na dor real do condutor.
• FRAQUEZAS (Internas): Marca nova no mercado sem histórico público de defesas vitoriosas, equipe inicial enxuta.
• OPORTUNIDADES (Externas): Digitalização dos Detrans estaduais (protocolo 100% online), milhões de multas anuais com vício formal, parcerias com cooperativas.
• AMEAÇAS (Externas): Mudanças repentinas em resoluções do Contran, concorrência de escritórios tradicionais.`,
    pendingItems: [
      'Criar canal de suporte humanizado via WhatsApp para dúvidas frequentes.',
    ],
    documents: ['Matriz_FOFA_SWOT_Sebrae.pdf'],
    decisions: [
      'Destacar a transparência: o sistema só recomenda recorrer quando há tese jurídica plausível.',
    ],
    relatedActionIds: ['card-1', 'card-4'],
    sourceReference: 'Sebrae — Ferramenta de Análise Estratégica FOFA / SWOT',
  },
];

export const INITIAL_CONSULTING_SESSIONS: ConsultingSession[] = [
  {
    id: 'session-1',
    date: '31/08/2026',
    consultant: 'Consultora Especialista Sebrae',
    consultantRole: 'Consultoria de Modelagem e Tração de Startups',
    subject: 'Validação da Proposta de Valor, Precificação e Plano de Ação para os Primeiros 30 Dias',
    diagnosisSummary: 'Produto com diferenciação técnica sólida (conferência prévia de nulidades antes da redação). O desafio imediato é validar a máquina de aquisição de clientes e a precificação com motoristas reais.',
    recommendations: [
      'Realizar teste comercial prático com 20 motoristas de aplicativo antes de investir em grandes campanhas de mídia.',
      'Adotar modelo de preço único e transparente (evitar cobrança no êxito nesta fase inicial).',
      'Estruturar parceria piloto com associações de classe ou cooperativas para reduzir o CAC.',
      'Utilizar a planilha oficial do Sebrae para projeção de DRE e Ponto de Equilíbrio.',
    ],
    decisions: [
      'Meta de 30 dias: 20 clientes pagantes validados.',
      'Preço de lançamento fixado em R$ 49,00 por defesa.',
      'Prioridade total na dor de motoristas que dependem da CNH para trabalhar.',
    ],
    generatedActionIds: ['card-1', 'card-2', 'card-3'],
    relatedGoalIds: ['goal-1', 'goal-2'],
    documents: ['Ata_Consultoria_Sebrae_31082026.pdf', 'Planilha_Financeira_Sebrae.xlsx'],
    nextSteps: [
      'Executar entrevistas e vendas piloto com 20 motoristas.',
      'Preencher DRE projetado na planilha Sebrae.',
      'Agendar próxima sessão de acompanhamento para revisar métricas de conversão.',
    ],
    evolutionSinceLast: {
      completedTasks: [
        'Mapeamento de 32 teses formais do CTB e Resoluções Contran',
        'Estruturação do fluxo de conferência de inconsistências do auto',
        'Desenvolvimento do protótipo funcional da plataforma',
      ],
      delayedTasks: [],
      achievedGoals: ['Meta de Auditoria de Regras do CTB'],
      pendingGoals: ['Meta de Validação com 20 Clientes', 'Conclusão do DRE Sebrae'],
      keyChanges: [
        'Foco reorientado para motoristas profissionais (Uber, 99, vans e frotas)',
        'Decisão de adotar preço fixo pré-pago sem mensalidade',
      ],
      pendingDecisions: [
        'Definir se a análise prévia será 100% gratuita ou se terá cobrança simbólica',
      ],
    },
  },
];

export const INITIAL_TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'evt-1',
    date: '31/08/2026',
    type: 'consultoria',
    title: 'Consultoria Estratégica com o Sebrae Realizada',
    description: 'Diagnóstico concluído, definição do plano de ação para 30 dias e metas de tração comercial estabelecidas.',
    author: 'Consultora Sebrae & Fundadores',
    badge: 'Marco Inicial',
  },
  {
    id: 'evt-2',
    date: '28/08/2026',
    type: 'validacao',
    title: 'Base de Regras do CTB e Resoluções Contran Concluída',
    description: '32 teses formais catalogadas e integradas ao motor determinístico de checagem do Adeus Multa.',
    author: 'Equipe Técnica',
    badge: 'Técnico',
  },
  {
    id: 'evt-3',
    date: '25/08/2026',
    type: 'decisao',
    title: 'Definição da Arquitetura: Conferência Antes da Redação',
    description: 'Aprovada a diretriz central de não permitir alucinação jurídica: a IA só redige com base em falhas materiais comprovadas.',
    author: 'Fundadores',
    badge: 'Estratégia',
  },
  {
    id: 'evt-4',
    date: '20/08/2026',
    type: 'meta_criada',
    title: 'Meta de 20 Clientes Piloto Cadastrada',
    description: 'Estabelecida meta de tração de 30 dias para validar conversão, clareza e satisfação do motorista.',
    author: 'Gestão',
    badge: 'Comercial',
  },
];

export const INITIAL_PROJECT_DOCUMENTS: ProjectDocument[] = [
  {
    id: 'doc-1',
    title: 'Manual e Modelo de Plano de Negócios Oficial Sebrae',
    category: 'Oficial Sebrae',
    source: 'Sebrae Nacional (Metodologia PNBOX & Guia de Negócios)',
    tags: ['Sebrae', 'Metodologia Oficial', 'Planejamento'],
    createdAt: '31/08/2026',
    relatedTarget: 'Plano de Negócio',
  },
  {
    id: 'doc-2',
    title: 'Planilha de Viabilidade Econômico-Financeira e DRE Sebrae',
    category: 'Planilha Financeira',
    source: 'Sebrae / Finanças para Startups',
    tags: ['Financeiro', 'DRE', 'Ponto de Equilíbrio'],
    createdAt: '31/08/2026',
    relatedTarget: 'Plano Financeiro',
  },
  {
    id: 'doc-3',
    title: 'Catálogo de Teses e Nulidades Formais do CTB e Contran',
    category: 'Estudo de Mercado',
    source: 'Adeus Multa / Departamento Jurídico',
    tags: ['CTB', 'Contran', 'Regras'],
    createdAt: '28/08/2026',
    relatedTarget: 'Plano Operacional',
  },
  {
    id: 'doc-4',
    title: 'Ata e Diretrizes da Consultoria Sebrae (Ciclo 1)',
    category: 'Apresentação',
    source: 'Consultoria Sebrae',
    tags: ['Consultoria', 'Acompanhamento', 'Metas'],
    createdAt: '31/08/2026',
    relatedTarget: 'Consultorias',
  },
];
