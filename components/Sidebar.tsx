
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
      className={`flex flex-col items-center gap-1 w-full py-4 transition-all duration-300 group
        ${activeView === view ? 'text-[#d4af37]' : 'text-gray-500 hover:text-gray-300'}`}
    >
      <div className={`p-2 rounded-xl transition-all duration-300 ${activeView === view ? 'bg-[#d4af37]/10' : 'group-hover:bg-white/5'}`}>
        <Icon size={22} strokeWidth={activeView === view ? 2.5 : 1.5} />
      </div>
      <span className="text-[10px] font-medium tracking-widest uppercase">{label}</span>
      {activeView === view && (
        <div className="absolute left-0 w-1 h-8 bg-[#d4af37] rounded-r-full shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
      )}
    </button>
  );

  return (
    <aside className="fixed left-0 top-0 h-full w-20 glass border-r border-white/5 flex flex-col items-center justify-between py-8 z-50">
      <div className="flex flex-col items-center w-full gap-8">
        <div className="w-10 h-10 rounded-full gold-gradient flex items-center justify-center shadow-lg mb-4">
          <ShieldCheck className="text-black" size={24} />
        </div>
        
        <div className="flex flex-col items-center w-full space-y-2">
          <NavItem icon={LayoutDashboard} label="Insights" view={ViewState.INSIGHTS} />
          <NavItem icon={Compass} label="Vault" view={ViewState.VAULT} />
          <NavItem icon={TrendingUp} label="Results" view={ViewState.RESULTS} />
          <NavItem icon={Settings} label="Settings" view={ViewState.SETTINGS} />
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 w-full">
        <button className="text-gray-600 hover:text-white transition-colors">
          <MoreVertical size={20} />
        </button>
        <button 
          onClick={onLogout}
          className="p-3 text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
        >
          <LogOut size={20} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
