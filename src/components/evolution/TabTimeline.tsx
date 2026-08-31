import React, { useState } from 'react';
import { TimelineEvent } from '../../types/businessEvolution';
import {
  History,
  Plus,
  Calendar,
  CheckCircle2,
  Users,
  Target,
  Award,
  FileSpreadsheet,
  ArrowRight,
  ShieldCheck,
  Search,
  FileText,
  Copy,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface TabTimelineProps {
  events: TimelineEvent[];
  onAddEvent: (evt: Omit<TimelineEvent, 'id'>) => void;
}

export const TabTimeline: React.FC<TabTimelineProps> = ({
  events,
  onAddEvent,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBriefingModal, setShowBriefingModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [filterType, setFilterType] = useState<string>('todos');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TimelineEvent['type']>('decisao');
  const [author, setAuthor] = useState('Equipe Fundadora');
  const [badge, setBadge] = useState('Marco');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('pt-BR')} ${now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    onAddEvent({
      date: formattedDate,
      type,
      title: title.trim(),
      description: description.trim(),
      author: author.trim(),
      badge: badge.trim(),
    });

    setTitle('');
    setDescription('');
    setShowAddModal(false);
  };

  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'consultoria':
        return <Users className="w-4 h-4 text-[#fbbf24]" />;
      case 'validacao':
      case 'acao_concluida':
        return <CheckCircle2 className="w-4 h-4 text-[#10b981]" />;
      case 'meta_concluida':
      case 'meta_criada':
        return <Target className="w-4 h-4 text-[#2684ff]" />;
      case 'decisao':
        return <Award className="w-4 h-4 text-purple-400" />;
      default:
        return <History className="w-4 h-4 text-cyan-400" />;
    }
  };

  const filteredEvents = events.filter((evt) => {
    const matchesType =
      filterType === 'todos' ||
      (filterType === 'consultoria' && evt.type === 'consultoria') ||
      (filterType === 'acao' && (evt.type === 'acao_concluida' || evt.type === 'validacao')) ||
      (filterType === 'meta' && (evt.type === 'meta_criada' || evt.type === 'meta_concluida')) ||
      (filterType === 'decisao' && evt.type === 'decisao');

    const matchesSearch =
      evt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      evt.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (evt.badge && evt.badge.toLowerCase().includes(searchTerm.toLowerCase()));

    return matchesType && matchesSearch;
  });

  const generateMeetingBriefing = () => {
    return `# BRIEFING PREPARATÓRIO PARA CONSULTORIA SEBRAE
Data de Emissão: ${new Date().toLocaleDateString('pt-BR')}
Projeto: Adeus Multa (DefesAI)

1. ONDE ESTÁVAMOS NO ÚLTIMO ENCONTRO:
- Validação inicial do motor de inteligência jurídica CTB
- Alinhamento da precificação fixa e estruturação do plano de negócios

2. PRINCIPAIS AVANÇOS & MUDANÇAS DE STATUS:
${events
  .slice(0, 8)
  .map((e) => `- [${e.date}] ${e.title} (${e.author}) -> ${e.description}`)
  .join('\n')}

3. PAUTA SUGERIDA PARA A PRÓXIMA REUNIÃO:
- Avaliação dos resultados do teste piloto comercial
- Validação das projeções de custos fixos vs. variáveis (DRE)
- Estruturação de canal de distribuição B2B com cooperativas de motoristas
- Definição do próximo ciclo de metas (OKRs)

4. DÚVIDAS E PONTOS DE APOIO DO SEBRAE:
- Modelos recomendados de parcerias com associações de classe
- Orientações fiscais para enquadramento como Simples Nacional vs Lucro Presumido
- Suporte para acesso a editais de inovação e aceleração`;
  };

  const handleCopyBriefing = () => {
    navigator.clipboard.writeText(generateMeetingBriefing());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#0c326f] to-[#071d41] border border-[#1351b4] shadow-xl text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <History className="w-4 h-4 text-[#fbbf24]" />
              <span className="text-xs font-black uppercase tracking-wider text-[#fbbf24]">
                Linha do Tempo e Memória Estratégica
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-white">
              Evolução Contínua do Negócio
            </h3>
            <p className="text-xs text-slate-300">
              Registro automático de mudanças de status das ações e marcos importantes de consultorias anteriores.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={() => setShowBriefingModal(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-[#2684ff]/50 hover:bg-[#0c326f]/70 text-slate-200 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
            >
              <Sparkles className="w-4 h-4 text-[#fbbf24]" />
              <span>Preparar Pauta de Reunião</span>
            </button>

            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-lg shadow-[#10b981]/30 transition-all"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>+ Registrar Marco</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5 Core Questions Visual Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
            1. Onde Estávamos?
          </span>
          <p className="text-xs text-slate-200 font-medium">
            Ideia técnica com motor CTB pronto, mas sem validação comercial.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-[#fbbf24] uppercase tracking-wider block">
            2. Recomendação Sebrae
          </span>
          <p className="text-xs text-slate-200 font-medium">
            Piloto com 20 motoristas, preço fixo e DRE projetado oficial.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-[#2684ff] uppercase tracking-wider block">
            3. O Que Fizemos?
          </span>
          <p className="text-xs text-slate-200 font-medium">
            Kanban estruturado, teste com 8 motoristas e catálogo de 32 teses.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-[#10b981] uppercase tracking-wider block">
            4. Qual o Resultado?
          </span>
          <p className="text-xs text-slate-200 font-medium">
            3 clientes convertidos, CAC estimado em R$ 14,50 e 88 NPS.
          </p>
        </div>

        <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-center space-y-1">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block">
            5. O Que Faremos Agora?
          </span>
          <p className="text-xs text-slate-200 font-medium">
            Fechar acordo com cooperativa de motoristas e concluir o DRE.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-2xl bg-[#071d41]/90 border border-[#1351b4]/40">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs font-bold text-slate-300 mr-1">Filtrar por:</span>
          {[
            { id: 'todos', label: 'Todos os Eventos' },
            { id: 'consultoria', label: 'Consultorias Sebrae' },
            { id: 'acao', label: 'Ações e Status' },
            { id: 'meta', label: 'Metas' },
            { id: 'decisao', label: 'Decisões' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilterType(f.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                filterType === f.id
                  ? 'bg-[#2684ff] text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar no histórico..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#2684ff] w-44 sm:w-56"
            />
          </div>
        </div>
      </div>

      {/* Chronological Timeline Feed */}
      <div className="p-5 rounded-3xl bg-[#071d41]/90 border border-[#1351b4] shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Registro Cronológico ({filteredEvents.length} eventos)
          </h4>
          <span className="text-[11px] text-slate-400">
            Atualizações ordenadas das mais recentes às mais antigas
          </span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="py-12 text-center border border-dashed border-slate-800 rounded-2xl">
            <History className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-xs text-slate-400">
              Nenhum evento encontrado com os filtros aplicados.
            </p>
          </div>
        ) : (
          <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1351b4]">
            {filteredEvents.map((evt) => (
              <div key={evt.id} className="relative space-y-1.5 text-white">
                {/* Timeline Pin Indicator */}
                <div className="absolute -left-6 top-0.5 p-1 rounded-full bg-slate-950 border-2 border-[#2684ff] shadow">
                  {getEventIcon(evt.type)}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-black text-slate-950 bg-[#fbbf24] px-2 py-0.5 rounded">
                    {evt.date}
                  </span>
                  {evt.badge && (
                    <span className="text-[10px] font-bold text-slate-300 bg-slate-900 border border-slate-700 px-2 py-0.5 rounded">
                      {evt.badge}
                    </span>
                  )}
                  <span className="text-[11px] text-slate-400">
                    Por: <strong className="text-white">{evt.author}</strong>
                  </span>
                </div>

                <h5 className="text-sm font-bold text-white">
                  {evt.title}
                </h5>

                <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                  {evt.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: Add Event */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-md p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4">
            <h3 className="text-base font-black text-white">
              Registrar Marco na Linha do Tempo
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Título do Marco
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Parceria com Associação Fechada"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-[#2684ff]"
                />
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Tipo de Evento
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as TimelineEvent['type'])}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                >
                  <option value="decisao">Decisão Estratégica</option>
                  <option value="consultoria">Consultoria Sebrae</option>
                  <option value="validacao">Validação de Resultado</option>
                  <option value="meta_concluida">Meta Concluída</option>
                  <option value="documento">Documento Homologado</option>
                  <option value="mudanca">Mudança de Rota</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-300 block mb-1">
                  Descrição dos Fatos
                </label>
                <textarea
                  rows={3}
                  placeholder="O que aconteceu, impacto gerado e próximos passos..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-white focus:outline-none"
                />
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
                  Salvar Marco
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Meeting Preparation Briefing */}
      {showBriefingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#071d41] border-2 border-[#1351b4] shadow-2xl text-white space-y-4 max-h-[90vh] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#fbbf24]" />
                  <h3 className="text-base font-black text-white">
                    Pauta Automática para Próxima Consultoria Sebrae
                  </h3>
                </div>
                <button
                  onClick={() => setShowBriefingModal(false)}
                  className="text-slate-400 hover:text-white text-xs font-bold"
                >
                  Fechar
                </button>
              </div>

              <p className="text-xs text-slate-300 mt-2 mb-3">
                Briefing compilado automaticamente a partir do histórico de marcos, mudanças de status no Kanban e metas vigentes para orientar a reunião com a consultora.
              </p>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 font-mono text-xs text-slate-200 overflow-y-auto max-h-[50vh] whitespace-pre-wrap leading-relaxed">
                {generateMeetingBriefing()}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-400">
                Pronto para enviar por e-mail ou WhatsApp da consultora
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowBriefingModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-slate-300 hover:text-white text-xs font-bold"
                >
                  Fechar
                </button>

                <button
                  onClick={handleCopyBriefing}
                  className="px-4 py-2 rounded-xl bg-[#10b981] hover:bg-[#059669] text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-slate-950 stroke-[3]" />
                      <span>Copiado com Sucesso!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-950" />
                      <span>Copiar Pauta Formatada</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
