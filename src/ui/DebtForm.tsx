import React from 'react';

interface DebtFormProps {
  form: {
    name: string;
    balance: string;
    interestRate: string;
  };
  errors: Record<string, string>;
  editing: boolean;
  onChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export function DebtForm({ form, errors, editing, onChange, onSave, onCancel }: DebtFormProps) {
  return (
    <div className="mb-6 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold mb-4">
        {editing ? 'Edit Debt' : 'Add New Debt'}
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="debtName" className="block text-sm font-medium mb-1">Debt Name</label>
          <input
            id="debtName"
            type="text"
            value={form.name}
            onChange={e => onChange('name', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., Mortgage"
          />
          {errors.debtName && <p className="text-red-500 text-sm mt-1">{errors.debtName}</p>}
        </div>
        <div>
          <label htmlFor="debtBalance" className="block text-sm font-medium mb-1">Balance</label>
          <input
            id="debtBalance"
            type="number"
            value={form.balance}
            onChange={e => onChange('balance', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="0"
          />
          {errors.balance && <p className="text-red-500 text-sm mt-1">{errors.balance}</p>}
        </div>
        <div>
          <label htmlFor="debtInterest" className="block text-sm font-medium mb-1">Interest Rate (%)</label>
          <input
            id="debtInterest"
            type="number"
            value={form.interestRate}
            onChange={e => onChange('interestRate', e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., 3.2"
          />
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {editing ? 'Update Debt' : 'Save Debt'}
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