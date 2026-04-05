import { Link, useNavigate } from 'react-router';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

export const CartPage = () => {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useApp();
  const navigate = useNavigate();

  const shipping = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started</p>
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
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={`${item.product.id}-${item.size}`}
                className="bg-white rounded-xl p-6 shadow-sm flex gap-6"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{item.product.name}</h3>
                      <p className="text-sm text-gray-600">{item.product.brand}</p>
                    </div>
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success('Removed from cart');
                      }}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-sm text-gray-600">Size: {item.size}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-6 py-2 border-x">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div className="text-sm text-gray-600">
                        ${item.product.price} each
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {cartTotal < 100 && (
                  <div className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                    Add ${(100 - cartTotal).toFixed(2)} more for free shipping!
                  </div>
                )}
                <div className="border-t pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-orange-500 hover:bg-orange-600 mb-4"
              >
                Proceed to Checkout
              </Button>

              <Link to="/products">
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>

              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">We Accept</h3>
                <div className="flex gap-2">
                  <div className="px-3 py-2 border rounded text-sm">Telebirr</div>
                  <div className="px-3 py-2 border rounded text-sm">Cash</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
