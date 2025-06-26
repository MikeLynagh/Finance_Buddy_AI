import React from 'react';

interface AssetFormProps {
  form: {
    name: string;
    value: string;
    isHomeEquity: boolean;
  };
  errors: Record<string, string>;
  editing: boolean;
  onChange: (field: string, value: string | boolean) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function AssetForm({ form, errors, editing, onChange, onSave, onCancel }: AssetFormProps) {
  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-4">
        {editing ? 'Edit Asset' : 'Add New Asset'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="assetName" className="block text-sm font-medium mb-1">Asset Name</label>
          <input
            id="assetName"
            type="text"
            value={form.name}
            onChange={e => onChange('name', e.target.value)}
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
            value={form.value}
            onChange={e => onChange('value', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0"
          />
          {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="homeEquity"
            checked={form.isHomeEquity}
            onChange={e => onChange('isHomeEquity', e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="homeEquity" className="text-sm">Home Equity</label>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {editing ? 'Update Asset' : 'Save Asset'}
          </button>
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
} 