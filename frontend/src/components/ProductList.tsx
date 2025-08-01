import React from 'react';
import { ProductCard } from './ProductCard';
import { mockProducts } from '../data/mockData';
import { ProtectedRoute } from './ProtectedRoute';

export function ProductList() {
  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 animate-fadeInUp">Fresh Groceries</h2>
          <p className="text-gray-600 text-lg animate-fadeInUp stagger-1">
            Discover our fresh selection of quality groceries. Use our cart optimizer to get the best nutritional value within your budget and carrying capacity!
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full animate-scaleIn stagger-2"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProducts.map((product, index) => (
            <div key={product.id} className={`animate-fadeInUp stagger-${Math.min(index + 1, 8)}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}