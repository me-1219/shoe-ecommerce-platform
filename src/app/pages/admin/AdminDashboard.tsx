import { ShoppingCart, Users, DollarSign, Package, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { salesData, mockProducts, mockOrders, mockUsers } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export const AdminDashboard = () => {
  const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = mockOrders.length;
  const totalUsers = mockUsers.length;
  const topProducts = mockProducts.slice(0, 5);

  const stats = [
    {
      title: 'Total Sales',
      value: `$${totalSales.toLocaleString()}`,
      change: '+12.5%',
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      trend: 'up',
    },
    {
      title: 'Total Orders',
      value: totalOrders,
      change: '+8.2%',
      icon: ShoppingCart,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      trend: 'up',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      change: '+15.3%',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      trend: 'up',
    },
    {
      title: 'Total Products',
      value: mockProducts.length,
      change: '+2.1%',
      icon: Package,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      trend: 'up',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                    <span className={`text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-600">vs last week</span>
                  </div>
                </div>
                <div className={`${stat.bgColor} ${stat.color} w-12 h-12 rounded-full flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Orders Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="orders" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders & Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockOrders.slice(0, 5).map(order => (
                <div key={order.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <div className="font-medium">{order.id}</div>
                    <div className="text-sm text-gray-600">{order.shippingAddress.name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${order.total}</div>
                    <div className={`text-sm ${
                      order.status === 'delivered' ? 'text-green-600' :
                      order.status === 'shipped' ? 'text-blue-600' :
                      order.status === 'processing' ? 'text-yellow-600' :
                      'text-gray-600'
                    }`}>
                      {order.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map(product => (
                <div key={product.id} className="flex items-center gap-4 py-3 border-b last:border-0">
                  <img src={product.image} alt={product.name} className="w-12 h-12 rounded object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-600">{product.brand}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${product.price}</div>
                    <div className="text-sm text-gray-600">{product.reviews} sold</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
