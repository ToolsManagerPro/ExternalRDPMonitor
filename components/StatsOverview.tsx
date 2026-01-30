import React from 'react';

interface StatsOverviewProps {
  totalOk: number;
  packCount: number;
  rdpCount: number;
  successRate: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalOk, packCount, rdpCount, successRate }) => {
  return (
    <div className="space-y-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Operational OK</p>
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-500 shadow-sm border border-emerald-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{totalOk.toLocaleString()}</p>
            <div className="flex items-center space-x-2">
              <span className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse"></span>
              <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Valid Signals</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Global Health</p>
            <div className="p-3 bg-blue-50 rounded-2xl text-blue-500 shadow-sm border border-blue-100/50">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
          <div>
            <div className="flex items-baseline space-x-2 mb-3">
              <p className="text-4xl font-black text-slate-900 tracking-tighter">{successRate.toFixed(1)}%</p>
              <span className="text-[10px] font-black text-slate-300 uppercase">Avg</span>
            </div>
            <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ease-out shadow-sm ${successRate > 80 ? 'bg-emerald-500' : successRate > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                style={{ width: `${successRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Units</p>
            <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-500 shadow-sm border border-indigo-100/50">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{packCount}</p>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Active Packages</p>
          </div>
        </div>

        <div className="bg-white p-7 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all hover:shadow-2xl hover:shadow-blue-500/5">
          <div className="flex items-center justify-between mb-8">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.25em]">Nodes</p>
            <div className="p-3 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
              </svg>
            </div>
          </div>
          <div>
            <p className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{rdpCount}</p>
            <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">Host Infrastructure</p>
          </div>
        </div>
      </div>
      
      {/* Platform Breakdown Row */}
      <div className="bg-slate-900 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between text-white shadow-2xl shadow-slate-900/20">
        <div className="mb-4 md:mb-0">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Platform Distribution</h4>
          <p className="text-xs font-bold text-slate-300">Operational Breakdown Across iMACROS & ECM_APP</p>
        </div>
        <div className="flex items-center space-x-12">
          <div className="flex items-center space-x-4">
            <div className="bg-indigo-500/20 px-3 py-1 rounded-lg border border-indigo-500/30">
              <span className="text-xs font-black text-indigo-400">iMACROS</span>
            </div>
            <p className="text-xl font-black">91% <span className="text-[10px] text-slate-500 font-bold uppercase ml-1">Success</span></p>
          </div>
          <div className="w-px h-8 bg-slate-800 hidden md:block"></div>
          <div className="flex items-center space-x-4">
            <div className="bg-cyan-500/20 px-3 py-1 rounded-lg border border-cyan-500/30">
              <span className="text-xs font-black text-cyan-400">ECM_APP</span>
            </div>
            <p className="text-xl font-black">84% <span className="text-[10px] text-slate-500 font-bold uppercase ml-1">Success</span></p>
          </div>
        </div>
      </div>
    </div>
  );
};
