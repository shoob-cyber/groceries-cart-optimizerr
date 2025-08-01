import { Product, CartItem } from '../types';

export interface KnapsackItem {
  product: Product;
  quantity: number;
  totalValue: number;
  totalWeight: number;
  totalPrice: number;
}

export interface KnapsackResult {
  items: CartItem[];
  totalValue: number;
  totalWeight: number;
  totalPrice: number;
}

// Optimized knapsack with memory-efficient approach
export function knapsackOptimize(
  cartItems: CartItem[],
  budget: number,
  weightLimit: number = 50
): KnapsackResult {
  // Early return for empty cart
  if (!cartItems.length) {
    return {
      items: [],
      totalValue: 0,
      totalWeight: 0,
      totalPrice: 0
    };
  }

  // Use greedy approach for very large datasets to prevent memory issues
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  if (totalItems > 100 || budget > 10000) {
    return greedyOptimize(cartItems, budget, weightLimit);
  }

  // Convert cart items to individual items for DP
  const items: KnapsackItem[] = [];
  cartItems.forEach(cartItem => {
    for (let i = 0; i < cartItem.quantity; i++) {
      items.push({
        product: cartItem.product,
        quantity: 1,
        totalValue: cartItem.product.valueScore,
        totalWeight: cartItem.product.weight,
        totalPrice: cartItem.product.price
      });
    }
  });

  const n = items.length;
  
  // Limit precision to prevent memory overflow
  const maxWeight = Math.min(Math.floor(weightLimit * 10), 5000);
  const maxBudget = Math.min(Math.floor(budget * 10), 50000);

  // Use space-optimized 2D DP instead of 3D
  return optimizedKnapsack(items, maxBudget, maxWeight);
}

// Space-optimized knapsack using 2D array with budget constraint
function optimizedKnapsack(
  items: KnapsackItem[],
  maxBudget: number,
  maxWeight: number
): KnapsackResult {
  const n = items.length;
  
  // Use rolling array to save memory - only keep current and previous row
  let prev = Array(maxBudget + 1).fill(null).map(() => ({ value: 0, weight: 0, items: [] as number[] }));
  let curr = Array(maxBudget + 1).fill(null).map(() => ({ value: 0, weight: 0, items: [] as number[] }));

  for (let i = 0; i < n; i++) {
    const item = items[i];
    const itemPrice = Math.floor(item.totalPrice * 10);
    const itemWeight = Math.floor(item.totalWeight * 10);
    
    for (let b = 0; b <= maxBudget; b++) {
      // Don't take the item
      curr[b] = { ...prev[b] };
      
      // Take the item if possible
      if (b >= itemPrice && prev[b - itemPrice].weight + itemWeight <= maxWeight) {
        const newValue = prev[b - itemPrice].value + item.totalValue;
        const newWeight = prev[b - itemPrice].weight + itemWeight;
        
        if (newValue > curr[b].value) {
          curr[b] = {
            value: newValue,
            weight: newWeight,
            items: [...prev[b - itemPrice].items, i]
          };
        }
      }
    }
    
    // Swap arrays
    [prev, curr] = [curr, prev];
  }

  // Find the best solution
  let bestSolution = { value: 0, weight: 0, items: [] as number[] };
  for (let b = 0; b <= maxBudget; b++) {
    if (prev[b].value > bestSolution.value) {
      bestSolution = prev[b];
    }
  }

  // Convert back to cart items
  const selectedItems = new Map<number, number>();
  let totalValue = 0;
  let totalWeight = 0;
  let totalPrice = 0;

  bestSolution.items.forEach(itemIndex => {
    const item = items[itemIndex];
    const productId = item.product.id;
    
    selectedItems.set(productId, (selectedItems.get(productId) || 0) + 1);
    totalValue += item.totalValue;
    totalWeight += item.totalWeight;
    totalPrice += item.totalPrice;
  });

  const optimizedItems: CartItem[] = Array.from(selectedItems.entries()).map(([productId, quantity]) => {
    const product = items.find(item => item.product.id === productId)!.product;
    return { product, quantity };
  });

  return {
    items: optimizedItems,
    totalValue,
    totalWeight,
    totalPrice
  };
}

// Greedy algorithm for very large datasets
function greedyOptimize(
  cartItems: CartItem[],
  budget: number,
  weightLimit: number
): KnapsackResult {
  // Create items with value-to-price ratio
  const items: (KnapsackItem & { efficiency: number })[] = [];
  
  cartItems.forEach(cartItem => {
    for (let i = 0; i < cartItem.quantity; i++) {
      const efficiency = cartItem.product.valueScore / cartItem.product.price;
      items.push({
        product: cartItem.product,
        quantity: 1,
        totalValue: cartItem.product.valueScore,
        totalWeight: cartItem.product.weight,
        totalPrice: cartItem.product.price,
        efficiency
      });
    }
  });

  // Sort by efficiency (value per dollar) in descending order
  items.sort((a, b) => b.efficiency - a.efficiency);

  const selectedItems = new Map<number, number>();
  let totalValue = 0;
  let totalWeight = 0;
  let totalPrice = 0;

  // Greedily select items
  for (const item of items) {
    if (totalPrice + item.totalPrice <= budget && 
        totalWeight + item.totalWeight <= weightLimit) {
      
      const productId = item.product.id;
      selectedItems.set(productId, (selectedItems.get(productId) || 0) + 1);
      totalValue += item.totalValue;
      totalWeight += item.totalWeight;
      totalPrice += item.totalPrice;
    }
  }

  const optimizedItems: CartItem[] = Array.from(selectedItems.entries()).map(([productId, quantity]) => {
    const product = cartItems.find(item => item.product.id === productId)!.product;
    return { product, quantity };
  });

  return {
    items: optimizedItems,
    totalValue,
    totalWeight,
    totalPrice
  };
}