import React from 'react';
import { RDPStats } from '../types';

interface RDPServerCardsProps {
  stats: RDPStats[];
}

export const RDPServerCards: React.FC<RDPServerCardsProps> = ({ stats }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-1.5 h-6 bg-blue-600 rounded-full mr-3"></div>
        <h3 className="text-lg font-black text-slate-800 tracking-tight">RDP Server Aggregates</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(item => {
          const trendColor = item.change >= 0 ? 'text-emerald-500' : 'text-rose-500';
          const trendBg = item.change >= 0 ? 'bg-emerald-50' : 'bg-rose-50';
          
          return (
            <div key={item.ip} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 group overflow-hidden">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-black text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{item.ip}</h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-0.5">{item.packCount} Active Clusters</p>
                  </div>
                  <div className={`px-2 py-1 rounded-lg ${trendBg} ${trendColor} text-[10px] font-black flex items-center space-x-1`}>
                    <span>{item.change >= 0 ? '▲' : '▼'}</span>
                    <span>{Math.abs(item.change)}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="w-20 h-20 rounded-full border-4 border-slate-50 flex flex-col items-center justify-center bg-white shadow-inner group-hover:border-blue-600 transition-all">
                    <span className="text-2xl font-black text-slate-900 group-hover:text-blue-600">{item.currentOk}</span>
                    <span className="text-[8px] font-black text-slate-300 uppercase">Status OK</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-slate-300 uppercase mb-1">Historical Baseline</p>
                    <p className="text-lg font-bold text-slate-200 line-through mb-2">{item.previousOk}</p>
                    <div className="flex items-center text-xs font-black text-slate-700">
                      <span className={trendColor}>{item.change >= 0 ? '+' : '-'}{Math.abs(item.change)}</span>
                      <span className="mx-2 text-slate-200">|</span>
                      <span>Net Shift</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Storage</span>
                <span className="text-xs font-black text-slate-800 bg-white px-2 py-1 rounded-lg shadow-sm">{item.storageCapacity}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};