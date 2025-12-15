
import React from 'react';
import { SimulationResult, PovertyStatus } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { AlertTriangle, CheckCircle, Clock, Briefcase, Coffee, Zap } from 'lucide-react';

interface Props {
  results: SimulationResult;
}

const ResultsDashboard: React.FC<Props> = ({ results }) => {
  const { limtip, currencyInfo } = results;
  const deficitCost = results.limtip.deficits.income || 0;
  const isHiddenPoor = results.limtip.status === PovertyStatus.HIDDEN_POOR || results.limtip.status === PovertyStatus.INCOME_POOR;
  
  // Calculate Time Distribution for the Pie Chart
  // Total Week = 168 hours
  const work = results.bardasi.score - results.goodin.score; // Approximation of committed time in chart logic context or grab raw
  // Let's reconstruction from raw data isn't passed directly here, so we infer or use what we have.
  // Actually, let's use the breakdown logic roughly:
  // Paid Work + Commute + Domestic = Committed.
  // Sleep = 49 (approx 7*7).
  // Free = 168 - sum.
  
  // To keep it simple and visual, let's use the scores available or pass raw user data. 
  // Since we only have 'results', we use `results.goodin.score` as Free Time.
  // `results.bardasi.score` is Total Work (Paid + Domestic).
  // We can infer Sleep + Personal as the rest roughly, or just categorize "Rest/Bio".
  
  const freeTime = results.goodin.score;
  const totalWork = results.bardasi.score; // Paid + Domestic
  const bioNeeds = 168 - freeTime - totalWork; // Sleep, Commute, Eating, etc.

  const pieData = [
    { name: 'Trabajo Total', value: totalWork, color: '#f97316' }, // Orange
    { name: 'Necesidades', value: bioNeeds, color: '#94a3b8' }, // Slate (Sleep, etc)
    { name: 'Tiempo Libre', value: freeTime, color: '#4ade80' }, // Green
  ];

  const formatCurrency = (val: number) => {
      return `${currencyInfo.symbol}${val.toLocaleString()}`;
  }

  // Fun Verdict Logic
  const getFunVerdict = () => {
      if (freeTime < 10) return { title: "🧟 Zombie Corporativo", desc: "Tu tiempo libre es un mito urbano. ¡Peligro de extinción!" };
      if (freeTime < 25) return { title: "🤹 Malabarista de Vida", desc: "Haces magia para tener un respiro. Cuidado con que se caiga una bola." };
      if (freeTime < 45) return { title: "⚖️ Equilibrista Amateur", desc: "Ni muy muy, ni tan tan. Sobrevives, pero ¿disfrutas?" };
      return { title: "🧘 Maestro Zen", desc: "Tienes tiempo de sobra. ¿Me regalas un par de horas?" };
  }
  
  const funVerdict = getFunVerdict();

  return (
    <div class="flex flex-col gap-6 animate-fade-in w-full">
      
      {/* Main Status Box (Compact) */}
      <div class={`rounded-xl border p-5 flex items-start gap-4 shadow-sm ${isHiddenPoor ? 'bg-red-50 border-red-200' : 'bg-green-50 border-green-200'}`}>
         <div class={`p-2 rounded-full flex-shrink-0 ${isHiddenPoor ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
            {isHiddenPoor ? <AlertTriangle class="w-6 h-6" /> : <CheckCircle class="w-6 h-6" />}
         </div>
         <div>
            <h2 class={`text-xl font-bold serif mb-2 ${isHiddenPoor ? 'text-red-900' : 'text-green-900'}`}>
                {isHiddenPoor ? 'Pobreza Oculta Detectada' : 'Sin Pobreza de Tiempo'}
            </h2>
            <p class="text-sm text-slate-800 leading-relaxed font-medium">
                {isHiddenPoor 
                    ? `Ganas dinero, pero pierdes vida. Tu déficit te cuesta ${formatCurrency(deficitCost)} "invisibles".`
                    : "Tienes el equilibrio financiero y temporal adecuado (por ahora)."}
            </p>
         </div>
      </div>

      {/* Visual Divider */}
      <div class="relative flex items-center py-2">
         <div class="flex-grow border-t border-slate-200 border-dashed"></div>
         <span class="flex-shrink-0 mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest bg-[#FDFBF7] px-2">
            La Realidad Divertida
         </span>
         <div class="flex-grow border-t border-slate-200 border-dashed"></div>
      </div>

      {/* FUN VISUAL SECTION (Replaces Bar Chart) */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* 1. Time Pizza */}
          <div class="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center">
             <h3 class="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
                 <Zap class="w-4 h-4 text-yellow-500" /> ¿En qué se te va la vida?
             </h3>
             <div class="h-40 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={40}
                            outerRadius={60}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <RechartsTooltip 
                             formatter={(val: number) => `${val.toFixed(0)} horas`}
                             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span class="text-xs font-bold text-slate-400">168h</span>
                </div>
             </div>
             <div class="flex justify-center gap-3 text-[10px] mt-2">
                 {pieData.map(d => (
                     <div key={d.name} class="flex items-center gap-1">
                         <div class="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                         <span class="text-slate-600">{d.name}</span>
                     </div>
                 ))}
             </div>
          </div>

          {/* 2. Fun Verdict Card */}
          <div class="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-xl shadow-md text-white flex flex-col justify-center relative overflow-hidden">
              <div class="absolute top-0 right-0 -mt-2 -mr-2 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
              <div class="relative z-10">
                  <p class="text-xs text-indigo-200 font-bold uppercase tracking-wider mb-1">Tu Veredicto</p>
                  <h3 class="text-2xl font-bold serif mb-2">{funVerdict.title}</h3>
                  <p class="text-sm text-indigo-100 opacity-90 leading-relaxed">
                      "{funVerdict.desc}"
                  </p>
              </div>
              <div class="mt-4 pt-3 border-t border-white/20 flex justify-between items-center">
                  <span class="text-xs font-medium">Tiempo libre real:</span>
                  <span class="text-xl font-bold">{freeTime.toFixed(0)}h <span class="text-xs font-normal opacity-70">/sem</span></span>
              </div>
          </div>
      </div>

      {/* Secondary Metrics (Simplified) */}
      <div class="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-center justify-between">
             <div class="flex items-center gap-3">
                 <div class="bg-orange-50 p-2 rounded-lg"><Briefcase class="w-5 h-5 text-orange-600" /></div>
                 <div>
                     <p class="text-[10px] text-slate-500 font-bold uppercase">Carga Total de Trabajo</p>
                     <p class="text-sm text-slate-600">Remunerado + Doméstico</p>
                 </div>
             </div>
             <div class="text-right">
                 <p class="text-2xl font-bold text-slate-900">{results.bardasi.score.toFixed(0)} <span class="text-xs font-normal text-slate-500">horas</span></p>
             </div>
      </div>

    </div>
  );
};

export default ResultsDashboard;
