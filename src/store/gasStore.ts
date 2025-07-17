
import { create } from 'zustand';
import { GasPoint, ChainGasData, AppMode, SimulationResult } from '@/types/gas';

interface GasStore {
  mode: AppMode;
  chains: {
    ethereum: ChainGasData;
    polygon: ChainGasData;
    arbitrum: ChainGasData;
  };
  usdPrice: number;
  simulationValue: number;
  simulationResults: SimulationResult[];
  isLoading: boolean;
  
  // Actions
  setMode: (mode: AppMode) => void;
  updateChainData: (chain: keyof GasStore['chains'], data: Partial<ChainGasData>) => void;
  updateUsdPrice: (price: number) => void;
  setSimulationValue: (value: number) => void;
  calculateSimulation: () => void;
  addGasPoint: (chain: keyof GasStore['chains'], point: GasPoint) => void;
  setLoading: (loading: boolean) => void;
}

const initialChainData: ChainGasData = {
  baseFee: 0,
  priorityFee: 0,
  history: [],
  isConnected: false,
  lastUpdated: 0,
};

export const useGasStore = create<GasStore>((set, get) => ({
  mode: 'live',
  chains: {
    ethereum: initialChainData,
    polygon: initialChainData,
    arbitrum: initialChainData,
  },
  usdPrice: 0,
  simulationValue: 0.5,
  simulationResults: [],
  isLoading: true,

  setMode: (mode) => set({ mode }),
  
  updateChainData: (chain, data) => 
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: { ...state.chains[chain], ...data }
      }
    })),

  updateUsdPrice: (price) => set({ usdPrice: price }),
  
  setSimulationValue: (value) => set({ simulationValue: value }),
  
  calculateSimulation: () => {
    const { chains, usdPrice, simulationValue } = get();
    const gasLimit = 21000;
    
    const results: SimulationResult[] = Object.entries(chains).map(([chainName, chainData]) => {
      const gasCost = (chainData.baseFee + chainData.priorityFee) * gasLimit / 1e18;
      const gasCostUSD = gasCost * usdPrice;
      const transactionValueUSD = simulationValue * usdPrice;
      
      return {
        chain: chainName,
        gasCost,
        gasCostUSD,
        transactionValue: simulationValue,
        totalCostUSD: gasCostUSD + transactionValueUSD,
      };
    });
    
    set({ simulationResults: results });
  },

  addGasPoint: (chain, point) =>
    set((state) => ({
      chains: {
        ...state.chains,
        [chain]: {
          ...state.chains[chain],
          history: [...state.chains[chain].history.slice(-100), point]
        }
      }
    })),

  setLoading: (loading) => set({ isLoading: loading }),
}));
