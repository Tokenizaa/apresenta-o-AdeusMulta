import { SlideData } from '../types/presentation';

export const SLIDES_DATA: SlideData[] = [
  {
    id: 0,
    stageNumber: "00",
    stageTag: "ABERTURA INSTITUCIONAL",
    title: "ADEUS MULTA",
    subtitle: "Tecnologia para análise e defesa administrativa de infrações de trânsito",
    topics: [
      {
        id: "c1",
        number: "01",
        title: "Motorista",
        explanation: "Recebe o auto de autuação e busca clareza técnica e transparência.",
        iconName: "Users",
        badge: "Entrada Cidadã"
      },
      {
        id: "c2",
        number: "02",
        title: "Documentos & Fatos",
        explanation: "Digitalização e extração estruturada dos dados da notificação de autuação.",
        iconName: "FileSearch",
        badge: "Dados Estruturados"
      },
      {
        id: "c3",
        number: "03",
        title: "Análise Determinística",
        explanation: "Cruzamento com a Knowledge Base e motor de regras de trânsito.",
        iconName: "Cpu",
        badge: "Rule Engine"
      },
      {
        id: "c4",
        number: "04",
        title: "Defesa Administrativa",
        explanation: "Composição documental técnica e formal para o órgão de trânsito.",
        iconName: "FileCheck",
        badge: "Peça Pronta"
      }
    ],
    highlightQuote: "Transformando complexidade jurídica em uma experiência digital simples.",
    presenterNotes: {
      objective: "Abrir a consultoria do Sebrae posicionando o Adeus Multa como uma GovTech/LegalTech de impacto real.",
      talkingPoints: [
        "Apresentar a missão do projeto: democratizar o acesso à análise técnica do auto de infração.",
        "Ressaltar que construímos uma tecnologia sólida que transforma burocracia em fluxo digital intuitivo.",
        "Explicar a dinâmica da apresentação: 5 etapas objetivas para focar na modelagem de negócio com o Sebrae."
      ],
      sebraeFocus: "Transmitir maturidade institucional, seriedade tecnológica e clareza do escopo de atuação."
    }
  },
  {
    id: 1,
    stageNumber: "01",
    stageTag: "ETAPA 1 — O PROBLEMA",
    title: "O problema que queremos resolver",
    subtitle: "A assimetria de informação e a complexidade burocrática enfrentada pelo cidadão",
    topics: [
      {
        id: "p1",
        number: "01",
        title: "Multas geram dúvidas",
        explanation: "Muitas pessoas recebem uma multa, mas não sabem identificar se existem erros, inconsistências ou circunstâncias relevantes para uma defesa.",
        iconName: "HelpCircle",
        badge: "Insegurança Técnica"
      },
      {
        id: "p2",
        number: "02",
        title: "Informação jurídica é complexa",
        explanation: "Legislação, prazos, procedimentos e requisitos tornam difícil avaliar uma autuação sem conhecimento especializado.",
        iconName: "Scale",
        badge: "Complexidade Legal"
      },
      {
        id: "p3",
        number: "03",
        title: "O motorista não sabe por onde começar",
        explanation: "Antes de escrever uma defesa, é necessário entender os fatos, os documentos e quais fundamentos realmente podem ser aplicáveis.",
        iconName: "Compass",
        badge: "Falta de Orientação"
      }
    ],
    presenterNotes: {
      objective: "Demonstrar a dor de mercado: o cidadão comum não consegue analisar tecnicamente seu auto de infração.",
      talkingPoints: [
        "A dor primária ocorre antes da redação da defesa: saber se o auto possui consistência formal.",
        "A legislação (CTB, Resoluções CONTRAN) é densa e mutável.",
        "Existe um vácuo entre soluções caras presenciais e modelos genéricos ineficazes na internet."
      ],
      sebraeFocus: "Validar a relevância da dor e a oportunidade latente em um mercado de dezenas de milhões de autuações anuais."
    }
  },
  {
    id: 2,
    stageNumber: "02",
    stageTag: "ETAPA 2 — A SOLUÇÃO",
    title: "O que é o Adeus Multa?",
    subtitle: "Fluxo digital estruturado de ponta a ponta para análise e geração da peça administrativa",
    topics: [
      {
        id: "s1",
        number: "01",
        title: "DADOS",
        explanation: "O usuário informa os dados da infração e apresenta os documentos disponíveis.",
        iconName: "FileSearch",
        badge: "Entrada Digital"
      },
      {
        id: "s2",
        number: "02",
        title: "ANÁLISE",
        explanation: "O sistema cruza os fatos com uma base jurídica estruturada e regras determinísticas.",
        iconName: "Cpu",
        badge: "Motor de Regras"
      },
      {
        id: "s3",
        number: "03",
        title: "FUNDAMENTOS",
        explanation: "São identificados possíveis fundamentos compatíveis com os dados disponíveis.",
        iconName: "GitMerge",
        badge: "Verificação Legal"
      },
      {
        id: "s4",
        number: "04",
        title: "DEFESA",
        explanation: "Os fatos, fundamentos e pedidos são organizados em um documento de defesa administrativa.",
        iconName: "FileText",
        badge: "Document Assembly"
      }
    ],
    highlightQuote: "A IA atua como camada de enriquecimento e refinamento da linguagem. Ela não é a fonte de verdade jurídica nem escolhe livremente a tese.",
    presenterNotes: {
      objective: "Apresentar a pipeline do produto com ênfase na segurança e no papel controlado da Inteligência Artificial.",
      talkingPoints: [
        "O fluxo é 100% estruturado em 4 fases: Dados -> Análise -> Fundamentos -> Defesa.",
        "A IA nunca inventa leis ou teses: seu papel é polir a linguagem formal e a concisão da defesa.",
        "Não prometemos anulação mágica; oferecemos rigor técnico na análise dos fatos e prazos."
      ],
      sebraeFocus: "Demonstrar a proposta de valor transparente, sem riscos éticos ou regulatórios."
    }
  },
  {
    id: 3,
    stageNumber: "03",
    stageTag: "ETAPA 3 — O DIFERENCIAL",
    title: "Não é apenas um chatbot jurídico",
    subtitle: "Arquitetura com governança, determinismo e validação contra alucinação",
    topics: [
      {
        id: "d1",
        number: "01",
        title: "Knowledge Base",
        explanation: "Conhecimento jurídico estruturado por infrações, argumentos, procedimentos e regras.",
        iconName: "Database",
        badge: "Núcleo Jurídico"
      },
      {
        id: "d2",
        number: "02",
        title: "Rule Engine",
        explanation: "Regras determinísticas para situações que podem ser verificadas objetivamente.",
        iconName: "GitMerge",
        badge: "Lógica Estrita"
      },
      {
        id: "d3",
        number: "03",
        title: "Validation",
        explanation: "Validação de integridade para impedir argumentos sem base jurídica ou conhecimento inconsistente.",
        iconName: "ShieldAlert",
        badge: "FAIL CLOSED"
      },
      {
        id: "d4",
        number: "04",
        title: "Document Assembly",
        explanation: "Composição documental baseada nos fatos e fundamentos efetivamente identificados.",
        iconName: "FileCheck",
        badge: "Compositor Formal"
      },
      {
        id: "d5",
        number: "05",
        title: "IA",
        explanation: "Refinamento da linguagem sem substituir o núcleo determinístico.",
        iconName: "Sparkles",
        badge: "Camada de Texto"
      }
    ],
    highlightQuote: "A IA escreve melhor. O sistema determina aplicabilidade com regras e conhecimento estruturado.",
    presenterNotes: {
      objective: "Destacar a barreira de entrada e a diferença brutal entre um GPT livre e um software com regras determinísticas.",
      talkingPoints: [
        "Chatbots genéricos falham em direito de trânsito por falta de controle de validade temporal e precisão factual.",
        "O Adeus Multa implementa o conceito de FAIL CLOSED: na ausência de certeza documental, não inventa respostas.",
        "A base é estruturada e versionada de acordo com as normas oficiais dos órgãos executivos de trânsito."
      ],
      sebraeFocus: "Expor a defensabilidade técnica do produto e a robustez da engenharia desenvolvida."
    }
  },
  {
    id: 4,
    stageNumber: "04",
    stageTag: "ETAPA 4 — DEMONSTRAÇÃO AO VIVO",
    title: "Vamos sair da apresentação e entrar no produto",
    subtitle: "Demonstração real do Adeus Multa",
    topics: [
      {
        id: "demo1",
        number: "01",
        title: "Abrir a plataforma",
        explanation: "Vamos sair da apresentação e entrar na experiência real do usuário.",
        iconName: "ExternalLink",
        badge: "Acesso Real"
      },
      {
        id: "demo2",
        number: "02",
        title: "Mostrar o onboarding",
        explanation: "Aqui começa a jornada do usuário.",
        iconName: "UserCheck",
        badge: "Onboarding"
      },
      {
        id: "demo3",
        number: "03",
        title: "Mostrar a análise",
        explanation: "O sistema transforma os dados da infração em uma análise estruturada.",
        iconName: "Cpu",
        badge: "Análise Estruturada"
      },
      {
        id: "demo4",
        number: "04",
        title: "Mostrar a geração da defesa",
        explanation: "O resultado é transformado em um documento de defesa.",
        iconName: "FileCheck",
        badge: "Peça Formal"
      }
    ],
    highlightQuote: "AGORA É DEMONSTRAÇÃO AO VIVO",
    presenterNotes: {
      objective: "Sair dos slides e abrir o Adeus Multa em nova aba para demonstrar o fluxo real e objetivo.",
      talkingPoints: [
        "1. Clicar em 'ABRIR PLATAFORMA' para abrir a aplicação real em nova aba.",
        "2. Mostrar o onboarding e inserir ou selecionar um caso demonstrativo de infração.",
        "3. Exibir a análise determinística cruzando os fatos com as regras do CTB.",
        "4. Mostrar os fundamentos identificados e a geração do documento final.",
        "5. Concluir a demo em 3-5 minutos e voltar para esta aba para a etapa de negócio."
      ],
      sebraeFocus: "Comprovar a solidez e sofisticação do produto real em poucos minutos antes de estruturar o plano comercial."
    }
  },
  {
    id: 5,
    stageNumber: "05",
    stageTag: "ETAPA 5 — O NEGÓCIO",
    title: "A tecnologia existe. Agora precisamos validar o negócio.",
    subtitle: "Os 5 eixos prioritários para a sessão de consultoria e tomada de decisão estratégica",
    topics: [
      {
        id: "sb1",
        number: "01",
        title: "PÚBLICO",
        explanation: "Quem deve ser nosso primeiro cliente?",
        iconName: "Users",
        badge: "ICP / Segmentação"
      },
      {
        id: "sb2",
        number: "02",
        title: "MERCADO",
        explanation: "Existe demanda suficiente?",
        iconName: "TrendingUp",
        badge: "Validação de Demanda"
      },
      {
        id: "sb3",
        number: "03",
        title: "MODELO",
        explanation: "Como devemos monetizar?",
        iconName: "Building2",
        badge: "Monetização / B2C / B2B"
      },
      {
        id: "sb4",
        number: "04",
        title: "PREÇO",
        explanation: "Quanto o mercado está disposto a pagar?",
        iconName: "DollarSign",
        badge: "Precificação & Elasticidade"
      },
      {
        id: "sb5",
        number: "05",
        title: "AQUISIÇÃO",
        explanation: "Como conquistar os primeiros clientes?",
        iconName: "Target",
        badge: "Canais / Go-to-Market"
      }
    ],
    closingQuestion: "O QUE VOCÊ FARIA NOS PRÓXIMOS 30 DIAS?",
    closingTakeaway: "A tecnologia já existe. Agora queremos orientação para transformar essa tecnologia em um negócio validado, comercialmente sustentável e escalável.",
    presenterNotes: {
      objective: "Abrir a conversa prática com a consultora do Sebrae usando as 5 perguntas e o plano de 30 dias.",
      talkingPoints: [
        "Passar pelos 5 pilares para orientar a sessão de 1 hora.",
        "Passar a palavra para a consultora com a pergunta de impacto dos 30 dias.",
        "Anotar as 3 principais prioridades diretamente na tela durante o diálogo."
      ],
      sebraeFocus: "Sair da consultoria com os 3 primeiros passos práticos alinhados e validados pelo Sebrae."
    }
  }
];
