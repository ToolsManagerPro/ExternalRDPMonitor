
export type Entity = 'ECM4' | 'ECM7' | 'ECM10';
export type Platform = 'iMACROS' | 'ECM_APP';

export interface Metrics {
  total: number;
  ok: number;
  notOk: number;
}

export interface Pack {
  id: string;
  name: string;
  entity: Entity;
  rdpServer: string;
  platform: Platform;
  current: Metrics;
  previous: Metrics;
}

export interface FilterState {
  entities: Entity[];
  rdpServers: string[];
}

export interface RDPStats {
  ip: string;
  currentOk: number;
  previousOk: number;
  packCount: number;
  entityCount: number;
  change: number;
  storageCapacity: string;
}
