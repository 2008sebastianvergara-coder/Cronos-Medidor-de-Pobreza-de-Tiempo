
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants";
import { UserProfile, SimulationResult } from "../types";

const getClient = () => {
    if (!process.env.API_KEY) {
        throw new Error("API Key not found");
    }
    return new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
};

export const getPolicyRecommendations = async (user: UserProfile, results: SimulationResult): Promise<string> => {
  try {
    const ai = getClient();
    
    // Prompt mejorado para incluir recomendaciones personales y públicas
    const prompt = `
    Actúa como un coach de vida y consultor en economía del bienestar.
    
    Perfil: ${user.gender}, ${user.age} años, ${user.childrenUnder12} hijos.
    Datos: Carga total ${user.hoursPaidWork + user.hoursDomesticWork + user.hoursCommute}h/sem.
    Resultado: ${results.limtip.status}.
    
    Genera un informe estructurado en Markdown.
    IMPORTANTE: Usa párrafos claros con espacio entre ellos. Sé empático pero realista.

    Estructura Requerida:
    ### 1. Diagnóstico de Realidad 🩺
    Explica qué significa su resultado. Si tiene pobreza de tiempo, describe cómo esto afecta su calidad de vida diaria (estrés, sueño, carga mental). (Mínimo 2 párrafos).

    ### 2. Proyección a Futuro (5 años) 🔮
    Analiza las consecuencias acumulativas de mantener este ritmo en su salud física, mental y relaciones.

    ### 3. Estrategia Personal (Acción Inmediata) 🧘
    Propón 3 consejos prácticos y realizables HOY por el usuario para mitigar su situación (Ej: técnicas de negociación en el hogar, externalización estratégica, límites digitales, micro-descansos).

    ### 4. Soluciones Estructurales (Políticas Públicas) 🏛️
    Propón 2 medidas sistémicas que el usuario debería exigir o conocer (Leyes de cuidado, flexibilidad laboral garantizada, etc).
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: SYSTEM_PROMPT }] },
        { role: 'user', parts: [{ text: prompt }] }
      ],
      config: {
        temperature: 0.7,
      }
    });

    return response.text || "No se pudo generar el análisis.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error al conectar con el analista de IA.";
  }
};

export const chatWithCronos = async (history: {role: string, content: string}[], message: string): Promise<string> => {
    try {
        const ai = getClient();
        
        // Personalidad del Chatbot
        const chatPrompt = `
        ${SYSTEM_PROMPT}
        
        PERSONALIDAD ACTUALIZADA:
        Eres "Cronos", una IA carismática, curiosa y un poco filosófica sobre el tiempo ⏳.
        - Tu objetivo es educar pero siendo SIMPÁTICO y ENTRETENIDO.
        - Usa emojis de forma natural ✨.
        - Tus respuestas deben ser BREVES (máximo 2-3 frases cortas).
        - Si te preguntan algo complejo, simplifícalo con una analogía divertida.
        - Haz que el usuario se sienta comprendido.
        `;

        const chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: chatPrompt,
                temperature: 0.8 // Más creativo y variado
            },
            history: history.map(h => ({
                role: h.role === 'user' ? 'user' : 'model',
                parts: [{ text: h.content }]
            }))
        });

        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (error) {
        console.error("Chat Error", error);
        return "¡Ups! Mi reloj de arena se atascó. ⏳ Intenta de nuevo.";
    }
}
