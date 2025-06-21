import React from 'react';
import { mockNetWorthSnapshots, mockAssets, mockDebts } from '../core/mockData';

const latestSnapshot = mockNetWorthSnapshots[mockNetWorthSnapshots.length - 1];
const homeEquity = mockAssets.find(a => a.isHomeEquity)?.value || 0;
const totalDebts = mockDebts.reduce((sum, d) => sum + d.balance, 0);

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Finance Buddy Dashboard</h1>
        <p className="text-gray-600 mt-1">Your financial overview at a glance</p>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Total Net Worth</span>
          <span className="text-2xl font-bold text-green-700">{formatCurrency(latestSnapshot.totalNetWorth)}</span>
        </div>
        <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
          <span className="text-gray-500">Liquid Net Worth</span>
          <span className="text-2xl font-bold text-blue-700">{formatCurrency(latestSnapshot.liquidNetWorth)}</span>
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
      {/* More dashboard sections will go here */}
    </div>
  );
} 