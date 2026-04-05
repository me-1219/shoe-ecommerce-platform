import { useState } from 'react';
import { useNavigate } from 'react-router';
import { CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import { Order } from '../data/mockData';

export const CheckoutPage = () => {
  const { cart, cartTotal, clearCart, currentUser, addOrder, addNotification } = useApp();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'telebirr',
  });

  const shipping = cartTotal > 100 ? 0 : 10;
  const total = cartTotal + shipping;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const order: Order = {
      id: `ORD-2026-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      userId: currentUser?.id || 'guest',
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.image,
        quantity: item.quantity,
        size: item.size,
        price: item.product.price,
      })),
      total,
      status: 'pending',
      paymentMethod: formData.paymentMethod === 'telebirr' ? 'Telebirr' : 'Cash on Delivery',
      shippingAddress: {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
      },
      createdAt: new Date().toISOString().split('T')[0],
    };

    addOrder(order);
    addNotification(`Your order ${order.id} has been placed successfully!`, 'order');
    clearCart();
    toast.success('Order placed successfully!');
    navigate(`/order-success/${order.id}`);
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping & Payment Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Shipping Address</h2>
                
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+251 91 234 5678"
                    />
                  </div>
                  
                  <div className="sm:col-span-2">
                    <Label htmlFor="address">Street Address</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="123 Main Street, Apt 4B"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Addis Ababa"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleChange}
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="telebirr"
                      checked={formData.paymentMethod === 'telebirr'}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <CreditCard className="w-6 h-6 text-gray-600" />
                    <div className="flex-1">
                      <div className="font-medium">Telebirr</div>
                      <div className="text-sm text-gray-600">Pay with Telebirr mobile payment</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={handleChange}
                      className="text-orange-500 focus:ring-orange-500"
                    />
                    <div className="w-6 h-6 text-gray-600">💵</div>
                    <div className="flex-1">
                      <div className="font-medium">Cash on Delivery</div>
                      <div className="text-sm text-gray-600">Pay when you receive your order</div>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div>
              <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {cart.map(item => (
                    <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm">{item.product.name}</div>
                        <div className="text-xs text-gray-600">Size: {item.size} × {item.quantity}</div>
                        <div className="text-sm font-medium">${(item.product.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold pt-3 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
