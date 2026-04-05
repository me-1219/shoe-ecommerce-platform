import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { mockTransactions } from '../../data/mockData';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';

export const AdminPayments = () => {
  const [transactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTransactions = transactions.filter(txn =>
    txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    txn.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const totalRevenue = transactions.filter(t => t.status === 'success').reduce((sum, t) => sum + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-gray-600">Manage and track payment transactions</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-green-600">${totalRevenue}</div>
          <div className="text-sm text-gray-600">Total Revenue</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-yellow-600">${pendingAmount}</div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-blue-600">
            {transactions.filter(t => t.status === 'success').length}
          </div>
          <div className="text-sm text-gray-600">Successful</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-red-600">
            {transactions.filter(t => t.status === 'failed').length}
          </div>
          <div className="text-sm text-gray-600">Failed</div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by transaction ID or order ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Method</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((txn) => (
              <TableRow key={txn.id}>
                <TableCell className="font-medium">{txn.id}</TableCell>
                <TableCell>{txn.orderId}</TableCell>
                <TableCell className="font-bold">${txn.amount}</TableCell>
                <TableCell>{txn.method}</TableCell>
                <TableCell>
                  <Badge className={getStatusColor(txn.status)}>
                    {txn.status.toUpperCase()}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(txn.date).toLocaleDateString()}</TableCell>
                <TableCell>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <Download className="w-4 h-4" />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
