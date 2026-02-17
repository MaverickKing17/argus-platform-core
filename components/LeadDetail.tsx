
import React from 'react';
import { Phone, Mail, CheckCircle, ExternalLink, ShieldCheck, Share2 } from 'lucide-react';
import { Lead } from '../types';

interface LeadDetailProps {
  lead: Lead | null;
}

const LeadDetail: React.FC<LeadDetailProps> = ({ lead }) => {
  if (!lead) {
    return (
      <div className="glass h-full rounded-2xl flex items-center justify-center text-gray-500 italic p-8">
        Select a lead from the feed to view elite profile
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="glass rounded-2xl p-6 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="font-luxury text-2xl gold-text">Lead Profile — {lead.name}</h3>
          <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center overflow-hidden">
            <img src={`https://picsum.photos/seed/${lead.id}/100/100`} alt="Avatar" className="w-full h-full object-cover opacity-80" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col gap-1 p-3 bg-white/5 rounded-xl border border-white/5">
            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-semibold">Contact & Property</span>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#d4af37]" />
                <span className="text-sm font-medium">{lead.phone}</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/20 uppercase">
                {lead.propertyType}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Mail size={14} className="text-[#d4af37]" />
              <span className="text-sm font-medium">{lead.email}</span>
            </div>
          </div>

          <div className="flex flex-col items-center py-6">
            <div className="relative w-40 h-40 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  className="text-white/5"
                />
                <circle
                  cx="80" cy="80" r="70"
                  fill="transparent"
                  stroke="currentColor"
                  strokeWidth="8"
                  strokeDasharray={440}
                  strokeDashoffset={440 - (440 * lead.qualificationScore) / 100}
                  className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-1000"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-luxury font-bold text-white">{lead.qualificationScore}%</span>
                <span className="text-[10px] text-gray-500 uppercase tracking-widest">Qualified</span>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 italic">Pre-approved & Verified</p>
          </div>
        </div>

        <div className="space-y-3">
          <div className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition-all ${lead.caslVerified ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
            <ShieldCheck size={18} />
            <span className="text-sm font-semibold tracking-wide">CASL Consent Verified</span>
          </div>

          <button className="w-full py-4 gold-gradient text-black font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(212,175,55,0.3)] hover:brightness-110 transition-all">
            <Phone size={18} fill="black" />
            One-Touch Dial
          </button>

          <button className="w-full py-4 glass text-white/80 border-white/10 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-white/5 transition-all">
            <Share2 size={18} />
            Export to CRM
          </button>
        </div>
      </div>

      <div className="glass rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400">Sync with Follow Up Boss</span>
          <div className="w-10 h-5 bg-emerald-500 rounded-full p-1 flex justify-end">
            <div className="w-3 h-3 bg-white rounded-full" />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-gray-400">Live CRM Streaming</span>
          <div className="w-10 h-5 bg-white/10 rounded-full p-1 flex justify-start">
            <div className="w-3 h-3 bg-gray-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
