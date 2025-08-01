import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { CartItem, Product, OptimizationResult, Order } from '../types';

interface CartState {
  items: CartItem[];
  optimizationResult: OptimizationResult | null;
  budget: number;
  weightLimit: number;
  orders: Order[];
  currentView: 'cart' | 'checkout' | 'success';
  currentOrder: Order | null;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: number }
  | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_OPTIMIZATION_RESULT'; payload: OptimizationResult }
  | { type: 'SET_BUDGET'; payload: number }
  | { type: 'SET_WEIGHT_LIMIT'; payload: number }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'SET_VIEW'; payload: 'cart' | 'checkout' | 'success' }
  | { type: 'SET_CURRENT_ORDER'; payload: Order | null };

const initialState: CartState = {
  items: [],
  optimizationResult: null,
  budget: 500,
  weightLimit: 50,
  orders: [],
  currentView: 'cart',
  currentOrder: null
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.items.find(item => item.product.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        items: [...state.items, { product: action.payload, quantity: 1 }]
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.product.id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.product.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ).filter(item => item.quantity > 0)
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        optimizationResult: null
      };

    case 'SET_OPTIMIZATION_RESULT':
      return {
        ...state,
        optimizationResult: action.payload
      };

    case 'SET_BUDGET':
      return {
        ...state,
        budget: action.payload
      };

    case 'SET_WEIGHT_LIMIT':
      return {
        ...state,
        weightLimit: action.payload
      };

    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload],
        items: [], // Clear cart after order
        optimizationResult: null,
        currentOrder: action.payload,
        currentView: 'success'
      };

    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload
      };

    case 'SET_CURRENT_ORDER':
      return {
        ...state,
        currentOrder: action.payload
      };

    default:
      return state;
  }
}

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}