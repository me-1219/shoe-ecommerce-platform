import { useParams, Link } from 'react-router';
import { ChevronLeft, Package, Truck, CheckCircle, Clock } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const OrderDetailPage = () => {
  const { orderId } = useParams();
  const order = mockOrders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Order not found</h2>
          <Link to="/orders">
            <Button className="bg-orange-500 hover:bg-orange-600">
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const statusSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock, completed: true },
    { status: 'processing', label: 'Processing', icon: Package, completed: order.status !== 'pending' },
    { status: 'shipped', label: 'Shipped', icon: Truck, completed: order.status === 'shipped' || order.status === 'delivered' },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle, completed: order.status === 'delivered' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/orders" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-orange-600 mb-6">
          <ChevronLeft className="w-4 h-4" />
          Back to Orders
        </Link>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-2">Order {order.id}</h1>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>
            <Badge className={getStatusColor(order.status)}>
              {order.status.toUpperCase()}
            </Badge>
          </div>

          {/* Order Tracking Timeline */}
          <div className="mb-8">
            <h2 className="font-medium mb-6">Order Status</h2>
            <div className="relative">
              {/* Progress Line */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                <div
                  className="h-full bg-orange-500 transition-all duration-500"
                  style={{
                    width: `${(statusSteps.filter(s => s.completed).length - 1) * 33.33}%`
                  }}
                />
              </div>

              {/* Steps */}
              <div className="relative grid grid-cols-4 gap-4">
                {statusSteps.map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`
                      w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors
                      ${step.completed ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-400'}
                    `}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div className="text-center">
                      <div className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                        {step.label}
                      </div>
                      {step.completed && (
                        <div className="text-xs text-gray-500 mt-1">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="font-medium mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-4 pb-4 border-b last:border-0">
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.productName}</h3>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${item.price * item.quantity}</div>
                    <div className="text-sm text-gray-600">${item.price} each</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${order.total - 10}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-medium">$10</span>
            </div>
            <div className="flex justify-between text-lg font-bold pt-3 border-t">
              <span>Total</span>
              <span className="text-orange-600">${order.total}</span>
            </div>
          </div>
        </div>

        {/* Delivery Details */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-medium mb-4">Delivery Address</h2>
            <div className="text-gray-600 space-y-1">
              <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
              <p>{order.shippingAddress.phone}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="font-medium mb-4">Payment Information</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <Badge className="bg-green-100 text-green-700">PAID</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600">
            Download Invoice
          </Button>
          {order.status === 'delivered' && (
            <Button variant="outline">
              Leave a Review
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
