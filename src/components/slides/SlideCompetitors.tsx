import React from 'react';
import { motion } from 'motion/react';
import { SlideData } from '../../types/presentation';
import { UserCheck, Building, Cpu, ArrowRight, Shield, Layers, HelpCircle } from 'lucide-react';

interface SlideCompetitorsProps {
  slide: SlideData;
  revealedCount: number; // 0 = initial, 1 = Doutor Multas, 2 = Portal do Recurso, 3 = Recorrre.ai
  onItemClick?: (index: number) => void;
}

export const SlideCompetitors: React.FC<SlideCompetitorsProps> = ({
  slide,
  revealedCount,
  onItemClick,
}) => {
  const competitors = [
    {
      id: 'doutor_multas',
      name: 'Doutor Multas',
      modelType: 'Assessoria Especializada',
      badge: 'Modelo Humano / Consultivo',
      description: 'Foco no atendimento individual com análise feita por consultor ou advogado especialista.',
      flowSteps: ['Pessoa envia o caso', 'Especialista analisa', 'Defesa é preparada'],
      icon: UserCheck,
      borderColor: 'border-[#2684ff]',
      bgGrad: 'from-[#071d41] to-[#030d1d]',
    },
    {
      id: 'portal_recurso',
      name: 'Portal do Recurso',
      modelType: 'Serviço Especializado',
      badge: 'Preparação & Acompanhamento',
      description: 'Modelo de serviço voltado para elaboração assistida e suporte no acompanhamento de trâmites.',
      flowSteps: ['Recepção do pedido', 'Elaboração técnica', 'Acompanhamento do protocolo'],
      icon: Building,
      borderColor: 'border-[#fbbf24]',
      bgGrad: 'from-[#0c326f] to-[#071d41]',
    },
    {
      id: 'recorrre_ai',
      name: 'Recorrre.ai',
      modelType: 'Automação & IA',
      badge: 'Geração Automatizada',
      description: 'Plataforma que utiliza tecnologia e inteligência artificial generativa para produzir peças de defesa.',
      flowSteps: ['Preenchimento rápido', 'Processamento por IA', 'Download do documento'],
      icon: Cpu,
      borderColor: 'border-[#10b981]',
      bgGrad: 'from-[#071d41] to-[#030d1d]',
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col justify-center min-h-[calc(100vh-200px)] py-4">
      {/* Slide Header */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-6 sm:mb-8"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-3.5 py-1 text-xs font-black tracking-wider uppercase rounded-md bg-[#1351b4]/40 text-[#2684ff] border border-[#2684ff]/40 shadow-sm">
            {slide.stageTag}
          </span>
          <div className="h-4 w-px bg-slate-700" />
          <span className="text-xs text-slate-300 font-medium">Mapeamento de Mercado & Modelos Operacionais</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
          Já existem soluções. <span className="text-[#fbbf24]">Mas elas seguem modelos diferentes.</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-200 mt-2 font-normal max-w-3xl">
          O mercado está estruturado principalmente em formatos de assessoria manual de um lado e geradores automáticos do outro.
        </p>
      </motion.div>

      {/* 3 Model Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
        {competitors.map((item, index) => {
          const isRevealed = revealedCount >= index + 1;
          const isCurrentlyActive = revealedCount === index + 1;
          const IconComp = item.icon;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.12 }}
              onClick={() => onItemClick && onItemClick(index + 1)}
              className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 cursor-pointer overflow-hidden ${
                isCurrentlyActive
                  ? `bg-gradient-to-b from-[#0c326f] to-[#071d41] border-2 border-[#fbbf24] shadow-2xl ring-4 ring-[#fbbf24]/20 scale-[1.02]`
                  : isRevealed
                  ? `bg-gradient-to-b from-[#071d41]/95 to-[#030d1d]/95 border border-[#1351b4] shadow-lg hover:border-[#2684ff]`
                  : 'bg-[#071d41]/40 border border-slate-800 opacity-60 hover:opacity-90'
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-wider uppercase px-2.5 py-1 rounded bg-slate-900 text-[#fbbf24] border border-slate-700">
                    {item.badge}
                  </span>
                  <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300">
                    <IconComp className="w-5 h-5 text-emerald-400" />
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    {item.name}
                  </h3>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-[#2684ff] font-bold">
                    <span>Modelo:</span>
                    <span className="text-slate-200">{item.modelType}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed min-h-[36px]">
                  {item.description}
                </p>

                {/* Step-by-Step Flow visual */}
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 block">
                    Fluxo do modelo:
                  </span>
                  <div className="space-y-1.5">
                    {item.flowSteps.map((step, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-200 font-medium">
                        <span className="w-4 h-4 rounded-full bg-[#1351b4]/60 text-slate-300 text-[10px] font-mono flex items-center justify-center font-bold">
                          {sIdx + 1}
                        </span>
                        <span>{step}</span>
                        {sIdx < item.flowSteps.length - 1 && (
                          <ArrowRight className="w-3 h-3 text-slate-300 ml-auto" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Status footnote */}
              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-300">
                <span className="italic">Mapeamento neutro de mercado</span>
                {isRevealed && (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    Analisado
                  </span>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Synthesis Footnote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-6 p-4 rounded-2xl bg-[#071d41]/80 border border-[#1351b4]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300"
      >
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#fbbf24] shrink-0" />
          <span>
            <strong>Visão Estratégica:</strong> Demonstrar como o mercado opera para introduzir o posicionamento diferenciado do Adeus Multa no próximo passo.
          </span>
        </div>
        <div className="flex items-center gap-2 text-slate-300 text-[11px]">
          <span>Próxima etapa:</span>
          <span className="text-[#fbbf24] font-bold">Onde o Adeus Multa se Diferencia</span>
        </div>
      </motion.div>
    </div>
  );
};
