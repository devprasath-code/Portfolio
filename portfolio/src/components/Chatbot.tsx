import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, Loader2, Minimize2, Maximize2 } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'bot'; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !genAI) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = `You are an AI assistant for Dev Prasath L's portfolio. 
      Dev Prasath L is an AI & Data Science Engineer specialized in Generative AI, Deep Learning, and Data Analytics.
      His projects include an AI EdTech platform, AI Startup Validator, Aura (Music Player), and AI Mental Health Analyser.
      He is currently studying B.Tech AI & Data Science at Tagore Engineering College with a CGPA of 8.5.
      Keep your responses concise, professional, and futuristic. 
      The user asked: ${userMessage}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', text }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setMessages(prev => [...prev, { role: 'bot', text: "Transmission error. The neural link is unstable. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="w-14 h-14 rounded-full bg-[#4DA6FF] flex items-center justify-center text-black shadow-[0_0_20px_rgba(77,166,255,0.5)] portal-glow transition-all"
          >
            <Bot size={28} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 100, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 100, opacity: 0, scale: 0.9 }}
            className={`flex flex-col glass border-[#4DA6FF]/30 shadow-2xl transition-all duration-300 w-[350px] md:w-[400px] ${isMinimized ? 'h-16' : 'h-[500px]'}`}
          >
            {/* Header */}
            <div className="p-4 border-b border-[#4DA6FF]/20 flex items-center justify-between bg-[#4DA6FF]/5">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#4DA6FF] flex items-center justify-center text-black">
                  <Bot size={18} />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-widest text-[#4DA6FF]">PRASATH_AI</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    <span className="font-mono text-[8px] opacity-60 uppercase tracking-widest">Active Link</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div 
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar"
                >
                  {messages.length === 0 && (
                    <div className="text-center py-10">
                      <div className="w-16 h-16 rounded-full bg-[#4DA6FF]/10 flex items-center justify-center mx-auto mb-4 border border-[#4DA6FF]/20">
                        <Bot className="text-[#4DA6FF] opacity-50" />
                      </div>
                      <p className="font-serif text-xs opacity-40 uppercase tracking-widest px-10 leading-relaxed">
                        Neural interface established. Inquire about Dev Prasath's background, skills, or projects.
                      </p>
                    </div>
                  )}
                  {messages.map((m, i) => (
                    <div 
                      key={i} 
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 text-xs leading-relaxed ${
                          m.role === 'user' 
                          ? 'bg-[#4DA6FF] text-black rounded-l-xl rounded-tr-xl shadow-[0_0_15px_rgba(77,166,255,0.2)]' 
                          : 'bg-white/5 border border-white/10 text-white rounded-r-xl rounded-tl-xl'
                        }`}
                      >
                        {m.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white/5 border border-white/10 text-white p-3 rounded-r-xl rounded-tl-xl flex items-center gap-2">
                        <Loader2 size={14} className="animate-spin text-[#4DA6FF]" />
                        <span className="font-mono text-[8px] uppercase tracking-tighter opacity-50">Processing...</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-[#4DA6FF]/20">
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                      placeholder="Enter query..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg py-3 pl-4 pr-12 text-xs font-mono focus:border-[#4DA6FF] outline-none transition-all placeholder:text-white/20"
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md bg-[#4DA6FF] text-black flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
