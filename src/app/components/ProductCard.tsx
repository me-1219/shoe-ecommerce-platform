import { Heart, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist, addToCart } = useApp();
  const inWishlist = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (product.sizes.length > 0) {
      addToCart(product, product.sizes[0]);
      toast.success('Added to cart');
    }
  };

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </div>
          )}
          
          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:scale-110 transition-transform"
          >
            <Heart
              className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          
          {/* Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 bg-black text-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 hover:scale-110 transition-all"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <div className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            {product.brand}
          </div>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-1">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {/* Stock Status */}
          {product.stock < 10 && (
            <div className="mt-2 text-xs text-orange-600">
              Only {product.stock} left in stock!
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
