import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Keyboard } from 'lucide-react';

interface ShortcutsHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShortcutsHelpModal: React.FC<ShortcutsHelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { key: '→ / Espaço / Enter', desc: 'Avançar para o próximo elemento / revelar conteúdo' },
    { key: '← / Backspace', desc: 'Voltar para o elemento / passo anterior' },
    { key: '0 - 7', desc: 'Pular diretamente para Capa (0) ou Etapas (1 a 7)' },
    { key: 'F', desc: 'Alternar modo Tela Cheia / Apresentação' },
    { key: 'N', desc: 'Abrir / Fechar Roteiro do Apresentador (Notas Sebrae)' },
    { key: 'R', desc: 'Reiniciar o slide atual (reocultar explicações)' },
    { key: 'Clique no Slide', desc: 'Avançar a revelação de forma intuitiva' },
    { key: '?', desc: 'Abrir esta ajuda de atalhos' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-lg bg-[#071d41] border border-[#1351b4]/50 rounded-2xl p-6 shadow-2xl space-y-5"
        >
          <div className="flex items-center justify-between pb-3 border-b border-[#1351b4]/40">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-lg bg-[#0c326f] text-[#00b0ff] border border-[#2684ff]/30">
                <Keyboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Atalhos da Apresentação</h3>
                <p className="text-xs text-slate-300">Controle ágil e profissional durante o Google Meet</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2.5">
            {shortcuts.map((sc, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded-lg bg-slate-950/70 border border-slate-800 text-xs sm:text-sm"
              >
                <span className="text-slate-200">{sc.desc}</span>
                <kbd className="px-2.5 py-1 rounded bg-[#0c326f] border border-[#2684ff]/40 text-[#00b0ff] font-mono text-xs font-bold shadow-sm">
                  {sc.key}
                </kbd>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#1351b4] to-[#2684ff] text-white text-xs font-bold transition-all shadow-md"
            >
              Entendido
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
