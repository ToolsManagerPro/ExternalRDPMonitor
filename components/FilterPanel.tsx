
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
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 h-fit sticky top-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800 text-lg">Filters</h3>
        <button 
          onClick={onReset}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          Reset All
        </button>
      </div>

      <div className="space-y-6">
        {/* Entities Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Entité</label>
          <div className="space-y-2">
            {ENTITIES.map(entity => {
              const count = getCounts('entity', entity);
              return (
                <label key={entity} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={tempFilters.entities.includes(entity)}
                      onChange={() => toggleEntity(entity)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                      {entity}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <hr className="border-slate-100" />

        {/* RDP Filter */}
        <div>
          <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">RDP Server</label>
          <div className="space-y-2">
            {RDP_SERVERS.map(rdp => {
              const count = getCounts('rdp', rdp);
              return (
                <label key={rdp} className="flex items-center justify-between cursor-pointer group">
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox"
                      checked={tempFilters.rdpServers.includes(rdp)}
                      onChange={() => toggleRDP(rdp)}
                      className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-blue-600 transition-colors">
                      {rdp}
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                    {count}
                  </span>
                </label>
              );
            })}
          </div>
        </div>

        <button 
          onClick={onApply}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};
