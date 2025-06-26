import React, { useState, useEffect } from 'react';
import { mockNetWorthSnapshots } from '../core/mockData';
import { NetWorthTrendChart } from './NetWorthTrendChart';
import { AssetAllocationChart } from './AssetAllocationChart';
import { loadAssets, loadDebts, loadNetWorthSnapshots } from '../lib/storage';
import type { Asset, Debt, NetWorthSnapshot } from '../core/types';

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [netWorthSnapshots, setNetWorthSnapshots] = useState<NetWorthSnapshot[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load data from localStorage
  useEffect(() => {
    const savedAssets = loadAssets();
    const savedDebts = loadDebts();
    const savedSnapshots = loadNetWorthSnapshots();
    
    setAssets(savedAssets);
    setDebts(savedDebts);
    setNetWorthSnapshots(savedSnapshots.length > 0 ? savedSnapshots : mockNetWorthSnapshots);
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  // Calculate current values
  const totalAssets = assets.reduce((sum, asset) => sum + asset.value, 0);
  const liquidAssets = assets.filter(asset => !asset.isHomeEquity).reduce((sum, asset) => sum + asset.value, 0);
  const totalDebts = debts.reduce((sum, debt) => sum + debt.balance, 0);
  const homeEquity = assets.find(a => a.isHomeEquity)?.value || 0;
  
  const currentNetWorth = totalAssets - totalDebts;
  const currentLiquidNetWorth = liquidAssets - totalDebts;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Finance Buddy Dashboard</h1>
          <p className="text-gray-600 mt-1">Your financial overview at a glance</p>
        </header>
        
        {/* Net Worth Cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500">Total Net Worth</span>
            <span className="text-2xl font-bold text-green-700">{formatCurrency(currentNetWorth)}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500">Liquid Net Worth</span>
            <span className="text-2xl font-bold text-blue-700">{formatCurrency(currentLiquidNetWorth)}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500">Home Equity</span>
            <span className="text-2xl font-bold text-purple-700">{formatCurrency(homeEquity)}</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <span className="text-gray-500">Total Debts</span>
            <span className="text-2xl font-bold text-red-700">{formatCurrency(totalDebts)}</span>
          </div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <NetWorthTrendChart snapshots={netWorthSnapshots} />
          <AssetAllocationChart assets={assets} />
        </section>

        {/* Additional sections will go here */}
      </div>
    </div>
  );
} 