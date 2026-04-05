import { useState } from 'react';
import { useParams, Link } from 'react-router';
import { Star, Heart, ShoppingCart, Truck, Shield, RotateCcw, ChevronLeft } from 'lucide-react';
import { mockProducts, mockReviews } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export const ProductDetailPage = () => {
  const { id } = useParams();
  const product = mockProducts.find(p => p.id === id);
  const reviews = mockReviews.filter(r => r.productId === id);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useApp();
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Product not found</h2>
          <Link to="/products">
            <Button className="bg-orange-500 hover:bg-orange-600">Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    toast.success('Added to cart!');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-orange-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-orange-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Images */}
          <div>
            <div className="bg-white rounded-xl overflow-hidden shadow-sm mb-4">
              <div className="aspect-square">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-white rounded-lg overflow-hidden ${
                    selectedImage === idx ? 'ring-2 ring-orange-500' : ''
                  }`}
                >
                  <img src={img} alt="" className="w-full aspect-square object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-4">
              <span className="text-sm text-orange-600 font-medium uppercase tracking-wide">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(product.rating)
                        ? 'fill-orange-400 text-orange-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                  <span className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-sm font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </>
              )}
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Select Size</label>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 border-2 rounded-lg font-medium transition-all ${
                      selectedSize === size
                        ? 'border-orange-500 bg-orange-50 text-orange-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-3">Quantity</label>
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 border-x">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
                <span className="text-sm text-gray-600">
                  {product.stock} items available
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 h-12"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                onClick={handleWishlistToggle}
                variant="outline"
                className="h-12 px-6"
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
            </div>

            {/* Features */}
            <div className="border-t pt-6 space-y-4">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Free Delivery</div>
                  <div className="text-sm text-gray-600">On orders over $100</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Secure Payment</div>
                  <div className="text-sm text-gray-600">100% secure transactions</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-gray-400" />
                <div>
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-sm text-gray-600">30-day return policy</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="description" className="bg-white rounded-xl p-6 shadow-sm">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({reviews.length})</TabsTrigger>
            <TabsTrigger value="shipping">Shipping Info</TabsTrigger>
          </TabsList>
          
          <TabsContent value="description" className="mt-6">
            <div className="prose max-w-none">
              <p className="text-gray-600">{product.description}</p>
              <h3 className="text-lg font-medium mt-6 mb-3">Features</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Premium quality materials</li>
                <li>Cushioned insole for all-day comfort</li>
                <li>Durable rubber outsole</li>
                <li>Breathable construction</li>
                <li>Available in multiple sizes</li>
              </ul>
            </div>
          </TabsContent>
          
          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              {reviews.map(review => (
                <div key={review.id} className="border-b pb-6 last:border-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-orange-400 text-orange-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-600">{review.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-gray-500 text-center py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="shipping" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-lg font-medium mb-3">Shipping Information</h3>
              <p className="text-gray-600 mb-4">We offer free shipping on all orders over $100.</p>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                <li>Standard Delivery: 3-5 business days</li>
                <li>Express Delivery: 1-2 business days</li>
                <li>International Shipping available</li>
                <li>Track your order in real-time</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
