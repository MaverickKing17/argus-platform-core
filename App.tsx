
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, Bell, Map as MapIcon, ChevronRight, Activity, Zap, Shield, ShieldCheck, Landmark, Building2, Scale, Lock, Database, Trophy, UserCog, Info, FileText, Fingerprint, BarChart3, Settings2, Globe, Server, Link2, ExternalLink, Cpu, History, MessageSquareText, TrendingUp, DollarSign } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LeadDetail from './components/LeadDetail';
import MarketChat from './components/MarketChat';
import { Lead, Stats, ViewState } from './types';
import { generateTerritoryBriefing } from './services/geminiService';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Sebastian Vasseur', propertyType: 'Penthouse', sentiment: 'Hot', lastMessage: 'Confirmed viewing for Tuesday at 4PM.', timeAgo: '2m ago', qualificationScore: 92, caslVerified: true, phone: '+1 (416) 555-0192', email: 'sebastian@luxury-v.com' },
  { id: '2', name: 'Elena Rodriguez', propertyType: 'Detached', sentiment: 'Warm', lastMessage: 'Interested in the Forest Hill listing.', timeAgo: '14m ago', qualificationScore: 85, caslVerified: true, phone: '+1 (416) 555-0144', email: 'elena.r@global-invest.ca' },
  { id: '3', name: 'Marcus Tan', propertyType: 'Commercial', sentiment: 'Neutral', lastMessage: 'Requested disclosure docs for review.', timeAgo: '45m ago', qualificationScore: 68, caslVerified: false, phone: '+1 (647) 555-0121', email: 'm.tan@tan-holdings.com' },
  { id: '4', name: 'Sarah Jenkins', propertyType: 'Condo', sentiment: 'Cold', lastMessage: 'Just browsing at the moment, thanks.', timeAgo: '1h ago', qualificationScore: 45, caslVerified: true, phone: '+1 (416) 555-0988', email: 'sarah.j@outlook.com' },
];

const CRMS = [
  { id: 'fub', name: 'Follow Up Boss', url: 'https://www.followupboss.com', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  { id: 'lofty', name: 'Lofty (Chime)', url: 'https://www.lofty.com', color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { id: 'kvcore', name: 'KVCore', url: 'https://www.kvcore.com', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  { id: 'sierra', name: 'Sierra Interactive', url: 'https://www.sierrainteractive.com', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { id: 'salesforce', name: 'Salesforce Real Estate', url: 'https://www.salesforce.com', color: 'text-sky-400', bg: 'bg-sky-400/10' }
];

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.INSIGHTS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  const [territoryBriefing, setTerritoryBriefing] = useState<string>("Initializing secure intelligence stream...");
  const [activeCRM, setActiveCRM] = useState<typeof CRMS[0] | null>(null);
  const [gciAtRisk, setGciAtRisk] = useState(8420);
  
  const [stats, setStats] = useState<Stats>({
    gciProtected: '$1,420,000+',
    activeConversations: 47,
    responseSpeed: '6.2s',
    mctbEfficiency: 98.4
  });

  const [gciBase, setGciBase] = useState(1420000);

  useEffect(() => {
    const fetchBriefing = async () => {
      const briefing = await generateTerritoryBriefing("Yorkville/Forest Hill");
      setTerritoryBriefing(briefing);
    };
    fetchBriefing();

    const statsInterval = setInterval(() => {
      setStats(prev => {
        const convChange = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
        const newConversations = Math.max(40, Math.min(60, prev.activeConversations + convChange));
        const speedFloat = parseFloat(prev.responseSpeed);
        const newSpeed = (speedFloat + (Math.random() * 0.2 - 0.1)).toFixed(1);
        const gciIncrement = Math.random() > 0.5 ? Math.floor(Math.random() * 300) : 0;
        
        setGciBase(old => old + gciIncrement);
        setGciAtRisk(prevRisk => prevRisk + (Math.random() * 5));

        return {
          ...prev,
          activeConversations: newConversations,
          responseSpeed: `${newSpeed}s`,
          gciProtected: `$${(gciBase + gciIncrement).toLocaleString()}+`
        };
      });
    }, 4000);

    return () => clearInterval(statsInterval);
  }, [gciBase]);

  const handleLogout = () => {
    alert("Terminating elite session. Redirecting to secure login.");
  };

  const handlePlaceholderLink = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
  }, []);

  const SentimentBadge = ({ sentiment }: { sentiment: Lead['sentiment'] }) => {
    const colors = {
      Hot: 'text-orange-400 bg-orange-400/20 border-orange-400/30',
      Warm: 'text-yellow-400 bg-yellow-400/20 border-yellow-400/30',
      Neutral: 'text-blue-400 bg-blue-400/20 border-blue-400/30',
      Cold: 'text-gray-300 bg-white/5 border-white/10'
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[sentiment]} tracking-wider uppercase`}>
        {sentiment}
      </span>
    );
  };

  const renderCRMModal = () => {
    if (!activeCRM) return null;
    return (
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
        <div className="glass w-full max-w-md rounded-[2.5rem] border border-[#d4af37]/40 p-10 animate-fade-in-up relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gold-gradient"></div>
          <button 
            onClick={() => setActiveCRM(null)}
            className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
          >
            <Shield size={24} />
          </button>
          
          <div className="flex flex-col items-center text-center mb-8">
            <div className={`w-16 h-16 rounded-2xl ${activeCRM.bg} ${activeCRM.color} flex items-center justify-center mb-4 border border-white/10`}>
              <Link2 size={32} />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{activeCRM.name}</h3>
            <p className="text-[10px] text-[#d4af37] font-black uppercase tracking-[0.2em] mt-2">Biometric Handshake Required</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Principal ID</label>
              <input type="text" placeholder="agent@luxury-toronto.ca" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#d4af37]/50 outline-none transition-all" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Secure Passkey</label>
              <input type="password" placeholder="••••••••" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:border-[#d4af37]/50 outline-none transition-all" />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <button className="w-full gold-gradient py-4 rounded-xl text-black font-black uppercase text-xs tracking-widest shadow-2xl hover:scale-[1.02] transition-all">
              Initialize Synchronized Stream
            </button>
            <a 
              href={activeCRM.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full py-4 bg-white/5 border border-white/10 rounded-xl text-white font-bold uppercase text-[10px] tracking-widest text-center flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
            >
              Open Native {activeCRM.name} <ExternalLink size={14} className="text-[#d4af37]" />
            </a>
          </div>
          
          <p className="text-[9px] text-white/20 font-black uppercase tracking-[0.3em] mt-8 text-center">
            Zero-Leak Proxy Encryption Enabled
          </p>
        </div>
      </div>
    );
  };

  const renderActiveView = () => {
    switch (activeView) {
      case ViewState.INSIGHTS:
        return (
          <div className="grid grid-cols-12 gap-6 animate-fade-in-up">
            <div className="col-span-12 lg:col-span-8 space-y-6">
              {/* MONEY MAKING FEATURE: Live Velocity Meter */}
              <div className="glass p-5 rounded-3xl border-[#d4af37]/20 flex items-center justify-between gap-8 bg-gradient-to-r from-black via-black to-[#d4af37]/5 overflow-hidden group">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
                    <TrendingUp size={28} className="animate-pulse" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-white uppercase tracking-[0.2em]">Live Loss Velocity</h4>
                    <p className="text-xs text-gray-500 font-bold mt-1">GCI currently at risk due to lag:</p>
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                   <span className="text-3xl font-luxury font-bold text-red-500 tracking-tighter">${gciAtRisk.toFixed(0)}</span>
                   <span className="text-[10px] font-black text-red-500/50 uppercase tracking-widest animate-pulse">Rising</span>
                </div>
                <div className="flex gap-4">
                   <button className="px-5 py-2.5 gold-gradient rounded-xl text-black text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">
                     Initialize AI Closer
                   </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-7 rounded-3xl border-white/10 group hover:border-[#d4af37]/40 transition-all shadow-xl relative overflow-hidden">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-2.5 bg-[#d4af37]/10 rounded-xl text-[#d4af37] border border-[#d4af37]/20">
                      <Shield size={22} />
                    </div>
                    <span className="text-[11px] text-emerald-400 font-black bg-emerald-400/10 px-2 py-0.5 rounded border border-emerald-400/20">+12% vs LY</span>
                  </div>
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">GCI Protected</p>
                  </div>
                  <h2 className="text-4xl font-luxury font-bold text-white tracking-tighter transition-all duration-700">{stats.gciProtected}</h2>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Gross Commission Income</p>
                </div>
                <div className="glass p-7 rounded-3xl border-white/10 group hover:border-blue-400/40 transition-all shadow-xl">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-400/20">
                      <Activity size={22} />
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Live Encounters</p>
                  <h2 className="text-4xl font-luxury font-bold text-white tracking-tighter transition-all duration-700">{stats.activeConversations}</h2>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">AI-Handled Conversations</p>
                </div>
                <div className="glass p-7 rounded-3xl border-white/10 group hover:border-emerald-400/40 transition-all shadow-xl">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-400/20">
                      <Zap size={22} />
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Response Latency</p>
                  <h2 className="text-4xl font-luxury font-bold text-white tracking-tighter transition-all duration-700">{stats.responseSpeed}</h2>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Under 10s benchmark</p>
                </div>
              </div>

              {/* INTEGRATIONS HUB */}
              <div className="glass rounded-3xl p-8 border-[#d4af37]/10">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Ecosystem Synchronization</h3>
                    <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.3em] font-black mt-1">One-click CRM Handshake</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-500 font-bold uppercase">Master Status:</span>
                    <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                       <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">Global Link Active</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  {CRMS.map(crm => (
                    <button 
                      key={crm.id}
                      onClick={() => setActiveCRM(crm)}
                      className="glass group p-5 rounded-2xl border-white/5 hover:border-[#d4af37]/40 transition-all flex flex-col items-center gap-3 text-center"
                    >
                      <div className={`w-12 h-12 rounded-xl ${crm.bg} ${crm.color} flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg`}>
                        <Link2 size={24} />
                      </div>
                      <span className="text-[10px] font-black text-white/60 group-hover:text-white uppercase tracking-widest transition-colors">
                        {crm.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                <div className="p-7 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Lead Intelligence Core</h3>
                    <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.3em] font-black mt-1">Real-time interaction matrix</p>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/10 bg-white/[0.01]">
                        <th className="px-8 py-5 font-black">Identity</th>
                        <th className="px-8 py-5 font-black">Asset Class</th>
                        <th className="px-8 py-5 font-black">Sentiment</th>
                        <th className="px-8 py-5 font-black">Temporal</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {MOCK_LEADS.map(lead => (
                        <tr 
                          key={lead.id} 
                          onClick={() => setSelectedLead(lead)}
                          className={`group cursor-pointer transition-all ${selectedLead?.id === lead.id ? 'bg-[#d4af37]/10' : 'hover:bg-white/[0.03]'}`}
                        >
                          <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                              <div className="w-9 h-9 rounded-xl gold-gradient p-[1px] shadow-lg">
                                <div className="w-full h-full rounded-xl bg-black flex items-center justify-center text-xs font-black text-[#d4af37]">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </div>
                              </div>
                              <span className="text-sm font-bold text-white tracking-tight">{lead.name}</span>
                            </div>
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-xs text-gray-300 font-semibold">{lead.propertyType}</span>
                          </td>
                          <td className="px-8 py-6">
                            <SentimentBadge sentiment={lead.sentiment} />
                          </td>
                          <td className="px-8 py-6">
                            <span className="text-[11px] font-black text-gray-500 group-hover:text-[#d4af37] tracking-widest">{lead.timeAgo}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="col-span-12 lg:col-span-4 h-full">
              <LeadDetail lead={selectedLead} />
            </div>
          </div>
        );
      case ViewState.VAULT:
        return (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <div className="glass rounded-3xl p-10 border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Lock size={200} className="text-[#d4af37]" strokeWidth={0.5} />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
                     <Database size={32} />
                   </div>
                   <div>
                     <h2 className="text-4xl font-bold text-white tracking-tighter">Lead Encryption Vault</h2>
                     <p className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mt-1">Status: High-Security Lockdown</p>
                   </div>
                 </div>
                 <p className="text-lg text-white font-bold leading-relaxed max-w-2xl">
                   Securely storing the most valuable data in the city. Our Vault utilizes military-grade encryption to protect the private interactions of your ultra-high-net-worth clients.
                 </p>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                    {[
                      { label: 'Asset records', value: '4,281', icon: FileText },
                      { label: 'Secure handshakes', value: '829', icon: Fingerprint },
                      { label: 'Protocol Version', value: 'Phase 4', icon: Shield },
                      { label: 'Global Compliance', value: 'Active', icon: Globe }
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <stat.icon size={20} className="text-[#d4af37] mb-3" />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-2xl font-bold text-white">{stat.value}</p>
                      </div>
                    ))}
                 </div>
               </div>
            </div>
          </div>
        );
      case ViewState.RESULTS:
        return (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <div className="glass rounded-3xl p-10 border-white/10 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Trophy size={200} className="text-[#d4af37]" strokeWidth={0.5} />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-[#d4af37]/10 rounded-2xl border border-[#d4af37]/20 text-[#d4af37]">
                     <BarChart3 size={32} />
                   </div>
                   <div>
                     <h2 className="text-4xl font-bold text-white tracking-tighter">Financial Intelligence</h2>
                     <p className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mt-1">GCI Projection Matrix</p>
                   </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                       <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-6">Pipeline Velocity</h4>
                          <div className="space-y-6">
                             {[
                               { label: 'Interception Rate', val: 99, color: 'gold-gradient' },
                               { label: 'Qualified Sentiment', val: 84, color: 'bg-blue-400' },
                               { label: 'GCI Lock-in', val: 72, color: 'bg-emerald-400' }
                             ].map((bar, i) => (
                               <div key={i} className="space-y-2">
                                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-white/60">
                                    <span>{bar.label}</span>
                                    <span>{bar.val}%</span>
                                  </div>
                                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                     <div className={`h-full ${bar.color} rounded-full transition-all duration-1000 shadow-xl`} style={{ width: `${bar.val}%` }} />
                                  </div>
                               </div>
                             ))}
                          </div>
                       </div>
                    </div>
                    <div className="bg-black/40 rounded-3xl border border-[#d4af37]/20 p-8 flex flex-col items-center justify-center text-center">
                       <div className="w-24 h-24 rounded-full gold-gradient p-1 mb-6">
                         <div className="w-full h-full rounded-full bg-black flex items-center justify-center">
                           <DollarSign size={40} className="text-[#d4af37]" />
                         </div>
                       </div>
                       <h3 className="text-3xl font-luxury font-bold text-white tracking-tighter">$1,420,000+</h3>
                       <p className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.4em] mt-2">Protected Revenue</p>
                    </div>
                 </div>
               </div>
            </div>
          </div>
        );
      case ViewState.SETTINGS:
        return (
          <div className="max-w-6xl mx-auto space-y-8 animate-fade-in-up">
            <div className="glass rounded-3xl p-10 border-white/10 relative overflow-hidden">
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400">
                     <Settings2 size={32} />
                   </div>
                   <div>
                     <h2 className="text-4xl font-bold text-white tracking-tighter">System Configuration</h2>
                     <p className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mt-1">Phase 4 Overrides Active</p>
                   </div>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                   {['AI Aggression', 'Intercept Window', 'Sentiment Model', 'Sync Frequency', 'Biometric Mode', 'Privacy Level'].map((opt, i) => (
                     <div key={i} className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center justify-between group hover:border-[#d4af37]/40 transition-all cursor-pointer">
                        <span className="text-sm font-bold text-white/80">{opt}</span>
                        <div className="w-12 h-6 bg-black/40 rounded-full p-1 border border-white/10 relative">
                           <div className="w-4 h-4 rounded-full gold-gradient absolute right-1" />
                        </div>
                     </div>
                   ))}
                 </div>
               </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020202]">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=2000)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-transparent to-black pointer-events-none" />

      <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />

      <main className="relative pl-32 pr-8 pt-8 min-h-screen max-w-[1600px] mx-auto transition-all duration-500 pb-20">
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-luxury text-4xl font-bold gold-text tracking-tighter">ARGUS Sales Closer</h1>
            <p className="text-white text-sm mt-1 flex items-center gap-2 font-black">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
              LIVE AI OVERSIGHT <span className="text-white/30 mx-1">|</span> <span className="text-[#d4af37]">2026 PROTOCOL ACTIVE</span>
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 bg-white/10 border border-white/20 px-5 py-2.5 rounded-full focus-within:border-[#d4af37] transition-all group shadow-2xl">
              <Search size={18} className="text-white/40 group-focus-within:text-[#d4af37]" />
              <input 
                type="text" 
                placeholder="Search intel..." 
                className="bg-transparent border-none outline-none text-sm w-72 placeholder-white/20 text-white font-bold"
              />
            </div>
            <button className="relative p-2.5 bg-white/5 border border-white/10 rounded-full text-white hover:border-[#d4af37]/50 hover:bg-white/10 transition-all shadow-xl">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-[#d4af37] rounded-full border-2 border-[#020202]" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-sm font-black text-white tracking-tight">Barry Cohen Group</p>
                <p className="text-[10px] text-[#d4af37] uppercase tracking-widest font-black">Principal Partner</p>
              </div>
              <div className="w-11 h-11 rounded-full gold-gradient p-[1.5px] shadow-2xl">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/seed/argus/200" alt="Avatar" className="w-full h-full object-cover grayscale brightness-150" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {renderActiveView()}

        {renderCRMModal()}

        <footer className="mt-20 pt-16 pb-12 border-t border-white/10 bg-[#0c0c0c] transition-colors duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-black" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tighter">ARGUS Elite</h2>
              </div>
              <p className="text-white text-sm leading-relaxed max-w-sm font-bold opacity-60">
                The standard of technological excellence for Toronto's multi-million dollar closers. Intercepting missed calls, qualifying sentiment, and maximizing GCI with Zero Friction.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Building2 size={14} className="text-[#d4af37]" /> Enclaves
              </h4>
              <ul className="space-y-4 text-[11px] font-black text-white/50 uppercase tracking-widest">
                <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Yorkville Core</li>
                <li className="hover:text-[#d4af37] transition-colors cursor-pointer">The Bridle Path</li>
                <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Forest Hill South</li>
                <li className="hover:text-[#d4af37] transition-colors cursor-pointer">The Annex</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Scale size={14} className="text-[#d4af37]" /> Sync Nodes
              </h4>
              <ul className="space-y-4 text-[11px] font-black text-white/50 uppercase tracking-widest">
                {CRMS.map(c => <li key={c.id} className="hover:text-[#d4af37] transition-colors cursor-pointer">{c.name}</li>)}
              </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-[9px] text-white/20 font-black uppercase tracking-[0.4em]">
              © 2026 ARGUS ELITE. TECHNOLOGY FOR THE TOP 1%.
            </div>
            <div className="flex items-center gap-8 text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">
              <span className="flex items-center gap-2"><ShieldCheck size={12} className="text-emerald-500" /> PCI-DSS LEVEL 1</span>
              <span className="flex items-center gap-2"><Globe size={12} className="text-blue-500" /> ISO 27001</span>
            </div>
          </div>
        </footer>
      </main>

      <MarketChat />
    </div>
  );
};

export default App;
