import React, { useState } from 'react';
import {
  KanbanCard,
  BusinessGoal,
  BusinessMetric,
  BusinessPlanSection,
  DiagnosticItem,
  ConsultingSession,
  TimelineEvent,
  ProjectDocument,
} from '../../types/businessEvolution';
import {
  X,
  Copy,
  Check,
  Download,
  FileText,
  FileSpreadsheet,
  FileCode,
  ShieldCheck
} from 'lucide-react';

interface ExportEvolutionModalProps {
  cards: KanbanCard[];
  goals: BusinessGoal[];
  metrics: BusinessMetric[];
  sections: BusinessPlanSection[];
  diagnostics: DiagnosticItem[];
  sessions: ConsultingSession[];
  events: TimelineEvent[];
  documents: ProjectDocument[];
  onClose: () => void;
}

export const ExportEvolutionModal: React.FC<ExportEvolutionModalProps> = ({
  cards,
  goals,
  metrics,
  sections,
  diagnostics,
  sessions,
  events,
  documents,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'markdown' | 'text' | 'json'>('markdown');

  const generateMarkdown = (): string => {
    let md = `# RELATÓRIO ESTRUTURADO DE EVOLUÇÃO DO NEGÓCIO — ADEUS MULTA\n`;
    md += `*Alinhado à Metodologia Oficial do Sebrae Nacional e Atendimento Consultivo*\n`;
    md += `*Gerado em: ${new Date().toLocaleDateString('pt-BR')}*\n\n`;
    md += `---\n\n`;

    // 1. Visão Geral
    md += `## 1. SITUAÇÃO ATUAL DO NEGÓCIO\n`;
    md += `- **Negócio**: Adeus Multa (Defesa de Trânsito com Rigor Técnico e IA)\n`;
    md += `- **Fase**: Validação de Tração Comercial & Piloto de 30 Dias\n`;
    md += `- **Total de Ações no Kanban**: ${cards.length} (${cards.filter((c) => c.columnId === 'concluido' || c.columnId === 'validado').length} concluídas)\n`;
    md += `- **Metas Estratégicas**: ${goals.length} ativas\n\n`;

    // 2. Diagnóstico
    md += `## 2. DIAGNÓSTICO ESTRATÉGICO\n`;
    const catMap: Record<string, string> = {
      pontos_fortes: 'Pontos Fortes',
      pontos_atencao: 'Pontos de Atenção',
      problemas: 'Problemas',
      oportunidades: 'Oportunidades',
      riscos: 'Riscos',
      prioridades: 'Prioridades',
    };
    Object.entries(catMap).forEach(([catKey, catLabel]) => {
      const items = diagnostics.filter((d) => d.category === catKey);
      if (items.length > 0) {
        md += `### ${catLabel}\n`;
        items.forEach((item) => {
          md += `- **${item.title}** (Impacto: ${item.impact})\n  ${item.description}\n`;
        });
        md += `\n`;
      }
    });

    // 3. Plano de Negócio Sebrae
    md += `## 3. PLANO DE NEGÓCIO MODULAR (METODOLOGIA OFICIAL SEBRAE)\n\n`;
    sections.forEach((sec) => {
      md += `### ${sec.title} [${sec.officialSebraeCode}]\n`;
      md += `*Status: ${sec.currentStatus} | Ref: ${sec.sourceReference}*\n\n`;
      md += `**Informações Registradas:**\n${sec.filledData}\n\n`;
      if (sec.pendingItems.length > 0) {
        md += `**Pendências:**\n`;
        sec.pendingItems.forEach((p) => (md += `- [ ] ${p}\n`));
        md += `\n`;
      }
      if (sec.decisions.length > 0) {
        md += `**Decisões:**\n`;
        sec.decisions.forEach((d) => (md += `- ✓ ${d}\n`));
        md += `\n`;
      }
    });

    // 4. Plano de Ação 5W2H
    md += `## 4. PLANO DE AÇÃO (5W2H) & KANBAN\n\n`;
    cards.forEach((card, idx) => {
      md += `### ${idx + 1}. ${card.title}\n`;
      md += `- **Status**: ${card.columnId.toUpperCase()} | **Prioridade**: ${card.priority}\n`;
      md += `- **O que**: ${card.description}\n`;
      if (card.whyReason) md += `- **Por que**: ${card.whyReason}\n`;
      md += `- **Quem**: ${card.assignee} | **Quando**: ${card.deadline}\n`;
      if (card.targetResult) md += `- **Resultado Esperado**: ${card.targetResult}\n`;
      if (card.actualResult) md += `- **Resultado Alcançado**: ${card.actualResult}\n`;
      if (card.checklist.length > 0) {
        md += `- **Checklist**:\n`;
        card.checklist.forEach((c) => {
          md += `  - [${c.completed ? 'x' : ' '}] ${c.text}\n`;
        });
      }
      md += `\n`;
    });

    // 5. Metas & Indicadores
    md += `## 5. METAS ESTRATÉGICAS & INDICADORES CHAVE\n\n`;
    goals.forEach((g) => {
      md += `- **${g.title}**: ${g.currentValue} / ${g.targetValue} ${g.unit} (${g.progress}% concluído) — Prazo: ${g.deadline} (Resp: ${g.assignee})\n`;
    });
    md += `\n### Indicadores do Negócio:\n`;
    metrics.forEach((m) => {
      md += `- **${m.name}** [${m.category}]: Atual: ${m.currentValue} | Alvo: ${m.targetValue} (${m.period})\n`;
    });
    md += `\n`;

    // 6. Consultorias
    md += `## 6. ATAS DAS CONSULTORIAS SEBRAE\n\n`;
    sessions.forEach((s) => {
      md += `### Sessão de ${s.date} — ${s.subject}\n`;
      md += `- **Consultor(a)**: ${s.consultant} (${s.consultantRole})\n`;
      md += `- **Diagnóstico**: ${s.diagnosisSummary}\n`;
      md += `- **Recomendações**:\n`;
      s.recommendations.forEach((r) => (md += `  - ${r}\n`));
      md += `- **Decisões**:\n`;
      s.decisions.forEach((d) => (md += `  - ✓ ${d}\n`));
      md += `- **Próximos Passos**:\n`;
      s.nextSteps.forEach((n) => (md += `  - → ${n}\n`));
      md += `\n`;
    });

    return md;
  };

  const generateText = (): string => {
    return generateMarkdown()
      .replace(/#{1,6} /g, '')
      .replace(/\*\*/g, '')
      .replace(/\*/g, '');
  };

  const generateJSON = (): string => {
    return JSON.stringify(
      {
        exportedAt: new Date().toISOString(),
        businessName: 'Adeus Multa',
        overview: {
          totalCards: cards.length,
          totalGoals: goals.length,
          totalMetrics: metrics.length,
        },
        diagnostics,
        businessPlan: sections,
        actionPlanCards: cards,
        goals,
        metrics,
        consultingSessions: sessions,
        timelineEvents: events,
        documents,
      },
      null,
      2
    );
  };

  const getContent = () => {
    if (exportFormat === 'json') return generateJSON();
    if (exportFormat === 'text') return generateText();
    return generateMarkdown();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const content = getContent();
    const extension =
      exportFormat === 'json' ? 'json' : exportFormat === 'text' ? 'txt' : 'md';
    const mimeType =
      exportFormat === 'json'
        ? 'application/json'
        : 'text/markdown;charset=utf-8';

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Acompanhamento_Evolucao_Negocio_Sebrae_${new Date().toISOString().slice(0, 10)}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <div className="w-full max-w-3xl p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4 max-h-[90vh] flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#fbbf24] font-black uppercase tracking-wider mb-0.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Exportação Estruturada do Negócio</span>
            </div>
            <h3 className="text-lg font-black text-white">
              Exportar Plano de Negócio, Ações & Consultoria
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between gap-3 p-2 rounded-2xl bg-slate-950/80 border border-slate-800">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setExportFormat('markdown')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                exportFormat === 'markdown'
                  ? 'bg-[#2684ff] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setExportFormat('text')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                exportFormat === 'text'
                  ? 'bg-[#2684ff] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Texto (.txt)
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                exportFormat === 'json'
                  ? 'bg-[#2684ff] text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              JSON (.json)
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 hover:text-white flex items-center gap-1.5 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#fbbf24]" />
                  <span>Copiar Tudo</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-3.5 py-1.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md transition-all"
            >
              <Download className="w-3.5 h-3.5 stroke-[3]" />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 min-h-[260px] max-h-[380px] overflow-y-auto p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed">
          {getContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
          <span>
            Pronto para colar no Google Docs, Notion, Word ou enviar por WhatsApp/E-mail.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-200 hover:text-white font-bold"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
