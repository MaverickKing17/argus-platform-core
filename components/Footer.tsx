import React from 'react';
import { Shield, Lock, Globe, CheckCircle2, Info, HelpCircle, Scale, FileWarning, Accessibility } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-24 border-t border-gray-200 pt-16 pb-12 bg-white/50 backdrop-blur-sm">
      <div className="max-w-[1800px] mx-auto px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#1A1A1A] rounded-lg flex items-center justify-center shadow-lg">
                <Shield className="text-[#C5A059]" size={24} />
              </div>
              <span className="text-xl font-black tracking-tighter text-[#1A1A1A]">ARGUS SALES CLOSER</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-md">
              The definitive intelligence platform for Toronto's elite real estate professionals. 
              Securing GCI and optimizing high-net-worth conversion through tactical AI integration.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">PIPEDA Compliant</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">CASL Verified</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-lg shadow-sm">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]">ISO 27001</span>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Legal & Protocol</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Lock size={14} /> Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Scale size={14} /> Terms of Service</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><FileWarning size={14} /> DMCA Policy</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Info size={14} /> Disclaimer</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Resources</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><HelpCircle size={14} /> Intelligence FAQ</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Globe size={14} /> Toronto Market Data</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Accessibility size={14} /> Accessibility</a></li>
              <li><a href="#" className="text-sm text-gray-500 hover:text-[#C5A059] transition-colors flex items-center gap-2"><Shield size={14} /> Security Audit</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1A1A1A]">Global HQ</h4>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">181 Bay Street, Suite 1800</p>
              <p className="text-sm text-gray-500">Toronto, ON M5J 2T3</p>
              <p className="text-sm text-gray-500">Canada</p>
              <div className="pt-4">
                <p className="text-[10px] font-bold text-[#C5A059] uppercase tracking-widest">Executive Support</p>
                <p className="text-sm text-[#1A1A1A] font-bold">+1 (416) 555-ARGUS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-gray-400 font-medium tracking-wide">
            © {currentYear} ARGUS Intelligence Systems. All Rights Reserved. 
            <span className="mx-2">|</span> 
            Encrypted with 256-bit AES Protocol.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">System Status: Optimal</span>
            </div>
            <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              {/* Placeholder for Trust Badges */}
              <div className="h-6 w-px bg-gray-200 mx-2" />
              <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Enterprise Grade</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
