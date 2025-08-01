import React from 'react';
import { Settings, DollarSign, Scale } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function OptimizationControls() {
  const { state, dispatch } = useCart();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const isLargeDataset = totalItems > 100 || state.budget > 10000;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center mb-4">
        <Settings className="w-5 h-5 text-gray-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Optimization Settings</h3>
      </div>
      
      {isLargeDataset && (
        <div className="mb-4 bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg text-sm">
          <p className="font-medium">Large Dataset Detected</p>
          <p>Using greedy algorithm for better performance with {totalItems} items and ₹{state.budget} budget.</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <DollarSign className="w-4 h-4 inline mr-1" />
            Budget Limit
          </label>
          <input
            type="number"
            value={state.budget}
            onChange={(e) => dispatch({ type: 'SET_BUDGET', payload: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            min="0"
            step="100"
            max="100000"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Scale className="w-4 h-4 inline mr-1" />
            Weight Limit (kg)
          </label>
          <input
            type="number"
            value={state.weightLimit}
            onChange={(e) => dispatch({ type: 'SET_WEIGHT_LIMIT', payload: parseFloat(e.target.value) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
            min="0"
            step="5"
            max="10000"
          />
        </div>
      </div>
    </div>
  );
}