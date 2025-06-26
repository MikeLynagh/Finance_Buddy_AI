import React, { useState, useEffect } from 'react';
import type { Asset, Debt } from '../core/types';
import { mockAssets, mockDebts } from '../core/mockData';
import { AssetForm } from './AssetForm';
import { DebtForm } from './DebtForm';
import { AssetList } from './AssetList';
import { DebtList } from './DebtList';
import { loadAssets, saveAssets, loadDebts, saveDebts, saveCurrentNetWorthSnapshot, exportData, importData, clearAllData } from '../lib/storage';

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
  const [assets, setAssets] = useState<Asset[]>([]);
  const [debts, setDebts] = useState<Debt[]>([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [showDebtForm, setShowDebtForm] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [editingDebt, setEditingDebt] = useState<Debt | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [importMessage, setImportMessage] = useState<string>('');

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

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedAssets = loadAssets();
    const savedDebts = loadDebts();
    
    // If no saved data, use mock data as fallback
    if (savedAssets.length === 0 && savedDebts.length === 0) {
      setAssets(mockAssets);
      setDebts(mockDebts);
    } else {
      setAssets(savedAssets);
      setDebts(savedDebts);
    }
  }, []);

  // Save data to localStorage whenever assets or debts change
  useEffect(() => {
    if (assets.length > 0 || debts.length > 0) {
      saveAssets(assets);
      saveDebts(debts);
      saveCurrentNetWorthSnapshot(assets, debts);
    }
  }, [assets, debts]);

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

  const validateDebtForm = () => {
    const newErrors: Record<string, string> = {};
    if (!debtForm.name.trim()) newErrors.debtName = 'Debt name is required';
    if (!debtForm.balance || parseFloat(debtForm.balance) <= 0) newErrors.balance = 'Balance is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveDebt = () => {
    if (!validateDebtForm()) return;
    const newDebt: Debt = {
      id: editingDebt?.id || Date.now().toString(),
      name: debtForm.name,
      balance: parseFloat(debtForm.balance),
      interestRate: debtForm.interestRate ? parseFloat(debtForm.interestRate) : undefined,
      date: new Date()
    };
    if (editingDebt) {
      setDebts(debts.map(d => d.id === editingDebt.id ? newDebt : d));
      setEditingDebt(null);
    } else {
      setDebts([...debts, newDebt]);
    }
    setDebtForm({ name: '', balance: '', interestRate: '' });
    setShowDebtForm(false);
    setErrors({});
  };

  const handleEditDebt = (debt: Debt) => {
    setEditingDebt(debt);
    setDebtForm({
      name: debt.name,
      balance: debt.balance.toString(),
      interestRate: debt.interestRate?.toString() || ''
    });
    setShowDebtForm(true);
  };

  const handleDeleteDebt = (id: string) => {
    setDebts(debts.filter(d => d.id !== id));
  };

  const handleExportData = () => {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `finance-buddy-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const success = importData(content);
      
      if (success) {
        setImportMessage('Data imported successfully! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setImportMessage('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This cannot be undone.')) {
      clearAllData();
      setAssets(mockAssets);
      setDebts(mockDebts);
      setImportMessage('Data reset to defaults.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600 mt-1">Manage Your Financial Data</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Assets Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Assets</h2>
              <button
                onClick={() => { setShowAssetForm(true); setEditingAsset(null); }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add New Asset
              </button>
            </div>

            {showAssetForm && (
              <AssetForm
                form={assetForm}
                errors={errors}
                editing={!!editingAsset}
                onChange={(field, value) => setAssetForm(f => ({ ...f, [field]: value }))}
                onSave={handleSaveAsset}
                onCancel={() => {
                  setShowAssetForm(false);
                  setEditingAsset(null);
                  setAssetForm({ name: '', value: '', isHomeEquity: false });
                  setErrors({});
                }}
              />
            )}

            <AssetList
              assets={assets}
              onEdit={handleEditAsset}
              onDelete={handleDeleteAsset}
            />
          </div>

          {/* Debts Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Debts</h2>
              <button
                onClick={() => { setShowDebtForm(true); setEditingDebt(null); }}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Add New Debt
              </button>
            </div>

            {showDebtForm && (
              <DebtForm
                form={debtForm}
                errors={errors}
                editing={!!editingDebt}
                onChange={(field, value) => setDebtForm(f => ({ ...f, [field]: value }))}
                onSave={handleSaveDebt}
                onCancel={() => {
                  setShowDebtForm(false);
                  setEditingDebt(null);
                  setDebtForm({ name: '', balance: '', interestRate: '' });
                  setErrors({});
                }}
              />
            )}

            <DebtList
              debts={debts}
              onEdit={handleEditDebt}
              onDelete={handleDeleteDebt}
            />
          </div>
        </div>

        {/* Data Management Section */}
        <div className="mt-8 bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-6">Data Management</h2>
          
          {importMessage && (
            <div className={`mb-4 p-3 rounded ${importMessage.includes('successfully') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {importMessage}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Export Data</h3>
              <p className="text-sm text-gray-600 mb-3">Download your financial data as a JSON file</p>
              <button
                onClick={handleExportData}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              >
                Export Data
              </button>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Import Data</h3>
              <p className="text-sm text-gray-600 mb-3">Upload previously exported data</p>
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Reset Data</h3>
              <p className="text-sm text-gray-600 mb-3">Clear all data and start fresh</p>
              <button
                onClick={handleResetData}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Reset Data
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 