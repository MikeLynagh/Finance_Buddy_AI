import React from 'react';
import type { Asset } from '../core/types';

interface AssetListProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (id: string) => void;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export function AssetList({ assets, onEdit, onDelete }: AssetListProps) {
  return (
    <div className="space-y-3">
      {assets.map((asset) => (
        <div key={asset.id} className="flex justify-between items-center p-3 border rounded">
          <div>
            <div className="font-medium">{asset.name}</div>
            <div className="text-sm text-gray-600">{formatCurrency(asset.value)}</div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(asset)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(asset.id)}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
} 