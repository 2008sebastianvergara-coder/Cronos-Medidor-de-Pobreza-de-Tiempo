import React, { useState } from 'react';
import { AUTHORS_DATA } from '../constants';
import { Quote } from 'lucide-react';

const AuthorLibrary: React.FC = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(AUTHORS_DATA[0]);

  return (
    <div class="bg-[#FFFBF0] py-12 border-y border-orange-100">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="flex flex-col md:flex-row min-h-[600px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          
          {/* Sidebar Index (Side on md and up) */}
          <div class="w-full md:w-1/3 lg:w-1/4 bg-slate-50 border-r border-slate-200 flex flex-col flex-shrink-0">
             <div class="p-6 border-b border-slate-200 bg-white">
                <h3 class="font-bold text-xl serif text-slate-800">Índice de Investigadores</h3>
                <p class="text-xs text-slate-500 mt-1">Seleccione para ver detalles</p>
             </div>
             <div class="overflow-y-auto flex-1 custom-scrollbar max-h-[300px] md:max-h-none">
                {AUTHORS_DATA.map((author) => (
                  <button
                    key={author.id}
                    onClick={() => setSelectedAuthor(author)}
                    class={`w-full text-left p-4 transition-all border-l-4 ${
                      selectedAuthor.id === author.id 
                        ? 'bg-orange-50 border-orange-500' 
                        : 'border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <h4 class={`font-bold text-sm ${selectedAuthor.id === author.id ? 'text-orange-900' : 'text-slate-700'}`}>
                      {author.name}
                    </h4>
                    <p class={`text-xs mt-1 ${selectedAuthor.id === author.id ? 'text-orange-700' : 'text-orange-600'}`}>
                      {author.title}
                    </p>
                    <p class="text-[10px] text-slate-400 mt-1">{author.year} • {author.context}</p>
                  </button>
                ))}
             </div>
          </div>

          {/* Content Area */}
          <div class="flex-1 p-8 md:p-12 flex flex-col bg-[#FFFCF8]">
              <span class="inline-block bg-orange-100 text-orange-800 text-xs font-bold px-3 py-1 rounded mb-4 self-start">
                  {selectedAuthor.title}
              </span>
              
              <h2 class="text-4xl font-bold serif text-slate-900 mb-2">{selectedAuthor.name}</h2>
              <p class="text-slate-500 italic serif text-lg mb-8 border-b border-orange-200 pb-4">
                  {selectedAuthor.context} ({selectedAuthor.year})
              </p>

              <div class="space-y-8">
                  <div>
                      <h3 class="font-bold text-slate-800 text-lg mb-3 serif">La Investigación</h3>
                      <p class="text-slate-600 leading-relaxed text-base">
                          {selectedAuthor.description}
                      </p>
                  </div>

                  {selectedAuthor.policyProposal && (
                      <div class="bg-white p-6 rounded-lg border-l-4 border-orange-500 shadow-sm">
                          <h3 class="font-bold text-slate-800 text-lg mb-2 serif">Propuesta de Política Pública</h3>
                          <p class="text-slate-600 text-sm">
                              {selectedAuthor.policyProposal}
                          </p>
                      </div>
                  )}

                  <div class="bg-slate-900 p-6 rounded-lg text-white relative mt-8">
                      <Quote class="absolute top-4 right-4 w-8 h-8 text-slate-700 opacity-50" />
                      <p class="italic text-lg font-serif leading-relaxed opacity-90">
                          "{selectedAuthor.quote}"
                      </p>
                      <p class="text-xs text-slate-400 mt-4 uppercase tracking-widest font-bold">Cita Clave</p>
                  </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorLibrary;