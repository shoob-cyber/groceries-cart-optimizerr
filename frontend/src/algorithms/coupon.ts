import { Coupon, CartItem } from '../types';

export interface CouponResult {
  coupon: Coupon | null;
  discount: number;
  finalAmount: number;
}

export function applyBestCoupon(
  availableCoupons: Coupon[],
  cartItems: CartItem[]
): CouponResult {
  const cartTotal = cartItems.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  let bestCoupon: Coupon | null = null;
  let maxDiscount = 0;

  // Greedy algorithm: try all applicable coupons and select the one with maximum discount
  for (const coupon of availableCoupons) {
    if (cartTotal >= coupon.minCartValue) {
      const potentialDiscount = Math.min(
        (cartTotal * coupon.discountPercent) / 100,
        coupon.maxDiscount
      );
      
      if (potentialDiscount > maxDiscount) {
        maxDiscount = potentialDiscount;
        bestCoupon = coupon;
      }
    }
  }

  return {
    coupon: bestCoupon,
    discount: maxDiscount,
    finalAmount: cartTotal - maxDiscount
  };
}

export function calculateSavings(
  originalTotal: number,
  optimizedTotal: number,
  discount: number
): number {
  return originalTotal - (optimizedTotal - discount);
}