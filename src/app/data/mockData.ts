// Mock data for the e-commerce application

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: 'men' | 'women' | 'kids';
  brand: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  sizes: string[];
  stock: number;
  description: string;
  featured?: boolean;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Order {
  id: string;
  userId: string;
  items: {
    productId: string;
    productName: string;
    productImage: string;
    quantity: number;
    size: string;
    price: number;
  }[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  status: 'active' | 'blocked';
  joinDate: string;
  totalOrders: number;
  totalSpent: number;
}

export interface Transaction {
  id: string;
  orderId: string;
  amount: number;
  method: string;
  status: 'success' | 'failed' | 'refunded' | 'pending';
  date: string;
}

export interface Coupon {
  id: string;
  code: string;
  discount: number;
  type: 'percentage' | 'fixed';
  expiryDate: string;
  minPurchase: number;
  active: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 200,
    category: 'men',
    brand: 'Nike',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    ],
    rating: 4.5,
    reviews: 128,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    stock: 45,
    description: 'The Nike Air Max 270 delivers visible cushioning under every step. With its sleek design and comfortable fit, this shoe is perfect for everyday wear.',
    featured: true,
  },
  {
    id: '2',
    name: 'Adidas Ultraboost 22',
    price: 180,
    category: 'men',
    brand: 'Adidas',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&h=800&fit=crop',
      'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=800&h=800&fit=crop',
    ],
    rating: 4.8,
    reviews: 256,
    sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    stock: 32,
    description: 'Experience endless energy with the Adidas Ultraboost 22. Featuring responsive cushioning and a breathable upper, these shoes are built for performance.',
    featured: true,
  },
  {
    id: '3',
    name: 'Puma RS-X',
    price: 110,
    originalPrice: 140,
    category: 'women',
    brand: 'Puma',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&h=800&fit=crop',
    ],
    rating: 4.3,
    reviews: 87,
    sizes: ['6', '7', '8', '9', '10'],
    stock: 28,
    description: 'Bold and colorful, the Puma RS-X brings retro style to modern streetwear. Comfortable and eye-catching.',
  },
  {
    id: '4',
    name: 'New Balance 574',
    price: 90,
    category: 'men',
    brand: 'New Balance',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&h=800&fit=crop',
    ],
    rating: 4.6,
    reviews: 342,
    sizes: ['7', '8', '9', '10', '11'],
    stock: 56,
    description: 'A classic icon. The New Balance 574 combines heritage style with modern comfort for all-day wear.',
    featured: true,
  },
  {
    id: '5',
    name: 'Converse Chuck Taylor',
    price: 65,
    category: 'women',
    brand: 'Converse',
    image: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=800&h=800&fit=crop',
    ],
    rating: 4.7,
    reviews: 521,
    sizes: ['5', '6', '7', '8', '9', '10'],
    stock: 72,
    description: 'The timeless Converse Chuck Taylor All Star. A versatile classic that never goes out of style.',
  },
  {
    id: '6',
    name: 'Vans Old Skool',
    price: 70,
    category: 'kids',
    brand: 'Vans',
    image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&h=800&fit=crop',
    ],
    rating: 4.5,
    reviews: 198,
    sizes: ['1', '2', '3', '4', '5'],
    stock: 41,
    description: 'Kids love the classic Vans Old Skool. Durable, comfortable, and perfect for active play.',
  },
  {
    id: '7',
    name: 'Reebok Club C',
    price: 85,
    category: 'women',
    brand: 'Reebok',
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800&h=800&fit=crop',
    ],
    rating: 4.4,
    reviews: 156,
    sizes: ['6', '7', '8', '9', '10'],
    stock: 38,
    description: 'Clean and minimal, the Reebok Club C is a tennis-inspired sneaker with timeless appeal.',
  },
  {
    id: '8',
    name: 'Jordan 1 Retro High',
    price: 170,
    originalPrice: 200,
    category: 'men',
    brand: 'Jordan',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800&h=800&fit=crop',
    ],
    rating: 4.9,
    reviews: 892,
        sizes: ['36', '37', '38', '39', '40', '41', '42', '43', '44'],
    stock: 15,
    description: 'The legendary Jordan 1 Retro High. A basketball icon that transcends sport and culture.',
    featured: true,
  },
  {
    id: '9',
    name: 'Asics Gel-Kayano',
    price: 160,
    category: 'men',
    brand: 'Asics',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&h=800&fit=crop',
    ],
    rating: 4.7,
    reviews: 234,
    sizes: ['7', '8', '9', '10', '11'],
    stock: 29,
    description: 'Premium stability and cushioning for long-distance runners. The Asics Gel-Kayano delivers exceptional support.',
  },
  {
    id: '10',
    name: 'Under Armour HOVR',
    price: 140,
    category: 'women',
    brand: 'Under Armour',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800&h=800&fit=crop',
    ],
    rating: 4.6,
    reviews: 167,
    sizes: ['6', '7', '8', '9', '10'],
    stock: 34,
    description: 'Zero gravity feel. The Under Armour HOVR provides a perfect balance of flexibility and cushioning.',
  },
  {
    id: '11',
    name: 'Skechers D\'Lites',
    price: 75,
    category: 'kids',
    brand: 'Skechers',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&h=800&fit=crop',
    ],
    rating: 4.5,
    reviews: 145,
    sizes: ['1', '2', '3', '4', '5', '6'],
    stock: 48,
    description: 'Fun and chunky, Skechers D\'Lites are comfortable and stylish for active kids.',
  },
  {
    id: '12',
    name: 'Fila Disruptor',
    price: 80,
    category: 'women',
    brand: 'Fila',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&h=800&fit=crop',
    ],
    rating: 4.4,
    reviews: 278,
    sizes: ['6', '7', '8', '9', '10'],
    stock: 51,
    description: 'Bold and chunky platform design. The Fila Disruptor makes a statement wherever you go.',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'John Doe',
    rating: 5,
    comment: 'Amazing shoes! Very comfortable and stylish. Highly recommend!',
    date: '2026-03-15',
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Sarah Smith',
    rating: 4,
    comment: 'Great quality but runs a bit small. Order half size up.',
    date: '2026-03-20',
  },
  {
    id: 'r3',
    productId: '2',
    userId: 'u3',
    userName: 'Mike Johnson',
    rating: 5,
    comment: 'Best running shoes I\'ve ever owned. Worth every penny!',
    date: '2026-03-25',
  },
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-2026-001',
    userId: 'u1',
    items: [
      {
        productId: '1',
        productName: 'Nike Air Max 270',
        productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=200&fit=crop',
        quantity: 1,
        size: '9',
        price: 150,
      },
      {
        productId: '5',
        productName: 'Converse Chuck Taylor',
        productImage: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=200&h=200&fit=crop',
        quantity: 2,
        size: '8',
        price: 65,
      },
    ],
    total: 280,
    status: 'delivered',
    paymentMethod: 'Telebirr',
    shippingAddress: {
      name: 'John Doe',
      phone: '+251 91 234 5678',
      address: '123 Main Street, Apt 4B',
      city: 'Addis Ababa',
      zipCode: '1000',
    },
    createdAt: '2026-03-01',
  },
  {
    id: 'ORD-2026-002',
    userId: 'u1',
    items: [
      {
        productId: '8',
        productName: 'Jordan 1 Retro High',
        productImage: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=200&h=200&fit=crop',
        quantity: 1,
        size: '10',
        price: 170,
      },
    ],
    total: 170,
    status: 'shipped',
    paymentMethod: 'Cash on Delivery',
    shippingAddress: {
      name: 'John Doe',
      phone: '+251 91 234 5678',
      address: '123 Main Street, Apt 4B',
      city: 'Addis Ababa',
      zipCode: '1000',
    },
    createdAt: '2026-03-28',
  },
  {
    id: 'ORD-2026-003',
    userId: 'u2',
    items: [
      {
        productId: '2',
        productName: 'Adidas Ultraboost 22',
        productImage: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=200&h=200&fit=crop',
        quantity: 1,
        size: '9',
        price: 180,
      },
    ],
    total: 180,
    status: 'processing',
    paymentMethod: 'Telebirr',
    shippingAddress: {
      name: 'Sarah Smith',
      phone: '+251 92 345 6789',
      address: '456 Oak Avenue',
      city: 'Addis Ababa',
      zipCode: '1001',
    },
    createdAt: '2026-04-02',
  },
];

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+251 91 234 5678',
    role: 'customer',
    status: 'active',
    joinDate: '2025-08-15',
    totalOrders: 12,
    totalSpent: 1450,
  },
  {
    id: 'u2',
    name: 'Sarah Smith',
    email: 'sarah.smith@example.com',
    phone: '+251 92 345 6789',
    role: 'customer',
    status: 'active',
    joinDate: '2025-10-22',
    totalOrders: 8,
    totalSpent: 980,
  },
  {
    id: 'u3',
    name: 'Mike Johnson',
    email: 'mike.j@example.com',
    phone: '+251 93 456 7890',
    role: 'customer',
    status: 'active',
    joinDate: '2026-01-10',
    totalOrders: 3,
    totalSpent: 420,
  },
  {
    id: 'u4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    phone: '+251 94 567 8901',
    role: 'customer',
    status: 'blocked',
    joinDate: '2025-12-05',
    totalOrders: 1,
    totalSpent: 75,
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-001',
    orderId: 'ORD-2026-001',
    amount: 280,
    method: 'Telebirr',
    status: 'success',
    date: '2026-03-01',
  },
  {
    id: 'TXN-002',
    orderId: 'ORD-2026-002',
    amount: 170,
    method: 'Cash on Delivery',
    status: 'pending',
    date: '2026-03-28',
  },
  {
    id: 'TXN-003',
    orderId: 'ORD-2026-003',
    amount: 180,
    method: 'Telebirr',
    status: 'success',
    date: '2026-04-02',
  },
];

export const mockCoupons: Coupon[] = [
  {
    id: 'c1',
    code: 'SPRING2026',
    discount: 20,
    type: 'percentage',
    expiryDate: '2026-06-30',
    minPurchase: 100,
    active: true,
  },
  {
    id: 'c2',
    code: 'NEWUSER50',
    discount: 50,
    type: 'fixed',
    expiryDate: '2026-12-31',
    minPurchase: 150,
    active: true,
  },
  {
    id: 'c3',
    code: 'WINTER2025',
    discount: 15,
    type: 'percentage',
    expiryDate: '2026-03-31',
    minPurchase: 80,
    active: false,
  },
];

export const salesData = [
  { date: 'Mar 30', sales: 4200, orders: 28 },
  { date: 'Mar 31', sales: 3800, orders: 24 },
  { date: 'Apr 1', sales: 5100, orders: 35 },
  { date: 'Apr 2', sales: 4600, orders: 31 },
  { date: 'Apr 3', sales: 5900, orders: 42 },
  { date: 'Apr 4', sales: 6200, orders: 45 },
  { date: 'Apr 5', sales: 5500, orders: 38 },
];
