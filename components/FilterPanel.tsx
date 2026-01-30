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
    <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-fit sticky top-24">
      {/* 1. APPLY BUTTON AT TOP */}
      <div className="mb-8">
        <button 
          onClick={onApply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black text-[12px] uppercase tracking-[0.2em] py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-[0.97] flex items-center justify-center space-x-2 border-b-4 border-blue-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
          <span>Apply Selection</span>
        </button>
      </div>

      <div className="flex items-center justify-between mb-6 px-1">
        <h3 className="font-black text-slate-800 text-[11px] uppercase tracking-widest">Active Filters</h3>
        <button 
          onClick={onReset}
          className="text-[10px] font-black text-rose-500 hover:text-rose-700 uppercase tracking-widest transition-colors flex items-center space-x-1"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-8">
        {/* Entity Section (Renamed) */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Entity Context</label>
          <div className="space-y-1.5">
            {ENTITIES.map(entity => {
              const count = getCounts('entity', entity);
              const isActive = tempFilters.entities.includes(entity);
              return (
                <label key={entity} className={`flex items-center justify-between cursor-pointer group p-3 rounded-xl transition-all border ${isActive ? 'bg-blue-50/50 border-blue-100' : 'hover:bg-slate-50 border-transparent'}`}>
                  <div className="flex items-center space-x-3">
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-blue-600 border-blue-600' : 'bg-white border-slate-200 border'}`}>
                      {isActive && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}><path d="M5 13l4 4L19 7" /></svg>}
                      <input 
                        type="checkbox"
                        checked={isActive}
                        onChange={() => toggleEntity(entity)}
                        className="hidden"
                      />
                    </div>
                    <span className={`text-sm font-bold ${isActive ? 'text-blue-900' : 'text-slate-600'}`}>
                      {entity}
                    </span>
                  </div>
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded transition-all ${isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        {/* RDP Section */}
        <div>
          <label className="block text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Node Selection</label>
          <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            {RDP_SERVERS.map(rdp => {
              const count = getCounts('rdp', rdp);
              const isActive = tempFilters.rdpServers.includes(rdp);
              return (
                <label key={rdp} className={`flex items-center justify-between cursor-pointer group p-2.5 rounded-xl transition-all ${isActive ? 'bg-slate-900 text-white shadow-lg' : 'hover:bg-slate-50'}`}>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={isActive}
                      onChange={() => toggleRDP(rdp)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className={`text-[11px] font-bold ${isActive ? 'text-white' : 'text-slate-600'}`}>
                      {rdp}
                    </span>
                  </div>
                  <span className={`text-[8px] font-black px-1.5 py-0.5 rounded transition-all ${isActive ? 'bg-slate-800 text-slate-500' : 'bg-slate-100 text-slate-400'}`}>
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
