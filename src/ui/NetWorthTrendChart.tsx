import React from 'react';
import type { NetWorthSnapshot } from '../core/types';

interface NetWorthTrendChartProps {
  snapshots: NetWorthSnapshot[];
  height?: number;
  width?: number;
}

export function NetWorthTrendChart({ snapshots, height = 300, width = 600 }: NetWorthTrendChartProps) {
  if (snapshots.length < 2) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Worth Trend</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          Need at least 2 data points to show trend
        </div>
      </div>
    );
  }

  // Sort snapshots by date
  const sortedSnapshots = [...snapshots].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Calculate chart dimensions
  const margin = { top: 20, right: 30, bottom: 40, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Calculate scales
  const minDate = new Date(sortedSnapshots[0].date);
  const maxDate = new Date(sortedSnapshots[sortedSnapshots.length - 1].date);
  const dateRange = maxDate.getTime() - minDate.getTime();

  const allValues = sortedSnapshots.flatMap(s => [s.totalAssets, s.liquidAssets]);
  const minValue = Math.min(...allValues);
  const maxValue = Math.max(...allValues);
  const valueRange = maxValue - minValue;

  // Helper functions
  const xScale = (date: Date) => {
    const time = date.getTime() - minDate.getTime();
    return margin.left + (time / dateRange) * chartWidth;
  };

  const yScale = (value: number) => {
    return margin.top + chartHeight - ((value - minValue) / valueRange) * chartHeight;
  };

  // Generate path for total net worth
  const totalPath = sortedSnapshots
    .map((snapshot, index) => {
      const x = xScale(new Date(snapshot.date));
      const y = yScale(snapshot.totalAssets);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate path for liquid net worth
  const liquidPath = sortedSnapshots
    .map((snapshot, index) => {
      const x = xScale(new Date(snapshot.date));
      const y = yScale(snapshot.liquidAssets);
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  // Generate grid lines
  const gridLines = [];
  const numGridLines = 5;
  for (let i = 0; i <= numGridLines; i++) {
    const value = minValue + (valueRange * i) / numGridLines;
    const y = yScale(value);
    gridLines.push(
      <line
        key={`grid-${i}`}
        x1={margin.left}
        y1={y}
        x2={width - margin.right}
        y2={y}
        stroke="#e5e7eb"
        strokeWidth="1"
      />
    );
  }

  // Generate axis labels
  const axisLabels = [];
  for (let i = 0; i <= numGridLines; i++) {
    const value = minValue + (valueRange * i) / numGridLines;
    const y = yScale(value);
    axisLabels.push(
      <text
        key={`label-${i}`}
        x={margin.left - 10}
        y={y + 4}
        textAnchor="end"
        fontSize="12"
        fill="#6b7280"
      >
        {new Intl.NumberFormat('en-IE', {
          style: 'currency',
          currency: 'EUR',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(value)}
      </text>
    );
  }

  // Generate date labels
  const dateLabels = [];
  const numDateLabels = Math.min(6, sortedSnapshots.length);
  for (let i = 0; i < numDateLabels; i++) {
    const index = Math.floor((i * (sortedSnapshots.length - 1)) / (numDateLabels - 1));
    const snapshot = sortedSnapshots[index];
    const x = xScale(new Date(snapshot.date));
    dateLabels.push(
      <text
        key={`date-${i}`}
        x={x}
        y={height - 10}
        textAnchor="middle"
        fontSize="12"
        fill="#6b7280"
      >
        {new Intl.DateTimeFormat('en-IE', {
          month: 'short',
          year: '2-digit'
        }).format(new Date(snapshot.date))}
      </text>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Net Worth Trend</h3>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Total Net Worth</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-600">Liquid Net Worth</span>
        </div>
      </div>
      
      <svg width={width} height={height} className="w-full">
        {/* Grid lines */}
        {gridLines}
        
        {/* Axis labels */}
        {axisLabels}
        
        {/* Date labels */}
        {dateLabels}
        
        {/* Y-axis */}
        <line
          x1={margin.left}
          y1={margin.top}
          x2={margin.left}
          y2={height - margin.bottom}
          stroke="#d1d5db"
          strokeWidth="2"
        />
        
        {/* X-axis */}
        <line
          x1={margin.left}
          y1={height - margin.bottom}
          x2={width - margin.right}
          y2={height - margin.bottom}
          stroke="#d1d5db"
          strokeWidth="2"
        />
        
        {/* Total net worth line */}
        <path
          d={totalPath}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Liquid net worth line */}
        <path
          d={liquidPath}
          stroke="#10b981"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points for total net worth */}
        {sortedSnapshots.map((snapshot, index) => (
          <circle
            key={`total-${index}`}
            cx={xScale(new Date(snapshot.date))}
            cy={yScale(snapshot.totalAssets)}
            r="4"
            fill="#3b82f6"
          />
        ))}
        
        {/* Data points for liquid net worth */}
        {sortedSnapshots.map((snapshot, index) => (
          <circle
            key={`liquid-${index}`}
            cx={xScale(new Date(snapshot.date))}
            cy={yScale(snapshot.liquidAssets)}
            r="4"
            fill="#10b981"
          />
        ))}
      </svg>
      
      {/* Summary stats */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-600">Current Total Net Worth</p>
          <p className="font-semibold text-blue-600">
            {new Intl.NumberFormat('en-IE', {
              style: 'currency',
              currency: 'EUR'
            }).format(sortedSnapshots[sortedSnapshots.length - 1].totalAssets)}
          </p>
        </div>
        <div>
          <p className="text-gray-600">Current Liquid Net Worth</p>
          <p className="font-semibold text-green-600">
            {new Intl.NumberFormat('en-IE', {
              style: 'currency',
              currency: 'EUR'
            }).format(sortedSnapshots[sortedSnapshots.length - 1].liquidAssets)}
          </p>
        </div>
      </div>
    </div>
  );
} 