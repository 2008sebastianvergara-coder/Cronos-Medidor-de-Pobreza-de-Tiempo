import React, { useState } from 'react';
import { BookOpen, Scale, Clock, Glasses, ArrowRight, Zap, Target } from 'lucide-react';

type Tab = 'vickery' | 'goodin' | 'limtip' | 'comparison';

const ModelInfo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('limtip');

  const renderContent = () => {
    switch (activeTab) {
      case 'vickery':
        return (
          <div class="animate-fade-in space-y-4">
            <div class="flex items-start gap-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
              <div class="bg-blue-100 p-2 rounded-full min-w-[3rem] flex justify-center">
                <Scale class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-bold text-blue-900 text-lg">Clair Vickery (1977): "La Pionera del Trade-off"</h4>
                <p class="text-slate-700 mt-2">
                  <strong>La gran idea:</strong> El tiempo es dinero. Literalmente.
                </p>
                <p class="text-slate-600 text-sm mt-2">
                  Vickery fue la primera en decir que ser "pobre" no es solo faltar dinero. Imaginó un gráfico donde necesitas una combinación mínima de <em>Tiempo + Dinero</em> para sobrevivir.
                </p>
              </div>
            </div>
            <ul class="space-y-2 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-100">
              <li class="flex gap-2"><ArrowRight class="w-4 h-4 text-blue-500" /> <strong>Enfoque:</strong> Supervivencia básica.</li>
              <li class="flex gap-2"><ArrowRight class="w-4 h-4 text-blue-500" /> <strong>La Falla:</strong> Asumía que podías intercambiar tiempo por dinero fácilmente, lo cual no siempre es cierto si no hay empleo o guarderías.</li>
            </ul>
          </div>
        );
      case 'goodin':
        return (
          <div class="animate-fade-in space-y-4">
            <div class="flex items-start gap-4 bg-purple-50 p-4 rounded-lg border border-purple-100">
              <div class="bg-purple-100 p-2 rounded-full min-w-[3rem] flex justify-center">
                <Clock class="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h4 class="font-bold text-purple-900 text-lg">Robert Goodin: "El Filósofo de la Autonomía"</h4>
                <p class="text-slate-700 mt-2">
                  <strong>La gran idea:</strong> No es solo sobrevivir, es tener <em>libertad</em> (Tiempo Discrecional).
                </p>
                <p class="text-slate-600 text-sm mt-2">
                  Goodin argumenta que si pasas todo el día trabajando solo para comer y dormir, eres pobre, aunque ganes millones. Define lo "estrictamente necesario" y todo lo que sobra es tu verdadera riqueza: tu tiempo libre.
                </p>
              </div>
            </div>
             <ul class="space-y-2 text-sm text-slate-600 bg-white p-4 rounded-lg border border-slate-100">
              <li class="flex gap-2"><ArrowRight class="w-4 h-4 text-purple-500" /> <strong>Enfoque:</strong> Autonomía y Libertad.</li>
              <li class="flex gap-2"><ArrowRight class="w-4 h-4 text-purple-500" /> <strong>Métrica clave:</strong> Tiempo Discrecional (¿Cuánto control tienes sobre tu reloj?).</li>
            </ul>
          </div>
        );
      case 'limtip':
        return (
          <div class="animate-fade-in space-y-4">
            <div class="flex items-start gap-4 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div class="bg-indigo-100 p-2 rounded-full min-w-[3rem] flex justify-center">
                <Glasses class="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h4 class="font-bold text-indigo-900 text-lg">LIMTIP (Levy Institute): "El Detective de lo Oculto"</h4>
                <p class="text-slate-700 mt-2">
                  <strong>La gran idea:</strong> La Pobreza Oculta.
                </p>
                <p class="text-slate-600 text-sm mt-2">
                  Es el modelo más avanzado (Zacharias et al.). Descubre a la gente que las estadísticas oficiales ignoran: aquellos que ganan suficiente dinero <em>en teoría</em>, pero tienen un déficit de tiempo tan brutal que si tuvieran que pagar a alguien para limpiar/cocinar (costo de reemplazo), caerían en la pobreza.
                </p>
              </div>
            </div>
            <div class="bg-white p-4 rounded-lg border border-indigo-100">
                <h5 class="font-semibold text-indigo-800 text-sm mb-2 flex items-center gap-2">
                    <Zap class="w-4 h-4" />
                    ¿Cómo funciona?
                </h5>
                <p class="text-xs text-slate-600 leading-relaxed">
                    Calcula tu <strong>Déficit de Tiempo</strong> y le pone precio. Si te faltan 20 horas de cuidados a la semana, ¿cuánto costaría contratar a una niñera? Resta ese costo de tu sueldo. ¿Sigues sobre la línea de pobreza? Si no, eres <strong>Pobre Oculto</strong>.
                </p>
            </div>
          </div>
        );
      case 'comparison':
        return (
          <div class="animate-fade-in space-y-4">
            <h4 class="font-bold text-slate-800 text-center mb-4">El "Ring" de las Metodologías</h4>
            <div class="grid grid-cols-1 gap-4">
               <div class="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                  <div class="flex justify-between items-center mb-1">
                      <span class="font-bold text-slate-700">Vickery vs. LIMTIP</span>
                      <Target class="w-4 h-4 text-red-500" />
                  </div>
                  <p class="text-xs text-slate-600">
                      Vickery dice "¿Sobrevives?". LIMTIP dice "¿Realmente te alcanza si monetizamos tu falta de tiempo?". LIMTIP es más realista para políticas públicas modernas.
                  </p>
               </div>
               <div class="border border-slate-200 rounded-lg p-3 hover:bg-slate-50 transition-colors">
                  <div class="flex justify-between items-center mb-1">
                      <span class="font-bold text-slate-700">Goodin vs. El Mundo</span>
                      <Target class="w-4 h-4 text-green-500" />
                  </div>
                  <p class="text-xs text-slate-600">
                      Mientras los demás miran dinero, Goodin mira el reloj. Para él, un ejecutivo rico que trabaja 100 horas es "pobre de tiempo". Para LIMTIP, ese ejecutivo puede pagar servicio doméstico, así que no es pobre.
                  </p>
               </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div class="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div class="flex overflow-x-auto border-b border-slate-100">
        <button 
            onClick={() => setActiveTab('limtip')}
            class={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'limtip' ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
            LIMTIP (Levy)
        </button>
        <button 
            onClick={() => setActiveTab('goodin')}
            class={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'goodin' ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Goodin (Autonomía)
        </button>
        <button 
            onClick={() => setActiveTab('vickery')}
            class={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'vickery' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Vickery (Clásico)
        </button>
        <button 
            onClick={() => setActiveTab('comparison')}
            class={`flex-1 py-3 px-4 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === 'comparison' ? 'text-orange-600 border-b-2 border-orange-600 bg-orange-50/50' : 'text-slate-500 hover:text-slate-700'}`}
        >
            Comparativa
        </button>
      </div>

      <div class="p-6 min-h-[250px]">
        {renderContent()}
      </div>
    </div>
  );
};

export default ModelInfo;