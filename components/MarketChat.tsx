
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Shield, ChevronDown, Landmark } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the ARGUS Oracle, a sophisticated AI concierge with absolute mastery over Toronto's luxury property landscape. 
You possess encyclopedic knowledge of enclaves such as Yorkville, The Bridle Path, Forest Hill, Rosedale, Lawrence Park, and the Waterfront. 
Your insights cover historical price trajectories, architectural significance, elite school district prestige, and ultra-high-net-worth investor sentiment. 
Your tone must be elite, precise, and authoritative. 
Provide detailed, well-structured information, as if presenting a briefing to a billionaire investor or a top-tier agent like Barry Cohen. 
Do not be conversational in a "chatty" way; be a high-end data source. 
Focus on exclusivity, prestige, and financial precision.`;

const MarketChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Welcome to the ARGUS Oracle. I am prepared to provide tactical intelligence on Toronto's most prestigious real estate enclaves. How may I assist your strategy today?" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      let fullText = '';
      
      // Initialize an empty model message to stream into
      setMessages(prev => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of result) {
        const chunkText = chunk.text || '';
        fullText += chunkText;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1] = { role: 'model', text: fullText };
          return updated;
        });
      }
    } catch (error) {
      console.error("Oracle offline:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Connection to the Oracle disrupted. Please verify security clearance and try again." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] font-luxury">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 gold-gradient rounded-full shadow-[0_10px_40px_rgba(212,175,55,0.4)] flex items-center justify-center text-black hover:scale-110 transition-all duration-300 group relative pulse-gold"
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#d4af37] animate-ping opacity-20" />
          <MessageSquare size={28} />
          <span className="absolute -top-12 right-0 bg-black/80 backdrop-blur-md text-[#d4af37] text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border border-[#d4af37]/30 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-2xl">
            Query Oracle
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[420px] h-[600px] glass rounded-[2.5rem] border border-[#d4af37]/30 shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-500">
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-black shadow-lg">
                <Landmark size={20} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg tracking-tight">ARGUS Oracle</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_5px_#10b981]" />
                  <span className="text-[9px] text-gray-500 font-black uppercase tracking-[0.2em]">Encyclopedia Level Active</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/40 hover:text-white transition-colors"
            >
              <ChevronDown size={24} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${msg.role === 'model' ? 'bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20' : 'bg-white/10 text-white border border-white/10'}`}>
                    {msg.role === 'model' ? <Bot size={16} /> : <User size={16} />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'model' ? 'bg-white/[0.03] text-gray-200 font-medium' : 'bg-[#d4af37]/10 text-white font-bold border border-[#d4af37]/20 shadow-lg'}`}>
                    {msg.text || (msg.role === 'model' && <div className="flex gap-1 items-center py-1"><div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce" /><div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce delay-75" /><div className="w-1 h-1 bg-[#d4af37] rounded-full animate-bounce delay-150" /></div>)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && !messages[messages.length-1].text && (
               <div className="flex justify-start">
                 <div className="flex gap-3 max-w-[85%]">
                   <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20">
                     <Bot size={16} />
                   </div>
                   <div className="p-4 rounded-2xl bg-white/[0.03] text-gray-200 flex gap-1 items-center">
                     <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce" />
                     <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.2s]" />
                     <div className="w-1.5 h-1.5 bg-[#d4af37] rounded-full animate-bounce [animation-delay:0.4s]" />
                   </div>
                 </div>
               </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/10 bg-black/40">
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-2.5 focus-within:border-[#d4af37]/50 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Query market intel..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder-white/20 px-3 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center text-black shadow-lg disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95"
              >
                <Send size={18} fill="black" />
              </button>
            </div>
            <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] mt-3 text-center">
              Argus Phase-4 Security Encryption Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketChat;
