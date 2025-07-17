
import { ChainConfig } from '@/types/gas';

export const CHAIN_CONFIGS: Record<string, ChainConfig> = {
  ethereum: {
    name: 'Ethereum',
    rpcUrl: 'wss://ethereum-rpc.publicnode.com',
    currency: 'ETH',
    color: '#627EEA',
    chainId: 1,
  },
  polygon: {
    name: 'Polygon',
    rpcUrl: 'wss://polygon-bor-rpc.publicnode.com',
    currency: 'MATIC',
    color: '#8247E5',
    chainId: 137,
  },
  arbitrum: {
    name: 'Arbitrum',
    rpcUrl: 'wss://arbitrum-one-rpc.publicnode.com',
    currency: 'ETH',
    color: '#28A0F0',
    chainId: 42161,
  },
};

export const UNISWAP_V3_ETH_USDC_POOL = '0x88e6A0c2dDD26FEEb64F039a2c41296FcB3f5640';
