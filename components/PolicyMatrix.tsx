import React from 'react';
import { POLICY_MATRIX } from '../constants';
import { Landmark, Truck, Baby, Clock, Award, Zap } from 'lucide-react';

const iconMap: Record<string, any> = {
  museum: Landmark,
  truck: Truck,
  baby: Baby,
  clock: Clock,
  award: Award,
  zap: Zap,
  chart: Landmark // Fallback for chart if needed or use Landmark
};

const PolicyMatrix: React.FC = () => {
  return (
    <div class="py-12">
      <div class="text-center mb-12">
         <h2 class="text-3xl font-bold text-slate-800 serif mb-4">Matriz de Intervención Pública</h2>
         <p class="text-slate-600 max-w-2xl mx-auto">
             Soluciones estructurales propuestas por la literatura para abordar la pobreza de tiempo y las dimensiones ocultas.
         </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {POLICY_MATRIX.map((policy, idx) => {
          const Icon = iconMap[policy.icon] || Landmark;
          return (
            <div key={idx} class="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-all group">
              <div class="flex items-start gap-4 mb-4">
                <div class="bg-indigo-50 p-3 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <Icon class="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                    <h3 class="font-bold text-lg text-slate-800 serif leading-tight">{policy.title}</h3>
                    <p class="text-[10px] text-slate-400 mt-1 uppercase tracking-wider">{policy.authors}</p>
                </div>
              </div>
              
              <div class="mb-4">
                  <p class="text-sm text-slate-600 font-medium">
                    {policy.proposal}
                  </p>
              </div>
              
              <div class="bg-slate-50 p-3 rounded border border-slate-100 mt-auto">
                <p class="text-xs text-slate-500">
                  <strong class="text-indigo-900 block mb-1">Impacto:</strong> 
                  {policy.impact}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PolicyMatrix;