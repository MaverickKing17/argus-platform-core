
import React, { useState, useEffect } from 'react';
import { Search, Bell, Map as MapIcon, ChevronRight, Activity, Zap, Shield, Info } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LeadDetail from './components/LeadDetail';
import { Lead, Stats, ViewState } from './types';
import { generateTerritoryBriefing } from './services/geminiService';

const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Sebastian Vasseur', propertyType: 'Penthouse', sentiment: 'Hot', lastMessage: 'Confirmed viewing for Tuesday at 4PM.', timeAgo: '2m ago', qualificationScore: 92, caslVerified: true, phone: '+1 (416) 555-0192', email: 'sebastian@luxury-v.com' },
  { id: '2', name: 'Elena Rodriguez', propertyType: 'Detached', sentiment: 'Warm', lastMessage: 'Interested in the Forest Hill listing.', timeAgo: '14m ago', qualificationScore: 85, caslVerified: true, phone: '+1 (416) 555-0144', email: 'elena.r@global-invest.ca' },
  { id: '3', name: 'Marcus Tan', propertyType: 'Commercial', sentiment: 'Neutral', lastMessage: 'Requested disclosure docs for review.', timeAgo: '45m ago', qualificationScore: 68, caslVerified: false, phone: '+1 (647) 555-0121', email: 'm.tan@tan-holdings.com' },
  { id: '4', name: 'Sarah Jenkins', propertyType: 'Condo', sentiment: 'Cold', lastMessage: 'Just browsing at the moment, thanks.', timeAgo: '1h ago', qualificationScore: 45, caslVerified: true, phone: '+1 (416) 555-0988', email: 'sarah.j@outlook.com' },
];

const MOCK_STATS: Stats = {
  gciProtected: '$1,420,000+',
  activeConversations: 47,
  responseSpeed: '6.2s',
  mctbEfficiency: 98.4
};

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>(ViewState.INSIGHTS);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(MOCK_LEADS[0]);
  const [territoryBriefing, setTerritoryBriefing] = useState<string>("Loading elite market insights...");

  useEffect(() => {
    const fetchBriefing = async () => {
      const briefing = await generateTerritoryBriefing("Yorkville/Forest Hill");
      setTerritoryBriefing(briefing);
    };
    fetchBriefing();
  }, []);

  const handleLogout = () => {
    alert("Logging out from premium session.");
  };

  const SentimentBadge = ({ sentiment }: { sentiment: Lead['sentiment'] }) => {
    const colors = {
      Hot: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      Warm: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      Neutral: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
      Cold: 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    };
    return (
      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${colors[sentiment]} tracking-wider uppercase`}>
        {sentiment}
      </span>
    );
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050505]">
      {/* Background Image with Layered Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 mix-blend-overlay"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=2000)' }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-transparent to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(212,175,55,0.08),_transparent_40%)]" />

      <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />

      <main className="relative pl-20 pr-8 py-8 min-h-screen max-w-[1600px] mx-auto transition-all duration-500">
        
        {/* Header Section */}
        <header className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-luxury text-4xl font-semibold gold-text tracking-tight">ARGUS Sales Closer</h1>
            <p className="text-gray-500 text-sm mt-1 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live AI Oversight — 2026 Edition
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 bg-white/5 border border-white/10 px-4 py-2 rounded-full focus-within:border-[#d4af37]/50 transition-all">
              <Search size={18} className="text-gray-500" />
              <input 
                type="text" 
                placeholder="Search leads, GCI, or territory..." 
                className="bg-transparent border-none outline-none text-sm w-64 placeholder-gray-600"
              />
            </div>
            <button className="relative p-2 text-gray-400 hover:text-[#d4af37] transition-colors">
              <Bell size={22} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#d4af37] rounded-full border-2 border-black" />
            </button>
            <div className="flex items-center gap-3 pl-6 border-l border-white/10">
              <div className="text-right">
                <p className="text-xs font-semibold text-white">Barry Cohen Group</p>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Master Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full gold-gradient p-[1px]">
                <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
                  <img src="https://picsum.photos/200" alt="Avatar" className="w-full h-full object-cover grayscale" />
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          
          {/* Main Dashboard Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* Performance Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-6 rounded-2xl border-white/5 group hover:border-[#d4af37]/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-[#d4af37]/10 rounded-lg text-[#d4af37]">
                    <Shield size={20} />
                  </div>
                  <span className="text-[10px] text-emerald-400 font-bold">+12% vs LY</span>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">GCI Protected</p>
                <h2 className="text-3xl font-luxury font-bold text-white mt-1">{MOCK_STATS.gciProtected}</h2>
              </div>

              <div className="glass p-6 rounded-2xl border-white/5 group hover:border-[#d4af37]/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                    <Activity size={20} />
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className={`w-1 h-3 rounded-full ${i < 4 ? 'bg-blue-400' : 'bg-white/10'}`} />)}
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Active Conversations</p>
                <h2 className="text-3xl font-luxury font-bold text-white mt-1">{MOCK_STATS.activeConversations}</h2>
              </div>

              <div className="glass p-6 rounded-2xl border-white/5 group hover:border-[#d4af37]/30 transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Zap size={20} />
                  </div>
                  <div className="w-6 h-6 rounded-full border border-emerald-500/30 flex items-center justify-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full pulse-gold" />
                  </div>
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Response Speed</p>
                <h2 className="text-3xl font-luxury font-bold text-white mt-1">{MOCK_STATS.responseSpeed}</h2>
              </div>
            </div>

            {/* Live Lead Feed */}
            <div className="glass rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-luxury gold-text">Live Sales Intelligence</h3>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">Real-time interaction matrix</p>
                </div>
                <button className="text-xs font-semibold text-[#d4af37] flex items-center gap-1 hover:gap-2 transition-all">
                  View All Feed <ChevronRight size={14} />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] uppercase tracking-widest text-gray-500 border-b border-white/5">
                      <th className="px-6 py-4 font-semibold">Lead Identity</th>
                      <th className="px-6 py-4 font-semibold">Asset Class</th>
                      <th className="px-6 py-4 font-semibold">AI Sentiment</th>
                      <th className="px-6 py-4 font-semibold">Last Message</th>
                      <th className="px-6 py-4 font-semibold">Temporal</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {MOCK_LEADS.map(lead => (
                      <tr 
                        key={lead.id} 
                        onClick={() => setSelectedLead(lead)}
                        className={`group cursor-pointer hover:bg-white/5 transition-all ${selectedLead?.id === lead.id ? 'bg-[#d4af37]/5' : ''}`}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-xs font-bold text-gray-400 group-hover:text-white transition-colors">
                              {lead.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="text-sm font-semibold">{lead.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs text-gray-400 font-medium">{lead.propertyType}</span>
                        </td>
                        <td className="px-6 py-4">
                          <SentimentBadge sentiment={lead.sentiment} />
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-400 truncate max-w-[150px] italic">"{lead.lastMessage}"</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[10px] font-bold text-gray-600 group-hover:text-[#d4af37]">{lead.timeAgo}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Locked Territory Section */}
            <div className="glass rounded-2xl p-6 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-40 transition-opacity">
                <MapIcon size={120} className="text-[#d4af37]" strokeWidth={0.5} />
              </div>
              <div className="relative z-10 max-w-lg">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-luxury gold-text">Exclusive Yorkville Enclave</h3>
                  <div className="bg-emerald-500/20 text-emerald-400 text-[10px] px-2 py-0.5 rounded border border-emerald-500/20 font-bold uppercase tracking-widest">Locked</div>
                </div>
                <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                  Your team holds the exclusive AI-response license for this high-net-worth district. Every missed call in Yorkville & Forest Hill is instantly intercepted by ARGUS.
                </p>
                <div className="glass p-4 rounded-xl border-white/10 bg-black/40 mb-6">
                  <div className="flex items-center gap-2 mb-2 text-[#d4af37]">
                    <Info size={16} />
                    <span className="text-xs font-bold uppercase tracking-widest">Market Intel</span>
                  </div>
                  <p className="text-xs text-gray-300 italic leading-relaxed">
                    {territoryBriefing}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-6 py-2 gold-gradient rounded-full text-black font-bold text-xs shadow-lg hover:scale-105 transition-all">
                    View District Map
                  </button>
                  <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-white font-semibold text-xs hover:bg-white/10 transition-all">
                    Expand Territory
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Side Column - Lead Profile */}
          <div className="col-span-12 lg:col-span-4 h-full">
            <LeadDetail lead={selectedLead} />
          </div>

        </div>

        {/* Footer */}
        <footer className="mt-12 py-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-600 text-[10px] uppercase tracking-[0.2em] font-medium">
            © 2026 ARGUS AI. All proprietary systems reserved. Encrypted for Cohen Luxury Group.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-[10px] text-gray-600 hover:text-[#d4af37] transition-colors uppercase tracking-widest font-semibold">Privacy Accord</a>
            <a href="#" className="text-[10px] text-gray-600 hover:text-[#d4af37] transition-colors uppercase tracking-widest font-semibold">Security Audit</a>
            <button 
              onClick={handleLogout}
              className="px-4 py-1.5 glass text-gray-400 text-[10px] font-bold uppercase tracking-widest rounded-lg hover:text-white transition-all border-white/10"
            >
              Logout
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
