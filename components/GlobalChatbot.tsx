
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Sparkles } from 'lucide-react';
import { chatWithCronos } from '../services/gemini';
import ReactMarkdown from 'react-markdown';

const GlobalChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', content: string}[]>([
      {role: 'model', content: '¡Hola! 👋 Soy **Cronos**, tu asistente temporal. ¿Sientes que corres todo el día y no llegas a nada? 🏃💨 Estoy aquí para charlar sobre tu estrés, darte ánimos y buscar la forma de que no colapses. ¡Pregúntame lo que quieras!'}
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
      if (!inputValue.trim() || isLoading) return;

      const userMsg = inputValue;
      setInputValue('');
      setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
      setIsLoading(true);

      const response = await chatWithCronos(messages, userMsg);

      setMessages(prev => [...prev, { role: 'model', content: response }]);
      setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button with Pulse Animation */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          class="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white p-4 rounded-full shadow-xl transition-all hover:scale-105 flex items-center gap-2 group animate-fade-in"
        >
          <div class="relative">
             <MessageCircle class="w-7 h-7" />
             <span class="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
             </span>
          </div>
          <span class="font-bold text-sm hidden md:inline pr-2">¡Hablemos del tiempo!</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div class="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[380px] h-[500px] bg-white rounded-2xl shadow-2xl flex flex-col border border-slate-200 animate-fade-in overflow-hidden font-sans">
          {/* Header with Gradient */}
          <div class="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-4 flex justify-between items-center text-white shadow-md">
            <div class="flex items-center gap-3">
                <div class="bg-white/20 p-1.5 rounded-full backdrop-blur-sm">
                    <Sparkles class="w-5 h-5 text-yellow-300" />
                </div>
                <div>
                    <h3 class="font-bold text-lg leading-tight font-serif">Cronos AI</h3>
                    <p class="text-[10px] text-indigo-100 opacity-90">Tu coach anti-estrés</p>
                </div>
            </div>
            <button onClick={() => setIsOpen(false)} class="hover:bg-white/20 p-1.5 rounded-full transition-colors">
              <X class="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div class="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} class={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  class={`max-w-[85%] p-3.5 rounded-2xl text-sm shadow-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-100 text-slate-700 rounded-bl-none'
                  }`}
                >
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
               <div class="flex justify-start">
                   <div class="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-2 items-center">
                       <Loader2 class="w-4 h-4 animate-spin text-indigo-500" />
                       <span class="text-xs text-slate-400 italic">Cronos está pensando...</span>
                   </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div class="p-3 bg-white border-t border-slate-100">
            <div class="relative flex items-center gap-2">
                <input 
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Escribe aquí..."
                    class="flex-1 bg-slate-100 border-transparent focus:bg-white border focus:border-indigo-300 rounded-full py-3 pl-4 pr-4 text-sm focus:outline-none transition-all"
                />
                <button 
                    onClick={handleSend}
                    disabled={isLoading || !inputValue.trim()}
                    class="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all shadow-md"
                >
                    <Send class="w-4 h-4" />
                </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalChatbot;
