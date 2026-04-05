import { useState } from 'react';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';
import { mockCoupons } from '../../data/mockData';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export const AdminDiscounts = () => {
  const [coupons] = useState(mockCoupons);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Discounts & Offers</h1>
          <p className="text-gray-600">Manage promotional coupons and discounts</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-5 h-5 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div>
                <Label>Coupon Code</Label>
                <Input placeholder="SUMMER2026" className="uppercase" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Discount Value</Label>
                  <Input type="number" placeholder="20" />
                </div>
                <div>
                  <Label>Discount Type</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Minimum Purchase</Label>
                  <Input type="number" placeholder="100" />
                </div>
                <div>
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Create Coupon
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-orange-600">{coupons.length}</div>
          <div className="text-sm text-gray-600">Total Coupons</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-green-600">
            {coupons.filter(c => c.active).length}
          </div>
          <div className="text-sm text-gray-600">Active Coupons</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-2xl font-bold text-gray-600">
            {coupons.filter(c => !c.active).length}
          </div>
          <div className="text-sm text-gray-600">Expired Coupons</div>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Min. Purchase</TableHead>
              <TableHead>Expiry Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coupons.map((coupon) => (
              <TableRow key={coupon.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-orange-600" />
                    <span className="font-bold text-orange-600">{coupon.code}</span>
                  </div>
                </TableCell>
                <TableCell className="font-bold">
                  {coupon.type === 'percentage' ? `${coupon.discount}%` : `$${coupon.discount}`}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {coupon.type}
                  </Badge>
                </TableCell>
                <TableCell>${coupon.minPurchase}</TableCell>
                <TableCell>{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Badge className={coupon.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}>
                    {coupon.active ? 'ACTIVE' : 'EXPIRED'}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded text-red-600">
                      <Trash2 className="w-4 h-4" />
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
