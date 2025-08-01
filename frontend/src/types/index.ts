export interface Product {
  id: number;
  name: string;
  price: number;
  weight: number;
  valueScore: number;
  stock: number;
  category: string;
  image: string;
  description: string;
  perishable: boolean;
  expiryDays?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Coupon {
  id: number;
  code: string;
  minCartValue: number;
  discountPercent: number;
  maxDiscount: number;
  description: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'admin';
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  totalPrice: number;
  discountApplied: number;
  finalAmount: number;
  appliedCoupon?: Coupon;
  timestamp: Date;
  optimized: boolean;
}

export interface OptimizationResult {
  optimizedItems: CartItem[];
  totalValue: number;
  totalWeight: number;
  totalPrice: number;
  appliedCoupon?: Coupon;
  discount: number;
  finalAmount: number;
  savings: number;
}