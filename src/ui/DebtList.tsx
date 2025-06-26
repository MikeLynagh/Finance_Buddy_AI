import React from 'react';
import type { Debt } from '../core/types';

interface DebtListProps {
  debts: Debt[];
  onEdit: (debt: Debt) => void;
  onDelete: (id: string) => void;
}

function formatCurrency(amount: number) {
  return amount.toLocaleString('en-IE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

export function DebtList({ debts, onEdit, onDelete }: DebtListProps) {
  return (
    <div className="space-y-3">
      {debts.map((debt) => (
        <div key={debt.id} className="flex justify-between items-center p-3 border rounded">
          <div>
            <div className="font-medium">{debt.name}</div>
            <div className="text-sm text-gray-600">
              {formatCurrency(debt.balance)}{debt.interestRate !== undefined ? ` (${debt.interestRate}%)` : ''}
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(debt)}
              className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(debt.id)}
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