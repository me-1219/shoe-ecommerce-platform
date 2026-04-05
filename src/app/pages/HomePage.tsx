import { Link } from 'react-router';
import { ArrowRight, TrendingUp, Shield, Truck } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { Button } from '../components/ui/button';

export const HomePage = () => {
  const featuredProducts = mockProducts.filter(p => p.featured);
  const newArrivals = mockProducts.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
                Spring Collection 2026
              </div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Mulusew Fashion Shoes
              </h1>
              <p className="text-xl text-gray-300 mb-8">
               Quality, comfort, and modern design for every step you take.
              </p>
              <p className="text-lg text-gray-300 mb-8 ml-4">
               📍 Bichena Town
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link to="/products">
                  <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                    Shop Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products?featured=true">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-gray-900">
                    View Collections
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop"
                alt="Hero Shoe"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white text-gray-900 p-6 rounded-xl shadow-xl">
                <div className="text-3xl font-bold text-orange-500">20%</div>
                <div className="text-sm font-medium">OFF</div>
                <div className="text-xs text-gray-600">New Arrivals</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-y">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h3 className="font-medium">Easy Returns</h3>
                <p className="text-sm text-gray-600">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/products?category=men" className="group relative overflow-hidden rounded-2xl h-64">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=400&fit=crop"
                alt="Men's Shoes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">Men's Shoes</h3>
                  <p className="text-white/90 text-sm">Explore Collection →</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=women" className="group relative overflow-hidden rounded-2xl h-64">
              <img
                src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=400&fit=crop"
                alt="Women's Shoes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">Women's Shoes</h3>
                  <p className="text-white/90 text-sm">Explore Collection →</p>
                </div>
              </div>
            </Link>
            <Link to="/products?category=kids" className="group relative overflow-hidden rounded-2xl h-64">
              <img
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=600&h=400&fit=crop"
                alt="Kids' Shoes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                <div>
                  <h3 className="text-white text-2xl font-bold mb-2">Kids' Shoes</h3>
                  <p className="text-white/90 text-sm">Explore Collection →</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-gray-600">Handpicked favorites for you</p>
            </div>
            <Link to="/products?featured=true">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">New Arrivals</h2>
              <p className="text-gray-600">Fresh styles just landed</p>
            </div>
            <Link to="/products">
              <Button variant="outline">
                View All
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Get 20% Off Your First Order
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Sign up today and receive exclusive offers and updates
          </p>
          <Link to="/signup">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Sign Up Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">S</span>
                </div>
                <span className="text-xl font-bold">ShoesHub</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your one-stop shop for premium footwear.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/products" className="block text-gray-400 hover:text-white text-sm">Shop</Link>
                <Link to="/about" className="block text-gray-400 hover:text-white text-sm">About Us</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-white text-sm">Contact</Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Support</h3>
              <div className="space-y-2">
                <Link to="/faq" className="block text-gray-400 hover:text-white text-sm">FAQ</Link>
                <Link to="/shipping" className="block text-gray-400 hover:text-white text-sm">Shipping Info</Link>
                <Link to="/returns" className="block text-gray-400 hover:text-white text-sm">Returns</Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">Contact</h3>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>Email:melakmebit75@gmail.com</p>
                <p>Phone: +251 917 392 1904</p>
                <p>Addis Ababa, Ethiopia</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            © 2026 ShoesHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};
