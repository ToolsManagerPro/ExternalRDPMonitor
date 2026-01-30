
import React, { useState, useMemo } from 'react';
import ReactDOM from 'react-dom/client';

// --- TYPES ---
type Entity = 'ECM4' | 'ECM7' | 'ECM10';
type Platform = 'iMACROS' | 'ECM_APP';

interface Metrics {
  total: number;
  ok: number;
  notOk: number;
}

interface Pack {
  id: string;
  name: string;
  entity: Entity;
  rdpServer: string;
  platform: Platform;
  current: Metrics;
  previous: Metrics;
}

interface FilterState {
  entities: Entity[];
  rdpServers: string[];
}

interface RDPStats {
  ip: string;
  currentOk: number;
  previousOk: number;
  packCount: number;
  entityCount: number;
  change: number;
  storageCapacity: string;
}

// --- CONSTANTS & DATA ---
const ENTITIES: Entity[] = ['ECM4', 'ECM7', 'ECM10'];

const RDP_SERVERS: string[] = [
  '144.126.129.103', '144.126.130.165', '144.91.119.93', '154.53.51.40',
  '161.97.145.244', '161.97.158.158', '178.18.246.243', '178.18.246.248',
  '185.193.66.147', '185.216.75.117', '194.163.130.102', '194.163.144.27',
  '194.163.145.187', '207.244.243.33', '5.39.222.70', '66.94.120.85',
  '66.94.123.3', '70.36.107.56'
];

const RDP_CONFIGS: Record<string, { capacity: string }> = {
  '144.126.129.103': { capacity: '1.74 TB' },
  '144.126.130.165': { capacity: '1.17 TB' },
  '144.91.119.93': { capacity: '3.63 TB' },
  '154.53.51.40': { capacity: '1.74 TB' },
  '161.97.145.244': { capacity: '931 GB' },
  '161.97.158.158': { capacity: '931 GB' },
  '178.18.246.243': { capacity: '931 GB' },
  '178.18.246.248': { capacity: '931 GB' },
  '185.193.66.147': { capacity: '1.81 TB' },
  '185.216.75.117': { capacity: '1.81 TB' },
  '194.163.130.102': { capacity: '1.81 TB' },
  '194.163.144.27': { capacity: '1.74 TB / 931 GB' },
  '194.163.145.187': { capacity: '1.81 TB' },
  '207.244.243.33': { capacity: '1.53 TB / 292 GB' },
  '5.39.222.70': { capacity: '1.74 TB' },
  '66.94.120.85': { capacity: '1.81 TB' },
  '66.94.123.3': { capacity: '1.53 TB / 292 GB' },
  '70.36.107.56': { capacity: '1.70 TB' }
};

const DATASET: Pack[] = [
  // ECM4
  { id: 'p1', name: 'Pack17', entity: 'ECM4', rdpServer: '144.126.129.103', platform: 'iMACROS', previous: { total: 2332, ok: 369, notOk: 1963 }, current: { total: 2334, ok: 673, notOk: 1661 } },
  { id: 'p2', name: 'Pack20', entity: 'ECM4', rdpServer: '144.126.129.103', platform: 'iMACROS', previous: { total: 917, ok: 422, notOk: 495 }, current: { total: 995, ok: 481, notOk: 514 } },
  { id: 'p3', name: 'Pack14', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 774, notOk: 937 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p4', name: 'Pack16', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 873, notOk: 838 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p5', name: 'Pack19', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1711, ok: 1007, notOk: 704 }, current: { total: 1711, ok: 948, notOk: 763 } },
  { id: 'p6', name: 'Pack21', entity: 'ECM4', rdpServer: '144.126.130.165', platform: 'iMACROS', previous: { total: 1713, ok: 975, notOk: 738 }, current: { total: 1713, ok: 948, notOk: 765 } },
  { id: 'p7', name: 'Pack2', entity: 'ECM4', rdpServer: '185.216.75.117', platform: 'ECM_APP', previous: { total: 5000, ok: 1885, notOk: 3115 }, current: { total: 5000, ok: 1885, notOk: 3115 } },
  { id: 'p8', name: 'Pack4', entity: 'ECM4', rdpServer: '194.163.130.102', platform: 'ECM_APP', previous: { total: 3000, ok: 1480, notOk: 1520 }, current: { total: 3000, ok: 1480, notOk: 1520 } },
  { id: 'p9', name: 'Pack1', entity: 'ECM4', rdpServer: '194.163.144.27', platform: 'ECM_APP', previous: { total: 3999, ok: 1367, notOk: 2632 }, current: { total: 3999, ok: 1367, notOk: 2632 } },
  { id: 'p10', name: 'Pack15', entity: 'ECM4', rdpServer: '194.163.144.27', platform: 'iMACROS', previous: { total: 1914, ok: 907, notOk: 1007 }, current: { total: 1917, ok: 895, notOk: 1022 } },
  { id: 'p11', name: 'Pack3', entity: 'ECM4', rdpServer: '66.94.120.85', platform: 'ECM_APP', previous: { total: 3078, ok: 145, notOk: 2933 }, current: { total: 3078, ok: 159, notOk: 2919 } },

  // ECM7
  { id: 'p12', name: 'Pack75', entity: 'ECM7', rdpServer: '144.91.119.93', platform: 'iMACROS', previous: { total: 4320, ok: 985, notOk: 3335 }, current: { total: 4892, ok: 1097, notOk: 3795 } },
  { id: 'p13', name: 'Pack76', entity: 'ECM7', rdpServer: '144.91.119.93', platform: 'iMACROS', previous: { total: 4320, ok: 983, notOk: 3337 }, current: { total: 4892, ok: 1097, notOk: 3795 } },
  { id: 'p14', name: 'Pack77', entity: 'ECM7', rdpServer: '194.163.145.187', platform: 'iMACROS', previous: { total: 2924, ok: 28, notOk: 2896 }, current: { total: 2924, ok: 238, notOk: 2686 } },
  { id: 'p15', name: 'Pack79', entity: 'ECM7', rdpServer: '194.163.145.187', platform: 'iMACROS', previous: { total: 1896, ok: 1, notOk: 1895 }, current: { total: 1896, ok: 734, notOk: 1162 } },
  { id: 'p16', name: 'Pack71', entity: 'ECM7', rdpServer: '207.244.243.33', platform: 'iMACROS', previous: { total: 1861, ok: 958, notOk: 903 }, current: { total: 1680, ok: 913, notOk: 767 } },
  { id: 'p17', name: 'Pack72', entity: 'ECM7', rdpServer: '207.244.243.33', platform: 'iMACROS', previous: { total: 1861, ok: 885, notOk: 976 }, current: { total: 1681, ok: 913, notOk: 768 } },
  { id: 'p18', name: 'Pack73', entity: 'ECM7', rdpServer: '66.94.123.3', platform: 'iMACROS', previous: { total: 1319, ok: 326, notOk: 993 }, current: { total: 932, ok: 440, notOk: 492 } },
  { id: 'p19', name: 'Pack110', entity: 'ECM7', rdpServer: '66.94.123.3', platform: 'iMACROS', previous: { total: 1320, ok: 326, notOk: 994 }, current: { total: 933, ok: 440, notOk: 493 } },

  // ECM10
  { id: 'p20', name: 'Pack96', entity: 'ECM10', rdpServer: '154.53.51.40', platform: 'iMACROS', previous: { total: 5487, ok: 638, notOk: 4849 }, current: { total: 1297, ok: 637, notOk: 660 } },
  { id: 'p21', name: 'Pack97', entity: 'ECM10', rdpServer: '154.53.51.40', platform: 'iMACROS', previous: { total: 5578, ok: 1258, notOk: 4320 }, current: { total: 1438, ok: 1252, notOk: 186 } },
  { id: 'p22', name: 'Pack108', entity: 'ECM10', rdpServer: '161.97.145.244', platform: 'iMACROS', previous: { total: 7200, ok: 2223, notOk: 4977 }, current: { total: 2609, ok: 2221, notOk: 388 } },
  { id: 'p23', name: 'Pack109', entity: 'ECM10', rdpServer: '161.97.145.244', platform: 'iMACROS', previous: { total: 3600, ok: 1614, notOk: 1986 }, current: { total: 1846, ok: 1559, notOk: 287 } },
  { id: 'p24', name: 'Pack106', entity: 'ECM10', rdpServer: '161.97.158.158', platform: 'iMACROS', previous: { total: 7200, ok: 2084, notOk: 5116 }, current: { total: 2701, ok: 2082, notOk: 619 } },
  { id: 'p25', name: 'Pack107', entity: 'ECM10', rdpServer: '161.97.158.158', platform: 'iMACROS', previous: { total: 3600, ok: 1521, notOk: 2079 }, current: { total: 1749, ok: 1516, notOk: 233 } },
  { id: 'p26', name: 'Pack104', entity: 'ECM10', rdpServer: '178.18.246.243', platform: 'iMACROS', previous: { total: 7200, ok: 1471, notOk: 5729 }, current: { total: 2648, ok: 1447, notOk: 1201 } },
  { id: 'p27', name: 'Pack105', entity: 'ECM10', rdpServer: '178.18.246.243', platform: 'iMACROS', previous: { total: 3600, ok: 1407, notOk: 2193 }, current: { total: 1756, ok: 1404, notOk: 352 } },
  { id: 'p28', name: 'Pack98', entity: 'ECM10', rdpServer: '178.18.246.248', platform: 'iMACROS', previous: { total: 7200, ok: 1552, notOk: 5648 }, current: { total: 2396, ok: 1551, notOk: 845 } },
  { id: 'p29', name: 'Pack99', entity: 'ECM10', rdpServer: '178.18.246.248', platform: 'iMACROS', previous: { total: 3600, ok: 1533, notOk: 2067 }, current: { total: 1844, ok: 1490, notOk: 354 } },
  { id: 'p30', name: 'Pack94', entity: 'ECM10', rdpServer: '185.193.66.147', platform: 'iMACROS', previous: { total: 5797, ok: 655, notOk: 5142 }, current: { total: 1953, ok: 785, notOk: 1168 } },
  { id: 'p31', name: 'Pack95', entity: 'ECM10', rdpServer: '185.193.66.147', platform: 'iMACROS', previous: { total: 2878, ok: 1936, notOk: 942 }, current: { total: 2058, ok: 1370, notOk: 688 } },
  { id: 'p32', name: 'Pack91', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2910, ok: 945, notOk: 1965 }, current: { total: 1567, ok: 939, notOk: 628 } },
  { id: 'p33', name: 'Pack92', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2916, ok: 1637, notOk: 1279 }, current: { total: 1940, ok: 1729, notOk: 211 } },
  { id: 'p34', name: 'Pack93', entity: 'ECM10', rdpServer: '5.39.222.70', platform: 'iMACROS', previous: { total: 2001, ok: 552, notOk: 1449 }, current: { total: 1083, ok: 550, notOk: 533 } },
  { id: 'p35', name: 'Pack80', entity: 'ECM10', rdpServer: '70.36.107.56', platform: 'ECM_APP', previous: { total: 5751, ok: 810, notOk: 4941 }, current: { total: 5751, ok: 810, notOk: 4941 } },
];

// --- COMPONENTS ---

const StatsOverview: React.FC<{ totalOk: number; packCount: number; rdpCount: number }> = ({ totalOk, packCount, rdpCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-5">
      <div className="bg-emerald-500/10 p-3 rounded-xl text-emerald-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Total OK Count</p>
        <p className="text-3xl font-black text-slate-900 leading-tight">{totalOk.toLocaleString()}</p>
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-5">
      <div className="bg-blue-500/10 p-3 rounded-xl text-blue-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">Active Packs</p>
        <p className="text-3xl font-black text-slate-900 leading-tight">{packCount}</p>
      </div>
    </div>
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center space-x-5">
      <div className="bg-indigo-500/10 p-3 rounded-xl text-indigo-600">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-0.5">RDP Servers</p>
        <p className="text-3xl font-black text-slate-900 leading-tight">{rdpCount}</p>
      </div>
    </div>
  </div>
);

const FilterPanel: React.FC<{ 
  tempFilters: FilterState; 
  setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>; 
  onApply: () => void; 
  onReset: () => void;
  getCounts: (type: 'entity' | 'rdp', value: string) => number;
}> = ({ tempFilters, setTempFilters, onApply, onReset, getCounts }) => {
  const toggleEntity = (entity: Entity) => {
    setTempFilters(prev => ({
      ...prev,
      entities: prev.entities.includes(entity) ? prev.entities.filter(e => e !== entity) : [...prev.entities, entity]
    }));
  };
  const toggleRDP = (rdp: string) => {
    setTempFilters(prev => ({
      ...prev,
      rdpServers: prev.rdpServers.includes(rdp) ? prev.rdpServers.filter(r => r !== rdp) : [...prev.rdpServers, rdp]
    }));
  };
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Filters</h3>
        <button onClick={onReset} className="text-xs text-blue-600 hover:underline font-black uppercase">Reset</button>
      </div>
      <div className="space-y-8">
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Entité</label>
          <div className="space-y-2.5">
            {ENTITIES.map(entity => (
              <label key={entity} className="flex items-center justify-between cursor-pointer group px-1">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={tempFilters.entities.includes(entity)} onChange={() => toggleEntity(entity)} className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-sm font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{entity}</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-500">{getCounts('entity', entity)}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">RDP Server</label>
          <div className="space-y-2.5 max-h-72 overflow-y-auto pr-2 custom-scrollbar">
            {RDP_SERVERS.map(rdp => (
              <label key={rdp} className="flex items-center justify-between cursor-pointer group px-1">
                <div className="flex items-center space-x-3">
                  <input type="checkbox" checked={tempFilters.rdpServers.includes(rdp)} onChange={() => toggleRDP(rdp)} className="w-4 h-4 rounded-md border-slate-300 text-blue-600 focus:ring-blue-500" />
                  <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-600 transition-colors">{rdp}</span>
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 text-slate-500">{getCounts('rdp', rdp)}</span>
              </label>
            ))}
          </div>
        </div>
        <button onClick={onApply} className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black text-xs uppercase tracking-[0.1em] py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]">Apply Selection</button>
      </div>
    </div>
  );
};

const RDPServerCards: React.FC<{ stats: RDPStats[] }> = ({ stats }) => (
  <div className="mb-12">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-xl font-black text-slate-800 tracking-tight flex items-center">
        <span className="bg-blue-600 w-1.5 h-6 rounded-full mr-3"></span>
        Aggregated Server Performance
      </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map(item => (
        <div key={item.ip} className="bg-white rounded-3xl shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-500 overflow-hidden group">
          <div className="p-6 pb-0 flex justify-between items-start">
            <div>
              <h4 className="font-black text-slate-800 text-lg tracking-tight group-hover:text-blue-600 transition-colors">{item.ip}</h4>
              <span className="px-2 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest">{item.packCount} Packs assigned</span>
            </div>
            <div className={`flex items-center space-x-1 px-3 py-1 rounded-full text-[10px] font-black ${item.change >= 0 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
              <span>{item.change >= 0 ? '▲' : '▼'}</span>
              <span>{Math.abs(item.change)}</span>
            </div>
          </div>
          <div className="px-6 py-10 flex items-center justify-center space-x-10">
            <div className="relative">
              <div className="w-28 h-28 rounded-full border-8 border-slate-50 flex flex-col items-center justify-center bg-white shadow-inner group-hover:border-blue-600 transition-all duration-500">
                <span className="text-4xl font-black text-slate-900 group-hover:text-blue-600">{item.currentOk}</span>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Total OK</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Previous</span>
              <span className="text-2xl font-bold text-slate-200 line-through decoration-slate-300/40">{item.previousOk}</span>
              <div className="mt-2 flex items-center">
                <div className={`h-1.5 w-1.5 rounded-full mr-2 ${item.change >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
                <span className={`text-xs font-black ${item.change >= 0 ? 'text-emerald-500' : 'text-rose-500'}`}>{item.change >= 0 ? '+' : '-'}{Math.abs(item.change)}</span>
              </div>
            </div>
          </div>
          <div className="px-6 py-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="font-black text-slate-400 uppercase tracking-widest">Disk Hardware</span>
            <span className="font-black text-slate-700 bg-white px-2.5 py-1 rounded-lg border border-slate-100">{item.storageCapacity}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const PackStatusTable: React.FC<{ packs: Pack[] }> = ({ packs }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
    <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
      <h3 className="font-black text-slate-800 tracking-tight uppercase text-sm">Detailed Monitoring Log</h3>
      <span className="text-[10px] font-black text-slate-400 bg-white px-3 py-1.5 rounded-full border border-slate-100 tracking-widest">{packs.length} UNITS TRACKED</span>
    </div>
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.15em]">
            <th className="px-6 py-5">Unit Reference</th>
            <th className="px-6 py-5">Host Mapping</th>
            <th className="px-6 py-5">Platform</th>
            <th className="px-6 py-5">Storage</th>
            <th className="px-6 py-5 text-center">Previous Metric</th>
            <th className="px-6 py-5 text-center">Real-Time Metric</th>
            <th className="px-6 py-5 text-center">Trend</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {packs.map(pack => {
            const change = pack.current.ok - pack.previous.ok;
            const capacity = RDP_CONFIGS[pack.rdpServer]?.capacity || 'N/A';
            return (
              <tr key={pack.id} className="hover:bg-blue-50/20 transition-all group text-sm">
                <td className="px-6 py-5">
                  <span className="font-black text-slate-800">{pack.name}</span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col space-y-1">
                    <span className="w-fit px-2 py-0.5 rounded bg-slate-900 text-white text-[9px] font-black tracking-widest uppercase">{pack.entity}</span>
                    <span className="text-[11px] text-slate-400 font-mono tracking-tighter">{pack.rdpServer}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black tracking-widest uppercase ${pack.platform.toUpperCase().includes('IMACROS') ? 'bg-indigo-50 text-indigo-600' : 'bg-cyan-50 text-cyan-600'}`}>{pack.platform}</span>
                </td>
                <td className="px-6 py-5">
                   <span className="text-xs font-black text-slate-600">{capacity}</span>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-[11px] font-bold text-slate-300 tracking-tight">
                    {pack.previous.total} / <span className="text-emerald-300">{pack.previous.ok}</span> / <span className="text-rose-300">{pack.previous.notOk}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className="text-sm font-black text-slate-900 tracking-tight">
                    {pack.current.total} / <span className="text-emerald-600">{pack.current.ok}</span> / <span className="text-rose-600">{pack.current.notOk}</span>
                  </div>
                </td>
                <td className="px-6 py-5 text-center">
                  <div className={`text-[11px] font-black inline-flex items-center px-2 py-1 rounded-lg ${change > 0 ? 'text-emerald-600 bg-emerald-50' : change < 0 ? 'text-rose-600 bg-rose-50' : 'text-slate-400'}`}>
                    {change > 0 && "▲"} {change < 0 && "▼"} {change === 0 ? "STABLE" : Math.abs(change)}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);

// --- MAIN APP ---

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({ entities: [], rdpServers: [] });
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  const filteredPacks = useMemo(() => {
    return DATASET.filter(pack => {
      const entityMatch = filters.entities.length === 0 || filters.entities.includes(pack.entity);
      const rdpMatch = filters.rdpServers.length === 0 || filters.rdpServers.includes(pack.rdpServer);
      return entityMatch && rdpMatch;
    });
  }, [filters]);

  const rdpStats = useMemo(() => {
    const statsMap: Record<string, RDPStats> = {};
    filteredPacks.forEach(pack => {
      if (!statsMap[pack.rdpServer]) {
        statsMap[pack.rdpServer] = {
          ip: pack.rdpServer, currentOk: 0, previousOk: 0, packCount: 0, entityCount: 0, change: 0,
          storageCapacity: RDP_CONFIGS[pack.rdpServer]?.capacity || 'N/A'
        };
      }
      const s = statsMap[pack.rdpServer];
      s.currentOk += pack.current.ok;
      s.previousOk += pack.previous.ok;
      s.packCount += 1;
      s.change = s.currentOk - s.previousOk;
    });
    return Object.values(statsMap).sort((a, b) => b.currentOk - a.currentOk);
  }, [filteredPacks]);

  const totalOk = useMemo(() => filteredPacks.reduce((sum, p) => sum + p.current.ok, 0), [filteredPacks]);
  const activeRDPs = useMemo(() => new Set(filteredPacks.map(p => p.rdpServer)).size, [filteredPacks]);

  const getCounts = (type: 'entity' | 'rdp', value: string) => 
    DATASET.filter(p => type === 'entity' ? p.entity === value : p.rdpServer === value).length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-blue-600 selection:text-white antialiased">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 px-6 py-4 shadow-sm">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="bg-slate-900 p-2.5 rounded-2xl text-white shadow-xl shadow-slate-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">Status Pro</h1>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em]">Global Pack Monitoring v2.7</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            {(filters.entities.length > 0 || filters.rdpServers.length > 0) ? (
              [...filters.entities, ...filters.rdpServers].map(f => (
                <span key={f} className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-[10px] font-black border border-blue-500 shadow-md shadow-blue-100">{f}</span>
              ))
            ) : (
              <span className="text-[10px] font-black text-slate-400 bg-slate-100 px-4 py-2 rounded-xl uppercase tracking-widest">Master View: Total Infrastructure</span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <FilterPanel tempFilters={tempFilters} setTempFilters={setTempFilters} onApply={() => setFilters(tempFilters)} onReset={() => { const r = { entities: [], rdpServers: [] }; setTempFilters(r); setFilters(r); }} getCounts={getCounts} />
          </aside>
          <div className="flex-1 min-w-0">
            <StatsOverview totalOk={totalOk} packCount={filteredPacks.length} rdpCount={activeRDPs} />
            <RDPServerCards stats={rdpStats} />
            <PackStatusTable packs={filteredPacks} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-10 px-6 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center space-y-4">
          <div className="flex items-center space-x-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span>All systems operational</span>
          </div>
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.3em]">© 2024 Network Intelligence Dashboard • Authorized Personnel Only</p>
        </div>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);
