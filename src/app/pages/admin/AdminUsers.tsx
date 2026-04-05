import { useState } from 'react';
import { Search, UserX, Eye } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export const AdminUsers = () => {
  const [users] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Users</h1>
        <p className="text-gray-600">Manage customer accounts</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{users.length}</div>
          <div className="text-sm text-gray-600">Total Users</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {users.filter(u => u.status === 'active').length}
          </div>
          <div className="text-sm text-gray-600">Active Users</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-red-600">
            {users.filter(u => u.status === 'blocked').length}
          </div>
          <div className="text-sm text-gray-600">Blocked Users</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {users.reduce((sum, u) => sum + u.totalOrders, 0)}
          </div>
          <div className="text-sm text-gray-600">Total Orders</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-medium">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>
                  <Badge className={user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}>
                    {user.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                <TableCell>{user.totalOrders}</TableCell>
                <TableCell className="font-medium">${user.totalSpent}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded text-red-600">
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
