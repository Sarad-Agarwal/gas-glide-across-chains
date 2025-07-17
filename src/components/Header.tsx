
'use client';

import { motion } from 'framer-motion';
import { useGasStore } from '@/store/gasStore';
import { Button } from '@/components/ui/button';
import { Activity, Calculator, DollarSign, Zap } from 'lucide-react';

export const Header = () => {
  const { mode, setMode, usdPrice, isLoading } = useGasStore();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Zap size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Gas Tracker
              </h1>
              <p className="text-gray-400">Real-time cross-chain gas monitoring</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 border border-gray-700/50">
            <DollarSign size={16} className="text-green-400" />
            <span className="text-sm text-gray-300">
              ETH/USD: ${usdPrice.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-2 p-1 rounded-lg bg-gray-800/50 border border-gray-700/50">
            <Button
              variant={mode === 'live' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('live')}
              className={mode === 'live' ? 'bg-blue-600 hover:bg-blue-700' : ''}
            >
              <Activity size={16} className="mr-1" />
              Live
            </Button>
            <Button
              variant={mode === 'simulation' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setMode('simulation')}
              className={mode === 'simulation' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              <Calculator size={16} className="mr-1" />
              Simulate
            </Button>
          </div>
        </div>
      </div>

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-gray-900/50 rounded-xl"
        >
          <div className="flex items-center gap-2 text-white">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span>Connecting to blockchain networks...</span>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
};
