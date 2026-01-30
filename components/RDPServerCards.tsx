import React from 'react';
import { RDPStats } from '../types';

interface RDPServerCardsProps {
  stats: RDPStats[];
}

export const RDPServerCards: React.FC<RDPServerCardsProps> = ({ stats }) => {
  return (
    <div className="mb-16">
      <div className="flex items-center mb-10">
        <div className="w-1.5 h-8 bg-slate-900 rounded-full mr-5 shadow-sm"></div>
        <div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tight">Node Diagnostics</h3>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Aggregated Infrastructure Health Metrics</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {stats.map(item => {
          const trendColor = item.change >= 0 ? 'text-emerald-500' : 'text-rose-500';
          const trendBg = item.change >= 0 ? 'bg-emerald-50' : 'bg-rose-50';
          
          // Improved visual logic
          const healthRating = item.currentOk > 1500 ? 'OPTIMAL' : item.currentOk > 800 ? 'STABLE' : 'MONITOR';
          const healthColor = healthRating === 'OPTIMAL' ? 'bg-emerald-500' : healthRating === 'STABLE' ? 'bg-blue-500' : 'bg-amber-500';
          
          return (
            <div key={item.ip} className="bg-white rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-700 group overflow-hidden flex flex-col transform hover:-translate-y-2">
              <div className="p-10 flex-1">
                <div className="flex justify-between items-start mb-10">
                  <div className="space-y-2">
                    <h4 className="font-black text-slate-900 text-2xl tracking-tighter group-hover:text-blue-600 transition-colors">{item.ip}</h4>
                    <div className="flex items-center space-x-2">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full text-white shadow-sm ${healthColor}`}>{healthRating}</span>
                      <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.1em]">{item.packCount} Cluster Units</p>
                    </div>
                  </div>
                  <div className={`px-3 py-2 rounded-2xl ${trendBg} ${trendColor} text-[11px] font-black flex items-center space-x-1.5 border border-transparent hover:border-current transition-all shadow-sm`}>
                    <span className="text-[8px]">{item.change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(item.change)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-10">
                  <div className="relative">
                    <div className="w-28 h-28 rounded-full border-[8px] border-slate-50 flex flex-col items-center justify-center bg-white shadow-2xl shadow-slate-200/50 group-hover:border-blue-600 transition-all duration-700 relative z-10">
                      <span className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{item.currentOk.toLocaleString()}</span>
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest mt-1">OK</span>
                    </div>
                    <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-all duration-700"></div>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1.5">Baseline</p>
                      <p className="text-2xl font-bold text-slate-200 line-through decoration-slate-300/60 leading-none">{item.previousOk.toLocaleString()}</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-slate-400">
                        <span>Load Factor</span>
                        <span className="text-slate-900">74%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                        <div className="h-full bg-slate-900 rounded-full transition-all duration-1500" style={{ width: `74%` }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-between items-center group-hover:bg-blue-50/30 transition-colors">
                <div className="flex flex-col">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Disk Array</span>
                  <span className="text-xs font-black text-slate-800">{item.storageCapacity}</span>
                </div>
                <div className="bg-white p-2 rounded-xl shadow-sm border border-slate-200">
                   <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
