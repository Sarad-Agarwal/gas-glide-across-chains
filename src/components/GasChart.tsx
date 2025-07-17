'use client';

import { useEffect, useRef } from 'react';
import { createChart, IChartApi, ISeriesApi, CandlestickData } from 'lightweight-charts';
import { useGasStore } from '@/store/gasStore';
import { CHAIN_CONFIGS } from '@/config/chains';
import { motion } from 'framer-motion';

export const GasChart = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<Map<string, ISeriesApi<'Candlestick'>>>(new Map());
  const { chains } = useGasStore();

  useEffect(() => {
    if (!chartContainerRef.current) return;

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 400,
      layout: {
        background: { color: 'transparent' },
        textColor: '#d1d5db',
      },
      grid: {
        vertLines: { color: '#374151' },
        horzLines: { color: '#374151' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#4b5563',
      },
      timeScale: {
        borderColor: '#4b5563',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    chartRef.current = chart;

    // Create series for each chain
    Object.entries(CHAIN_CONFIGS).forEach(([chainKey, config]) => {
      const series = chart.addCandlestickSeries({
        upColor: config.color,
        downColor: config.color,
        borderDownColor: config.color,
        borderUpColor: config.color,
        wickDownColor: config.color,
        wickUpColor: config.color,
      });
      
      seriesRef.current.set(chainKey, series);
    });

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, []);

  useEffect(() => {
    // Update chart data when gas data changes
    Object.entries(chains).forEach(([chainKey, chainData]) => {
      const series = seriesRef.current.get(chainKey);
      if (series && chainData.history.length > 0) {
        // Sort data by timestamp and remove duplicates
        const sortedData = chainData.history
          .sort((a, b) => a.timestamp - b.timestamp)
          .filter((point, index, array) => {
            // Remove duplicates by keeping only the first occurrence of each timestamp
            return index === 0 || point.timestamp !== array[index - 1].timestamp;
          });

        if (sortedData.length > 0) {
          const candlestickData: CandlestickData[] = sortedData.map(point => ({
            time: Math.floor(point.timestamp / 1000) as any,
            open: point.open,
            high: point.high,
            low: point.low,
            close: point.close,
          }));
          
          // Ensure the data is properly sorted by time
          candlestickData.sort((a, b) => (a.time as number) - (b.time as number));
          
          console.log(`Setting chart data for ${chainKey}:`, candlestickData.length, 'points');
          series.setData(candlestickData);
        }
      }
    });
  }, [chains]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Gas Price Volatility</h2>
        <div className="flex items-center gap-4">
          {Object.entries(CHAIN_CONFIGS).map(([chainKey, config]) => (
            <div key={chainKey} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: config.color }}
              />
              <span className="text-sm text-gray-300">{config.name}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div ref={chartContainerRef} className="w-full h-96" />
    </motion.div>
  );
};
