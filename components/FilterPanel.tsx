
import React from 'react';
import { ENTITIES, RDP_SERVERS } from '../constants';
import { Entity, FilterState } from '../types';

interface FilterPanelProps {
  tempFilters: FilterState;
  setTempFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onApply: () => void;
  onReset: () => void;
  getCounts: (type: 'entity' | 'rdp', value: string) => number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({ 
  tempFilters, 
  setTempFilters, 
  onApply, 
  onReset,
  getCounts
}) => {
  const toggleEntity = (entity: Entity) => {
    setTempFilters(prev => ({
      ...prev,
      entities: prev.entities.includes(entity) 
        ? prev.entities.filter(e => e !== entity)
        : [...prev.entities, entity]
    }));
  };

  const toggleRDP = (rdp: string) => {
    setTempFilters(prev => ({
      ...prev,
      rdpServers: prev.rdpServers.includes(rdp)
        ? prev.rdpServers.filter(r => r !== rdp)
        : [...prev.rdpServers, rdp]
    }));
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-black text-slate-800 text-lg uppercase tracking-tight">Filters</h3>
        <button 
          onClick={onReset}
          className="text-[10px] font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Primary Action Button Moved to Top */}
        <button 
          onClick={onApply}
          className="w-full bg-slate-900 hover:bg-blue-600 text-white font-black text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all shadow-lg active:scale-[0.98] mb-4 flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span>Apply Selection</span>
        </button>

        <hr className="border-slate-50" />

        {/* Entity Filter (Renamed from Entité) */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Entity Selection</label>
          <div className="space-y-2.5">
            {ENTITIES.map(entity => {
              const count = getCounts('entity', entity);
              const isActive = tempFilters.entities.includes(entity);
              return (
                <label key={entity} className={`flex items-center justify-between cursor-pointer group p-2 rounded-lg transition-all ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleEntity(entity)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-sm font-bold ${isActive ? 'text-blue-700' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>
                      {entity}
                    </span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white border border-slate-100 text-slate-400 shadow-sm">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* RDP Filter */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">RDP Server Node</label>
          <div className="space-y-2 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
            {RDP_SERVERS.map(rdp => {
              const count = getCounts('rdp', rdp);
              const isActive = tempFilters.rdpServers.includes(rdp);
              return (
                <label key={rdp} className={`flex items-center justify-between cursor-pointer group p-2 rounded-lg transition-all ${isActive ? 'bg-blue-50/50' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleRDP(rdp)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-[11px] font-bold ${isActive ? 'text-blue-700' : 'text-slate-600'} group-hover:text-blue-600 transition-colors`}>
                      {rdp}
                    </span>
                  </div>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded bg-white border border-slate-100 text-slate-400 shadow-sm">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
