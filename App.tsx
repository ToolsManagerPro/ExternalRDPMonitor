import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_PACKS, ENTITIES, RDP_CONFIGS } from './constants';
import { FilterState, RDPStats, Pack } from './types';
import { StatsOverview } from './components/StatsOverview';
import { FilterPanel } from './components/FilterPanel';
import { RDPServerCards } from './components/RDPServerCards';
import { PackStatusTable } from './components/PackStatusTable';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    entities: [],
    rdpServers: []
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());
  const [sortConfig, setSortConfig] = useState<{ key: keyof Pack | 'change'; direction: 'asc' | 'desc' }>({
    key: 'name',
    direction: 'asc'
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredPacks = useMemo(() => {
    return MOCK_PACKS.filter(pack => {
      const entityMatch = filters.entities.length === 0 || filters.entities.includes(pack.entity);
      const rdpMatch = filters.rdpServers.length === 0 || filters.rdpServers.includes(pack.rdpServer);
      const searchMatch = searchQuery === '' || 
        pack.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        pack.rdpServer.includes(searchQuery);
      return entityMatch && rdpMatch && searchMatch;
    }).sort((a, b) => {
      let valA: any = a[sortConfig.key as keyof Pack];
      let valB: any = b[sortConfig.key as keyof Pack];

      if (sortConfig.key === 'change') {
        valA = a.current.ok - a.previous.ok;
        valB = b.current.ok - b.previous.ok;
      } else if (typeof valA === 'object') {
        valA = valA.ok; 
        valB = valB.ok;
      }

      if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filters, searchQuery, sortConfig]);

  const rdpStats = useMemo(() => {
    const statsMap: Record<string, RDPStats> = {};
    filteredPacks.forEach(pack => {
      if (!statsMap[pack.rdpServer]) {
        statsMap[pack.rdpServer] = {
          ip: pack.rdpServer,
          currentOk: 0,
          previousOk: 0,
          packCount: 0,
          entityCount: 0,
          change: 0,
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

  const stats = useMemo(() => {
    const current = filteredPacks.reduce((acc, p) => ({ ok: acc.ok + p.current.ok, total: acc.total + p.current.total }), { ok: 0, total: 0 });
    return {
      totalOk: current.ok,
      packCount: filteredPacks.length,
      rdpCount: new Set(filteredPacks.map(p => p.rdpServer)).size,
      successRate: current.total > 0 ? (current.ok / current.total) * 100 : 0
    };
  }, [filteredPacks]);

  return (
    <div className="min-h-screen flex flex-col selection:bg-blue-600 selection:text-white bg-[#fcfdff]">
      <header className="glass-header border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-8 py-5 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-6">
            <div className="bg-slate-900 p-3.5 rounded-[1.25rem] text-white shadow-2xl shadow-slate-200 group transition-all hover:scale-105 active:scale-95 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-black text-slate-900 tracking-tighter">Status Pro</h1>
                <div className="flex items-center space-x-2 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Active Pulse</span>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.25em] mt-1">Infrastructure V3.5 • {lastUpdated}</p>
            </div>
          </div>
          
          <div className="flex-1 max-w-lg">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Search infrastructure nodes..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/50 border border-transparent rounded-[1.25rem] py-4 pl-12 pr-4 text-sm font-semibold focus:ring-0 focus:bg-white focus:border-blue-500 transition-all placeholder:text-slate-400 shadow-inner"
              />
              <svg className="w-5 h-5 absolute left-4.5 top-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <aside className="w-full lg:w-80 flex-shrink-0">
            <FilterPanel 
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              onApply={() => setFilters(tempFilters)}
              onReset={() => { const r = { entities: [], rdpServers: [] }; setTempFilters(r); setFilters(r); }}
              getCounts={(type, val) => MOCK_PACKS.filter(p => type === 'entity' ? p.entity === val : p.rdpServer === val).length}
            />
          </aside>

          <div className="flex-1 min-w-0">
            {/* Improved Active Filters Display */}
            <div className="mb-10 flex items-center justify-between border-b border-slate-100 pb-6">
              <div className="flex flex-wrap gap-3">
                {(filters.entities.length === 0 && filters.rdpServers.length === 0) ? (
                  <div className="bg-slate-50 text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] px-5 py-2 rounded-2xl border border-slate-100">Displaying All Nodes</div>
                ) : (
                  <>
                    {filters.entities.map(e => (
                      <div key={e} className="bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-lg shadow-blue-500/10 flex items-center space-x-2">
                        <span>Entity: {e}</span>
                      </div>
                    ))}
                    {filters.rdpServers.map(r => (
                      <div key={r} className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl shadow-lg shadow-slate-900/10 flex items-center space-x-2">
                        <span>Node: {r}</span>
                      </div>
                    ))}
                  </>
                )}
              </div>
              <div className="hidden md:block">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Context: Production</span>
              </div>
            </div>
            
            <StatsOverview {...stats} />
            <RDPServerCards stats={rdpStats} />
            <PackStatusTable 
              packs={filteredPacks} 
              sortConfig={sortConfig} 
              onSort={(key) => setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }))} 
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-50 py-16 px-8 mt-20 text-center">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center space-y-6">
          <div className="bg-slate-50 p-4 rounded-3xl group cursor-pointer hover:bg-blue-50 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-300 group-hover:text-blue-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.67.335a2 2 0 01-1.32.184l-2.59-.518a2 2 0 00-1.022.547l-1.013 1.014a2 2 0 00-.547 1.022l.518 2.59a2 2 0 00.184 1.32l.335.67a6 6 0 00.517 3.86l.477 2.387a2 2 0 00.547 1.022l1.014 1.013a2 2 0 00 1.022.547l2.59.518a2 2 0 00 1.32-.184l.67-.335a6 6 0 00 3.86-.517l2.387.477a2 2 0 00 1.022-.547l1.013-1.014a2 2 0 00.547-1.022l-.518-2.59a2 2 0 00-.184-1.32l-.335-.67a6 6 0 00-.517-3.86l-.477-2.387a2 2 0 00-.547-1.022l-1.014-1.013z" />
            </svg>
          </div>
          <p className="text-[11px] font-black text-slate-300 uppercase tracking-[0.5em]">Global Infrastructure Monitoring Matrix • Proprietary Data</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
