
import React, { useState, useMemo } from 'react';
import { MOCK_PACKS, ENTITIES, RDP_SERVERS, RDP_CONFIGS } from './constants';
import { FilterState, RDPStats } from './types';
import { StatsOverview } from './components/StatsOverview';
import { FilterPanel } from './components/FilterPanel';
import { RDPServerCards } from './components/RDPServerCards';
import { PackStatusTable } from './components/PackStatusTable';

const App: React.FC = () => {
  const [filters, setFilters] = useState<FilterState>({
    entities: [],
    rdpServers: []
  });
  
  const [tempFilters, setTempFilters] = useState<FilterState>(filters);

  // Filter packs based on selection
  const filteredPacks = useMemo(() => {
    return MOCK_PACKS.filter(pack => {
      const entityMatch = filters.entities.length === 0 || filters.entities.includes(pack.entity);
      const rdpMatch = filters.rdpServers.length === 0 || filters.rdpServers.includes(pack.rdpServer);
      return entityMatch && rdpMatch;
    });
  }, [filters]);

  // Aggregate stats by RDP server - Summing ALL packs for correct Total OK
  const rdpStats = useMemo(() => {
    const statsMap: Record<string, RDPStats> = {};
    
    // Initialize stats map for all filtered IPs
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
      // Sum the OK counts from all packs on this server
      s.currentOk += pack.current.ok;
      s.previousOk += pack.previous.ok;
      s.packCount += 1;
      s.change = s.currentOk - s.previousOk;
    });

    // Determine unique entities per RDP
    Object.keys(statsMap).forEach(ip => {
      const entitiesForRDP = new Set(filteredPacks.filter(p => p.rdpServer === ip).map(p => p.entity));
      statsMap[ip].entityCount = entitiesForRDP.size;
    });

    // Sort by highest current OK count
    return Object.values(statsMap).sort((a, b) => b.currentOk - a.currentOk);
  }, [filteredPacks]);

  const totalOk = useMemo(() => filteredPacks.reduce((sum, p) => sum + p.current.ok, 0), [filteredPacks]);
  const activeRDPs = useMemo(() => new Set(filteredPacks.map(p => p.rdpServer)).size, [filteredPacks]);

  const handleApplyFilters = () => {
    setFilters(tempFilters);
  };

  const handleResetFilters = () => {
    const reset = { entities: [], rdpServers: [] };
    setTempFilters(reset);
    setFilters(reset);
  };

  const getCounts = (type: 'entity' | 'rdp', value: string) => {
    if (type === 'entity') {
      return MOCK_PACKS.filter(p => p.entity === value).length;
    }
    return MOCK_PACKS.filter(p => p.rdpServer === value).length;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-800 tracking-tight">RDP Pack Status Monitor</h1>
              <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Enterprise Console v2.6</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2 items-center">
            {filters.entities.length > 0 || filters.rdpServers.length > 0 ? (
              <>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-1">Active Filters:</span>
                {[...filters.entities, ...filters.rdpServers].map(f => (
                  <span key={f} className="px-2 py-1 rounded-md bg-blue-50 text-blue-600 text-[10px] font-bold border border-blue-100 uppercase">
                    {f}
                  </span>
                ))}
              </>
            ) : (
              <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-3 py-1 rounded-full">All Data Visible</span>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-[1440px] mx-auto w-full px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-72 flex-shrink-0">
            <FilterPanel 
              tempFilters={tempFilters}
              setTempFilters={setTempFilters}
              onApply={handleApplyFilters}
              onReset={handleResetFilters}
              getCounts={getCounts}
            />
          </aside>

          <div className="flex-1 min-w-0">
            <StatsOverview 
              totalOk={totalOk}
              packCount={filteredPacks.length}
              rdpCount={activeRDPs}
            />

            <RDPServerCards stats={rdpStats} />
            
            <PackStatusTable packs={filteredPacks} />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-slate-200 py-8 px-6 mt-12">
        <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between text-slate-400 text-xs gap-4 font-medium uppercase tracking-wider">
          <p>© 2024 Network Operations Center • System Health Dashboard</p>
          <div className="flex items-center space-x-8">
            <span className="flex items-center"><span className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></span> System Online</span>
            <a href="#" className="hover:text-blue-600 transition-colors">Audit Logs</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Help Center</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
