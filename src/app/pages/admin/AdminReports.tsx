import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { salesData, mockProducts } from '../../data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Download } from 'lucide-react';
import { Button } from '../../components/ui/button';

export const AdminReports = () => {
  const categoryData = [
    { name: 'Men', value: mockProducts.filter(p => p.category === 'men').length },
    { name: 'Women', value: mockProducts.filter(p => p.category === 'women').length },
    { name: 'Kids', value: mockProducts.filter(p => p.category === 'kids').length },
  ];

  const brandData = mockProducts.reduce((acc: any[], product) => {
    const existing = acc.find(item => item.brand === product.brand);
    if (existing) {
      existing.sales += product.reviews;
    } else {
      acc.push({ brand: product.brand, sales: product.reviews });
    }
    return acc;
  }, []).slice(0, 5);

  const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-gray-600">View detailed business insights and metrics</p>
        </div>
        <Button className="bg-orange-500 hover:bg-orange-600">
          <Download className="w-5 h-5 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Total Revenue</div>
            <div className="text-2xl font-bold text-green-600">
              ${salesData.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
            </div>
            <div className="text-sm text-green-600 mt-1">↑ 12.5% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-blue-600">
              {salesData.reduce((sum, day) => sum + day.orders, 0)}
            </div>
            <div className="text-sm text-blue-600 mt-1">↑ 8.2% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Avg. Order Value</div>
            <div className="text-2xl font-bold text-purple-600">
              ${(salesData.reduce((sum, day) => sum + day.sales, 0) / salesData.reduce((sum, day) => sum + day.orders, 0)).toFixed(2)}
            </div>
            <div className="text-sm text-purple-600 mt-1">↑ 4.3% from last week</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-gray-600 mb-1">Conversion Rate</div>
            <div className="text-2xl font-bold text-orange-600">3.2%</div>
            <div className="text-sm text-orange-600 mt-1">↑ 0.5% from last week</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="sales" stroke="#f97316" strokeWidth={2} name="Sales ($)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Brands by Sales</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={brandData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="brand" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="sales" fill="#f97316" />
              </BarChart>
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
                <Bar dataKey="orders" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Performing Products</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockProducts.slice(0, 5).map((product, idx) => (
              <div key={product.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                <div className="text-2xl font-bold text-gray-400 w-8">#{idx + 1}</div>
                <img src={product.image} alt={product.name} className="w-16 h-16 rounded object-cover" />
                <div className="flex-1">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-sm text-gray-600">{product.brand}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-orange-600">${product.price}</div>
                  <div className="text-sm text-gray-600">{product.reviews} sales</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
