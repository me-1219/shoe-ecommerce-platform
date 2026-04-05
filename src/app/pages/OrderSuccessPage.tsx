import { Link, useParams } from 'react-router';
import { CheckCircle, Package } from 'lucide-react';
import { Button } from '../components/ui/button';

export const OrderSuccessPage = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-12 h-12 text-green-600" />
        </div>
        
        <h1 className="text-2xl font-bold mb-2">Order Placed Successfully!</h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="text-sm text-gray-600 mb-1">Order ID</div>
          <div className="text-lg font-bold text-orange-600">{orderId}</div>
        </div>
        
        <p className="text-sm text-gray-600 mb-8">
          A confirmation email has been sent to your email address.
          You can track your order status in your orders page.
        </p>
        
        <div className="space-y-3">
          <Link to="/orders" className="block">
            <Button className="w-full bg-orange-500 hover:bg-orange-600">
              <Package className="w-5 h-5 mr-2" />
              View Order Status
            </Button>
          </Link>
          
          <Link to="/products" className="block">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
