
'use client';

import { motion } from 'framer-motion';
import { useGasStore } from '@/store/gasStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Calculator, DollarSign, Zap } from 'lucide-react';
import { CHAIN_CONFIGS } from '@/config/chains';

export const SimulationPanel = () => {
  const { 
    simulationValue, 
    setSimulationValue, 
    calculateSimulation, 
    simulationResults,
    usdPrice 
  } = useGasStore();

  const handleSimulate = () => {
    calculateSimulation();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20 border-purple-500/20">
        <div className="flex items-center gap-3 mb-4">
          <Calculator className="text-purple-400" size={24} />
          <h2 className="text-xl font-bold text-white">Transaction Simulation</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Transaction Value (ETH)
            </label>
            <Input
              type="number"
              value={simulationValue}
              onChange={(e) => setSimulationValue(Number(e.target.value))}
              placeholder="0.5"
              className="bg-gray-800/50 border-gray-600 text-white"
            />
          </div>

          <Button 
            onClick={handleSimulate}
            className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
          >
            <Zap size={16} className="mr-2" />
            Simulate Transaction
          </Button>

          <div className="text-sm text-gray-400">
            Current ETH/USD: ${usdPrice.toFixed(2)}
          </div>
        </div>
      </Card>

      {simulationResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <DollarSign size={20} />
            Cost Comparison
          </h3>
          
          {simulationResults.map((result, index) => {
            const config = CHAIN_CONFIGS[result.chain];
            return (
              <motion.div
                key={result.chain}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="rounded-xl bg-gray-800/50 p-4 border border-gray-700/50"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-white">{config.name}</span>
                  <span 
                    className="text-sm px-2 py-1 rounded-full"
                    style={{ backgroundColor: `${config.color}20`, color: config.color }}
                  >
                    {config.currency}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Cost:</span>
                    <span className="text-gray-300">{result.gasCost.toFixed(6)} {config.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gas Cost (USD):</span>
                    <span className="text-gray-300">${result.gasCostUSD.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-700/50 pt-2">
                    <span className="text-white font-medium">Total Cost:</span>
                    <span className="text-white font-bold">${result.totalCostUSD.toFixed(2)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </motion.div>
  );
};
