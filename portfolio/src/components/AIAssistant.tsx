import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, User, Loader2, Sparkles } from 'lucide-react';
import { getChatResponse } from '../lib/gemini';
import { cn } from '../lib/utils';

interface Message {
  role: 'user' | 'bot';
  text: string;
}

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'bot', text: 'Identity Core Online. How can I assist you in exploring Dev\'s portfolio?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    const botResponse = await getChatResponse(userMsg);
    
    setMessages(prev => [...prev, { role: 'bot', text: botResponse }]);
    setIsTyping(false);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#4DA6FF] text-black rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(77,166,255,0.4)] portal-glow group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <X size={24} /> : <Bot size={28} className="group-hover:animate-pulse" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-28 right-8 z-[100] w-[350px] max-w-[calc(100vw-64px)] h-[500px] max-h-[70vh] glass rounded-2xl flex flex-col overflow-hidden border-[#4DA6FF]/30"
          >
            {/* Header */}
            <div className="p-4 border-b border-[#4DA6FF]/20 flex items-center gap-3 bg-[#4DA6FF]/5">
              <div className="w-8 h-8 rounded-full bg-[#4DA6FF]/20 flex items-center justify-center">
                <Sparkles size={16} className="text-[#4DA6FF]" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-widest text-white">AI ASSISTANT</h3>
                <p className="font-mono text-[8px] text-[#4DA6FF] opacity-60">PROTOCOL v2.0 // ACTIVE</p>
              </div>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex flex-col max-w-[85%]",
                    msg.role === 'user' ? "ml-auto items-end" : "items-start"
                  )}
                >
                  <div className={cn(
                    "p-3 rounded-2xl text-xs leading-relaxed",
                    msg.role === 'user' 
                      ? "bg-[#4DA6FF] text-black rounded-tr-none" 
                      : "bg-white/5 border border-white/10 text-[#EAEAEA] rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2 text-[#4DA6FF] font-mono text-[10px] animate-pulse">
                  <Loader2 size={12} className="animate-spin" />
                  ANALYZING...
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-[#4DA6FF]/20 bg-black/40">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about my vision..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-4 pr-10 text-xs focus:outline-none focus:border-[#4DA6FF]/50 text-white font-mono"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 text-[#4DA6FF] hover:scale-110 transition-transform"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
