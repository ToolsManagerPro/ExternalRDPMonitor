
import React from 'react';

interface StatsOverviewProps {
  totalOk: number;
  packCount: number;
  rdpCount: number;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ totalOk, packCount, rdpCount }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="bg-emerald-100 p-3 rounded-lg text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Total OK Count</p>
          <p className="text-2xl font-bold text-slate-900">{totalOk.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Filtered Packs</p>
          <p className="text-2xl font-bold text-slate-900">{packCount}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center space-x-4">
        <div className="bg-purple-100 p-3 rounded-lg text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">Active RDP Servers</p>
          <p className="text-2xl font-bold text-slate-900">{rdpCount}</p>
        </div>
      </div>
    </div>
  );
};
