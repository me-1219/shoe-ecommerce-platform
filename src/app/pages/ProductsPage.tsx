import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { SlidersHorizontal, X } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { mockProducts } from '../data/mockData';
import { Button } from '../components/ui/button';
import { Slider } from '../components/ui/slider';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '../components/ui/sheet';

export const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [priceRange, setPriceRange] = useState([0, 300]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');

  const categories = ['men', 'women', 'kids'];
  const brands = Array.from(new Set(mockProducts.map(p => p.brand)));

  useEffect(() => {
    let products = [...mockProducts];

    // Category filter
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      products = products.filter(p => p.category === categoryParam);
      setSelectedCategory(categoryParam);
    } else if (selectedCategory) {
      products = products.filter(p => p.category === selectedCategory);
    }

    // Featured filter
    const featuredParam = searchParams.get('featured');
    if (featuredParam === 'true') {
      products = products.filter(p => p.featured);
    }

    // Search filter
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Brand filter
    if (selectedBrands.length > 0) {
      products = products.filter(p => selectedBrands.includes(p.brand));
    }

    // Price filter
    products = products.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Sort
    switch (sortBy) {
      case 'price-low':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        products.sort((a, b) => b.reviews - a.reviews);
        break;
    }

    setFilteredProducts(products);
  }, [searchParams, selectedCategory, selectedBrands, priceRange, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSelectedBrands([]);
    setPriceRange([0, 300]);
    setSortBy('featured');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <h3 className="font-medium mb-3">Category</h3>
        <div className="space-y-2">
          {categories.map(cat => (
            <label key={cat} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => setSelectedCategory(cat)}
                className="text-orange-500 focus:ring-orange-500"
              />
              <span className="capitalize">{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-3">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={300}
          step={10}
          className="mt-2"
        />
      </div>

      {/* Brand Filter */}
      <div>
        <h3 className="font-medium mb-3">Brand</h3>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandToggle(brand)}
                className="text-orange-500 focus:ring-orange-500 rounded"
              />
              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {searchParams.get('category') 
                ? `${searchParams.get('category')?.charAt(0).toUpperCase()}${searchParams.get('category')?.slice(1)}'s Shoes`
                : searchParams.get('featured') 
                ? 'Featured Products'
                : searchParams.get('search')
                ? `Search Results for "${searchParams.get('search')}"`
                : 'All Products'
              }
            </h1>
            <p className="text-gray-600 mt-1">{filteredProducts.length} products found</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline">
                  <SlidersHorizontal className="w-5 h-5 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold">Filters</h2>
                {(selectedCategory || selectedBrands.length > 0) && (
                  <button onClick={clearFilters} className="text-sm text-orange-600 hover:text-orange-700">
                    Clear all
                  </button>
                )}
              </div>
              <FilterContent />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching your criteria</p>
                <Button onClick={clearFilters} className="mt-4 bg-orange-500 hover:bg-orange-600">
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
