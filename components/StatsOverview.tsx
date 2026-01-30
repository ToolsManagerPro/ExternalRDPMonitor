
import React from 'react';

interface StatsOverviewProps {
  totalOk: number;
  packCount: number;
  rdpCount: number;
  successRate: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalOk, packCount, rdpCount, successRate }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Total OK</p>
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-black text-slate-900 group-hover:scale-105 transition-transform origin-left">{totalOk.toLocaleString()}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Success Rate</p>
          <div className="p-2 bg-blue-50 rounded-xl text-blue-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>
        <div>
          <p className="text-3xl font-black text-slate-900 mb-2">{successRate.toFixed(1)}%</p>
          <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
            <div 
              className={`h-full transition-all duration-1000 ease-out ${successRate > 80 ? 'bg-emerald-500' : successRate > 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${successRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Active Packs</p>
          <div className="p-2 bg-indigo-50 rounded-xl text-indigo-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-black text-slate-900">{packCount}</p>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-between group hover:border-blue-200 transition-all">
        <div className="flex items-center justify-between mb-4">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">RDP Nodes</p>
          <div className="p-2 bg-slate-100 rounded-xl text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2" />
            </svg>
          </div>
        </div>
        <p className="text-3xl font-black text-slate-900">{rdpCount}</p>
      </div>
    </div>
  );
};
