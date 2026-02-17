
import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, CheckCircle, ExternalLink, ShieldCheck, Share2, RefreshCw, AlertCircle, Clock, Zap, Cpu, Target } from 'lucide-react';
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
  const syncTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (lead) {
      setSyncStatus('idle');
      setLastSynced(null);
      setQualificationScore(lead.qualificationScore);
      setAiInsights(null);
      
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

  const getStatusConfig = () => {
    switch (syncStatus) {
      case 'syncing':
        return {
          label: 'Verifying Integrity...',
          color: 'text-[#d4af37]',
          bg: 'bg-[#d4af37]/10',
          dot: 'bg-[#d4af37]',
          icon: <RefreshCw size={12} className="animate-spin" />
        };
      case 'synced':
        return {
          label: 'Secured in Vault',
          color: 'text-emerald-400',
          bg: 'bg-emerald-500/10',
          dot: 'bg-emerald-500',
          icon: <CheckCircle size={12} />
        };
      case 'error':
        return {
          label: 'Handshake Failed',
          color: 'text-red-400',
          bg: 'bg-red-500/10',
          dot: 'bg-red-400',
          icon: <AlertCircle size={12} />
        };
      default:
        return {
          label: 'Awaiting Command',
          color: 'text-white/60',
          bg: 'bg-white/5',
          dot: 'bg-white/40',
          icon: null
        };
    }
  };

  const status = getStatusConfig();

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="glass rounded-3xl p-7 flex flex-col gap-7 border-white/10 shadow-2xl relative overflow-hidden bg-white/[0.01]">
        <div className="absolute top-0 left-0 w-full h-1 gold-gradient opacity-30" />
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h3 className="text-2xl font-bold text-white tracking-tighter">Elite Profile</h3>
            <span className="text-[11px] text-[#d4af37] uppercase tracking-[0.3em] font-black">{lead.name}</span>
          </div>
          <div className="w-14 h-14 rounded-2xl p-[1px] gold-gradient shadow-xl group hover:rotate-3 transition-transform cursor-pointer">
            <div className="w-full h-full rounded-2xl bg-black flex items-center justify-center overflow-hidden border border-black">
              <img src={`https://picsum.photos/seed/${lead.id}/140/140`} alt="Avatar" className="w-full h-full object-cover grayscale brightness-150" />
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex flex-col gap-3 p-5 bg-white/5 rounded-2xl border border-white/10 group hover:border-[#d4af37]/30 transition-all duration-500">
            <span className="text-[10px] text-gray-400 uppercase tracking-[0.2em] font-black">Asset Parameters</span>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-[#d4af37]" />
                <span className="text-sm font-bold tracking-tight text-white">{lead.phone}</span>
              </div>
              <span className="text-[10px] px-3 py-1 rounded-lg bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30 font-black uppercase tracking-widest">
                {lead.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-[#d4af37]" />
              <span className="text-sm font-bold tracking-tight text-white">{lead.email}</span>
            </div>
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
            <div className="relative w-48 h-48 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]">
                <circle
                  cx="96" cy="96" r="84"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="5"
                  className="text-white/10"
                />
                <circle
                  cx="96" cy="96" r="84"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeDasharray={527}
                  strokeDashoffset={527 - (527 * qualificationScore) / 100}
                  strokeLinecap="round"
                  className="text-[#d4af37] transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-5xl font-bold text-white tracking-tighter">{qualificationScore}%</span>
                <span className="text-[10px] text-[#d4af37] uppercase tracking-[0.4em] font-black mt-1">Qualified</span>
              </div>
            </div>
            <p className="text-[10px] text-white mt-4 uppercase tracking-[0.2em] flex items-center gap-2 font-bold bg-white/5 px-4 py-1.5 rounded-full border border-white/10">
              <ShieldCheck size={14} className="text-emerald-500" />
              Verified Integrity
            </p>
          </div>

          {aiInsights && (
            <div className="p-5 bg-[#d4af37]/5 rounded-2xl border border-[#d4af37]/20 space-y-3 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#d4af37]" />
                <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">Tactical Intelligence</span>
              </div>
              <p className="text-xs text-white/80 italic font-medium leading-relaxed">
                "{aiInsights.summary}"
              </p>
              <div className="flex items-start gap-2 pt-2 border-t border-[#d4af37]/10">
                <Target size={12} className="text-white mt-0.5" />
                <p className="text-[10px] font-black text-white uppercase tracking-tighter">
                  Recommendation: <span className="text-[#d4af37]">{aiInsights.recommendedAction}</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className={`flex items-center justify-center gap-3 py-4 rounded-2xl border text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-700 ${lead.caslVerified ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-red-500/10 border-red-500/30 text-red-400'}`}>
            <ShieldCheck size={16} strokeWidth={2.5} />
            CASL Handshake Valid
          </div>

          <button className="w-full py-4.5 gold-gradient text-black font-black rounded-2xl flex items-center justify-center gap-2 shadow-[0_12px_40px_rgba(212,175,55,0.3)] hover:shadow-[0_20px_50px_rgba(212,175,55,0.5)] hover:-translate-y-1 transition-all duration-300 uppercase text-xs tracking-[0.2em]">
            <Phone size={18} fill="black" />
            Initialize Link
          </button>

          <button className="w-full py-4.5 bg-white/5 text-white border border-white/10 font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all duration-300 uppercase text-[11px] tracking-[0.2em]">
            <Share2 size={16} />
            Transfer Assets
          </button>
        </div>
      </div>

      <div className="glass rounded-3xl p-6 flex flex-col gap-5 border-white/10 shadow-2xl bg-white/[0.01]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">Sync Protocol</span>
            <div className="flex items-center gap-3 transition-all duration-500">
              <div className={`p-2 rounded-xl ${status.bg} ${status.color} border border-white/5`}>
                {status.icon || <RefreshCw size={14} />}
              </div>
              <div className="flex flex-col">
                <span className={`text-sm font-bold tracking-tight ${status.color}`}>
                  {status.label}
                </span>
                {lastSynced && syncStatus === 'synced' && (
                  <span className="text-[10px] text-gray-500 flex items-center gap-1 font-bold">
                    <Clock size={11} /> {lastSynced}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            {syncStatus === 'error' && (
              <button 
                onClick={handleSync}
                className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest hover:bg-red-500/30 transition-all"
              >
                Retry
              </button>
            )}
            <button 
              onClick={() => { handleSync(); performAiDeepScan(); }}
              disabled={syncStatus === 'syncing' || isAnalyzing}
              className={`w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center transition-all duration-500 relative group
                ${(syncStatus === 'syncing' || isAnalyzing) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10 hover:border-[#d4af37]/50 shadow-inner'}`}
            >
              <div className={`w-4 h-4 rounded-full ${status.dot} transition-colors duration-500 ${(syncStatus === 'syncing' || isAnalyzing) ? 'animate-pulse scale-110 shadow-[0_0_15px_rgba(212,175,55,0.6)]' : 'shadow-[0_0_10px_rgba(0,0,0,0.8)]'}`} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-white/10 pt-5">
          <div className="flex flex-col">
            <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">End-to-End Encryption</span>
            <span className="text-[10px] text-emerald-500 font-black uppercase mt-1 tracking-tighter">FUB Secure Node Active</span>
          </div>
          <div className="w-12 h-6 bg-emerald-500/20 rounded-full p-1.5 flex justify-end border border-emerald-500/30 shadow-[inset_0_0_10px_rgba(16,185,129,0.2)]">
            <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
