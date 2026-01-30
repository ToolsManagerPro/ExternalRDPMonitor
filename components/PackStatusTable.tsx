
import React from 'react';
import { Pack } from '../types';
import { RDP_CONFIGS } from '../constants';

interface PackStatusTableProps {
  packs: Pack[];
}

export const PackStatusTable: React.FC<PackStatusTableProps> = ({ packs }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Detailed Pack Status Monitoring</h3>
        <span className="text-xs font-medium text-slate-400">{packs.length} packs listed</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
              <th className="px-6 py-4">Pack Info</th>
              <th className="px-6 py-4">Entity & RDP</th>
              <th className="px-6 py-4">Platform</th>
              <th className="px-6 py-4">Disk Capacity</th>
              <th className="px-6 py-4 text-center">Previous (T / OK / !OK)</th>
              <th className="px-6 py-4 text-center">Current (T / OK / !OK)</th>
              <th className="px-6 py-4 text-center">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {packs.map(pack => {
              const change = pack.current.ok - pack.previous.ok;
              const capacity = RDP_CONFIGS[pack.rdpServer]?.capacity || 'N/A';
              
              return (
                <tr key={pack.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold text-slate-800">{pack.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase">{pack.entity}</span>
                      <p className="text-xs text-slate-500 font-mono">{pack.rdpServer}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold ${
                      pack.platform.toUpperCase() === 'IMACROS' ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-600'
                    }`}>
                      {pack.platform}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-slate-600">
                      <svg className="w-3.5 h-3.5 mr-1.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                      </svg>
                      <span className="text-xs font-bold text-slate-700">{capacity}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-xs font-medium text-slate-400 space-x-1">
                      <span>{pack.previous.total}</span>
                      <span>/</span>
                      <span className="text-emerald-500/70">{pack.previous.ok}</span>
                      <span>/</span>
                      <span className="text-rose-500/70">{pack.previous.notOk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <div className="text-sm font-bold text-slate-800 space-x-1">
                      <span>{pack.current.total}</span>
                      <span>/</span>
                      <span className="text-emerald-600">{pack.current.ok}</span>
                      <span>/</span>
                      <span className="text-rose-600">{pack.current.notOk}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`text-xs font-bold flex items-center justify-center space-x-1 ${
                      change > 0 ? 'text-emerald-600' : change < 0 ? 'text-rose-600' : 'text-slate-400'
                    }`}>
                      {change > 0 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7"/></svg>}
                      {change < 0 && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>}
                      <span>{change === 0 ? '--' : Math.abs(change)}</span>
                    </span>
                  </td>
                </tr>
              );
            })}
            {packs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-slate-400 italic">
                  No packs match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
