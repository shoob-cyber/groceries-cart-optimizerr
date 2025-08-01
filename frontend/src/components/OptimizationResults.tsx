import React from 'react';
import { TrendingUp, Award, DollarSign, Scale, Package } from 'lucide-react';
import { OptimizationResult } from '../types';

interface OptimizationResultsProps {
  result: OptimizationResult;
}

export function OptimizationResults({ result }: OptimizationResultsProps) {
  return (
    <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-6 mb-6 animate-scaleIn hover-lift transition-all duration-500 border border-primary-200">
      <div className="flex items-center mb-4">
        <TrendingUp className="w-5 h-5 text-primary-600 mr-2 animate-bounce-custom" />
        <h3 className="text-lg font-semibold text-gray-900 animate-fadeInLeft">Optimization Results</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg p-4 text-center hover-lift transition-all duration-300 animate-fadeInUp stagger-1 hover-glow">
          <DollarSign className="w-8 h-8 text-primary-600 mx-auto mb-2 animate-bounce" />
          <p className="text-sm text-gray-600">Total Price</p>
          <p className="text-xl font-bold text-gray-900 animate-countUp">${result.totalPrice.toFixed(2)}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center hover-lift transition-all duration-300 animate-fadeInUp stagger-2 hover-glow">
          <Award className="w-8 h-8 text-secondary-600 mx-auto mb-2 animate-pulse-custom" />
          <p className="text-sm text-gray-600">Total Value</p>
          <p className="text-xl font-bold text-gray-900 animate-countUp">{result.totalValue}</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center hover-lift transition-all duration-300 animate-fadeInUp stagger-3 hover-glow">
          <Scale className="w-8 h-8 text-accent-600 mx-auto mb-2 animate-bounce" />
          <p className="text-sm text-gray-600">Total Weight</p>
          <p className="text-xl font-bold text-gray-900 animate-countUp">{result.totalWeight.toFixed(1)}kg</p>
        </div>
        
        <div className="bg-white rounded-lg p-4 text-center hover-lift transition-all duration-300 animate-fadeInUp stagger-4 hover-glow">
          <Package className="w-8 h-8 text-secondary-700 mx-auto mb-2 animate-pulse-custom" />
          <p className="text-sm text-gray-600">Items</p>
          <p className="text-xl font-bold text-gray-900 animate-countUp">{result.optimizedItems.length}</p>
        </div>
      </div>
      
      {result.appliedCoupon && (
        <div className="bg-white rounded-lg p-4 mb-4 animate-slideDown hover-lift transition-all duration-300 border-l-4 border-primary-500">
          <h4 className="font-semibold text-gray-900 mb-2 animate-fadeInLeft">Applied Coupon</h4>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-700 animate-fadeInUp">{result.appliedCoupon.code}</p>
              <p className="text-sm text-gray-600 animate-fadeInUp stagger-1">{result.appliedCoupon.description}</p>
            </div>
            <p className="text-lg font-bold text-primary-600 animate-bounce-custom">-${result.discount.toFixed(2)}</p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-lg p-4 animate-slideDown hover-lift transition-all duration-300 border-2 border-primary-300">
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-900 animate-fadeInLeft">Final Amount:</span>
          <span className="text-2xl font-bold text-primary-600 animate-countUp animate-pulse-custom">${result.finalAmount.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 animate-fadeInLeft stagger-1">Total Savings:</span>
          <span className="text-lg font-bold text-primary-600 animate-bounce-custom">${result.savings.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}