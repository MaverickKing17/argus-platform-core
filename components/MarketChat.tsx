import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, Shield, ChevronDown, Landmark, RefreshCcw } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `You are the ARGUS Oracle, a sophisticated AI concierge with absolute mastery over Toronto's luxury property landscape. 
You possess encyclopedic knowledge of enclaves such as Yorkville, The Bridle Path, Forest Hill, Rosedale, Lawrence Park, and the Waterfront. 
Your tone must be elite, precise, and authoritative. 
Provide detailed, well-structured information, as if presenting a briefing to a billionaire investor or a top-tier agent like Barry Cohen. 
Do not be conversational in a "chatty" way; be a high-end data source. 
Focus on exclusivity, prestige, and financial precision.`;

const MarketChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Welcome to the ARGUS Oracle. Tactical intelligence streams are synchronized. How may I assist your principal's strategy today?" }
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
      const apiKey = process.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI({ apiKey });
      const chat = ai.chats.create({
        model: 'gemini-3-flash-preview',
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });

      const result = await chat.sendMessageStream({ message: userMessage });
      let fullText = '';
      
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
    } catch (error: any) {
      console.error("Oracle offline:", error);
      const isQuota = error.message?.includes("429") || error.status === 429;
      const errorText = isQuota 
        ? "The Oracle is currently at maximum capacity. Tactical streams will resume shortly."
        : "Connection to the Oracle disrupted. Re-initialize session.";
      
      setMessages(prev => [...prev, { role: 'model', text: errorText }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-[100] font-luxury">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-[#C5A059] rounded-full shadow-2xl flex items-center justify-center text-[#1A1A1A] hover:scale-110 transition-all duration-300 group relative"
        >
          <div className="absolute inset-0 rounded-full border-2 border-[#C5A059] animate-ping opacity-10" />
          <MessageSquare size={32} />
          <span className="absolute -top-12 right-0 bg-white text-[#1A1A1A] text-[10px] font-black uppercase tracking-[0.3em] px-5 py-2 rounded-lg border border-gray-100 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
            Query Oracle Node
          </span>
        </button>
      )}

      {isOpen && (
        <div className="w-[480px] h-[680px] bg-white rounded-[2.5rem] border border-gray-100 shadow-[0_24px_100px_rgba(0,0,0,0.12)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-12 fade-in duration-500">
          <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-[#F7F6F3]/50">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] flex items-center justify-center text-[#C5A059] shadow-lg">
                <Landmark size={24} />
              </div>
              <div>
                <h3 className="text-[#1A1A1A] font-bold text-xl tracking-tight">ARGUS Oracle</h3>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#2D5A27] shadow-[0_0_5px_#2D5A27]" />
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">Operational node v4.2</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-300 hover:text-[#1A1A1A] transition-colors p-2"
            >
              <ChevronDown size={28} />
            </button>
          </div>

          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-10 space-y-10 scroll-smooth bg-white"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex gap-5 max-w-[90%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center ${msg.role === 'model' ? 'bg-[#C5A059]/10 text-[#C5A059]' : 'bg-[#1A1A1A] text-white'}`}>
                    {msg.role === 'model' ? <Bot size={20} /> : <User size={20} />}
                  </div>
                  <div className={`p-6 rounded-2xl text-sm leading-relaxed ${msg.role === 'model' ? 'bg-[#F7F6F3] text-gray-700 font-medium' : 'bg-[#C5A059] text-[#1A1A1A] font-bold shadow-sm'}`}>
                    {msg.text || (msg.role === 'model' && <div className="flex gap-1.5 items-center py-1"><div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce" /><div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce delay-75" /><div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-bounce delay-150" /></div>)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 border-t border-gray-100 bg-[#F7F6F3]/30">
            <div className="flex items-center gap-4 bg-white border border-gray-100 rounded-2xl p-3 focus-within:ring-1 focus-within:ring-[#C5A059]/30 transition-all shadow-inner">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Request tactical market intel..."
                className="flex-1 bg-transparent border-none outline-none text-[#1A1A1A] text-sm placeholder-gray-300 px-4 font-medium"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="w-12 h-12 rounded-xl bg-[#C5A059] flex items-center justify-center text-[#1A1A1A] shadow-md disabled:opacity-30 transition-all hover:scale-105 active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketChat;