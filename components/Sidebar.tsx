import React from 'react';
import { LayoutDashboard, ShieldCheck, TrendingUp, Settings, LogOut, Compass, BarChart3 } from 'lucide-react';
import { ViewState } from '../types';

interface SidebarProps {
  activeView: ViewState;
  onViewChange: (view: ViewState) => void;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange, onLogout }) => {
  const NavItem = ({ icon: Icon, label, view }: { icon: any, label: string, view: ViewState }) => (
    <button
      onClick={() => onViewChange(view)}
      className={`flex flex-col items-center gap-3 w-full py-8 transition-all group relative
        ${activeView === view ? 'text-[#1A1A1A]' : 'text-gray-400 hover:text-[#1A1A1A]'}`}
    >
      <div className={`p-3 rounded-xl transition-all ${activeView === view ? 'bg-white shadow-sm' : 'group-hover:bg-white/40'}`}>
        <Icon size={24} strokeWidth={activeView === view ? 2.5 : 2} className={activeView === view ? 'text-[#C5A059]' : ''} />
      </div>
      <span className={`text-[10px] font-bold tracking-[0.2em] uppercase transition-colors
        ${activeView === view ? 'text-[#1A1A1A]' : 'text-gray-400 group-hover:text-[#1A1A1A]'}`}>
        {label}
      </span>
      {activeView === view && (
        <div className="absolute right-0 w-1.5 h-12 bg-[#C5A059] rounded-l-full shadow-[0_0_12px_rgba(197,160,89,0.3)]" />
      )}
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-24 bg-[#EDE9E3] border-r border-gray-200 flex flex-col items-center justify-between py-12 z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="flex flex-col items-center w-full gap-16">
        <div className="w-14 h-14 bg-[#1A1A1A] rounded-2xl flex items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer">
          <ShieldCheck className="text-[#C5A059]" size={32} strokeWidth={1.5} />
        </div>
        <div className="flex flex-col items-center w-full">
          <NavItem icon={LayoutDashboard} label="Pulse" view={ViewState.INSIGHTS} />
          <NavItem icon={Compass} label="Vault" view={ViewState.VAULT} />
          <NavItem icon={TrendingUp} label="GCI" view={ViewState.RESULTS} />
          <NavItem icon={BarChart3} label="Stats" view={ViewState.ANALYTICS} />
          <NavItem icon={Settings} label="Admin" view={ViewState.SETTINGS} />
        </div>
      </div>
      <button 
        onClick={onLogout} 
        className="p-4 text-gray-400 hover:text-[#9B1B1B] hover:bg-white/40 transition-all rounded-xl"
        title="Secure Handshake Terminal"
      >
        <LogOut size={22} />
      </button>
    </aside>
  );
};

export default Sidebar;