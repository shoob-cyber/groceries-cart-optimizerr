import React from 'react';
import { ShoppingCart, User, Settings, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const { state } = useCart();
  const { state: authState, logout } = useAuth();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-gradient-to-r from-primary-800 to-secondary-700 shadow-lg sticky top-0 z-50 animate-slideInFromTop">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 animate-fadeInUp">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-white hover:text-cream-200 transition-colors duration-300 cursor-pointer">
              Cart Optimizer
            </h1>
            {authState.user && (
              <span className="ml-4 text-sm text-cream-100 animate-fadeInLeft">
                Welcome, {authState.user.name}
              </span>
            )}
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <button
              onClick={() => onViewChange('overview')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentView === 'overview'
                  ? 'bg-cream-200 text-primary-800 shadow-md'
                  : 'text-cream-100 hover:text-white hover:bg-primary-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => onViewChange('products')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentView === 'products'
                  ? 'bg-cream-200 text-primary-800 shadow-md'
                  : 'text-cream-100 hover:text-white hover:bg-primary-700'
              }`}
            >
              Products
            </button>
            <button
              onClick={() => onViewChange('cart')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentView === 'cart'
                  ? 'bg-cream-200 text-primary-800 shadow-md'
                  : 'text-cream-100 hover:text-white hover:bg-primary-700'
              }`}
            >
              Cart
            </button>
            <button
              onClick={() => onViewChange('orders')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:scale-105 ${
                currentView === 'orders'
                  ? 'bg-cream-200 text-primary-800 shadow-md'
                  : 'text-cream-100 hover:text-white hover:bg-primary-700'
              }`}
            >
              Orders
            </button>
          </nav>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => onViewChange('cart')}
              className="relative p-2 text-cream-100 hover:text-white transition-all duration-300 hover:scale-110 hover:bg-primary-700 rounded-full"
            >
              <ShoppingCart size={24} className="transition-transform duration-200" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-primary-900 text-xs rounded-full h-5 w-5 flex items-center justify-center animate-bounce-custom font-bold">
                  {totalItems}
                </span>
              )}
            </button>
            <div className="flex items-center space-x-2 animate-fadeInRight">
              <User size={24} className="text-cream-100" />
              <span className="text-sm text-white">{authState.user?.name}</span>
            </div>
            <button 
              onClick={handleLogout}
              className="p-2 text-cream-100 hover:text-red-300 transition-all duration-300 hover:scale-110 hover:bg-red-600/20 rounded-full"
              title="Logout"
            >
              <LogOut size={24} className="transition-transform duration-200" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}