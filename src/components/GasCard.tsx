
'use client';

import { motion } from 'framer-motion';
import { CHAIN_CONFIGS } from '@/config/chains';
import { ChainGasData } from '@/types/gas';
import { Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface GasCardProps {
  chainKey: string;
  chainData: ChainGasData;
}

export const GasCard = ({ chainKey, chainData }: GasCardProps) => {
  const config = CHAIN_CONFIGS[chainKey];
  const totalGas = chainData.baseFee + chainData.priorityFee;
  const isConnected = chainData.isConnected;
  
  const trend = chainData.history.length >= 2 
    ? chainData.history[chainData.history.length - 1].totalFee - chainData.history[chainData.history.length - 2].totalFee
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6"
    >
      {/* Connection Status Indicator */}
      <div className="absolute top-4 right-4">
        <div className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}>
          {isConnected && (
            <div className="w-3 h-3 rounded-full bg-green-400 animate-ping"></div>
          )}
        </div>
      </div>

      {/* Chain Header */}
      <div className="flex items-center gap-3 mb-4">
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: `${config.color}20` }}
        >
          <Activity size={24} style={{ color: config.color }} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">{config.name}</h3>
          <p className="text-sm text-gray-400">{config.currency}</p>
        </div>
      </div>

      {/* Gas Price Display */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-gray-300">Total Gas</span>
          <div className="flex items-center gap-2">
            <motion.span 
              className="text-2xl font-bold text-white"
              key={totalGas}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {totalGas.toFixed(2)}
            </motion.span>
            <span className="text-sm text-gray-400">Gwei</span>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Base Fee</span>
          <span className="text-gray-300">{chainData.baseFee.toFixed(2)} Gwei</span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Priority Fee</span>
          <span className="text-gray-300">{chainData.priorityFee.toFixed(2)} Gwei</span>
        </div>

        {/* Trend Indicator */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-700/50">
          <span className="text-gray-400 text-sm">Trend</span>
          <div className="flex items-center gap-1">
            {trend > 0 ? (
              <TrendingUp size={16} className="text-red-400" />
            ) : (
              <TrendingDown size={16} className="text-green-400" />
            )}
            <span className={`text-sm ${trend > 0 ? 'text-red-400' : 'text-green-400'}`}>
              {trend > 0 ? '+' : ''}{trend.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {/* Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
        style={{ 
          background: `radial-gradient(circle at 50% 50%, ${config.color}40, transparent 70%)` 
        }}
      />
    </motion.div>
  );
};
