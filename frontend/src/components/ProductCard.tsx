import React from 'react';
import { Plus, ShoppingCart, Star, Package } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/useToast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { dispatch } = useCart();
  const { showSuccess } = useToast();

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_ITEM', payload: product });
    showSuccess(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover-lift hover-glow transition-all duration-300 animate-fadeInUp group border border-cream-200">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-accent-100 rounded-full p-1 shadow-md animate-pulse-custom">
          <Star className="w-4 h-4 text-accent-600 fill-current animate-bounce" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-2 left-2 bg-cream-100/90 backdrop-blur-sm rounded-full px-2 py-1 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <span className="text-xs font-medium text-primary-800">Quick View</span>
        </div>
      </div>
      
      <div className="p-4 transform transition-all duration-300">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-primary-700 transition-colors duration-300">
            {product.name}
          </h3>
          <span className="text-sm text-primary-700 bg-secondary-100 px-2 py-1 rounded transition-all duration-300 group-hover:bg-secondary-200 group-hover:text-primary-800">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2 transition-colors duration-300 group-hover:text-gray-700">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 animate-countUp">
            ${product.price}
          </span>
          <div className="flex items-center space-x-2 text-sm text-secondary-600 transition-all duration-300 group-hover:text-secondary-700">
            <Package size={14} />
            <span>{product.weight}kg</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-secondary-700 transition-colors duration-300">Value:</span>
            <span className="text-sm font-bold text-primary-600 animate-pulse-custom">{product.valueScore}/10</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-secondary-700 transition-colors duration-300">Stock:</span>
            <span className={`text-sm font-bold transition-colors duration-300 ${product.stock > 10 ? 'text-primary-600' : product.stock > 5 ? 'text-accent-600' : 'text-red-600'}`}>
              {product.stock}
            </span>
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-md hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg transform active:scale-95 group/button"
        >
          <ShoppingCart size={16} className="transition-transform duration-300 group-hover/button:rotate-12" />
          <span className="font-medium">Add to Cart</span>
        </button>
      </div>
    </div>
  );
}