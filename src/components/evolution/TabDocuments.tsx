import React, { useState } from 'react';
import { ProjectDocument } from '../../types/businessEvolution';
import {
  FolderOpen,
  Plus,
  FileText,
  FileSpreadsheet,
  Download,
  Tag,
  ShieldCheck,
  Calendar,
  ExternalLink,
  Trash2
} from 'lucide-react';

interface TabDocumentsProps {
  documents: ProjectDocument[];
  onAddDocument: (doc: Omit<ProjectDocument, 'id'>) => void;
  onDeleteDocument: (id: string) => void;
}

export const TabDocuments: React.FC<TabDocumentsProps> = ({
  documents,
  onAddDocument,
  onDeleteDocument,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProjectDocument['category']>('Oficial Sebrae');
  const [source, setSource] = useState('Sebrae');
  const [tagsInput, setTagsInput] = useState('');
  const [relatedTarget, setRelatedTarget] = useState('Plano de Negócio');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onAddDocument({
      title: title.trim(),
      category,
      source: source.trim() || 'Interno',
      tags: tags.length > 0 ? tags : ['Geral'],
      createdAt: new Date().toLocaleDateString('pt-BR'),
      relatedTarget: relatedTarget.trim() || 'Geral',
    });

    setTitle('');
    setTagsInput('');
    setShowAddModal(false);
  };

  const getDocIcon = (cat: ProjectDocument['category']) => {
    switch (cat) {
      case 'Planilha Financeira':
        return <FileSpreadsheet className="w-5 h-5 text-emerald-400" />;
      case 'Oficial Sebrae':
        return <ShieldCheck className="w-5 h-5 text-[#fbbf24]" />;
      default:
        return <FileText className="w-5 h-5 text-[#2684ff]" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FolderOpen className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Repositório de Documentos & Modelos Oficiais
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Documentos Vinculados ao Negócio
            </h3>
            <p className="text-xs text-slate-300">
              Guarde atas, planilhas financeiras do Sebrae, estudos de trânsito e contratos vinculados a metas e tarefas.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>+ Anexar Documento</span>
          </button>
        </div>
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] hover:border-[#2684ff] shadow-lg text-white space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2.5">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                    {getDocIcon(doc.category)}
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#fbbf24] block">
                      {doc.category}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Fonte: {doc.source}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteDocument(doc.id)}
                  className="p-1 rounded text-slate-400 hover:text-red-400"
                  title="Excluir"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {doc.title}
              </h4>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 pt-1">
                {doc.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-bold text-slate-300 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Target and Date Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-[10px] text-slate-400">
              <span>Vinculado: <strong className="text-white">{doc.relatedTarget || 'Geral'}</strong></span>
              <span>{doc.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Document */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Anexar Novo Documento ao Projeto
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Título do Documento
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Planilha de DRE e Ponto de Equilíbrio.xlsx"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Categoria
                  </label>
                  <select
                    value={category}
                    onChange={(e) =>
                      setCategory(e.target.value as ProjectDocument['category'])
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  >
                    <option value="Oficial Sebrae">Oficial Sebrae</option>
                    <option value="Plano de Negócio">Plano de Negócio</option>
                    <option value="Planilha Financeira">Planilha Financeira</option>
                    <option value="Estudo de Mercado">Estudo de Mercado</option>
                    <option value="Pesquisa">Pesquisa</option>
                    <option value="Contrato">Contrato / Parceria</option>
                    <option value="Apresentação">Apresentação</option>
                    <option value="Outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">
                    Fonte / Órgão
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Sebrae SC / Jurídico"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Tags (separadas por vírgula)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Financeiro, DRE, 2026"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Vínculo com Módulo
                </label>
                <select
                  value={relatedTarget}
                  onChange={(e) => setRelatedTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                >
                  <option value="Plano de Negócio">Plano de Negócio</option>
                  <option value="Plano Financeiro">Plano Financeiro</option>
                  <option value="Consultorias">Consultorias</option>
                  <option value="Kanban / Ações">Kanban / Ações</option>
                  <option value="Metas">Metas</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white font-bold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 font-black"
                >
                  Anexar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
