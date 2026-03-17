import React, { useState, useEffect, useRef } from 'react';
import { Phone, CheckCircle, ShieldCheck, RefreshCw, Zap, Cpu, Wand2, Send, History, Landmark, AlertCircle, TrendingUp, Fingerprint, Lock } from 'lucide-react';
import { Lead } from '../types';
import { analyzeLeadSentiment } from '../services/geminiService';

interface LeadDetailProps {
  lead: Lead | null;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  const [syncStatus, setSyncStatus] = useState<'syncing' | 'synced' | 'idle'>('idle');
  const [qualificationScore, setQualificationScore] = useState<number>(0);
  const [aiInsights, setAiInsights] = useState<{ summary: string; recommendedAction: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showDraft, setShowDraft] = useState(false);

  useEffect(() => {
    if (lead) {
      setQualificationScore(lead.qualificationScore);
      setAiInsights(null);
      setShowDraft(false);
      setIsAnalyzing(true);
      const timer = setTimeout(() => performAiDeepScan(), 1000);
      return () => clearTimeout(timer);
    }
  }, [lead]);

  const performAiDeepScan = async () => {
    if (!lead) return;
    try {
      const result = await analyzeLeadSentiment(lead.lastMessage);
      if (result) {
        setQualificationScore(result.score);
        setAiInsights({ summary: result.summary, recommendedAction: result.recommendedAction });
      }
    } catch (err) { console.error(err); } finally { setIsAnalyzing(false); }
  };

  if (!lead) return (
    <div className="card-white h-full flex flex-col items-center justify-center p-20 text-center border-dashed border-2 border-gray-100 bg-white/50">
      <div className="space-y-8 opacity-30">
        <ShieldCheck size={64} className="mx-auto text-gray-400" strokeWidth={1} />
        <p className="text-[12px] font-black uppercase tracking-[0.4em] text-gray-400 leading-loose">Identity Profile<br/>Awaiting Handshake</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-10 animate-fade-in">
      <div className="card-white p-12 space-y-12">
        <div className="flex justify-between items-start">
          <div className="space-y-3">
            <h3 className="text-3xl font-semibold text-[#1A1A1A] tracking-tight">{lead.name}</h3>
            <p className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.4em]">{lead.propertyType}</p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-[#F7F6F3] border border-gray-100 overflow-hidden shadow-inner flex-shrink-0">
            <img src={`https://picsum.photos/seed/${lead.id}/300`} alt="Lead Identity" className="w-full h-full object-cover grayscale opacity-90 hover:opacity-100 transition-opacity" />
          </div>
        </div>

        <div className="space-y-10">
          <div className="p-10 bg-[#F7F6F3] rounded-2xl space-y-5 border border-gray-50 shadow-inner relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-5">
               <Fingerprint size={80} />
             </div>
             <div className="flex justify-between items-center relative z-10">
               <span className="text-base font-semibold text-[#1A1A1A]">{lead.phone}</span>
               {lead.sentiment === 'Hot' && (
                 <span className="bg-[#9B1B1B] text-white px-4 py-2 rounded-md flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-sm animate-pulse">
                   <AlertCircle size={12} /> Urgent Alert
                 </span>
               )}
             </div>
             <p className="text-sm text-gray-400 font-medium truncate relative z-10">{lead.email}</p>
             <div className="pt-4 flex items-center gap-2 text-[9px] font-bold text-gray-300 uppercase tracking-widest relative z-10">
               <Lock size={10} /> Verification Hash: <span className="font-mono">0x7F...3B92</span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
               <div className="p-3 bg-[#C5A059]/10 rounded-xl text-[#C5A059] w-fit">
                 <Landmark size={22} />
               </div>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Scope Index</p>
               <p className="text-xl font-bold text-[#1A1A1A] tracking-tight">$5.2M Est.</p>
            </div>
            <div className="p-8 bg-white border border-gray-100 rounded-2xl shadow-sm space-y-4">
               <div className="p-3 bg-[#2D5A27]/10 rounded-xl text-[#2D5A27] w-fit">
                 <TrendingUp size={22} />
               </div>
               <p className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</p>
               <span className="bg-[#2D5A27] text-white px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest inline-block shadow-sm">{qualificationScore}% Qualified</span>
            </div>
          </div>

          {isAnalyzing ? (
            <div className="p-16 flex flex-col items-center gap-6 bg-gray-50/30 rounded-2xl border border-gray-100">
              <RefreshCw size={32} className="animate-spin text-[#C5A059]" />
              <p className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Quantum Intelligence Scan...</p>
            </div>
          ) : aiInsights && (
            <div className="p-10 bg-[#C5A059]/5 rounded-2xl border border-[#C5A059]/10 space-y-10">
              <div className="flex items-center gap-3">
                <Zap size={18} className="text-[#C5A059]" />
                <span className="text-[11px] font-black text-[#C5A059] uppercase tracking-widest">Intelligence Report</span>
              </div>
              <p className="text-sm text-gray-600 font-medium leading-relaxed italic border-l-2 border-[#C5A059]/30 pl-6">"{aiInsights.summary}"</p>
              {!showDraft ? (
                <button 
                  onClick={() => setShowDraft(true)} 
                  className="w-full py-4 bg-white border border-[#C5A059]/40 rounded-xl text-[#1A1A1A] text-[11px] font-black uppercase tracking-[0.2em] shadow-sm hover:bg-gray-50 transition-all"
                >
                   Draft Executive Outreach
                </button>
              ) : (
                <div className="bg-white p-8 rounded-xl border border-gray-100 space-y-8 shadow-sm animate-fade-in">
                  <p className="text-sm text-[#1A1A1A] font-medium leading-relaxed">"Sebastian, private property handover verified for Thursday at 4:15. Acknowledge stream to secure access codes for your principal."</p>
                  <button className="w-full bg-[#C5A059] text-[#1A1A1A] py-5 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-md hover:scale-[1.01] transition-all">
                    <Send size={18} /> Deploy Intelligence Link
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="pt-10 space-y-6">
          <button className="w-full bg-[#C5A059] text-[#1A1A1A] py-6 rounded-2xl font-black uppercase text-[12px] tracking-[0.3em] shadow-xl flex items-center justify-center gap-5 hover:scale-[1.02] active:scale-95 transition-all">
            <Phone size={22} fill="#1A1A1A" /> Initialize Live Session
          </button>
          <div className="grid grid-cols-2 gap-6">
             <button className="py-5 bg-[#F7F6F3] border border-gray-100 rounded-xl text-[11px] font-bold uppercase text-gray-400 tracking-widest hover:text-[#1A1A1A] hover:bg-white transition-all">Case Intel Log</button>
             <button className="py-5 bg-[#F7F6F3] border border-gray-100 rounded-xl text-[11px] font-bold uppercase text-gray-400 tracking-widest hover:text-[#1A1A1A] hover:bg-white transition-all">Handover Lead</button>
          </div>
        </div>
      </div>

      {/* Sync Status Footer */}
      <div className="card-white px-10 py-6 flex items-center justify-between border-l-4 border-l-[#2D5A27] bg-white transition-all hover:shadow-md">
         <div className="flex items-center gap-4">
           <div className="w-3 h-3 rounded-full bg-[#2D5A27] shadow-[0_0_10px_rgba(45,90,39,0.5)]" />
           <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Active Synchronization Active</span>
         </div>
         <button className="text-[11px] font-black text-[#C5A059] uppercase tracking-[0.2em] hover:underline transition-all">Manual Pulse</button>
      </div>
    </div>
  );
};

export default LeadDetail;