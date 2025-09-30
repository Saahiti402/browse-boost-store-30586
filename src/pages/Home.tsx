import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { categories } from "@/data/categories";
import { mockProducts } from "@/data/mockProducts";
import ProductCard from "@/components/ProductCard";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const featuredProducts = mockProducts.slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&q=80"
            alt="Fashion Hero"
            className="h-full w-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Fashion That Defines You
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              Discover the latest trends in fashion. Shop from thousands of products across categories.
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300"
              asChild
            >
              <Link to="/products">
                Shop Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Shop By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.id}`}
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <h3 className="text-white font-bold text-lg p-4 w-full text-center">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-16 bg-muted/30">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl md:text-4xl font-bold">Trending Now</h2>
          <Button variant="ghost" asChild>
            <Link to="/products">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="container mx-auto px-4 py-16">
        <div className="relative h-[400px] rounded-2xl overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=1920&q=80"
            alt="Sale Banner"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">Big Fashion Sale</h2>
              <p className="text-xl md:text-2xl mb-8">Up to 60% off on selected items</p>
              <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                <Link to="/products">Shop Sale</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
