
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, CheckCircle, ExternalLink, ShieldCheck, Share2, RefreshCw, AlertCircle, Clock, Zap, Cpu, Target, Wand2, Send, History } from 'lucide-react';
import { Lead } from '../types';
import { analyzeLeadSentiment } from '../services/geminiService';

interface LeadDetailProps {
  lead: Lead | null;
}

type SyncStatus = 'syncing' | 'synced' | 'error' | 'idle';

const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  const [syncStatus, setSyncStatus] = useState<SyncStatus>('idle');
  const [lastSynced, setLastSynced] = useState<string | null>(null);
  const [qualificationScore, setQualificationScore] = useState<number>(0);
  const [aiInsights, setAiInsights] = useState<{ summary: string; recommendedAction: string } | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [showDraft, setShowDraft] = useState(false);
  const syncTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (lead) {
      setSyncStatus('idle');
      setLastSynced(null);
      setQualificationScore(lead.qualificationScore);
      setAiInsights(null);
      setShowDraft(false);
      
      const timeout = window.setTimeout(() => {
        handleSync();
        performAiDeepScan();
      }, 800);
      return () => window.clearTimeout(timeout);
    }
  }, [lead]);

  const performAiDeepScan = async () => {
    if (!lead) return;
    setIsAnalyzing(true);
    try {
      const result = await analyzeLeadSentiment(lead.lastMessage);
      if (result) {
        setQualificationScore(result.score);
        setAiInsights({
          summary: result.summary,
          recommendedAction: result.recommendedAction
        });
      }
    } catch (err) {
      console.error("Deep scan failed", err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSync = () => {
    if (syncTimeoutRef.current) window.clearTimeout(syncTimeoutRef.current);
    setSyncStatus('syncing');
    syncTimeoutRef.current = window.setTimeout(() => {
      const success = Math.random() > 0.15;
      if (success) {
        setSyncStatus('synced');
        setLastSynced(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } else {
        setSyncStatus('error');
      }
    }, 2800);
  };

  if (!lead) {
    return (
      <div className="glass h-full rounded-3xl flex items-center justify-center text-gray-500 italic p-10 border-dashed border-white/10 shadow-2xl">
        <div className="flex flex-col items-center gap-4">
          <ShieldCheck size={48} className="opacity-10 text-[#d4af37]" />
          <span className="font-bold text-sm tracking-[0.3em] uppercase opacity-30">Select Prospect Identity</span>
        </div>
      </div>
    );
  }

  const status = syncStatus === 'syncing' ? { label: 'Syncing FUB...', color: 'text-[#d4af37]', icon: <RefreshCw size={12} className="animate-spin" /> } :
                 syncStatus === 'synced' ? { label: 'CRM Sync Locked', color: 'text-emerald-400', icon: <CheckCircle size={12} /> } :
                 { label: 'Awaiting Handshake', color: 'text-white/40', icon: null };

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="glass rounded-3xl p-7 flex flex-col gap-7 border-white/10 shadow-2xl relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-30" />
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white tracking-tighter">Asset Profiler</h3>
            <span className="text-[11px] text-[#d4af37] uppercase tracking-[0.3em] font-black">{lead.name}</span>
          </div>
          <div className="w-14 h-14 rounded-2xl p-[1px] gold-gradient shadow-xl">
            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-black">
              <img src={`https://picsum.photos/seed/${lead.id}/140/140`} alt="Avatar" className="w-full h-full object-cover grayscale brightness-150" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-3 p-5 bg-white/5 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tracking-tight text-white">{lead.phone}</span>
              <span className="text-[10px] px-3 py-1 rounded-lg bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-black uppercase tracking-widest">
                {lead.propertyType}
              </span>
            </div>
            <span className="text-sm font-bold tracking-tight text-white/60">{lead.email}</span>
          </div>

          <div className="flex flex-col items-center py-5 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.08),_transparent_70%)] relative">
            {isAnalyzing && (
              <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-[2px] rounded-3xl">
                <div className="flex flex-col items-center gap-2">
                  <Cpu className="text-[#d4af37] animate-pulse" size={32} />
                  <span className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.4em]">Deep AI Scan...</span>
                </div>
              </div>
            )}
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/10" />
                <circle cx="80" cy="80" r="70" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray={440} strokeDashoffset={440 - (440 * qualificationScore) / 100} strokeLinecap="round" className="text-[#d4af37] transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white tracking-tighter">{qualificationScore}%</span>
                <span className="text-[9px] text-[#d4af37] uppercase tracking-[0.4em] font-black">Qualified</span>
              </div>
            </div>
          </div>

          {aiInsights && (
            <div className="p-5 bg-white/5 rounded-2xl border border-white/10 space-y-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#d4af37]" />
                <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">Intelligence Report</span>
              </div>
              <p className="text-xs text-white/80 italic leading-relaxed">"{aiInsights.summary}"</p>
              
              {/* MONEY MAKING FEATURE: Concierge Email Draft */}
              {!showDraft ? (
                <button 
                  onClick={() => setShowDraft(true)}
                  className="w-full py-3 bg-[#d4af37]/10 border border-[#d4af37]/20 rounded-xl text-[#d4af37] text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#d4af37]/20 transition-all"
                >
                  <Wand2 size={14} /> Generate Elite Concierge Outreach
                </button>
              ) : (
                <div className="bg-black/60 p-4 rounded-xl border border-[#d4af37]/20 space-y-3 animate-fade-in-up">
                  <p className="text-[10px] text-white/50 leading-relaxed font-medium">
                    "Sebastian, I’ve just completed a tactical analysis of the Penthouse viewing schedules. I can secure a private showing Tuesday at 4:15 PM before the general broker open. Shall I finalize the handshake?"
                  </p>
                  <button className="w-full py-2.5 gold-gradient rounded-lg text-black text-[9px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                    <Send size={12} fill="black" /> Send to {lead.name}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10">
          <button className="w-full py-4 gold-gradient text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-2xl hover:scale-[1.02] transition-all uppercase text-[11px] tracking-widest">
            <Phone size={18} fill="black" /> Initialize Instant Link
          </button>
          <div className="grid grid-cols-2 gap-3">
             <button className="py-3 bg-white/5 text-white border border-white/10 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
               <History size={14} /> Interaction Log
             </button>
             <button className="py-3 bg-white/5 text-white border border-white/10 font-bold rounded-xl text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-2">
               <Share2 size={14} /> Transfer Case
             </button>
          </div>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 flex flex-col gap-4 border-white/10">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2">
             <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#d4af37]">
               {status.icon}
             </div>
             <span className={`text-[10px] font-black uppercase tracking-widest ${status.color}`}>
               {status.label}
             </span>
           </div>
           {lastSynced && <span className="text-[9px] font-bold text-white/20">{lastSynced}</span>}
        </div>
        <button onClick={handleSync} className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-white/40 text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors">
          Force Global CRM Flush
        </button>
      </div>
    </div>
  );
};

export default LeadDetail;
