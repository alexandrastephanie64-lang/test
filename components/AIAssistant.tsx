
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Terminal, Loader2, Cpu } from 'lucide-react';
import Markdown from 'react-markdown';
import { askAlphaQubit } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'SYSTEM_READY // ALPHA_QUBIT_ASSISTANT_v1.0.24 // Ask me anything about the Nature 2024 paper.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    // Format history for Gemini
    const history = messages.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }]
    }));

    const response = await askAlphaQubit(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-mono">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="mb-4 w-[350px] md:w-[450px] h-[550px] bg-geek-zinc border border-geek-cyan shadow-[0_0_30px_rgba(0,242,255,0.2)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-geek-border bg-geek-black flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Terminal size={16} className="text-geek-cyan" />
                <span className="text-[10px] font-bold text-geek-cyan tracking-[0.2em] uppercase terminal-glow">AlphaQubit_Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-stone-600 hover:text-geek-cyan transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-geek-black/50 custom-scrollbar">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 text-xs leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-geek-cyan/10 border border-geek-cyan/30 text-geek-cyan' 
                      : 'bg-geek-zinc/80 border border-geek-border text-stone-300'
                  }`}>
                    <div className="markdown-body">
                      <Markdown>{msg.text}</Markdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-geek-zinc/80 border border-geek-border p-3 flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-geek-cyan" />
                    <span className="text-[10px] text-stone-500 uppercase tracking-widest animate-pulse">Processing_Neural_Weights...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-geek-border bg-geek-black">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="QUERY_SYSTEM..."
                  className="flex-1 bg-geek-zinc border border-geek-border px-3 py-2 text-xs text-geek-cyan focus:outline-none focus:border-geek-cyan placeholder:text-stone-700 font-mono"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading}
                  className="p-2 bg-geek-cyan text-black hover:bg-white transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-2 text-[8px] text-stone-700 uppercase tracking-widest flex items-center gap-1">
                <Cpu size={8} /> Powered by Gemini 3.1 Flash
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-none flex items-center justify-center transition-all duration-300 shadow-[0_0_20px_rgba(0,242,255,0.3)] border ${
          isOpen ? 'bg-geek-black border-geek-cyan text-geek-cyan' : 'bg-geek-cyan border-geek-cyan text-black hover:bg-white'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};
