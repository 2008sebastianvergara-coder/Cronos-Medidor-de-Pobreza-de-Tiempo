
import React, { useState, useEffect } from 'react';
import InputForm from './components/InputForm';
import ResultsDashboard from './components/ResultsDashboard';
import PolicyRecommendations from './components/PolicyRecommendations';
import AuthorLibrary from './components/AuthorLibrary';
import PolicyMatrix from './components/PolicyMatrix';
import ModelInfo from './components/ModelInfo';
import GlobalChatbot from './components/GlobalChatbot';
import { UserProfile, SimulationResult } from './types';
import { calculateTimePoverty } from './utils/calculations';
import { getPolicyRecommendations } from './services/gemini';
import { Clock, Menu, ArrowRight, BookOpen, Landmark, Activity, X, Hourglass, Mail, Phone } from 'lucide-react';

const INITIAL_USER: UserProfile = {
  gender: 'female',
  age: 35,
  householdSize: 3,
  childrenUnder12: 2,
  monthlyIncome: 1200, 
  currency: 'USD',
  hoursPaidWork: 40,
  hoursCommute: 10,
  hoursDomesticWork: 25, 
  hoursSleep: 7, 
  location: 'urban'
};

type View = 'home' | 'simulator' | 'library' | 'policies';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [results, setResults] = useState<SimulationResult | null>(null);
  const [recommendation, setRecommendation] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isModelInfoOpen, setIsModelInfoOpen] = useState(false);

  // Auto-scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleUserChange = (field: keyof UserProfile, value: any) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  const handleCalculate = async () => {
    const calcResults = calculateTimePoverty(user);
    setResults(calcResults);
    
    setLoading(true);
    const aiResponse = await getPolicyRecommendations(user, calcResults);
    setRecommendation(aiResponse);
    setLoading(false);
  };

  const NavButton = ({ view, label, icon: Icon }: { view: View; label: string; icon?: any }) => (
    <button 
      onClick={() => setCurrentView(view)}
      class={`text-sm font-medium px-4 py-2 rounded-full transition-all flex items-center gap-2 ${
        currentView === view 
          ? 'bg-slate-900 text-white shadow-md' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      {Icon && <Icon class="w-4 h-4" />}
      {label}
    </button>
  );

  return (
    <div class="min-h-screen bg-[#FDFBF7] font-sans flex flex-col relative overflow-x-hidden">
      {/* Navigation Bar */}
      <nav class="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm supports-[backdrop-filter]:bg-white/80">
        <div class="container mx-auto px-4 py-3 flex justify-between items-center max-w-7xl">
           <div 
             class="flex items-center gap-2 cursor-pointer group"
             onClick={() => setCurrentView('home')}
           >
              <div class="bg-indigo-600 p-1.5 rounded-lg group-hover:bg-indigo-700 transition-colors shadow-sm">
                 <Clock class="w-5 h-5 text-white" />
              </div>
              <div>
                <span class="font-serif font-bold text-xl text-slate-900 tracking-tight block leading-none">Cronos</span>
                <span class="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Investigación</span>
              </div>
           </div>
           
           {/* Desktop Menu */}
           <div class="hidden md:flex gap-1">
              <NavButton view="home" label="Inicio" />
              <NavButton view="simulator" label="Simulador" />
              <NavButton view="library" label="Biblioteca" />
              <NavButton view="policies" label="Políticas" />
           </div>

           {/* Mobile Menu Button (Simple placeholder) */}
           <button class="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
             <Menu class="w-6 h-6" />
           </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main class="flex-grow container mx-auto px-4 py-8 max-w-7xl animate-fade-in relative z-0">
        
        {/* --- VIEW: HOME --- */}
        {currentView === 'home' && (
          <div class="space-y-16">
            {/* Artistic Hero Section */}
            <section class="relative bg-slate-900 rounded-3xl overflow-hidden shadow-2xl min-h-[500px] flex items-center justify-center text-center px-6 py-20 isolate">
              {/* Abstract Background Shapes */}
              <div class="absolute inset-0 z-[-1] opacity-30">
                 <div class="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-indigo-500 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
                 <div class="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-500 rounded-full blur-[100px] mix-blend-screen"></div>
                 <svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="white" stroke-width="0.2" />
                    <path d="M0 100 C 30 20 70 20 100 100 Z" fill="none" stroke="white" stroke-width="0.2" />
                    <circle cx="50" cy="50" r="30" stroke="white" stroke-width="0.1" fill="none" />
                 </svg>
              </div>

              <div class="max-w-3xl relative z-10">
                 <div class="flex justify-center mb-6">
                    <div class="p-3 border border-white/20 rounded-full backdrop-blur-sm bg-white/5">
                        <Hourglass class="w-8 h-8 text-indigo-300 animate-pulse" />
                    </div>
                 </div>
                 <h1 class="text-5xl md:text-7xl font-bold text-white mb-6 serif leading-tight tracking-tight">
                    El Tiempo es la Moneda <br/>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-orange-200">Invisible</span>
                 </h1>
                 <p class="text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl mx-auto font-light">
                    Más allá del ingreso, existe una desigualdad silenciosa. 
                    Cronos revela la <strong>Pobreza Oculta</strong> utilizando modelos econométricos avanzados.
                 </p>
              </div>
            </section>

            {/* Direct Navigation Cards */}
            <section class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto -mt-8 relative z-20">
                {/* Card 1: Simulator */}
                <div 
                  onClick={() => setCurrentView('simulator')}
                  class="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                    <div class="bg-indigo-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 transition-colors">
                        <Activity class="w-6 h-6 text-indigo-600 group-hover:text-white" />
                    </div>
                    <h3 class="text-2xl font-bold serif text-slate-800 mb-2 group-hover:text-indigo-700">Simulador LIMTIP</h3>
                    <p class="text-slate-600 mb-4 text-sm leading-relaxed">Calcula tu pobreza de tiempo y dimensiones ocultas ingresando los datos reales de tu hogar.</p>
                    <span class="text-indigo-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Ir al Simulador <ArrowRight class="w-4 h-4" /></span>
                </div>

                {/* Card 2: Library */}
                <div 
                  onClick={() => setCurrentView('library')}
                  class="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                    <div class="bg-orange-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-orange-600 transition-colors">
                        <BookOpen class="w-6 h-6 text-orange-600 group-hover:text-white" />
                    </div>
                    <h3 class="text-2xl font-bold serif text-slate-800 mb-2 group-hover:text-orange-700">Biblioteca</h3>
                    <p class="text-slate-600 mb-4 text-sm leading-relaxed">Explora las teorías de Vickery, Goodin, Folbre y más autores sobre la economía del tiempo.</p>
                    <span class="text-orange-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Leer Autores <ArrowRight class="w-4 h-4" /></span>
                </div>

                {/* Card 3: Policies */}
                <div 
                  onClick={() => setCurrentView('policies')}
                  class="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                >
                    <div class="bg-green-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                        <Landmark class="w-6 h-6 text-green-600 group-hover:text-white" />
                    </div>
                    <h3 class="text-2xl font-bold serif text-slate-800 mb-2 group-hover:text-green-700">Políticas Públicas</h3>
                    <p class="text-slate-600 mb-4 text-sm leading-relaxed">Conoce la matriz de intervención: Cuentas satélite, sistemas de cuidado e infraestructura.</p>
                    <span class="text-green-600 font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">Ver Propuestas <ArrowRight class="w-4 h-4" /></span>
                </div>
            </section>
          </div>
        )}

        {/* --- VIEW: SIMULATOR --- */}
        {currentView === 'simulator' && (
           <div class="animate-fade-in">
             <div class="flex flex-col md:flex-row justify-between items-end mb-8 pb-4 border-b border-slate-200">
                <div>
                   <h2 class="text-3xl font-bold serif text-slate-900">Simulador de Pobreza</h2>
                   <p class="text-slate-500">Modelo LIMTIP (Levy Institute Measure of Time and Income Poverty)</p>
                </div>
                <div class="hidden md:block">
                   <span class="bg-indigo-100 text-indigo-800 text-xs font-bold px-3 py-1 rounded-full border border-indigo-200">Modo Interactivo</span>
                </div>
             </div>

             <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Input (Fixed Sticky Behavior) */}
                <div class="lg:col-span-5 lg:sticky lg:top-24 self-start max-h-[calc(100vh-8rem)] overflow-y-auto pr-1 custom-scrollbar">
                   <InputForm 
                      user={user} 
                      onChange={handleUserChange} 
                      onCalculate={handleCalculate} 
                      onOpenInfo={() => setIsModelInfoOpen(true)}
                   />
                </div>

                {/* Right Column: Results */}
                <div class="lg:col-span-7 space-y-6 pb-12">
                  {results ? (
                    <>
                      <ResultsDashboard results={results} />
                      <PolicyRecommendations recommendation={recommendation} loading={loading} />
                    </>
                  ) : (
                    <div class="min-h-[500px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 rounded-2xl p-12 bg-white/50 backdrop-blur-sm">
                      <Activity class="w-16 h-16 mb-4 opacity-20" />
                      <h3 class="text-xl font-bold text-slate-500 serif">Sin datos calculados</h3>
                      <p class="text-center max-w-sm mt-2 text-sm">
                        Ajusta los deslizadores a la izquierda y presiona "Actualizar Cálculos" para ver tu diagnóstico multidimensional.
                      </p>
                    </div>
                  )}
                </div>
             </div>
           </div>
        )}

        {/* --- VIEW: LIBRARY --- */}
        {currentView === 'library' && (
          <div class="animate-fade-in">
             <div class="mb-8 pb-4 border-b border-slate-200">
                <h2 class="text-3xl font-bold serif text-slate-900">Biblioteca de Autores</h2>
                <p class="text-slate-500">Fundamentos teóricos de la economía del tiempo.</p>
             </div>
             <AuthorLibrary />
          </div>
        )}

        {/* --- VIEW: POLICIES --- */}
        {currentView === 'policies' && (
          <div class="animate-fade-in">
             <div class="mb-8 pb-4 border-b border-slate-200">
                <h2 class="text-3xl font-bold serif text-slate-900">Matriz de Políticas Públicas</h2>
                <p class="text-slate-500">Soluciones estructurales para reducir la pobreza de tiempo.</p>
             </div>
             <PolicyMatrix />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer class="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto z-10 relative">
        <div class="container mx-auto px-4 max-w-7xl">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                {/* Brand Column */}
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <div class="flex items-center gap-2 mb-3">
                        <div class="bg-indigo-50 p-1.5 rounded-lg">
                            <Clock class="w-5 h-5 text-indigo-600" />
                        </div>
                        <span class="font-serif font-bold text-slate-900 text-lg">Cronos</span>
                    </div>
                    <p class="text-xs text-slate-500 leading-relaxed max-w-xs">
                        Una herramienta analítica avanzada para medir la pobreza de tiempo, basada en modelos econométricos y potenciada por inteligencia artificial.
                    </p>
                </div>

                {/* Creators Column */}
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider flex items-center gap-2">
                        Creadores
                    </h4>
                    <div class="space-y-3">
                        <div class="group">
                             <p class="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Jorge Rosales Salas, PhD</p>
                             <p class="text-[10px] text-slate-500 uppercase font-medium">Investigador Principal</p>
                        </div>
                        <div class="group">
                             <p class="text-sm font-bold text-slate-800 group-hover:text-indigo-700 transition-colors">Sebastián Vergara</p>
                             <p class="text-[10px] text-slate-500 uppercase font-medium">Asistente de Investigación</p>
                        </div>
                    </div>
                </div>

                {/* Contact Column */}
                <div class="flex flex-col items-center md:items-start text-center md:text-left">
                    <h4 class="font-bold text-slate-900 text-sm mb-4 uppercase tracking-wider">Contacto</h4>
                    <ul class="space-y-3 text-sm text-slate-600">
                        <li>
                            <a href="mailto:jorge@jorgerosales.cl" class="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
                                <span class="bg-slate-50 p-1.5 rounded-md group-hover:bg-indigo-50 transition-colors">
                                    <Mail class="w-4 h-4" />
                                </span>
                                jorge@jorgerosales.cl
                            </a>
                        </li>
                        <li>
                            <a href="tel:+56984106372" class="flex items-center gap-2 hover:text-indigo-600 transition-colors group">
                                <span class="bg-slate-50 p-1.5 rounded-md group-hover:bg-indigo-50 transition-colors">
                                    <Phone class="w-4 h-4" />
                                </span>
                                +56 9 8410 6372
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p class="text-[10px] text-slate-400">© {new Date().getFullYear()} Cronos Research Project.</p>
                <p class="text-[10px] text-slate-400 flex items-center gap-1">
                    Impulsado por <span class="font-bold text-slate-500">Google Gemini</span>
                </p>
            </div>
        </div>
      </footer>

      {/* MODEL INFO MODAL POPUP */}
      {isModelInfoOpen && (
        <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
           <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto relative flex flex-col">
              <button 
                onClick={() => setIsModelInfoOpen(false)}
                class="absolute top-4 right-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors z-10"
              >
                <X class="w-5 h-5 text-slate-600" />
              </button>
              
              <div class="p-8">
                 <h2 class="text-2xl font-bold serif text-slate-900 mb-6 pr-8">Guía de Modelos Teóricos</h2>
                 <ModelInfo />
              </div>
              
              <div class="p-4 border-t border-slate-100 bg-slate-50 text-center">
                 <button 
                   onClick={() => setIsModelInfoOpen(false)}
                   class="text-indigo-600 font-bold text-sm hover:underline"
                 >
                   Cerrar y volver al simulador
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Global Chatbot */}
      <GlobalChatbot />

    </div>
  );
}

export default App;
