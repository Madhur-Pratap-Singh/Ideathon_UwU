import React from 'react';
import { Sparkles, Trophy, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 space-y-2 pointer-events-none w-full max-w-[400px] px-4">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-2xl border border-edge2 bg-surface/95 backdrop-blur-md shadow-warm animate-slideInRight text-left pointer-events-auto"
        >
          <div
            className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
              toast.type === 'xp'
                ? 'bg-sand/40 text-saddle'
                : toast.type === 'level'
                ? 'bg-saddle/15 text-saddle'
                : 'bg-olive-subtle text-coffee'
            }`}
          >
            {toast.type === 'xp' ? (
              <Sparkles size={16} />
            ) : toast.type === 'level' ? (
              <Trophy size={16} />
            ) : (
              <Info size={16} />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-coffee leading-tight">{toast.title}</p>
            {toast.subtitle && (
              <p className="text-[10px] text-coffee-muted mt-0.5 truncate">{toast.subtitle}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
