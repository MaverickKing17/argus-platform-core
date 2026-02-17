
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
      className={`flex flex-col items-center gap-2 w-full py-5 transition-all duration-300 group relative
        ${activeView === view ? 'text-[#d4af37]' : 'text-white/40 hover:text-white'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-all duration-300 ${activeView === view ? 'bg-[#d4af37]/15 shadow-[0_0_20px_rgba(212,175,55,0.2)] border border-[#d4af37]/30' : 'group-hover:bg-white/10'}`}>
        <Icon size={24} strokeWidth={activeView === view ? 2.5 : 2} />
      </div>
      <span className={`text-[10px] font-black tracking-[0.25em] uppercase transition-colors duration-300 ${activeView === view ? 'text-white' : 'text-white/40 group-hover:text-white'}`}>
        {label}
      </span>
      {activeView === view && (
        <div className="absolute right-0 w-1.5 h-12 bg-[#d4af37] rounded-l-full shadow-[0_0_20px_rgba(212,175,55,0.8)]" />
      )}
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-24 glass border-r border-white/10 flex flex-col items-center justify-between py-10 z-50 shadow-[10px_0_30px_rgba(0,0,0,0.5)]">
      <div className="flex flex-col items-center w-full gap-10">
        <div className="w-12 h-12 rounded-2xl gold-gradient flex items-center justify-center shadow-[0_0_25px_rgba(212,175,55,0.3)] mb-4 group cursor-pointer hover:scale-110 transition-transform">
          <ShieldCheck className="text-black" size={28} />
        </div>
        
        <div className="flex flex-col items-center w-full space-y-2">
          <NavItem icon={LayoutDashboard} label="Pulse" view={ViewState.INSIGHTS} />
          <NavItem icon={Compass} label="Vault" view={ViewState.VAULT} />
          <NavItem icon={TrendingUp} label="GCI" view={ViewState.RESULTS} />
          <NavItem icon={Settings} label="Admin" view={ViewState.SETTINGS} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 w-full">
        <button className="text-white/30 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-xl">
          <MoreVertical size={22} />
        </button>
        <button 
          onClick={onLogout}
          className="p-3 text-red-400 hover:text-white hover:bg-red-500 rounded-2xl transition-all border border-transparent hover:border-red-400/50 shadow-inner group"
        >
          <LogOut size={22} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
