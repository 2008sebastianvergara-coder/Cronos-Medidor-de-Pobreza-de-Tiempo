
import React, { useEffect } from 'react';
import { UserProfile } from '../types';
import { Briefcase, Home, DollarSign, Car, Moon, User, HelpCircle, Users, Activity, Globe } from 'lucide-react';
import { CURRENCY_CONFIG } from '../constants';

interface Props {
  user: UserProfile;
  onChange: (field: keyof UserProfile, value: any) => void;
  onCalculate: () => void;
  onOpenInfo: () => void;
}

const SliderInput = ({ label, value, max, onChange, icon: Icon, colorClass, unit = 'h' }: any) => (
  <div class="mb-6 group">
    <div class="flex justify-between items-center mb-2">
      <label class="text-sm font-semibold text-slate-700 flex items-center gap-2 group-hover:text-slate-900 transition-colors">
        <Icon class={`w-4 h-4 ${colorClass}`} /> {label}
      </label>
      <div class="flex items-center">
        <input 
            type="number" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            class={`text-sm font-bold ${colorClass} bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 px-2 py-1 rounded-md w-24 text-right outline-none transition-all`}
        />
        <span class="text-xs text-slate-400 ml-1 font-medium">{unit}</span>
      </div>
    </div>
    <input
      type="range"
      min="0"
      max={max}
      value={value || 0}
      onChange={(e) => onChange(e.target.value)}
      class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500 transition-all"
    />
  </div>
);

const InputForm: React.FC<Props> = ({ user, onChange, onCalculate, onOpenInfo }) => {
  const currencySettings = CURRENCY_CONFIG[user.currency];

  const handleChange = (field: keyof UserProfile, value: string | number) => {
    let numValue = typeof value === 'string' ? parseFloat(value) : value;
    if (isNaN(numValue)) numValue = 0;
    onChange(field, numValue);
  };

  const handleCurrencySwitch = (newCurrency: 'USD' | 'CLP') => {
      // Reset income to a reasonable default when switching to prevent confusion
      const newIncome = newCurrency === 'CLP' ? 600000 : 1200;
      onChange('currency', newCurrency);
      onChange('monthlyIncome', newIncome);
  };

  const getGenderMessage = () => {
    if (user.gender === 'female') return "Las mujeres realizan en promedio 3 veces más trabajo no remunerado que los hombres (OIT).";
    if (user.gender === 'male') return "Los hombres suelen tener menor carga doméstica, pero mayor jornada laboral remunerada.";
    return "La identidad de género influye significativamente en la asignación cultural del tiempo.";
  };

  return (
    <div class="bg-white p-6 rounded-xl shadow-lg border border-slate-200 h-full flex flex-col">
      <div class="mb-6 border-b border-slate-100 pb-4 flex justify-between items-center">
        <h2 class="text-xl font-bold text-slate-800 serif">Perfil del Hogar</h2>
        <button 
           onClick={onOpenInfo}
           class="text-indigo-600 hover:bg-indigo-50 p-2 rounded-full transition-colors flex items-center gap-1 text-xs font-bold"
           title="Ver explicación de modelos"
        >
           <HelpCircle class="w-4 h-4" />
           <span class="hidden sm:inline">Modelos</span>
        </button>
      </div>
      
      {/* SIMULATOR TOGGLE */}
      <div class="mb-6 bg-slate-100 p-1 rounded-lg flex relative">
          <button 
            onClick={() => handleCurrencySwitch('USD')}
            class={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${user.currency === 'USD' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <Globe class="w-3 h-3" /> Simulador USD
          </button>
          <button 
            onClick={() => handleCurrencySwitch('CLP')}
            class={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-xs font-bold transition-all ${user.currency === 'CLP' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
              <span class="text-[10px]">🇨🇱</span> Simulador CLP
          </button>
      </div>

      <div class="space-y-6 flex-grow">
            
            {/* Gender & Age Section */}
            <div class="bg-gradient-to-br from-indigo-50 to-white p-4 rounded-xl border border-indigo-100 shadow-sm">
               <div class="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <label class="block text-xs font-bold text-indigo-900 mb-1.5 uppercase tracking-wide">Género</label>
                    <div class="relative">
                      <select 
                        value={user.gender}
                        onChange={(e) => onChange('gender', e.target.value)}
                        class="w-full p-2 pl-8 bg-white border border-indigo-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none appearance-none shadow-sm"
                      >
                        <option value="female">Mujer</option>
                        <option value="male">Hombre</option>
                        <option value="other">Otro</option>
                      </select>
                      <User class="w-4 h-4 text-indigo-400 absolute left-2.5 top-2.5" />
                    </div>
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-indigo-900 mb-1.5 uppercase tracking-wide">Edad</label>
                    <input 
                      type="number" 
                      value={user.age} 
                      onChange={(e) => handleChange('age', e.target.value)} 
                      class="w-full p-2 bg-white border border-indigo-200 rounded-lg text-sm font-medium focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
                    />
                  </div>
               </div>
               <p class="text-[10px] text-indigo-600 leading-tight italic border-t border-indigo-100 pt-2">
                  <span class="font-bold">Nota:</span> {getGenderMessage()}
               </p>
            </div>

            {/* Editable Time Sliders */}
            <div class="pt-2 space-y-2">
                <SliderInput 
                    label="Trabajo Remunerado" 
                    value={user.hoursPaidWork} 
                    max={168} 
                    onChange={(v: string) => handleChange('hoursPaidWork', v)}
                    icon={Briefcase}
                    colorClass="text-orange-600"
                    unit="h/sem"
                />
                
                <SliderInput 
                    label="Trabajo Doméstico" 
                    value={user.hoursDomesticWork} 
                    max={168} 
                    onChange={(v: string) => handleChange('hoursDomesticWork', v)}
                    icon={Home}
                    colorClass="text-blue-600"
                    unit="h/sem"
                />
            </div>

            {/* Editable Income (Dynamic Max based on Currency) */}
            <div class="pt-4 border-t border-slate-100">
               <div class="flex justify-between items-center mb-2">
                   <label class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                     <DollarSign class="w-4 h-4 text-green-600" /> Ingreso Mensual ({user.currency})
                   </label>
                   <div class="flex items-center">
                     <span class="text-sm text-green-700 font-bold mr-1">{currencySettings.symbol}</span>
                     <input
                        type="number"
                        value={user.monthlyIncome}
                        onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                        class="text-sm font-bold text-green-700 bg-green-50 border border-green-200 focus:border-green-500 px-2 py-1 rounded-md w-32 text-right outline-none"
                     />
                   </div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={currencySettings.maxIncome}
                  step={currencySettings.step}
                  value={user.monthlyIncome || 0}
                  onChange={(e) => handleChange('monthlyIncome', e.target.value)}
                  class="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                />
                <div class="flex justify-between text-[10px] text-slate-400 mt-1">
                    <span>0</span>
                    <span>{currencySettings.symbol}{currencySettings.maxIncome.toLocaleString()}</span>
                </div>
            </div>

            {/* Advanced Section (Mandatory/Visible) */}
            <div class="bg-slate-50 p-4 rounded-lg border border-slate-100">
               <div class="flex justify-between items-center mb-4 border-b border-slate-200 pb-2">
                   <span class="text-xs font-bold text-slate-700 uppercase tracking-widest">Parámetros Adicionales</span>
               </div>
               
               <div class="space-y-4">
                   <div class="grid grid-cols-2 gap-4">
                     <div>
                        <label class="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                          <Car class="w-3 h-3" /> Traslado (h/sem)
                        </label>
                        <input 
                          type="number" 
                          value={user.hoursCommute} 
                          onChange={(e) => handleChange('hoursCommute', e.target.value)}
                          class="w-full border border-slate-300 rounded p-1.5 text-sm focus:border-indigo-500 outline-none"
                        />
                     </div>
                     <div>
                        <label class="text-xs font-semibold text-slate-500 mb-1 flex items-center gap-1">
                          <Moon class="w-3 h-3" /> Sueño (h/día)
                        </label>
                        <input 
                          type="number" 
                          value={user.hoursSleep} 
                          onChange={(e) => handleChange('hoursSleep', e.target.value)}
                          class="w-full border border-slate-300 rounded p-1.5 text-sm focus:border-indigo-500 outline-none"
                        />
                     </div>
                   </div>
                   <div class="grid grid-cols-2 gap-4">
                      <div>
                         <label class="block text-xs font-medium text-slate-500 mb-1 flex items-center gap-1"><Users class="w-3 h-3"/> Integrantes</label>
                         <input type="number" value={user.householdSize} onChange={(e) => handleChange('householdSize', e.target.value)} class="w-full border rounded p-1.5 text-sm" />
                      </div>
                      <div>
                         <label class="block text-xs font-medium text-slate-500 mb-1">Hijos &lt;12</label>
                         <input type="number" value={user.childrenUnder12} onChange={(e) => handleChange('childrenUnder12', e.target.value)} class="w-full border rounded p-1.5 text-sm" />
                      </div>
                   </div>
               </div>
            </div>
      </div>

      <div class="mt-8 pt-4 border-t border-slate-100">
        <button 
          onClick={onCalculate}
          class="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg flex justify-center items-center gap-2 active:scale-95"
        >
          <Activity class="w-4 h-4" />
          Actualizar Cálculos ({user.currency})
        </button>
      </div>
    </div>
  );
};

export default InputForm;
