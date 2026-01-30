
import React from 'react';
import { RDPStats } from '../types';

interface RDPServerCardsProps {
  stats: RDPStats[];
}

export const RDPServerCards: React.FC<RDPServerCardsProps> = ({ stats }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center">
          <span className="bg-blue-600 w-1.5 h-6 rounded-full mr-3"></span>
          RDP Server Performance Metrics
        </h3>
        <p className="text-xs font-semibold text-slate-400 italic">Combined sum of all packs on this server</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map(item => (
          <div key={item.ip} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 overflow-hidden group">
            {/* IP Header */}
            <div className="p-5 pb-0 flex justify-between items-start">
              <div>
                <h4 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">{item.ip}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-tight">
                    {item.packCount} Packs Assigned
                  </span>
                </div>
              </div>
              <div className={`flex items-center space-x-1 px-2.5 py-1 rounded-full text-xs font-bold ${
                item.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
              }`}>
                <span>{item.change >= 0 ? '↑' : '↓'}</span>
                <span>{Math.abs(item.change)}</span>
              </div>
            </div>

            {/* Aggregated Total OK Badge */}
            <div className="px-5 py-8 flex items-center justify-center space-x-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-blue-100 flex flex-col items-center justify-center bg-blue-50/20 group-hover:bg-blue-600 group-hover:border-blue-500 transition-all duration-300">
                  <span className="text-3xl font-black text-blue-600 group-hover:text-white">{item.currentOk}</span>
                  <span className="text-[10px] font-bold text-blue-400 group-hover:text-blue-100 uppercase">Total OK</span>
                </div>
                {item.change > 0 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center shadow-sm">
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Previous Sum</span>
                <span className="text-xl font-bold text-slate-300 line-through decoration-slate-400/50">{item.previousOk}</span>
                <div className="flex items-center space-x-1 mt-1">
                  <span className={`text-sm font-black ${item.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {item.change >= 0 ? '+' : '-'}{Math.abs(item.change)} Change
                  </span>
                </div>
              </div>
            </div>

            {/* Hardware Specifications */}
            <div className="px-5 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center text-slate-500">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
                <span className="text-xs font-bold uppercase tracking-wider">Disk Capacity</span>
              </div>
              <span className="text-sm font-black text-slate-700">{item.storageCapacity}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
