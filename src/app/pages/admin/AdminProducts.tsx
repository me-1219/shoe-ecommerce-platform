import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import { mockProducts } from '../../data/mockData';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../../components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../components/ui/dialog';
import { Label } from '../../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

export const AdminProducts = () => {
  const [products] = useState(mockProducts);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-gray-600">Manage your product inventory</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Plus className="w-5 h-5 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <form className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Product Name</Label>
                  <Input placeholder="Nike Air Max 270" />
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input placeholder="Nike" />
                </div>
                <div>
                  <Label>Price</Label>
                  <Input type="number" placeholder="150" />
                </div>
                <div>
                  <Label>Original Price</Label>
                  <Input type="number" placeholder="200" />
                </div>
                <div>
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="men">Men</SelectItem>
                      <SelectItem value="women">Women</SelectItem>
                      <SelectItem value="kids">Kids</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stock</Label>
                  <Input type="number" placeholder="50" />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <textarea
                  className="w-full px-3 py-2 border rounded-lg resize-none"
                  rows={3}
                  placeholder="Product description..."
                />
              </div>
              <div>
                <Label>Sizes (comma separated)</Label>
                <Input placeholder="7, 8, 9, 10, 11" />
              </div>
              <div>
                <Label>Product Images</Label>
                <Input type="file" multiple accept="image/*" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                  Add Product
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-gray-600">{product.reviews} reviews</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="capitalize">
                    {product.category}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="font-medium">${product.price}</div>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${product.originalPrice}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <Badge className={product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                    {product.stock}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <span className="text-orange-500">★</span>
                    <span>{product.rating}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
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
