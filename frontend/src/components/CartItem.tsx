import React from 'react';
import { Minus, Plus, Trash2, Package } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: item.product.id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id: item.product.id, quantity: newQuantity } });
    }
  };

  const handleRemove = () => {
    dispatch({ type: 'REMOVE_ITEM', payload: item.product.id });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4 hover-lift transition-all duration-300 animate-fadeInUp group">
      <div className="flex items-center space-x-4">
        <img
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded-md transition-transform duration-300 group-hover:scale-110 hover-scale"
        />
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{item.product.name}</h3>
          <p className="text-sm text-gray-600 transition-colors duration-300">{item.product.category}</p>
          <div className="flex items-center space-x-4 mt-2">
            <span className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
              ${item.product.price}
            </span>
            <div className="flex items-center space-x-2 text-sm text-gray-500 transition-colors duration-300">
              <Package size={12} />
              <span>{item.product.weight}kg</span>
            </div>
            <div className="text-sm text-green-600 font-medium animate-pulse-custom">
              Quality: {item.product.valueScore}/10
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            className="p-1 rounded-full bg-gray-200 hover:bg-red-200 hover:text-red-600 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center font-medium text-lg animate-countUp">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            className="p-1 rounded-full bg-gray-200 hover:bg-green-200 hover:text-green-600 transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Plus size={16} />
          </button>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 animate-countUp">
            ${(item.product.price * item.quantity).toFixed(2)}
          </p>
          <button
            onClick={handleRemove}
            className="text-red-500 hover:text-red-700 transition-all duration-300 mt-2 hover:scale-110 active:scale-95 hover:bg-red-50 p-1 rounded"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}