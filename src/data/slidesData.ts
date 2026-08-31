import { SlideData } from '../types/presentation';

export const SLIDES_DATA: SlideData[] = [
  {
    id: 0,
    stageNumber: "00",
    stageTag: "ADEUS MULTA",
    title: "ADEUS MULTA",
    subtitle: "Tecnologia para análise e defesa de infrações de trânsito",
    topics: [
      {
        id: "c1",
        number: "01",
        title: "Motorista",
        explanation: "Recebe a autuação e quer saber se existe algum erro ou motivo para recorrer.",
        iconName: "User",
        badge: "Início"
      },
      {
        id: "c2",
        number: "02",
        title: "Documentos",
        explanation: "Informa os dados da multa e anexa a notificação recebida.",
        iconName: "FileText",
        badge: "Dados"
      },
      {
        id: "c3",
        number: "03",
        title: "Conferência",
        explanation: "O sistema confere os fatos com a legislação e as regras do Código de Trânsito.",
        iconName: "CheckSquare",
        badge: "Regras"
      },
      {
        id: "c4",
        number: "04",
        title: "Defesa",
        explanation: "Gera o documento de defesa com base nos fundamentos encontrados.",
        iconName: "FileCheck",
        badge: "Resultado"
      }
    ],
    highlightQuote: "Primeiro verificamos as regras. Depois geramos a defesa.",
    presenterNotes: {
      objective: "Apresentar o Adeus Multa de forma direta e prática para a consultora do Sebrae.",
      talkingPoints: [
        "Explicar a proposta: ajudar o motorista a conferir se sua multa tem erros antes de apresentar uma defesa.",
        "Ressaltar que a tecnologia já está construída e funcionando.",
        "Apresentar a sequência objetiva: mercado, demanda, concorrência, diferencial e validação do negócio."
      ],
      sebraeFocus: "Mostrar maturidade, simplicidade de comunicação e foco total em validar o modelo de negócio."
    }
  },
  {
    id: 1,
    stageNumber: "01",
    stageTag: "ETAPA 1 — O TAMANHO DO PROBLEMA",
    title: "Milhões de infrações. Pouca orientação para contestar.",
    subtitle: "O volume de infrações no Brasil é expressivo, mas o cidadão não tem meios simples de avaliar a validade da autuação.",
    topics: [
      {
        id: "prob_vol",
        number: "01",
        title: "Infrações de trânsito",
        explanation: "Dados oficiais nacionais disponíveis na SENATRAN/RENAINF comprovam o volume massivo de autuações emitidas em todo o país.",
        iconName: "TrendingUp",
        badge: "Volume Nacional"
      },
      {
        id: "prob_core",
        number: "02",
        title: "O problema central",
        explanation: "O problema não é a falta de multas. É a dificuldade de identificar quando uma autuação possui um vício que pode ser contestado.",
        iconName: "AlertTriangle",
        badge: "Gargalo Real"
      },
      {
        id: "prob_src",
        number: "03",
        title: "Base de Dados Oficiais",
        explanation: "Informações públicas consolidadas a partir dos registros da SENATRAN e do RENAINF.",
        iconName: "Database",
        badge: "SENATRAN / RENAINF"
      }
    ],
    highlightQuote: "O problema não é a falta de multas. É a dificuldade de identificar quando uma autuação possui um vício que pode ser contestado.",
    presenterNotes: {
      objective: "Mostrar o tamanho do problema no Brasil a partir de fontes oficiais da SENATRAN/RENAINF.",
      talkingPoints: [
        "O volume de autuações no Brasil é gigantesco e monitorado pelo RENAINF.",
        "Não inventamos números fictícios: a base oficial da SENATRAN comprova o volume.",
        "A dor real: o motorista não sabe se a multa possui um vício legal que permite contestação."
      ],
      sebraeFocus: "Evidenciar que existe um mercado amplo e uma dor recorrente sem usar dados inflados."
    }
  },
  {
    id: 2,
    stageNumber: "02",
    stageTag: "ETAPA 2 — EXISTE DEMANDA REAL POR RECURSOS",
    title: "O cidadão já tenta contestar.",
    subtitle: "Dados divulgados por órgãos públicos comprovam que existe demanda ativa de motoristas buscando revisão.",
    topics: [
      {
        id: "dem_dnit",
        number: "01",
        title: "DNIT",
        explanation: "+26 mil recursos julgados pelas JARIs em 2024.",
        iconName: "FileCheck",
        badge: "+26 mil julgados (2024)"
      },
      {
        id: "dem_detrango",
        number: "02",
        title: "Detran-GO",
        explanation: "~10 mil/mês recursos recebidos, conforme dado divulgado pelo órgão.",
        iconName: "Inbox",
        badge: "~10 mil / mês"
      },
      {
        id: "dem_jarisp",
        number: "03",
        title: "JARI-SP",
        explanation: "~18 mil/mês recursos analisados, conforme informação institucional.",
        iconName: "Scale",
        badge: "~18 mil / mês"
      }
    ],
    highlightQuote: "A demanda existe. O processo ainda é complexo para quem não conhece o procedimento.",
    presenterNotes: {
      objective: "Demonstrar que a procura por recursos já acontece no dia a dia dos órgãos de trânsito.",
      talkingPoints: [
        "Apresentar os 3 cartões com números divulgados oficialmente por órgãos diferentes.",
        "Ressaltar que os dados são de fontes distintas e não devem ser somados como total nacional.",
        "Conclusão: a demanda existe e é recorrente, mas o processo ainda é burocrático e confuso para o cidadão."
      ],
      sebraeFocus: "Comprovar validação de demanda real por meio de registros públicos de atendimento."
    }
  },
  {
    id: 3,
    stageNumber: "03",
    stageTag: "ETAPA 3 — CONCORRÊNCIA",
    title: "Já existem soluções. Mas elas seguem modelos diferentes.",
    subtitle: "O mercado está estruturado principalmente em dois extremos: assessoria individual de alto custo ou geradores automáticos de texto.",
    topics: [
      {
        id: "conc_dm",
        number: "01",
        title: "Doutor Multas",
        explanation: "Modelo: assessoria especializada. Pessoa envia o caso → especialista analisa → defesa é preparada.",
        iconName: "UserCheck",
        badge: "Assessoria Especializada"
      },
      {
        id: "conc_pr",
        number: "02",
        title: "Portal do Recurso",
        explanation: "Modelo: serviço especializado de preparação e acompanhamento de recursos.",
        iconName: "Building",
        badge: "Serviço Preparatório"
      },
      {
        id: "conc_ra",
        number: "03",
        title: "Recorrre.ai",
        explanation: "Modelo: automação e geração de defesa utilizando tecnologia e inteligência artificial.",
        iconName: "Cpu",
        badge: "Automação / IA"
      }
    ],
    highlightQuote: "O mercado divide-se entre serviços manuais caros e geradores genéricos de texto.",
    presenterNotes: {
      objective: "Mapear o cenário competitivo com respeito e neutralidade técnica.",
      talkingPoints: [
        "Explicar os 3 modelos existentes no mercado sem fazer ataques aos concorrentes.",
        "Doutor Multas e Portal do Recurso dependem fortemente de braço humano e consultoria.",
        "Ferramentas puramente automáticas de IA geram texto, mas podem inventar argumentos ou alucinar leis."
      ],
      sebraeFocus: "Mostrar entendimento claro do ecossistema e dos modelos de negócio concorrentes."
    }
  },
  {
    id: 4,
    stageNumber: "04",
    stageTag: "ETAPA 4 — ONDE O ADEUS MULTA SE DIFERENCIA",
    title: "Não somos apenas um gerador de recursos.",
    subtitle: "Estruturamos a conferência das regras e dos fatos antes de qualquer geração de texto.",
    topics: [
      {
        id: "flow_trad",
        number: "01",
        title: "Modelo Tradicional",
        explanation: "Pessoa → Especialista → Texto da defesa (depende de tempo e custo de terceiros).",
        iconName: "Users",
        badge: "Tradicional"
      },
      {
        id: "flow_ai",
        number: "02",
        title: "Modelo baseado apenas em IA",
        explanation: "Pessoa → IA → Texto da defesa (risco de teses inadequadas e alucinações).",
        iconName: "Bot",
        badge: "Apenas IA"
      },
      {
        id: "flow_am",
        number: "03",
        title: "Adeus Multa",
        explanation: "Fatos + documentos → Mapeamento do caso → Regras jurídicas → Identificação de possíveis vícios → Teses compatíveis → Validação jurídica → Defesa personalizada.",
        iconName: "CheckCircle2",
        badge: "Análise Estruturada"
      }
    ],
    highlightQuote: "A IA não escolhe a tese jurídica. O sistema identifica e valida as possibilidades. A IA ajuda a transformar a análise em uma defesa clara e bem estruturada.",
    presenterNotes: {
      objective: "Deixar clara a diferença entre gerar texto com IA e conferir regras jurídicas determinísticas.",
      talkingPoints: [
        "Comparar visualmente os 3 caminhos.",
        "Enfatizar a frase central: 'A IA não escolhe a tese jurídica. O sistema identifica e valida as possibilidades.'",
        "A IA atua como ferramenta de redação clara, e não como tomadora de decisão jurídica."
      ],
      sebraeFocus: "Destacar a barreira tecnológica e a seriedade metodológica da proposta de valor."
    }
  },
  {
    id: 5,
    stageNumber: "05",
    stageTag: "ETAPA 5 — O DIFERENCIAL TECNOLÓGICO",
    title: "O diferencial está na análise, não apenas no texto.",
    subtitle: "Quatro pilares técnicos que garantem defesas consistentes e fundamentadas em regras reais.",
    topics: [
      {
        id: "pil_1",
        number: "01",
        title: "1. Conhecimento jurídico estruturado",
        explanation: "Leis, resoluções, procedimentos e argumentos organizados em uma base estruturada.",
        iconName: "BookOpen",
        badge: "Base Estruturada"
      },
      {
        id: "pil_2",
        number: "02",
        title: "2. Regras verificáveis",
        explanation: "O sistema utiliza regras determinísticas para identificar situações que podem gerar argumentos.",
        iconName: "CheckSquare",
        badge: "Lógica Determinística"
      },
      {
        id: "pil_3",
        number: "03",
        title: "3. Análise específica do caso",
        explanation: "A defesa não é simplesmente um modelo genérico preenchido. O sistema considera: infração + fatos + documentos + procedimento + órgão + temporalidade.",
        iconName: "Search",
        badge: "Caso Concreto"
      },
      {
        id: "pil_4",
        number: "04",
        title: "4. IA como apoio",
        explanation: "A IA melhora a redação e a compreensão. Não substitui a lógica jurídica do sistema.",
        iconName: "Sparkles",
        badge: "Apoio de Redação"
      }
    ],
    highlightQuote: "infração + fatos + documentos + procedimento + órgão + temporalidade",
    presenterNotes: {
      objective: "Apresentar os quatro pilares tecnológicos da solução.",
      talkingPoints: [
        "Pilar 1: Base jurídica estruturada (CTB e resoluções do CONTRAN).",
        "Pilar 2: Regras verificáveis e determinísticas.",
        "Pilar 3: Análise multidimensional do caso concreto (temporalidade, órgão autuador, procedimentos).",
        "Pilar 4: A IA melhora o texto, mas não substitui a lógica do sistema."
      ],
      sebraeFocus: "Demonstrar solidez técnica que protege a empresa de riscos e eleva a qualidade do produto."
    }
  },
  {
    id: 6,
    stageNumber: "06",
    stageTag: "ETAPA 6 — DEMONSTRAÇÃO REAL",
    title: "Agora vamos ver o sistema funcionando",
    subtitle: "Da multa até a defesa montada com conferência das regras.",
    topics: [
      {
        id: "demo1",
        number: "01",
        title: "Dados da multa",
        explanation: "Entrada das informações do auto de infração e do condutor.",
        iconName: "Edit3",
        badge: "1. Entrada"
      },
      {
        id: "demo2",
        number: "02",
        title: "Documentos",
        explanation: "Envio da notificação e conferência dos registros.",
        iconName: "Upload",
        badge: "2. Documentos"
      },
      {
        id: "demo3",
        number: "03",
        title: "Análise",
        explanation: "Conferência automática das regras e prazos legais.",
        iconName: "CheckCircle2",
        badge: "3. Análise"
      },
      {
        id: "demo4",
        number: "04",
        title: "Fundamentos encontrados",
        explanation: "Identificação dos pontos que podem ser questionados.",
        iconName: "Search",
        badge: "4. Fundamentos"
      },
      {
        id: "demo5",
        number: "05",
        title: "Defesa",
        explanation: "Geração da peça completa pronta para impressão ou protocolo.",
        iconName: "FileCheck",
        badge: "5. Defesa"
      }
    ],
    highlightQuote: "AGORA VAMOS PARA A PLATAFORMA",
    presenterNotes: {
      objective: "Abrir a plataforma ao vivo em nova aba e demonstrar o funcionamento em 3 a 5 minutos.",
      talkingPoints: [
        "1. Clicar em 'ABRIR O ADEUS MULTA' para ir para a aplicação real.",
        "2. Fazer um teste rápido com uma infração demonstrativa.",
        "3. Mostrar a conferência das regras e o documento final gerado.",
        "4. Voltar para esta aba para discutir o plano de negócio com o Sebrae."
      ],
      sebraeFocus: "Provar que a tecnologia já é realidade antes de debater a estratégia comercial."
    }
  },
  {
    id: 7,
    stageNumber: "07",
    stageTag: "ETAPA 7 — PLANO DE NEGÓCIO & GESTÃO",
    title: "A tecnologia está pronta. Agora precisamos testar o negócio.",
    subtitle: "As cinco perguntas centrais para construirmos o plano de ação com o Sebrae",
    topics: [
      {
        id: "sb1",
        number: "01",
        title: "QUEM?",
        explanation: "Quem tem maior interesse em pagar por esse serviço?",
        iconName: "Users",
        badge: "Primeiro Cliente"
      },
      {
        id: "sb2",
        number: "02",
        title: "QUANTO?",
        explanation: "Quanto essa pessoa estaria disposta a pagar por uma defesa?",
        iconName: "DollarSign",
        badge: "Preço & Valor"
      },
      {
        id: "sb3",
        number: "03",
        title: "COMO?",
        explanation: "É melhor vender diretamente para o motorista ou por meio de parceiros?",
        iconName: "Building2",
        badge: "Modelo de Venda"
      },
      {
        id: "sb4",
        number: "04",
        title: "ONDE?",
        explanation: "Onde podemos encontrar os primeiros clientes?",
        iconName: "Target",
        badge: "Canais de Acesso"
      },
      {
        id: "sb5",
        number: "05",
        title: "O QUE TESTAR?",
        explanation: "Qual é o menor teste que podemos fazer para descobrir se existe demanda real?",
        iconName: "CheckSquare",
        badge: "Teste de Demanda"
      }
    ],
    closingQuestion: "Quero sair daqui com um plano de 30 dias.",
    closingTakeaway: "A tecnologia já existe. Agora queremos orientação para transformar essa tecnologia em um negócio validado, comercialmente sustentável e escalável.",
    presenterNotes: {
      objective: "Conduzir a conversa final com a consultora do Sebrae e gerenciar o plano no workspace completo.",
      talkingPoints: [
        "Apresentar as 5 perguntas como guia da sessão estratégica.",
        "Utilizar o painel de gestão integrado (Kanban, Metas, Plano Sebrae, Indicadores).",
        "Sair da reunião com metas e ações registradas para os próximos 30 dias."
      ],
      sebraeFocus: "Sair da reunião com 3 decisões práticas: O que testar primeiro, Quem procurar e Quanto investir."
    }
  }
];
