import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Award, Sparkles, ArrowUpRight, ChevronRight, Target, Briefcase } from 'lucide-react';
import { AgentPerformance } from '../types';
import { getAgentPerformanceInsights } from '../services/geminiService';

const MOCK_AGENTS: AgentPerformance[] = [
  { id: '1', name: 'Alexander Wright', gci: '$420,000', dealsClosed: 12, conversionRate: 18.5, activeLeads: 45, avatar: 'https://picsum.photos/seed/alex/100' },
  { id: '2', name: 'Sarah Montgomery', gci: '$385,000', dealsClosed: 9, conversionRate: 22.1, activeLeads: 32, avatar: 'https://picsum.photos/seed/sarah/100' },
  { id: '3', name: 'Julian Chen', gci: '$290,000', dealsClosed: 7, conversionRate: 14.8, activeLeads: 58, avatar: 'https://picsum.photos/seed/julian/100' },
  { id: '4', name: 'Elena Rossi', gci: '$510,000', dealsClosed: 15, conversionRate: 25.4, activeLeads: 28, avatar: 'https://picsum.photos/seed/elena/100' },
];

const AgentAnalytics: React.FC = () => {
  const [insights, setInsights] = useState<string>('');
  const [loadingInsights, setLoadingInsights] = useState(false);

  const fetchInsights = async () => {
    setLoadingInsights(true);
    try {
      const data = await getAgentPerformanceInsights(MOCK_AGENTS);
      setInsights(data);
    } catch (error) {
      console.error("Failed to fetch insights", error);
    } finally {
      setLoadingInsights(false);
    }
  };

  return (
    <div className="space-y-12 animate-fade-in pb-24">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold text-[#1A1A1A] tracking-tight">Agent Performance Matrix</h2>
          <p className="text-gray-400 text-sm mt-1 font-medium">Real-time GCI tracking and conversion intelligence.</p>
        </div>
        <button 
          onClick={fetchInsights}
          disabled={loadingInsights}
          className="flex items-center gap-3 bg-[#1A1A1A] text-[#C5A059] px-8 py-4 rounded-xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#2A2A2A] transition-all disabled:opacity-50"
        >
          {loadingInsights ? (
            <div className="w-4 h-4 border-2 border-[#C5A059] border-t-transparent rounded-full animate-spin" />
          ) : (
            <Sparkles size={18} />
          )}
          Generate AI Insights
        </button>
      </div>

      {/* AI Insights Panel */}
      {insights && (
        <div className="card-white p-10 border-l-4 border-l-[#C5A059] bg-gradient-to-r from-white to-[#F7F6F3]">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-2 bg-[#C5A059]/10 rounded-lg text-[#C5A059]">
              <Sparkles size={20} />
            </div>
            <h3 className="text-lg font-bold text-[#1A1A1A]">Executive Performance Briefing</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed italic">
            "{insights}"
          </p>
        </div>
      )}

      {/* Top Performers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {MOCK_AGENTS.map((agent) => (
          <div key={agent.id} className="card-white p-8 group hover:border-[#C5A059] transition-all cursor-pointer">
            <div className="flex items-center gap-4 mb-6">
              <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full border-2 border-gray-50" referrerPolicy="no-referrer" />
              <div>
                <h4 className="text-sm font-bold text-[#1A1A1A] group-hover:text-[#C5A059] transition-colors">{agent.name}</h4>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Senior Partner</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">GCI Generated</p>
                  <p className="text-xl font-bold text-[#1A1A1A]">{agent.gci}</p>
                </div>
                <div className="text-emerald-500 flex items-center gap-1 text-[10px] font-bold">
                  <ArrowUpRight size={14} /> +12%
                </div>
              </div>
              <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#C5A059] rounded-full" 
                  style={{ width: `${(agent.dealsClosed / 20) * 100}%` }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Deals</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">{agent.dealsClosed}</p>
                </div>
                <div>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest">Conv. Rate</p>
                  <p className="text-xs font-bold text-[#1A1A1A]">{agent.conversionRate}%</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed Analytics Table */}
      <div className="card-white !p-0 overflow-hidden">
        <div className="px-10 py-8 border-b border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <BarChart3 size={20} className="text-[#C5A059]" />
            <h3 className="text-lg font-bold text-[#1A1A1A]">Historical Performance Matrix</h3>
          </div>
          <div className="flex gap-4">
             <button className="px-4 py-2 rounded-lg border border-gray-100 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#1A1A1A] transition-all">
               Last 30 Days
             </button>
             <button className="px-4 py-2 rounded-lg bg-[#F7F6F3] text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">
               All Time
             </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-[10px] uppercase tracking-[0.2em] text-gray-400 bg-[#F7F6F3]/50 border-b border-gray-50">
                <th className="px-10 py-5 font-black">Agent Profile</th>
                <th className="px-10 py-5 font-black">GCI Contribution</th>
                <th className="px-10 py-5 font-black">Deals Closed</th>
                <th className="px-10 py-5 font-black">Conversion</th>
                <th className="px-10 py-5 font-black">Active Pipeline</th>
                <th className="px-10 py-5 font-black">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {MOCK_AGENTS.map(agent => (
                <tr key={agent.id} className="hover:bg-gray-50/50 transition-all group">
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400">
                        {agent.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-[#1A1A1A]">{agent.name}</span>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-bold text-[#1A1A1A]">{agent.gci}</span>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-medium text-gray-600">{agent.dealsClosed}</span>
                  </td>
                  <td className="px-10 py-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-[#1A1A1A]">{agent.conversionRate}%</span>
                      <div className="w-12 h-1 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500" style={{ width: `${agent.conversionRate}%` }} />
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-6">
                    <span className="text-sm font-medium text-gray-600">{agent.activeLeads}</span>
                  </td>
                  <td className="px-10 py-6">
                    <button className="p-2 text-gray-300 hover:text-[#C5A059] transition-colors">
                      <ChevronRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AgentAnalytics;
