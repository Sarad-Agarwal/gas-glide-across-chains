
export interface GasPoint {
  timestamp: number;
  baseFee: number;
  priorityFee: number;
  totalFee: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface ChainGasData {
  baseFee: number;
  priorityFee: number;
  history: GasPoint[];
  isConnected: boolean;
  lastUpdated: number;
}

export interface ChainConfig {
  name: string;
  rpcUrl: string;
  currency: string;
  color: string;
  chainId: number;
}

export interface SimulationResult {
  chain: string;
  gasCost: number;
  gasCostUSD: number;
  transactionValue: number;
  totalCostUSD: number;
}

export type AppMode = 'live' | 'simulation';
