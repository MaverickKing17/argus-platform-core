
import React, { useState, useEffect } from 'react';
import { Search, Bell, Map as MapIcon, ChevronRight, Activity, Zap, Shield, ShieldCheck, Landmark, Building2, Scale, Lock, Database, Trophy, UserCog, Info, FileText, Fingerprint, BarChart3, Settings2, Globe, Server } from 'lucide-react';
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

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.INSIGHTS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  const [territoryBriefing, setTerritoryBriefing] = useState<string>("Loading elite market insights...");
  
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
        const gciIncrement = Math.random() > 0.5 ? Math.floor(Math.random() * 500) : 0;
        setGciBase(old => old + gciIncrement);

        return {
          ...prev,
          activeConversations: newConversations,
          responseSpeed: `${newSpeed}s`,
          gciProtected: `$${(gciBase + gciIncrement).toLocaleString()}+`
        };
      });
    }, 3000);

    return () => clearInterval(statsInterval);
  }, [gciBase]);

  const handleLogout = () => {
    alert("Logging out from premium session.");
  };

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

  const renderActiveView = () => {
    switch (activeView) {
      case ViewState.INSIGHTS:
        return (
          <div className="grid grid-cols-12 gap-6 animate-fade-in-up">
            <div className="col-span-12 lg:col-span-8 space-y-6">
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
                    <div className="group/tooltip relative">
                      <div className="p-1 cursor-help hover:bg-white/10 rounded-full transition-colors">
                        <Info size={14} className="text-[#d4af37]" />
                      </div>
                      <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl text-[11px] text-white opacity-0 group-hover/tooltip:opacity-100 transition-all duration-300 pointer-events-none z-50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border-t-[#d4af37]">
                        <p className="font-black text-[#d4af37] uppercase tracking-widest mb-2 border-b border-white/10 pb-1">Asset Intelligence</p>
                        <p className="leading-relaxed font-medium">
                          <strong className="text-white">Gross Commission Income (GCI)</strong> represents the total revenue your team has successfully shielded from abandonment. It is the lifeblood of elite operations, tracking every dollar saved by ARGUS's sub-6s interception protocol.
                        </p>
                      </div>
                    </div>
                  </div>
                  <h2 className="text-4xl font-luxury font-bold text-white tracking-tighter transition-all duration-700">{stats.gciProtected}</h2>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Gross Commission Income</p>
                </div>
                <div className="glass p-7 rounded-3xl border-white/10 group hover:border-blue-400/40 transition-all shadow-xl">
                  <div className="flex justify-between items-start mb-5">
                    <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400 border border-blue-400/20">
                      <Activity size={22} />
                    </div>
                    <div className="flex gap-1.5 items-center">
                      {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1.5 h-4 rounded-full transition-all duration-500 ${i < (stats.activeConversations / 12) ? 'bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'bg-white/10'}`} />)}
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
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-emerald-500 uppercase">Instant</span>
                      <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
                    </div>
                  </div>
                  <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-1">Response Latency</p>
                  <h2 className="text-4xl font-luxury font-bold text-white tracking-tighter transition-all duration-700">{stats.responseSpeed}</h2>
                  <p className="text-[9px] text-white/30 font-bold uppercase tracking-widest mt-1">Under 10s benchmark</p>
                </div>
              </div>

              <div className="glass rounded-3xl overflow-hidden border-white/10 shadow-2xl">
                <div className="p-7 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Lead Intelligence Core</h3>
                    <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.3em] font-black mt-1">Real-time interaction matrix</p>
                  </div>
                  <button className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-white hover:bg-white/10 transition-all flex items-center gap-2">
                    View Full Archive <ChevronRight size={14} className="text-[#d4af37]" />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-[11px] uppercase tracking-[0.2em] text-gray-500 border-b border-white/10 bg-white/[0.01]">
                        <th className="px-8 py-5 font-black">Identity</th>
                        <th className="px-8 py-5 font-black">Asset Class</th>
                        <th className="px-8 py-5 font-black">Sentiment</th>
                        <th className="px-8 py-5 font-black">Intercepted Message</th>
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
                            <p className="text-xs text-gray-400 truncate max-w-[200px] italic font-medium leading-relaxed text-white/70 group-hover:text-white">"{lead.lastMessage}"</p>
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

              <div className="glass rounded-3xl p-8 relative overflow-hidden group border-white/10">
                <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:opacity-20 transition-opacity">
                  <MapIcon size={160} className="text-[#d4af37]" strokeWidth={0.5} />
                </div>
                <div className="relative z-10 max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] border border-[#d4af37]/20">
                      <Landmark size={24} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white tracking-tight">Toronto Enclave Mastery</h3>
                      <p className="text-[10px] text-[#d4af37] uppercase tracking-[0.3em] font-black">District Authorization: Active</p>
                    </div>
                  </div>
                  <p className="text-base text-gray-300 mb-6 leading-relaxed font-medium">
                    ARGUS is currently monitoring missed-call interceptions across the <span className="text-white font-bold underline decoration-[#d4af37]">Golden Triangle</span> of Toronto real estate. Exclusive response rights for your team are locked until Dec 2026.
                  </p>
                  <div className="bg-black/40 border border-white/10 p-5 rounded-2xl mb-8 shadow-inner">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#d4af37] shadow-[0_0_5px_#d4af37]" />
                      <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-[0.2em]">Market Briefing: Yorkville Core</span>
                    </div>
                    <p className="text-sm text-white/90 italic leading-relaxed font-medium">
                      {territoryBriefing}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="px-8 py-3 gold-gradient rounded-xl text-black font-black text-xs uppercase tracking-widest shadow-2xl hover:scale-105 transition-all">
                      Initialize Mapping
                    </button>
                    <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                      Territory Expansion
                    </button>
                  </div>
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
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                     <p className="text-lg text-white font-bold leading-relaxed">
                       Welcome to the most secure repository for ultra-high-net-worth interactions in North America. 
                       The ARGUS Lead Encryption Vault utilizes a proprietary Phase-4 biometric handshake protocol to ensure that every sensitive interaction is shielded from unauthorized access. 
                       Your team’s data is stored in off-shore cold-storage nodes, ensuring that even in the event of a global network disruption, your client relationships remain private and intact. 
                       Security is not just a feature here; it is the fundamental pillar of Toronto's most elite real estate operations. 
                       We have implemented a temporal locking mechanism that prevents the export of high-value deal documents outside of authorized principal working hours. 
                       Furthermore, every data point is fully compliant with CASL regulations, providing you with peace of mind during the most complex negotiations. 
                       Only the team principal has the authority to initiate the deep decryption sequence required to access historical sentiment mappings.
                     </p>
                     <div className="flex gap-4">
                       <button className="px-8 py-3 gold-gradient rounded-xl text-black font-black uppercase text-xs tracking-widest shadow-2xl">
                         Initialize Decryption
                       </button>
                       <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-white font-bold uppercase text-xs tracking-widest hover:bg-white/10">
                         Audit Access Logs
                       </button>
                     </div>
                   </div>
                   
                   <div className="space-y-4">
                     <div className="bg-black/60 p-6 rounded-2xl border border-white/5 space-y-4">
                       <div className="flex items-center justify-between">
                         <span className="text-xs font-black text-gray-500 uppercase tracking-widest">Active Security Protocol</span>
                         <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded border border-emerald-500/20">ARGUS v4.2</span>
                       </div>
                       <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full w-[94%] gold-gradient shadow-[0_0_10px_#d4af37]" />
                       </div>
                       <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase tracking-widest">
                         <span>Integrity Level</span>
                         <span>94.8% Secure</span>
                       </div>
                     </div>
                     
                     <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: 'Encrypted Records', value: '4,281', icon: FileText },
                          { label: 'Last Handshake', value: '2m ago', icon: Fingerprint },
                          { label: 'Unauthorized Ingress', value: '0', icon: Shield },
                          { label: 'Global Compliance', value: 'Active', icon: Globe }
                        ].map((stat, i) => (
                          <div key={i} className="bg-white/5 p-4 rounded-xl border border-white/5 hover:border-[#d4af37]/30 transition-all cursor-default">
                            <stat.icon size={16} className="text-[#d4af37] mb-2" />
                            <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
                            <p className="text-lg font-bold text-white">{stat.value}</p>
                          </div>
                        ))}
                     </div>
                   </div>
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
                     <h2 className="text-4xl font-bold text-white tracking-tighter">GCI Accumulation Matrix</h2>
                     <p className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mt-1">Gross Commission Income Analytics</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <p className="text-lg text-white font-bold leading-relaxed">
                        The GCI Accumulation Matrix provides a real-time visualization of the direct financial impact generated by the ARGUS sales interception engine. 
                        By analyzing your current pipeline, we have determined that your team has protected an estimated $1.4M+ in Gross Commission Income (GCI) this fiscal quarter alone. 
                        This significant ROI is a direct result of our missed-call text-back efficiency, which captures leads that would otherwise be lost to the competition. 
                        Our proprietary lead scoring algorithm ensures that your energy is focused solely on high-value closures within Toronto’s Golden Triangle. 
                        We have observed a 98.4% efficiency rate in luxury lead qualification, far surpassing industry standards for high-end boutique teams. 
                        As you dominate your respective enclaves, ARGUS continues to observe seasonal trends that allow for proactive market adjustments. 
                        Based on your current velocity, our systems project a 15% increase in protected GCI for the upcoming quarter as you expand your territory rights.
                      </p>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Capture Rate</p>
                          <p className="text-xl font-bold text-emerald-500">99.2%</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Avg Value</p>
                          <p className="text-xl font-bold text-white">$4.8M</p>
                        </div>
                        <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                          <p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">AI Lift</p>
                          <p className="text-xl font-bold text-[#d4af37]">+22%</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-black/40 rounded-3xl p-8 border border-white/10 flex flex-col items-center justify-center text-center">
                       <div className="relative w-64 h-64 mb-6">
                         <div className="absolute inset-0 gold-gradient opacity-10 blur-3xl rounded-full" />
                         <div className="relative z-10 w-full h-full border-4 border-white/5 rounded-full flex flex-col items-center justify-center">
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2">Quarterly Velocity</span>
                            <span className="text-5xl font-luxury font-bold text-white tracking-tighter">$1.42M</span>
                            <span className="text-xs font-black text-[#d4af37] uppercase tracking-widest mt-2">Target Achieved</span>
                         </div>
                       </div>
                       <p className="text-xs text-white font-bold italic opacity-60">"The standard of excellence for Toronto's top 1%."</p>
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
               <div className="absolute top-0 right-0 p-12 opacity-5">
                 <Settings2 size={200} className="text-[#d4af37]" strokeWidth={0.5} />
               </div>
               <div className="relative z-10">
                 <div className="flex items-center gap-4 mb-8">
                   <div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/20 text-purple-400">
                     <UserCog size={32} />
                   </div>
                   <div>
                     <h2 className="text-4xl font-bold text-white tracking-tighter">Admin Override Panel</h2>
                     <p className="text-[#d4af37] font-black uppercase tracking-[0.3em] text-[10px] mt-1">Authorized Access: Level 7 Clearances</p>
                   </div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-6">
                      <p className="text-lg text-white font-bold leading-relaxed">
                        The Admin Override Panel is the central nerve center for your ARGUS deployment and is strictly reserved for team principals with verified security clearances. 
                        Within this interface, you have the granular control required to configure AI intercept parameters and define the behavioral tone of your digital agents. 
                        Our AI Aggression settings can be toggled between 'Elite' and 'Stealth' modes, directly impacting how the model handles initial luxury lead qualification. 
                        The system maintains a real-time, zero-latency synchronization with your CRM, specifically optimized for high-tier Follow Up Boss environments. 
                        Principal permissions allow you to manage team access levels, ensuring that sensitive GCI projections remain confidential within the core partnership. 
                        Every system override is recorded in our permanent audit logs, providing a transparent diagnostic history of all protocol adjustments. 
                        Procedures for the scheduled 2026 security protocol update can also be initiated from this panel to maintain your technological edge. 
                        Maintaining your district authorization for Toronto's most prestigious enclaves requires periodic integrity checks located in the territory settings sub-panel.
                      </p>
                      <div className="flex items-center gap-4">
                         <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-lg border border-emerald-500/20">
                           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                           <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">FUB Node Online</span>
                         </div>
                         <div className="flex items-center gap-2 bg-[#d4af37]/10 px-4 py-2 rounded-lg border border-[#d4af37]/20">
                           <Server size={12} className="text-[#d4af37]" />
                           <span className="text-[10px] font-black text-[#d4af37] uppercase tracking-widest">Latency: 0.02ms</span>
                         </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                       <h4 className="text-xs font-black text-white uppercase tracking-[0.3em] border-b border-white/10 pb-2">Active Protocols</h4>
                       {[
                         { name: 'AI Aggression Level', status: 'ELITE', color: 'text-[#d4af37]' },
                         { name: 'Follow Up Boss Sync', status: 'ACTIVE', color: 'text-emerald-500' },
                         { name: 'District Authorization', status: 'LOCKED', color: 'text-blue-500' },
                         { name: 'Biometric Handshake', status: 'ENFORCED', color: 'text-white' }
                       ].map((p, i) => (
                         <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all">
                           <span className="text-sm font-bold text-white/80">{p.name}</span>
                           <span className={`text-[10px] font-black uppercase tracking-widest ${p.color}`}>{p.status}</span>
                         </div>
                       ))}
                       <button className="w-full py-4 mt-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 font-black uppercase text-xs tracking-widest hover:bg-red-500/20 transition-all">
                         Emergency System Wipe
                       </button>
                    </div>
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
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.06),_transparent_50%)] pointer-events-none" />

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
                placeholder="Search leads, GCI, or territory..." 
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
                  <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover grayscale brightness-150" />
                </div>
              </div>
            </div>
          </div>
        </header>

        {renderActiveView()}

        {/* Updated footer with lighter background and bright white text */}
        <footer className="mt-20 pt-16 pb-12 border-t border-white/10 bg-[#0c0c0c] transition-colors duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl gold-gradient flex items-center justify-center shadow-lg">
                  <ShieldCheck className="text-black" size={24} />
                </div>
                <h2 className="text-2xl font-bold text-white tracking-tighter">ARGUS Sales Closer</h2>
              </div>
              <p className="text-white text-sm leading-relaxed max-w-sm font-bold">
                The premier AI-driven GCI (Gross Commission Income) protection suite for elite Toronto real estate professionals. ARGUS intercepts, qualifies, and converts missed opportunities into multi-million dollar closings.
              </p>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-[#d4af37] uppercase tracking-widest border border-[#d4af37]/20 px-3 py-1.5 rounded-lg bg-[#d4af37]/5">
                  <Lock size={12} /> SECURE PROTOCOL V4.2
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Building2 size={14} className="text-[#d4af37]" /> Enclaves
              </h4>
              <ul className="space-y-4 text-sm font-bold text-white">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Yorkville Mastery</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">The Bridle Path</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Forest Hill South</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Rosedale Valley</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">The Annex Collection</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Scale size={14} className="text-[#d4af37]" /> Governance
              </h4>
              <ul className="space-y-4 text-sm font-bold text-white">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Privacy Accord</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Terms of Engagement</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Cookie Mandate</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">DMCA Compliance</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Anti-SPAM Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black text-xs uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <Activity size={14} className="text-[#d4af37]" /> Ecosystem
              </h4>
              <ul className="space-y-4 text-sm font-bold text-white">
                <li><a href="#" className="hover:text-[#d4af37] transition-colors" title="Gross Commission Income Dashboard">GCI Protection Dashboard</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">MCTB Efficiency Lab</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">FUB Elite Sync</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">API Documentation</a></li>
                <li><a href="#" className="hover:text-[#d4af37] transition-colors">Security Audit 2026</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-[10px] text-white font-black uppercase tracking-[0.4em] flex items-center gap-4">
              <span>© 2026 ARGUS ELITE. ALL RIGHTS RESERVED.</span>
            </div>
            <div className="flex items-center gap-8 text-[11px] font-black text-white uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-emerald-500" />
                PCI-DSS LEVEL 1 COMPLIANT
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                SYSTEMS OPERATIONAL
              </div>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-white font-black uppercase tracking-widest">
              DESIGNED FOR THE TOP 1% OF REAL ESTATE PROFESSIONALS
            </div>
          </div>
        </footer>
      </main>

      {/* ARGUS Oracle: The Live AI Encyclopedia */}
      <MarketChat />
    </div>
  );
};

export default App;
