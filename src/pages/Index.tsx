
'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useGasStore } from '@/store/gasStore';
import { web3Service } from '@/services/web3Service';
import { Header } from '@/components/Header';
import { GasCard } from '@/components/GasCard';
import { SimulationPanel } from '@/components/SimulationPanel';
import { GasChart } from '@/components/GasChart';

const Index = () => {
  const { mode, chains, isLoading } = useGasStore();

  useEffect(() => {
    // Initialize Web3 service
    web3Service.initialize();

    // Cleanup on unmount
    return () => {
      web3Service.cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <Header />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Gas Cards */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
              {Object.entries(chains).map(([chainKey, chainData]) => (
                <GasCard
                  key={chainKey}
                  chainKey={chainKey}
                  chainData={chainData}
                />
              ))}
            </div>

            {/* Chart */}
            <GasChart />
          </div>

          {/* Simulation Panel */}
          <div className="lg:col-span-1">
            {mode === 'simulation' && <SimulationPanel />}
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <h2 className="text-xl font-semibold text-white mb-2">Initializing Gas Tracker</h2>
              <p className="text-gray-400">Connecting to blockchain networks...</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Index;
