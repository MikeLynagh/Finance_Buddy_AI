import React from 'react';
import type { Asset } from '../core/types';

interface AssetAllocationChartProps {
  assets: Asset[];
  height?: number;
  width?: number;
}

interface PieSlice {
  name: string;
  value: number;
  percentage: number;
  startAngle: number;
  endAngle: number;
  color: string;
}

export function AssetAllocationChart({ assets, height = 300, width = 400 }: AssetAllocationChartProps) {
  if (assets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No assets to display
        </div>
      </div>
    );
  }

  // Filter out assets with zero value
  const validAssets = assets.filter(asset => asset.value > 0);
  
  if (validAssets.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No assets with positive values
        </div>
      </div>
    );
  }

  const totalValue = validAssets.reduce((sum, asset) => sum + asset.value, 0);
  
  // Color palette for different asset types
  const colors = [
    '#3b82f6', // blue
    '#10b981', // green
    '#f59e0b', // amber
    '#ef4444', // red
    '#8b5cf6', // violet
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#ec4899', // pink
    '#6366f1', // indigo
  ];

  // Calculate pie slices
  let currentAngle = 0;
  const pieSlices: PieSlice[] = validAssets.map((asset, index) => {
    const percentage = (asset.value / totalValue) * 100;
    const sliceAngle = (percentage / 100) * 2 * Math.PI;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    
    currentAngle = endAngle;
    
    return {
      name: asset.name,
      value: asset.value,
      percentage,
      startAngle,
      endAngle,
      color: colors[index % colors.length]
    };
  });

  // Chart dimensions
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 60;

  // Helper function to convert polar to cartesian coordinates
  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInRadians: number) => {
    return {
      x: centerX + (radius * Math.cos(angleInRadians)),
      y: centerY + (radius * Math.sin(angleInRadians))
    };
  };

  // Helper function to create SVG arc path
  const createArcPath = (startAngle: number, endAngle: number) => {
    const start = polarToCartesian(centerX, centerY, radius, startAngle);
    const end = polarToCartesian(centerX, centerY, radius, endAngle);
    
    const largeArcFlag = endAngle - startAngle <= Math.PI ? "0" : "1";
    
    return [
      "M", start.x, start.y,
      "A", radius, radius, 0, largeArcFlag, 1, end.x, end.y,
      "L", centerX, centerY,
      "Z"
    ].join(" ");
  };

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Asset Allocation</h3>
      
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
        {/* Pie Chart */}
        <div className="flex-shrink-0">
          <svg width={width} height={height} className="w-full">
            {/* Pie slices */}
            {pieSlices.map((slice, index) => (
              <path
                key={index}
                d={createArcPath(slice.startAngle, slice.endAngle)}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth="2"
              />
            ))}
            
            {/* Center circle for donut effect */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius * 0.3}
              fill="#ffffff"
              stroke="#e5e7eb"
              strokeWidth="1"
            />
            
            {/* Center text */}
            <text
              x={centerX}
              y={centerY - 5}
              textAnchor="middle"
              fontSize="14"
              fontWeight="bold"
              fill="#374151"
            >
              {formatCurrency(totalValue)}
            </text>
            <text
              x={centerX}
              y={centerY + 10}
              textAnchor="middle"
              fontSize="12"
              fill="#6b7280"
            >
              Total Assets
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 mb-3">Asset Breakdown</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {pieSlices.map((slice, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2 min-w-0">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ backgroundColor: slice.color }}
                  ></div>
                  <span className="text-sm text-gray-700 truncate">{slice.name}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-sm font-medium text-gray-900">
                    {formatCurrency(slice.value)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {slice.percentage.toFixed(1)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-900">Total</span>
              <span className="text-sm font-bold text-gray-900">{formatCurrency(totalValue)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 