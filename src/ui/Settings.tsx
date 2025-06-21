import React, { useState } from 'react';
import type { Asset, Debt } from '../core/types';
import { mockAssets, mockDebts } from '../core/mockData';

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

interface AssetFormData {
  name: string;
  value: string;
  isHomeEquity: boolean;
}

interface DebtFormData {
  name: string;
  balance: string;
  interestRate: string;
}

export function Settings() {
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [debts, setDebts] = useState<Debt[]>(mockDebts);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showDebtForm, setShowDebtForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [assetForm, setAssetForm] = useState<AssetFormData>({
    name: '',
    value: '',
    isHomeEquity: false
  });

  const [debtForm, setDebtForm] = useState<DebtFormData>({
    name: '',
    balance: '',
    interestRate: ''
  });

  const validateAssetForm = () => {
    const newErrors: Record<string, string> = {};
    if (!assetForm.name.trim()) newErrors.name = 'Asset name is required';
    if (!assetForm.value || parseFloat(assetForm.value) <= 0) newErrors.value = 'Value is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveAsset = () => {
    if (!validateAssetForm()) return;

    const newAsset: Asset = {
      id: editingAsset?.id || Date.now().toString(),
      name: assetForm.name,
      value: parseFloat(assetForm.value),
      isHomeEquity: assetForm.isHomeEquity,
      date: new Date()
    };

    if (editingAsset) {
      setAssets(assets.map(a => a.id === editingAsset.id ? newAsset : a));
      setEditingAsset(null);
    } else {
      setAssets([...assets, newAsset]);
    }

    setAssetForm({ name: '', value: '', isHomeEquity: false });
    setShowAssetForm(false);
    setErrors({});
  };

  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setAssetForm({
      name: asset.name,
      value: asset.value.toString(),
      isHomeEquity: asset.isHomeEquity
    });
    setShowAssetForm(true);
  };

  const handleDeleteAsset = (id: string) => {
    setAssets(assets.filter(a => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage Your Financial Data</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assets Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Assets</h2>
            <button
              onClick={() => setShowAssetForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Add New Asset
            </button>
          </div>

          {showAssetForm && (
            <div className="mb-6 p-4 border rounded-lg bg-gray-50">
              <h3 className="font-semibold mb-4">
                {editingAsset ? 'Edit Asset' : 'Add New Asset'}
              </h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="assetName" className="block text-sm font-medium mb-1">Asset Name</label>
                  <input
                    id="assetName"
                    type="text"
                    value={assetForm.name}
                    onChange={(e) => setAssetForm({ ...assetForm, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="e.g., Savings Account"
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="assetValue" className="block text-sm font-medium mb-1">Value</label>
                  <input
                    id="assetValue"
                    type="number"
                    value={assetForm.value}
                    onChange={(e) => setAssetForm({ ...assetForm, value: e.target.value })}
                    className="w-full p-2 border rounded"
                    placeholder="0"
                  />
                  {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="homeEquity"
                    checked={assetForm.isHomeEquity}
                    onChange={(e) => setAssetForm({ ...assetForm, isHomeEquity: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="homeEquity" className="text-sm">Home Equity</label>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={handleSaveAsset}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                  >
                    {editingAsset ? 'Update Asset' : 'Save Asset'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAssetForm(false);
                      setEditingAsset(null);
                      setAssetForm({ name: '', value: '', isHomeEquity: false });
                      setErrors({});
                    }}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {assets.map((asset) => (
              <div key={asset.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-sm text-gray-600">{formatCurrency(asset.value)}</div>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEditAsset(asset)}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAsset(asset.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Debts Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Debts</h2>
            <button
              onClick={() => setShowDebtForm(true)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Add New Debt
            </button>
          </div>

          <div className="space-y-3">
            {debts.map((debt) => (
              <div key={debt.id} className="flex justify-between items-center p-3 border rounded">
                <div>
                  <div className="font-medium">{debt.name}</div>
                  <div className="text-sm text-gray-600">
                    {formatCurrency(debt.balance)}
                    {debt.interestRate && ` (${debt.interestRate}%)`}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition">
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 