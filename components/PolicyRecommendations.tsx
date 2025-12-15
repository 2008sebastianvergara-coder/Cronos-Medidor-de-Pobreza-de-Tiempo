
import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Props {
  recommendation: string;
  loading: boolean;
}

const PolicyRecommendations: React.FC<Props> = ({ recommendation, loading }) => {
  return (
    <div class="bg-white p-8 rounded-xl shadow-lg border border-indigo-100 mt-8 relative overflow-hidden">
      {/* Decorative top border */}
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-purple-500"></div>

      <div class="flex items-center gap-2 mb-6">
        <div class="bg-indigo-100 p-2 rounded-full">
            <Sparkles class="w-5 h-5 text-indigo-600" />
        </div>
        <h2 class="text-xl font-bold text-indigo-900 serif">Diagnóstico Inteligente & Políticas</h2>
      </div>

      {loading ? (
        <div class="flex flex-col items-center justify-center py-12 text-slate-500">
          <Loader2 class="w-10 h-10 animate-spin mb-4 text-indigo-600" />
          <p class="text-sm font-medium animate-pulse">Cronos está analizando tus datos con modelos econométricos...</p>
        </div>
      ) : (
        <div class="text-slate-700 leading-relaxed">
          {recommendation ? (
            <ReactMarkdown
              components={{
                h3: ({node, ...props}) => <h3 class="text-lg font-bold text-indigo-900 mt-6 mb-3 serif border-b border-indigo-100 pb-1" {...props} />,
                p: ({node, ...props}) => <p class="mb-4 text-base leading-7" {...props} />,
                ul: ({node, ...props}) => <ul class="list-disc list-outside pl-5 mb-4 space-y-2 marker:text-indigo-500" {...props} />,
                li: ({node, ...props}) => <li class="pl-1" {...props} />,
                strong: ({node, ...props}) => <strong class="font-bold text-indigo-800" {...props} />
              }}
            >
              {recommendation}
            </ReactMarkdown>
          ) : (
            <div class="bg-slate-50 p-8 rounded-lg text-center border border-slate-200 border-dashed">
                <p class="text-slate-400 italic">Actualiza los cálculos en el simulador para obtener un diagnóstico personalizado de IA.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PolicyRecommendations;
