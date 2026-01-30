
import React from 'react';
import { Pack } from '../types';
import { RDP_CONFIGS } from '../constants';

interface PackStatusTableProps {
  packs: Pack[];
  sortConfig: { key: string; direction: 'asc' | 'desc' };
  onSort: (key: any) => void;
}

export const PackStatusTable: React.FC<PackStatusTableProps> = ({ packs, sortConfig, onSort }) => {
  const SortIcon = ({ column }: { column: string }) => {
    if (sortConfig.key !== column) return <span className="opacity-20 ml-1">⇅</span>;
    return <span className="ml-1 text-blue-600">{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <h3 className="font-black text-slate-800 uppercase text-xs tracking-[0.2em]">Detailed Monitoring Log</h3>
        <div className="flex items-center space-x-2">
           <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Live Feed: {packs.length} Units Detected
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-50">
              <th className="px-6 py-6 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSort('name')}>
                Pack Reference <SortIcon column="name" />
              </th>
              <th className="px-6 py-6 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSort('rdpServer')}>
                Host Context <SortIcon column="rdpServer" />
              </th>
              <th className="px-6 py-6 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSort('platform')}>
                Platform <SortIcon column="platform" />
              </th>
              <th className="px-6 py-6 text-center">Baseline Status</th>
              <th className="px-6 py-6 text-center cursor-pointer hover:text-blue-600 transition-colors min-w-[200px]" onClick={() => onSort('current')}>
                Real-Time Health <SortIcon column="current" />
              </th>
              <th className="px-6 py-6 text-center cursor-pointer hover:text-blue-600 transition-colors" onClick={() => onSort('change')}>
                Trend Shift <SortIcon column="change" />
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {packs.map(pack => {
              const change = pack.current.ok - pack.previous.ok;
              const healthPct = (pack.current.ok / pack.current.total) * 100;
              
              return (
                <tr key={pack.id} className="hover:bg-blue-50/30 transition-all group">
                  <td className="px-6 py-5">
                    <p className="text-sm font-black text-slate-800">{pack.name}</p>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">ID: {pack.id.toUpperCase()}</p>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-blue-600 uppercase mb-0.5">{pack.entity}</span>
                      <span className="text-xs font-mono font-medium text-slate-500 tracking-tighter">{pack.rdpServer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                      pack.platform.includes('IMACROS') 
                      ? 'bg-indigo-50 text-indigo-600 border-indigo-100' 
                      : 'bg-cyan-50 text-cyan-600 border-cyan-100'
                    }`}>
                      {pack.platform}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <div className="text-[10px] font-bold text-slate-300">
                      {pack.previous.total} <span className="mx-1">/</span> <span className="text-emerald-300">{pack.previous.ok}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col items-center">
                      <div className="flex items-center justify-between w-full mb-1 text-[11px] font-black">
                        <span className="text-slate-900">{pack.current.ok} <span className="text-slate-300">/ {pack.current.total}</span></span>
                        <span className={`${healthPct > 80 ? 'text-emerald-600' : 'text-amber-600'}`}>{healthPct.toFixed(0)}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                        <div 
                          className={`h-full transition-all duration-700 ${healthPct > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`}
                          style={{ width: `${healthPct}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className={`text-[10px] font-black px-3 py-1.5 rounded-xl border ${
                      change > 0 ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                      change < 0 ? 'bg-rose-50 text-rose-600 border-rose-100' : 'text-slate-300 border-slate-100'
                    }`}>
                      {change > 0 && '+'} {change < 0 && ''} {change === 0 ? 'STABLE' : change}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
