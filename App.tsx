import React, { useState, useEffect, useCallback } from 'react';
import { Search, Bell, Activity, Zap, Shield, ShieldCheck, Building2, Scale, Lock, Database, Trophy, FileText, Fingerprint, BarChart3, Settings2, Globe, Link2, ExternalLink, Cpu, DollarSign, Image as ImageIcon, Palette, Upload, Check, CheckCircle2 } from 'lucide-react';
import Sidebar from './components/Sidebar';
import LeadDetail from './components/LeadDetail';
import MarketChat from './components/MarketChat';
import AgentAnalytics from './components/AgentAnalytics';
import Footer from './components/Footer';
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
  
  // Dynamic White Label Branding State
  const [brokerageName, setBrokerageName] = useState('Barry Cohen Group');
  const [principalPartner, setPrincipalPartner] = useState('Principal Partner');
  const [logoUrl, setLogoUrl] = useState('https://picsum.photos/seed/argus_user/100');

  const [stats, setStats] = useState<Stats>({
    gciProtected: '$1,420,000+',
    activeConversations: 47,
    responseSpeed: '6.2s',
    mctbEfficiency: 98.4
  });

  const handleLogout = () => alert("Securing terminal...");

  const SentimentBadge = ({ sentiment }: { sentiment: Lead['sentiment'] }) => {
    const isHot = sentiment === 'Hot';
    return (
      <span className={`px-4 py-1.5 rounded-md text-[10px] font-bold border tracking-widest uppercase transition-all
        ${isHot ? 'bg-[#C5A059] text-[#1A1A1A] border-[#C5A059]' : 'bg-gray-100 text-gray-500 border-gray-200'}`}>
        {sentiment}
      </span>
    );
  };

  const renderActiveView = () => {
    switch (activeView) {
      case ViewState.INSIGHTS:
        return (
          <div className="grid grid-cols-12 gap-12 animate-fade-in">
            <div className="col-span-12 lg:col-span-8 space-y-12">
              {/* Executive Metrics Grid - Enhanced Whitespace */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { label: 'GCI Protected', value: stats.gciProtected, icon: Shield, color: 'text-[#C5A059]', trend: '+14.2%' },
                  { label: 'Live Encounters', value: stats.activeConversations, icon: Activity, color: 'text-blue-500', trend: 'Active' },
                  { label: 'AI Latency', value: stats.responseSpeed, icon: Zap, color: 'text-orange-500', trend: 'Optimized' }
                ].map((s, idx) => (
                  <div key={idx} className="card-white p-10 flex flex-col justify-between min-h-[200px] hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <div className="flex items-center justify-between mb-8">
                      <div className={`p-4 rounded-xl bg-[#F7F6F3] border border-gray-100 ${s.color} group-hover:scale-110 transition-transform`}>
                        <s.icon size={24} />
                      </div>
                      <div className="flex flex-col items-end">
                        <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Live Node</span>
                        <span className={`text-[9px] font-bold mt-1 ${s.trend.includes('+') ? 'text-emerald-500' : 'text-[#C5A059]'}`}>{s.trend}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">{s.label}</p>
                      <h2 className="text-4xl font-black text-[#1A1A1A] tracking-tighter">{s.value}</h2>
                    </div>
                  </div>
                ))}
              </div>

              {/* CRM Synchronization Nodes */}
              <div className="card-white p-10">
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Ecosystem Sync</h3>
                  <p className="text-xs text-gray-400 font-medium">Verified principal handshakes for automated ingestion.</p>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  {['Follow Up Boss', 'Lofty (Chime)', 'KVCore'].map(crm => (
                    <button key={crm} className="flex items-center justify-center gap-3 py-5 rounded-lg border border-gray-100 bg-[#F7F6F3]/50 hover:border-[#C5A059] hover:bg-white transition-all">
                      <Link2 size={18} className="text-[#C5A059]" />
                      <span className="text-xs font-bold text-[#1A1A1A] tracking-tight">{crm}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Data Matrix - Table Design Refined */}
              <div className="card-white !p-0 overflow-hidden shadow-sm">
                <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-[#1A1A1A]">Operational Matrix</h3>
                  <div className="flex gap-4">
                    <button className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-colors flex items-center gap-2">
                       <FileText size={14} /> Intelligence Export
                    </button>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-[#F7F6F3]/50 border-b border-gray-50">
                        <th className="px-10 py-5 font-black">Identity profile</th>
                        <th className="px-10 py-5 font-black">Scope Index</th>
                        <th className="px-10 py-5 font-black">Sentiment Index</th>
                        <th className="px-10 py-5 font-black">Status update</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {MOCK_LEADS.map(lead => (
                        <tr 
                          key={lead.id} 
                          onClick={() => setSelectedLead(lead)} 
                          className={`cursor-pointer transition-all group ${selectedLead?.id === lead.id ? 'bg-[#EDE9E3]/30' : 'hover:bg-gray-50/50'}`}
                        >
                          <td className="px-10 py-8">
                            <p className="text-sm font-semibold text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">{lead.name}</p>
                            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-widest">{lead.propertyType}</p>
                          </td>
                          <td className="px-10 py-8">
                            <div className="flex flex-col">
                              <span className="text-xs font-bold text-[#1A1A1A]">$5.2M Est.</span>
                              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-widest mt-0.5">High Intent</span>
                            </div>
                          </td>
                          <td className="px-10 py-8"><SentimentBadge sentiment={lead.sentiment} /></td>
                          <td className="px-10 py-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">{lead.timeAgo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Sidebar Lead Detail View */}
            <div className="col-span-12 lg:col-span-4 h-full">
              <LeadDetail lead={selectedLead} />
            </div>
          </div>
        );
      case ViewState.SETTINGS:
        return (
          <div className="max-w-4xl mx-auto space-y-12 animate-fade-in pb-24">
            {/* White Label Customization Section */}
            <div className="card-white p-12">
              <div className="flex items-center gap-6 mb-12 pb-8 border-b border-gray-100">
                <div className="p-4 bg-[#C5A059]/10 rounded-xl text-[#C5A059]">
                  <Palette size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[#1A1A1A]">Branding & White-Label</h2>
                  <p className="text-gray-400 text-sm mt-1">Personalize the dashboard for multi-tenant deployment.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Brokerage Entity</label>
                    <input 
                      value={brokerageName} 
                      onChange={(e) => setBrokerageName(e.target.value)} 
                      placeholder="e.g. Sotheby's International"
                      className="w-full p-4 bg-[#F7F6F3] border border-gray-100 rounded-lg text-sm text-[#1A1A1A] focus:border-[#C5A059] transition-all outline-none" 
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Principal Partner Designation</label>
                    <input 
                      value={principalPartner} 
                      onChange={(e) => setPrincipalPartner(e.target.value)} 
                      placeholder="e.g. Managing Director"
                      className="w-full p-4 bg-[#F7F6F3] border border-gray-100 rounded-lg text-sm text-[#1A1A1A] focus:border-[#C5A059] transition-all outline-none" 
                    />
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Terminal Logo Asset</label>
                    <div className="flex gap-6 items-center">
                      <div className="w-20 h-20 rounded-xl bg-white border border-gray-100 flex items-center justify-center overflow-hidden p-2 shadow-inner">
                        <img src={logoUrl} alt="Logo" className="w-full h-full object-contain rounded" />
                      </div>
                      <div className="flex-1 relative border-2 border-dashed border-gray-200 rounded-xl p-4 hover:border-[#C5A059] transition-all cursor-pointer text-center group">
                        <Upload size={18} className="mx-auto mb-2 text-gray-300 group-hover:text-[#C5A059]" />
                        <span className="text-[10px] font-black uppercase text-gray-400 tracking-widest">Upload Logo</span>
                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">Global Accent Color</label>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-lg border border-gray-100 shadow-sm bg-[#C5A059]" />
                      <input type="text" value="#C5A059" readOnly className="flex-1 p-3 bg-[#F7F6F3] border border-gray-100 rounded-lg text-xs font-mono text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-12 pt-10 border-t border-gray-50">
                <button className="bg-[#C5A059] text-[#1A1A1A] px-12 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] shadow-lg flex items-center gap-3 hover:brightness-105 transition-all">
                  <Check size={18} /> Deploy Intelligence Skin
                </button>
              </div>
            </div>

            {/* Governance Section */}
            <div className="card-white p-12">
              <h3 className="text-xl font-bold text-[#1A1A1A] mb-10">System Governance</h3>
              <div className="grid grid-cols-2 gap-8">
                {['AI Response Intensity', 'Zero-Lag Intercept', 'Quantum Data Protection', 'Auto-Ingest Logic'].map((opt, i) => (
                  <div key={i} className="p-6 rounded-xl border border-gray-50 flex items-center justify-between hover:bg-[#F7F6F3] transition-all cursor-pointer group">
                    <span className="text-sm font-bold text-gray-500 group-hover:text-[#1A1A1A]">{opt}</span>
                    <div className="w-10 h-5 bg-gray-200 rounded-full p-1 relative transition-colors group-hover:bg-gray-300">
                       <div className="w-3 h-3 bg-[#C5A059] rounded-full absolute right-1" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Compliance & Security Trust Badges */}
            <div className="card-white p-12 border-t-4 border-t-[#C5A059]">
              <div className="flex items-center gap-4 mb-10">
                <ShieldCheck size={24} className="text-[#C5A059]" />
                <h3 className="text-xl font-bold text-[#1A1A1A]">Compliance & Security Protocol</h3>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'ISO 27001', desc: 'Information Security', color: 'bg-blue-50 text-blue-600' },
                  { label: 'PIPEDA', desc: 'Canadian Privacy', color: 'bg-emerald-50 text-emerald-600' },
                  { label: 'CASL', desc: 'Anti-Spam Protocol', color: 'bg-orange-50 text-orange-600' },
                  { label: 'GDPR', desc: 'Global Data Protection', color: 'bg-indigo-50 text-indigo-600' }
                ].map((badge, i) => (
                  <div key={i} className="p-6 rounded-2xl border border-gray-100 bg-white shadow-sm flex flex-col items-center text-center gap-3 hover:shadow-md transition-all">
                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${badge.color}`}>
                      {badge.label}
                    </div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{badge.desc}</p>
                    <CheckCircle2 size={16} className="text-emerald-500" />
                  </div>
                ))}
              </div>
              <div className="mt-10 p-6 bg-[#F7F6F3] rounded-xl border border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Lock size={20} className="text-gray-400" />
                  <p className="text-xs text-gray-500 font-medium">Your data is secured with enterprise-grade 256-bit encryption and multi-factor authentication protocols.</p>
                </div>
                <button className="text-[10px] font-black text-[#C5A059] uppercase tracking-widest hover:underline">View Security Audit</button>
              </div>
            </div>
          </div>
        );
      case ViewState.ANALYTICS:
        return <AgentAnalytics />;
      default:
        return <div className="card-white p-20 text-center text-gray-400 uppercase font-black tracking-widest">Secure View Locked</div>;
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F3]">
      <Sidebar activeView={activeView} onViewChange={setActiveView} onLogout={handleLogout} />

      <main className="pl-32 pr-20 pt-16 max-w-[1800px] mx-auto pb-24">
        {/* Dynamic Executive Header per Instructions */}
        <header className="flex items-center justify-between mb-20 animate-fade-in">
          <div>
            <h1 className="text-4xl font-black text-[#1A1A1A] tracking-tighter">ARGUS CONTROL</h1>
            <div className="flex items-center gap-3 mt-2">
              <span className="w-2 h-2 rounded-full bg-[#2D5A27] shadow-[0_0_8px_#2D5A27]" />
              <p className="text-gray-400 text-[10px] font-black uppercase tracking-[0.3em]">Operational Protocol Active</p>
            </div>
          </div>
          
          <div className="flex items-center gap-12">
            <div className="hidden xl:flex items-center gap-4 bg-white border border-gray-100 px-8 py-4 rounded-xl shadow-sm focus-within:ring-1 focus-within:ring-[#C5A059]/30 transition-all">
              <Search size={20} className="text-gray-300" />
              <input type="text" placeholder="Query Lead Matrix..." className="bg-transparent border-none outline-none text-sm w-80 placeholder-gray-300 text-[#1A1A1A] font-medium" />
            </div>
            
            <div className="flex items-center gap-6 pl-12 border-l border-gray-200">
              <div className="text-right">
                <p className="text-base font-bold text-[#1A1A1A] tracking-tight">{brokerageName}</p>
                <p className="text-[11px] text-[#C5A059] font-black uppercase tracking-[0.25em]">{principalPartner}</p>
              </div>
              <div className="w-14 h-14 rounded-2xl border border-gray-100 p-2 bg-white shadow-sm overflow-hidden group cursor-pointer hover:border-[#C5A059] transition-all">
                <img src={logoUrl} alt="Executive Identity" className="w-full h-full object-contain rounded-lg" />
              </div>
            </div>
          </div>
        </header>

        {renderActiveView()}
        <MarketChat />
        <Footer />
      </main>
    </div>
  );
};

export default App;