import React from 'react';
import { ShoppingCart, Zap, Receipt, ArrowLeft, AlertTriangle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { knapsackOptimize } from '../algorithms/knapsack';
import { applyBestCoupon, calculateSavings } from '../algorithms/coupon';
import { mockCoupons } from '../data/mockData';
import { CartItem } from './CartItem';
import { OptimizationControls } from './OptimizationControls';
import { OptimizationResults } from './OptimizationResults';
import { Checkout } from './Checkout';
import { OrderSuccess } from './OrderSuccess';
import { ProtectedRoute } from './ProtectedRoute';

export function Cart() {
  const { state, dispatch } = useCart();
  const { state: authState } = useAuth();
  const [isOptimizing, setIsOptimizing] = React.useState(false);
  const [optimizationError, setOptimizationError] = React.useState<string | null>(null);

  const originalTotal = state.items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  const handleOptimize = () => {
    if (state.items.length === 0) return;

    setIsOptimizing(true);
    setOptimizationError(null);

    // Use setTimeout to prevent UI blocking
    setTimeout(() => {
      try {
        // Run knapsack optimization
        const knapsackResult = knapsackOptimize(state.items, state.budget, state.weightLimit);
        
        // Apply best coupon to optimized cart
        const couponResult = applyBestCoupon(mockCoupons, knapsackResult.items);
        
        // Calculate savings
        const savings = calculateSavings(originalTotal, knapsackResult.totalPrice, couponResult.discount);

        const optimizationResult = {
          optimizedItems: knapsackResult.items,
          totalValue: knapsackResult.totalValue,
          totalWeight: knapsackResult.totalWeight,
          totalPrice: knapsackResult.totalPrice,
          appliedCoupon: couponResult.coupon,
          discount: couponResult.discount,
          finalAmount: couponResult.finalAmount,
          savings: savings
        };

        dispatch({ type: 'SET_OPTIMIZATION_RESULT', payload: optimizationResult });
      } catch (error) {
        console.error('Optimization error:', error);
        setOptimizationError('Optimization failed. Try reducing the number of items or budget amount.');
      } finally {
        setIsOptimizing(false);
      }
    }, 100);
  };

  const handleProceedToCheckout = () => {
    dispatch({ type: 'SET_VIEW', payload: 'checkout' });
  };

  const handleOrderComplete = (order: any) => {
    dispatch({ type: 'ADD_ORDER', payload: order });
  };

  const handleBackToCart = () => {
    dispatch({ type: 'SET_VIEW', payload: 'cart' });
  };

  const handleContinueShopping = () => {
    dispatch({ type: 'SET_VIEW', payload: 'cart' });
    dispatch({ type: 'SET_CURRENT_ORDER', payload: null });
  };

  // Render different views based on current state
  if (state.currentView === 'checkout') {
    return (
      <ProtectedRoute>
        <Checkout onOrderComplete={handleOrderComplete} onBack={handleBackToCart} />
      </ProtectedRoute>
    );
  }

  if (state.currentView === 'success' && state.currentOrder) {
    return (
      <ProtectedRoute>
        <OrderSuccess order={state.currentOrder} onContinueShopping={handleContinueShopping} />
      </ProtectedRoute>
    );
  }

  // Main cart view
  if (state.items.length === 0) {
    return (
      <ProtectedRoute>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600">Add some products to get started with optimization!</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fadeInUp">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900 animate-fadeInLeft">Shopping Cart</h2>
          <button
            onClick={() => dispatch({ type: 'CLEAR_CART' })}
            className="text-red-600 hover:text-red-800 transition-all duration-300 hover:scale-105 hover:bg-red-50 px-3 py-1 rounded-md"
          >
            Clear Cart
          </button>
        </div>

        <OptimizationControls />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 animate-fadeInUp">
              Current Cart Items ({state.items.length})
            </h3>
            {state.items.map((item, index) => (
              <div key={item.product.id} className={`animate-fadeInUp stagger-${Math.min(index + 1, 8)}`}>
                <CartItem item={item} />
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6 animate-fadeInRight hover-lift transition-all duration-300">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 animate-fadeInUp">Cart Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between animate-fadeInUp stagger-1">
                  <span>Subtotal:</span>
                  <span className="font-semibold animate-countUp">${originalTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between animate-fadeInUp stagger-2">
                  <span>Items:</span>
                  <span className="font-semibold animate-countUp">{state.items.reduce((sum, item) => sum + item.quantity, 0)}</span>
                </div>
                <div className="flex justify-between animate-fadeInUp stagger-3">
                  <span>Weight:</span>
                  <span className="font-semibold animate-countUp">{state.items.reduce((sum, item) => sum + (item.product.weight * item.quantity), 0).toFixed(1)}kg</span>
                </div>
                <hr className="my-2 animate-scaleIn" />
                <div className="flex justify-between font-bold text-lg animate-fadeInUp stagger-4">
                  <span>Total:</span>
                  <span className="text-green-600 animate-pulse-custom">${originalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleOptimize}
              disabled={isOptimizing}
              className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-3 px-6 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg transform active:scale-95 animate-fadeInUp hover-glow group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isOptimizing ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-5 h-5 group-hover:animate-bounce" />
                  <span>Optimize Cart</span>
                </>
              )}
            </button>

            {optimizationError && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm flex items-center space-x-2 animate-slideDown">
                <AlertTriangle className="w-4 h-4" />
                <span>{optimizationError}</span>
              </div>
            )}

            {state.optimizationResult && (
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-gradient-to-r from-secondary-600 to-primary-600 text-white py-3 px-6 rounded-lg hover:from-secondary-700 hover:to-primary-700 transition-all duration-300 flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg transform active:scale-95 animate-scaleIn hover-glow group"
              >
                <Receipt className="w-5 h-5 group-hover:animate-bounce" />
                <span>Proceed to Checkout</span>
              </button>
            )}
          </div>
        </div>

        {state.optimizationResult && (
          <div className="mt-8">
            <OptimizationResults result={state.optimizationResult} />
            
            <div className="bg-white rounded-lg shadow-md p-6 animate-slideDown hover-lift transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 animate-fadeInUp">Optimized Cart Items</h3>
              {state.optimizationResult.optimizedItems.map((item, index) => (
                <div key={item.product.id} className={`animate-fadeInUp stagger-${Math.min(index + 1, 8)}`}>
                  <CartItem item={item} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}