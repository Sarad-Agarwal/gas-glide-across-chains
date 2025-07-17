
import { ethers } from 'ethers';
import { CHAIN_CONFIGS, UNISWAP_V3_ETH_USDC_POOL } from '@/config/chains';
import { useGasStore } from '@/store/gasStore';
import { GasPoint } from '@/types/gas';

class Web3Service {
  private providers: Map<string, ethers.WebSocketProvider> = new Map();
  private intervals: Map<string, NodeJS.Timeout> = new Map();
  private ethProvider: ethers.WebSocketProvider | null = null;
  private lastTimestamps: Map<string, number> = new Map();

  async initialize() {
    console.log('Initializing Web3 Service...');
    
    // Initialize providers for each chain
    for (const [chainKey, config] of Object.entries(CHAIN_CONFIGS)) {
      try {
        const provider = new ethers.WebSocketProvider(config.rpcUrl);
        this.providers.set(chainKey, provider);
        
        if (chainKey === 'ethereum') {
          this.ethProvider = provider;
        }
        
        // Start listening for new blocks
        this.startGasTracking(chainKey);
        
        console.log(`Connected to ${config.name}`);
      } catch (error) {
        console.error(`Failed to connect to ${config.name}:`, error);
      }
    }

    // Start USD price tracking
    this.startUsdPriceTracking();
    
    useGasStore.getState().setLoading(false);
  }

  private startGasTracking(chainKey: string) {
    const provider = this.providers.get(chainKey);
    if (!provider) return;

    const updateGasData = async () => {
      try {
        const feeData = await provider.getFeeData();
        const block = await provider.getBlock('latest');
        
        if (feeData.gasPrice && block) {
          const baseFee = Number(feeData.gasPrice) / 1e9; // Convert to Gwei
          const priorityFee = feeData.maxPriorityFeePerGas 
            ? Number(feeData.maxPriorityFeePerGas) / 1e9 
            : 2; // Default 2 Gwei
          
          // Ensure unique timestamps
          const currentTimestamp = Date.now();
          const lastTimestamp = this.lastTimestamps.get(chainKey) || 0;
          const uniqueTimestamp = currentTimestamp > lastTimestamp ? currentTimestamp : lastTimestamp + 1000;
          
          this.lastTimestamps.set(chainKey, uniqueTimestamp);
          
          // Generate more realistic OHLC data
          const variance = baseFee * 0.1; // 10% variance
          const open = baseFee + (Math.random() - 0.5) * variance;
          const close = baseFee + (Math.random() - 0.5) * variance;
          const high = Math.max(open, close) + Math.random() * variance;
          const low = Math.min(open, close) - Math.random() * variance;

          const gasPoint: GasPoint = {
            timestamp: uniqueTimestamp,
            baseFee,
            priorityFee,
            totalFee: baseFee + priorityFee,
            open: Math.max(0, open),
            high: Math.max(0, high),
            low: Math.max(0, low),
            close: Math.max(0, close),
          };

          useGasStore.getState().updateChainData(chainKey as any, {
            baseFee,
            priorityFee,
            isConnected: true,
            lastUpdated: uniqueTimestamp,
          });

          useGasStore.getState().addGasPoint(chainKey as any, gasPoint);
        }
      } catch (error) {
        console.error(`Error fetching gas data for ${chainKey}:`, error);
        useGasStore.getState().updateChainData(chainKey as any, {
          isConnected: false,
        });
      }
    };

    // Initial fetch
    updateGasData();
    
    // Set up interval for regular updates
    const interval = setInterval(updateGasData, 6000); // 6 seconds
    this.intervals.set(chainKey, interval);
  }

  private startUsdPriceTracking() {
    if (!this.ethProvider) return;

    const updateUsdPrice = async () => {
      try {
        // Mock USD price for demo - in production, decode Uniswap V3 swap events
        const mockPrice = 2000 + Math.random() * 400; // ETH price between $2000-$2400
        useGasStore.getState().updateUsdPrice(mockPrice);
        
        console.log(`ETH/USD Price updated: $${mockPrice.toFixed(2)}`);
      } catch (error) {
        console.error('Error fetching USD price:', error);
      }
    };

    // Initial fetch
    updateUsdPrice();
    
    // Update every 30 seconds
    const interval = setInterval(updateUsdPrice, 30000);
    this.intervals.set('usd-price', interval);
  }

  cleanup() {
    // Close all WebSocket connections
    this.providers.forEach((provider) => {
      provider.destroy();
    });
    
    // Clear all intervals
    this.intervals.forEach((interval) => {
      clearInterval(interval);
    });
    
    this.providers.clear();
    this.intervals.clear();
    this.lastTimestamps.clear();
  }
}

export const web3Service = new Web3Service();
