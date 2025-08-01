import { Product, Coupon, User } from '../types';

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Basmati Rice (5kg)",
    price: 12.99,
    weight: 5.0,
    valueScore: 9,
    stock: 50,
    category: "Grains",
    image: "https://images.pexels.com/photos/723198/pexels-photo-723198.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium long-grain basmati rice, perfect for biryanis and pilafs",
    perishable: false
  },
  {
    id: 2,
    name: "Whole Milk (1L)",
    price: 3.49,
    weight: 1.03,
    valueScore: 8,
    stock: 30,
    category: "Dairy",
    image: "https://images.pexels.com/photos/236010/pexels-photo-236010.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh whole milk, rich in calcium and protein",
    perishable: true,
    expiryDays: 7
  },
  {
    id: 3,
    name: "Fresh Bananas (1kg)",
    price: 2.99,
    weight: 1.0,
    valueScore: 7,
    stock: 40,
    category: "Fruits",
    image: "https://images.pexels.com/photos/61127/pexels-photo-61127.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Sweet, ripe bananas packed with potassium and natural energy",
    perishable: true,
    expiryDays: 5
  },
  {
    id: 4,
    name: "Chicken Breast (1kg)",
    price: 8.99,
    weight: 1.0,
    valueScore: 9,
    stock: 25,
    category: "Meat",
    image: "https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh, lean chicken breast - high protein, low fat",
    perishable: true,
    expiryDays: 3
  },
  {
    id: 5,
    name: "Whole Wheat Bread",
    price: 2.49,
    weight: 0.8,
    valueScore: 6,
    stock: 35,
    category: "Bakery",
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Nutritious whole wheat bread, perfect for sandwiches",
    perishable: true,
    expiryDays: 5
  },
  {
    id: 6,
    name: "Greek Yogurt (500g)",
    price: 4.99,
    weight: 0.5,
    valueScore: 8,
    stock: 20,
    category: "Dairy",
    image: "https://images.pexels.com/photos/1435735/pexels-photo-1435735.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Creamy Greek yogurt, high in protein and probiotics",
    perishable: true,
    expiryDays: 14
  },
  {
    id: 7,
    name: "Fresh Spinach (500g)",
    price: 3.99,
    weight: 0.5,
    valueScore: 9,
    stock: 15,
    category: "Vegetables",
    image: "https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh baby spinach leaves, rich in iron and vitamins",
    perishable: true,
    expiryDays: 4
  },
  {
    id: 8,
    name: "Salmon Fillet (500g)",
    price: 15.99,
    weight: 0.5,
    valueScore: 10,
    stock: 12,
    category: "Seafood",
    image: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh Atlantic salmon, rich in omega-3 fatty acids",
    perishable: true,
    expiryDays: 2
  },
  {
    id: 9,
    name: "Almonds (500g)",
    price: 12.99,
    weight: 0.5,
    valueScore: 9,
    stock: 25,
    category: "Nuts",
    image: "https://images.pexels.com/photos/1295572/pexels-photo-1295572.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium raw almonds, packed with healthy fats and protein",
    perishable: false
  },
  {
    id: 10,
    name: "Olive Oil (500ml)",
    price: 8.99,
    weight: 0.46,
    valueScore: 8,
    stock: 30,
    category: "Oils",
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=400",
    description: "Extra virgin olive oil, perfect for cooking and salads",
    perishable: false
  },
  {
    id: 11,
    name: "Tomatoes (1kg)",
    price: 4.49,
    weight: 1.0,
    valueScore: 7,
    stock: 35,
    category: "Vegetables",
    image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh, ripe tomatoes perfect for salads and cooking",
    perishable: true,
    expiryDays: 6
  },
  {
    id: 12,
    name: "Eggs (12 count)",
    price: 3.99,
    weight: 0.72,
    valueScore: 8,
    stock: 40,
    category: "Dairy",
    image: "https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Fresh free-range eggs, excellent source of protein",
    perishable: true,
    expiryDays: 21
  },
  {
    id: 13,
    name: "Quinoa (1kg)",
    price: 9.99,
    weight: 1.0,
    valueScore: 9,
    stock: 18,
    category: "Grains",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Organic quinoa, complete protein and gluten-free superfood",
    perishable: false
  },
  {
    id: 14,
    name: "Avocados (4 count)",
    price: 5.99,
    weight: 0.8,
    valueScore: 8,
    stock: 22,
    category: "Fruits",
    image: "https://images.pexels.com/photos/557659/pexels-photo-557659.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Ripe avocados, rich in healthy monounsaturated fats",
    perishable: true,
    expiryDays: 4
  },
  {
    id: 15,
    name: "Dark Chocolate (200g)",
    price: 6.99,
    weight: 0.2,
    valueScore: 7,
    stock: 28,
    category: "Snacks",
    image: "https://images.pexels.com/photos/65882/chocolate-dark-coffee-confiserie-65882.jpeg?auto=compress&cs=tinysrgb&w=400",
    description: "Premium 70% dark chocolate, rich in antioxidants",
    perishable: false
  }
];

export const mockCoupons: Coupon[] = [
  {
    id: 1,
    code: "SAVE20",
    minCartValue: 100,
    discountPercent: 20,
    maxDiscount: 50,
    description: "20% off on orders over $100"
  },
  {
    id: 2,
    code: "MEGA30",
    minCartValue: 200,
    discountPercent: 30,
    maxDiscount: 80,
    description: "30% off on orders over $200"
  },
  {
    id: 3,
    code: "FLAT15",
    minCartValue: 75,
    discountPercent: 15,
    maxDiscount: 25,
    description: "15% off on orders over $75"
  },
  {
    id: 4,
    code: "SUPER40",
    minCartValue: 300,
    discountPercent: 40,
    maxDiscount: 120,
    description: "40% off on orders over $300"
  },
  {
    id: 5,
    code: "WELCOME10",
    minCartValue: 50,
    discountPercent: 10,
    maxDiscount: 15,
    description: "10% off on orders over $50"
  }
];

export const mockUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  role: "user"
};