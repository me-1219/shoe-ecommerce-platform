import { Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/ui/button';
import { Link } from 'react-router';

export const WishlistPage = () => {
  const { wishlist } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Heart className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your wishlist is empty</h2>
          <p className="text-gray-600 mb-6">Save your favorite items here</p>
          <Link to="/products">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-2">My Wishlist</h1>
        <p className="text-gray-600 mb-8">{wishlist.length} items saved</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};
