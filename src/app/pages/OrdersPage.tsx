import { Link } from 'react-router';
import { Package, ChevronRight } from 'lucide-react';
import { mockOrders } from '../data/mockData';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';

export const OrdersPage = () => {
  const orders = mockOrders;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">No orders yet</h2>
          <p className="text-gray-600 mb-6">Start shopping to see your orders here</p>
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
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-lg">Order {order.id}</h3>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.toUpperCase()}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Link to={`/order/${order.id}`}>
                  <Button variant="outline" size="sm">
                    View Details
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Items</h4>
                  <div className="space-y-3">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex gap-3">
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <div className="font-medium text-sm">{item.productName}</div>
                          <div className="text-xs text-gray-600">
                            Size: {item.size} × {item.quantity}
                          </div>
                          <div className="text-sm font-medium">${item.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Delivery Address</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">{order.shippingAddress.name}</p>
                    <p>{order.shippingAddress.phone}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.zipCode}</p>
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-gray-600">Payment Method</span>
                      <span className="text-sm font-medium">{order.paymentMethod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Total Amount</span>
                      <span className="font-bold text-orange-600">${order.total}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
