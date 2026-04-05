import { useState } from 'react';
import { User, Mail, Phone, MapPin, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';

export const ProfilePage = () => {
  const { currentUser } = useApp();
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: '',
    city: '',
    zipCode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="md:col-span-1">
            <CardContent className="p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-3xl font-bold">
                    {currentUser?.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h3 className="text-xl font-bold">{currentUser?.name}</h3>
                <p className="text-gray-600">{currentUser?.email}</p>
                <div className="mt-4 pt-4 border-t">
                  <div className="text-sm text-gray-600 mb-1">Member Since</div>
                  <div className="font-medium">{currentUser?.joinDate}</div>
                </div>
                <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      {currentUser?.totalOrders}
                    </div>
                    <div className="text-sm text-gray-600">Orders</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-orange-600">
                      ${currentUser?.totalSpent}
                    </div>
                    <div className="text-sm text-gray-600">Spent</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Edit Profile Form */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative mt-1">
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="pl-10"
                      />
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="relative mt-1">
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10"
                      />
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <div className="relative mt-1">
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="pl-10"
                      />
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="city">City</Label>
                    <div className="relative mt-1">
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="pl-10"
                      />
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="zipCode">Zip Code</Label>
                    <Input
                      id="zipCode"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600">
                    <Save className="w-5 h-5 mr-2" />
                    Save Changes
                  </Button>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
