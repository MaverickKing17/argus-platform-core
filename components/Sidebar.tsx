
import React from 'react';
import { LayoutDashboard, ShieldCheck, TrendingUp, Settings, LogOut, MoreVertical, Compass } from 'lucide-react';
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
      className={`flex flex-col items-center gap-1.5 w-full py-5 transition-all duration-300 group relative
        ${activeView === view ? 'text-[#d4af37]' : 'text-gray-500 hover:text-white'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-all duration-300 ${activeView === view ? 'bg-[#d4af37]/10 shadow-[0_0_15px_rgba(212,175,55,0.1)] border border-[#d4af37]/20' : 'group-hover:bg-white/5'}`}>
        <Icon size={24} strokeWidth={activeView === view ? 2.5 : 1.5} />
      </div>
      <span className="text-[10px] font-black tracking-[0.2em] uppercase">{label}</span>
      {activeView === view && (
        <div className="absolute right-0 w-1 h-10 bg-[#d4af37] rounded-l-full shadow-[0_0_15px_rgba(212,175,55,0.6)]" />
      )}
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-24 glass border-r border-white/10 flex flex-col items-center justify-between py-10 z-50">
      <div className="flex flex-col items-center w-full gap-10">
        <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-2xl mb-4 group cursor-pointer hover:rotate-3 transition-transform">
          <ShieldCheck className="text-black" size={28} />
        </div>
        
        <div className="flex flex-col items-center w-full space-y-3">
          <NavItem icon={LayoutDashboard} label="Pulse" view={ViewState.INSIGHTS} />
          <NavItem icon={Compass} label="Vault" view={ViewState.VAULT} />
          <NavItem icon={TrendingUp} label="GCI" view={ViewState.RESULTS} />
          <NavItem icon={Settings} label="Admin" view={ViewState.SETTINGS} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        <button className="text-gray-600 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl">
          <MoreVertical size={22} />
        </button>
        <button 
          onClick={onLogout}
          className="p-3 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
