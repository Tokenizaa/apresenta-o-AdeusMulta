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
        "Explicar que a apresentação tem 5 etapas rápidas para irmos direto ao plano de negócio."
      ],
      sebraeFocus: "Mostrar maturidade, simplicidade de comunicação e foco total em validar o negócio."
    }
  },
  {
    id: 1,
    stageNumber: "01",
    stageTag: "ETAPA 1 — O PROBLEMA",
    title: "Recebeu uma multa. E agora?",
    subtitle: "A maioria das pessoas não sabe se a autuação tem algum erro que pode ser questionado.",
    topics: [
      {
        id: "p1",
        number: "01",
        title: "É difícil saber se a multa está correta",
        explanation: "Existem informações, prazos e requisitos que precisam ser conferidos.",
        iconName: "HelpCircle",
        badge: "Dúvida do Motorista"
      },
      {
        id: "p2",
        number: "02",
        title: "Nem todo problema aparece à primeira vista",
        explanation: "Um erro de preenchimento, procedimento, sinalização ou documentação pode ser relevante para a defesa.",
        iconName: "AlertTriangle",
        badge: "Exigências Técnicas"
      },
      {
        id: "p3",
        number: "03",
        title: "O motorista geralmente não sabe como começar",
        explanation: "Ele precisa entender a autuação antes de decidir se vale a pena apresentar uma defesa.",
        iconName: "Compass",
        badge: "Falta de Clareza"
      }
    ],
    presenterNotes: {
      objective: "Mostrar a dúvida real que todo motorista tem ao receber uma notificação de trânsito.",
      talkingPoints: [
        "O problema não é só escrever a defesa: é saber se existe algo errado na autuação.",
        "A legislação tem centenas de regras e prazos que o cidadão não conhece.",
        "Hoje o motorista fica perdido entre modelos genéricos da internet e serviços caros."
      ],
      sebraeFocus: "Validar que o problema afeta milhões de motoristas e frotas em todo o Brasil."
    }
  },
  {
    id: 2,
    stageNumber: "02",
    stageTag: "ETAPA 2 — A SOLUÇÃO",
    title: "O Adeus Multa faz essa análise",
    subtitle: "Do envio da notificação até a montagem da defesa administrativa",
    topics: [
      {
        id: "s1",
        number: "01",
        title: "INFORMAR",
        explanation: "O motorista informa os dados da multa.",
        iconName: "Edit3",
        badge: "Passo 1"
      },
      {
        id: "s2",
        number: "02",
        title: "ENVIAR",
        explanation: "Apresenta o auto de infração e outros documentos disponíveis.",
        iconName: "Upload",
        badge: "Passo 2"
      },
      {
        id: "s3",
        number: "03",
        title: "CONFERIR",
        explanation: "O sistema verifica os fatos informados contra regras e informações jurídicas cadastradas.",
        iconName: "CheckCircle2",
        badge: "Passo 3"
      },
      {
        id: "s4",
        number: "04",
        title: "IDENTIFICAR",
        explanation: "Quando existem elementos compatíveis, o sistema identifica os possíveis fundamentos da defesa.",
        iconName: "Search",
        badge: "Passo 4"
      },
      {
        id: "s5",
        number: "05",
        title: "GERAR",
        explanation: "A defesa é montada com base nas informações encontradas.",
        iconName: "FileCheck",
        badge: "Passo 5"
      }
    ],
    highlightQuote: "A inteligência artificial melhora o texto, mas não decide qual argumento jurídico usar.",
    presenterNotes: {
      objective: "Mostrar o caminho simples de 5 passos da plataforma.",
      talkingPoints: [
        "Fluxo: Multa → Documentos → Conferência → Fundamentos → Defesa.",
        "Apresentar a frase-chave: a IA organiza o texto, mas quem confere o direito são as regras cadastradas.",
        "Não prometemos anulação automática, entregamos uma análise técnica honesta."
      ],
      sebraeFocus: "Demonstrar a proposta de valor clara e sem promessas mirabolantes."
    }
  },
  {
    id: 3,
    stageNumber: "03",
    stageTag: "ETAPA 3 — O QUE EXISTE POR TRÁS",
    title: "Não é simplesmente pedir para uma IA escrever uma defesa",
    subtitle: "Como o sistema garante que cada argumento seja baseado em regras reais",
    topics: [
      {
        id: "d1",
        number: "01",
        title: "REGRAS",
        explanation: "O sistema verifica condições objetivas antes de considerar um fundamento.",
        iconName: "CheckSquare",
        badge: "Critérios Objetivos"
      },
      {
        id: "d2",
        number: "02",
        title: "LEGISLAÇÃO",
        explanation: "As regras jurídicas ficam organizadas para serem consultadas conforme o caso.",
        iconName: "BookOpen",
        badge: "Código de Trânsito"
      },
      {
        id: "d3",
        number: "03",
        title: "DATA",
        explanation: "Uma regra pode depender da data em que a infração aconteceu.",
        iconName: "Calendar",
        badge: "Linha do Tempo"
      },
      {
        id: "d4",
        number: "04",
        title: "DOCUMENTOS",
        explanation: "Os documentos apresentados pelo motorista fazem parte da análise.",
        iconName: "FileSearch",
        badge: "Conferência Real"
      },
      {
        id: "d5",
        number: "05",
        title: "IA",
        explanation: "A inteligência artificial ajuda a organizar e melhorar o texto. Ela não pode inventar fundamento jurídico.",
        iconName: "Sparkles",
        badge: "Redação Clara"
      }
    ],
    highlightQuote: "Primeiro verificamos. Depois escrevemos.",
    presenterNotes: {
      objective: "Explicar por que nossa solução é diferente de um ChatGPT comum.",
      talkingPoints: [
        "Um chatbot genérico inventa leis e comete erros graves.",
        "Nosso sistema organiza a legislação, confere prazos e datas, e só depois usa IA para redigir.",
        "Frase de efeito: Primeiro verificamos. Depois escrevemos."
      ],
      sebraeFocus: "Mostrar que existe tecnologia própria e barreira de proteção no produto."
    }
  },
  {
    id: 4,
    stageNumber: "04",
    stageTag: "ETAPA 4 — DEMONSTRAÇÃO REAL",
    title: "Agora vamos ver o sistema funcionando",
    subtitle: "Da multa até a defesa.",
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
        "4. Voltar para esta aba para discutir o modelo de negócio."
      ],
      sebraeFocus: "Provar que a tecnologia já é realidade antes de debater a estratégia comercial."
    }
  },
  {
    id: 5,
    stageNumber: "05",
    stageTag: "ETAPA 5 — O QUE PRECISAMOS VALIDAR",
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
      objective: "Conduzir a conversa final com a consultora do Sebrae e preencher os 3 passos práticos.",
      talkingPoints: [
        "Passar pelas 5 perguntas como guia da conversa.",
        "Apresentar a tela final: 'Quero sair daqui com um plano de 30 dias.'",
        "Perguntar diretamente: 'O que você faria no meu lugar?'",
        "Anotar as 3 respostas ao vivo durante a reunião."
      ],
      sebraeFocus: "Sair da reunião com 3 decisões práticas: O que testar primeiro, Quem procurar e Quanto investir."
    }
  }
];

