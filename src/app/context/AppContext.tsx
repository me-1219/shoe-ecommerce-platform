import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, Order, User } from '../data/mockData';

interface CartItem {
  product: Product;
  quantity: number;
  size: string;
}

interface AppContextType {
  // User state
  currentUser: User | null;
  isAdmin: boolean;
  login: (email: string, password: string, isAdmin?: boolean) => boolean;
  logout: () => void;
  
  // Cart state
  cart: CartItem[];
  addToCart: (product: Product, size: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  
  // Wishlist state
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Orders state
  orders: Order[];
  addOrder: (order: Order) => void;
  
  // Notifications
  notifications: Array<{ id: string; message: string; type: string; date: string }>;
  addNotification: (message: string, type: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Array<{ id: string; message: string; type: string; date: string }>>([
    {
      id: 'n1',
      message: 'Your order ORD-2026-002 has been shipped!',
      type: 'order',
      date: '2026-03-29',
    },
    {
      id: 'n2',
      message: 'New promotion: Get 20% off with code SPRING2026',
      type: 'promotion',
      date: '2026-04-01',
    },
  ]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedWishlist = localStorage.getItem('wishlist');
    const savedUser = localStorage.getItem('currentUser');
    const savedIsAdmin = localStorage.getItem('isAdmin');
    
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    if (savedUser) setCurrentUser(JSON.parse(savedUser));
    if (savedIsAdmin) setIsAdmin(JSON.parse(savedIsAdmin));
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('isAdmin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  const login = (email: string, password: string, adminLogin = false) => {
    // Mock login - in real app, this would validate against backend
    if (adminLogin) {
      if (email === 'admin@shoes.com' && password === 'admin123') {
        setIsAdmin(true);
        setCurrentUser({
          id: 'admin1',
          name: 'Admin User',
          email: 'admin@shoes.com',
          phone: '+251 90 000 0000',
          role: 'admin',
          status: 'active',
          joinDate: '2025-01-01',
          totalOrders: 0,
          totalSpent: 0,
        });
        return true;
      }
    } else {
      if (password.length >= 6) {
        setIsAdmin(false);
        setCurrentUser({
          id: 'u1',
          name: email.split('@')[0],
          email,
          phone: '+251 91 234 5678',
          role: 'customer',
          status: 'active',
          joinDate: '2025-08-15',
          totalOrders: 2,
          totalSpent: 450,
        });
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    setCart([]);
  };

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, quantity }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.find((p) => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  const addOrder = (order: Order) => {
    setOrders((prev) => [order, ...prev]);
  };

  const addNotification = (message: string, type: string) => {
    const notification = {
      id: `n${Date.now()}`,
      message,
      type,
      date: new Date().toISOString().split('T')[0],
    };
    setNotifications((prev) => [notification, ...prev]);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAdmin,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        orders,
        addOrder,
        notifications,
        addNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
