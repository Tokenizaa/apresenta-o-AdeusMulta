import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ConsultingNote } from '../../types/consultingNotes';
import { Copy, Check, Download, X, FileText, Share2 } from 'lucide-react';

interface ExportNotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  notes: ConsultingNote[];
}

export const ExportNotesModal: React.FC<ExportNotesModalProps> = ({
  isOpen,
  onClose,
  notes,
}) => {
  const [copied, setCopied] = useState(false);
  const [exportFormat, setExportFormat] = useState<'markdown' | 'txt' | 'json'>('markdown');

  if (!isOpen) return null;

  const generateMarkdown = (): string => {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    const total = notes.length;
    const completed = notes.filter((n) => n.completed).length;
    const highPriority = notes.filter((n) => n.priority === 'Alta' && !n.completed).length;

    let md = `# Anotações da Consultoria Sebrae — Adeus Multa\n`;
    md += `*Data: ${dateStr}*\n\n`;
    md += `## Resumo da Reunião\n`;
    md += `- **Total de registros:** ${total}\n`;
    md += `- **Pendências ativas:** ${total - completed}\n`;
    md += `- **Itens de Alta Prioridade:** ${highPriority}\n`;
    md += `- **Concluídos:** ${completed}\n\n`;
    md += `---\n\n`;
    md += `## Registros Estruturados\n\n`;

    notes.forEach((note, idx) => {
      const cat = note.category === 'Outros' && note.customCategory ? note.customCategory : note.category;
      const status = note.completed ? '[CONCLUÍDO]' : '[PENDENTE]';
      md += `### ${idx + 1}. [${cat.toUpperCase()}] ${status}\n`;
      md += `**Anotação:** ${note.content}\n\n`;
      md += `- **Prioridade:** ${note.priority}\n`;
      if (note.nextStep) md += `- **Próximo Passo:** ${note.nextStep}\n`;
      if (note.assignee) md += `- **Responsável:** ${note.assignee}\n`;
      if (note.deadline) md += `- **Prazo:** ${note.deadline}\n`;
      if (note.notes) md += `- **Observações:** ${note.notes}\n`;
      md += `\n`;
    });

    return md;
  };

  const generatePlainText = (): string => {
    const dateStr = new Date().toLocaleDateString('pt-BR');
    let text = `ANOTAÇÕES DA CONSULTORIA SEBRAE — ADEUS MULTA\n`;
    text += `Data: ${dateStr}\n\n`;
    text += `========================================================\n\n`;

    notes.forEach((note, idx) => {
      const cat = note.category === 'Outros' && note.customCategory ? note.customCategory : note.category;
      const status = note.completed ? '(CONCLUÍDO)' : '(EM ABERTO)';
      text += `${idx + 1}. [${cat.toUpperCase()}] ${status}\n`;
      text += `Anotação: ${note.content}\n`;
      text += `Prioridade: ${note.priority}\n`;
      if (note.nextStep) text += `Próximo Passo: ${note.nextStep}\n`;
      if (note.assignee) text += `Responsável: ${note.assignee}\n`;
      if (note.deadline) text += `Prazo: ${note.deadline}\n`;
      if (note.notes) text += `Observações: ${note.notes}\n`;
      text += `--------------------------------------------------------\n\n`;
    });

    return text;
  };

  const getExportContent = (): string => {
    if (exportFormat === 'json') {
      return JSON.stringify(notes, null, 2);
    }
    if (exportFormat === 'txt') {
      return generatePlainText();
    }
    return generateMarkdown();
  };

  const handleCopy = () => {
    const text = getExportContent();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const text = getExportContent();
    const extension = exportFormat === 'json' ? 'json' : exportFormat === 'txt' ? 'txt' : 'md';
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `anotacoes-consultoria-sebrae-adeus-multa.${extension}`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-2xl bg-gradient-to-b from-[#0c326f] via-[#071d41] to-[#030d1d] border-2 border-[#2684ff] rounded-3xl p-6 sm:p-7 shadow-2xl text-white relative flex flex-col max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#1351b4]/40">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#10b981] text-slate-950 font-black">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                Exportar Anotações da Consultoria
              </h3>
              <p className="text-xs text-slate-300">
                Gere um relatório pronto para compartilhar com a equipe ou salvar no Notion/Docs.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div className="flex items-center justify-between gap-2 my-4">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Formato:
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setExportFormat('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                exportFormat === 'markdown'
                  ? 'bg-[#10b981] text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Markdown (.md)
            </button>
            <button
              onClick={() => setExportFormat('txt')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                exportFormat === 'txt'
                  ? 'bg-[#10b981] text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              Texto (.txt)
            </button>
            <button
              onClick={() => setExportFormat('json')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                exportFormat === 'json'
                  ? 'bg-[#10b981] text-slate-950 shadow-md'
                  : 'bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              JSON (.json)
            </button>
          </div>
        </div>

        {/* Preview Area */}
        <div className="flex-1 overflow-y-auto rounded-2xl bg-slate-950/90 border border-[#1351b4]/40 p-4 font-mono text-xs text-slate-200 leading-relaxed max-h-72 select-all">
          <pre className="whitespace-pre-wrap">{getExportContent()}</pre>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-3 mt-5 pt-4 border-t border-[#1351b4]/40">
          <span className="text-xs text-slate-400">
            {notes.length} anotação(ões) incluída(s)
          </span>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold flex items-center gap-2 transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-black">Copiado para a área de transferência!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#fbbf24]" />
                  <span>Copiar Conteúdo</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-2 shadow-lg shadow-[#10b981]/30 transition-all"
            >
              <Download className="w-4 h-4 stroke-[2.5]" />
              <span>Baixar Arquivo</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
