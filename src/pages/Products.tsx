import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { categories } from "@/data/categories";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";

const Products = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get("category");
  const subcategoryParam = searchParams.get("subcategory");
  const searchQuery = searchParams.get("search");

  const { data: products = [], isLoading } = useProducts();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>(
    subcategoryParam ? [subcategoryParam] : []
  );
  const [priceRange, setPriceRange] = useState<number[]>([0, 5000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const brands = useMemo(() => {
    return Array.from(new Set(products.map((p) => p.seller)));
  }, [products]);

  // Initialize filters from URL params
  useState(() => {
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam]);
    }
    if (subcategoryParam && !selectedSubcategories.includes(subcategoryParam)) {
      setSelectedSubcategories([subcategoryParam]);
    }
  });

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category (prioritize URL param)
    const categoriesToFilter = categoryParam ? [categoryParam] : selectedCategories;
    if (categoriesToFilter.length > 0) {
      filtered = filtered.filter((p) => categoriesToFilter.includes(p.category));
    }

    // Filter by subcategory (prioritize URL param)
    const subcategoriesToFilter = subcategoryParam ? [subcategoryParam] : selectedSubcategories;
    if (subcategoriesToFilter.length > 0) {
      filtered = filtered.filter((p) => subcategoriesToFilter.includes(p.subcategory));
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Filter by brands
    if (selectedBrands.length > 0) {
      filtered = filtered.filter((p) => selectedBrands.includes(p.seller));
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.seller.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.subcategory.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [products, selectedCategories, selectedSubcategories, priceRange, selectedBrands, searchQuery, categoryParam, subcategoryParam]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${category.id}`}
                checked={categoryParam === category.id || selectedCategories.includes(category.id)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedCategories([...selectedCategories, category.id]);
                  } else {
                    setSelectedCategories(selectedCategories.filter((c) => c !== category.id));
                  }
                }}
              />
              <Label htmlFor={`cat-${category.id}`} className="cursor-pointer">
                {category.name}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Subcategories (show only if a category is selected) */}
      {(categoryParam || selectedCategories.length > 0) && (
        <div>
          <h3 className="font-semibold mb-4">Subcategories</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {categories
              .filter((cat) => categoryParam === cat.id || selectedCategories.includes(cat.id))
              .flatMap((cat) => cat.subcategories)
              .filter((value, index, self) => self.indexOf(value) === index)
              .map((subcategory) => (
                <div key={subcategory} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subcat-${subcategory}`}
                    checked={subcategoryParam === subcategory || selectedSubcategories.includes(subcategory)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedSubcategories([...selectedSubcategories, subcategory]);
                      } else {
                        setSelectedSubcategories(selectedSubcategories.filter((s) => s !== subcategory));
                      }
                    }}
                  />
                  <Label htmlFor={`subcat-${subcategory}`} className="cursor-pointer text-sm">
                    {subcategory}
                  </Label>
                </div>
              ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={5000}
            step={100}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-4">Brands</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {brands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={`brand-${brand}`}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedBrands([...selectedBrands, brand]);
                  } else {
                    setSelectedBrands(selectedBrands.filter((b) => b !== brand));
                  }
                }}
              />
              <Label htmlFor={`brand-${brand}`} className="cursor-pointer">
                {brand}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 border rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Filters</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                  setPriceRange([0, 5000]);
                  setSelectedBrands([]);
                }}
              >
                Clear All
              </Button>
            </div>
            <FilterContent />
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : subcategoryParam
                  ? subcategoryParam
                  : categoryParam
                  ? categories.find((c) => c.id === categoryParam)?.name || "All Products"
                  : "All Products"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
            </div>

            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="outline">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-80">
                <div className="mt-8">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-muted-foreground">No products found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setSelectedCategories([]);
                  setSelectedSubcategories([]);
                  setPriceRange([0, 5000]);
                  setSelectedBrands([]);
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
