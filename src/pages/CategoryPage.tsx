import { useParams, useNavigate } from "react-router-dom";
import { categories } from "@/data/categories";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CategoryPage = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  const category = categories.find((c) => c.id === categoryId);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Category not found</h1>
        <Button onClick={() => navigate("/")}>Back to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        <p className="text-lg text-muted-foreground">
          Explore our collection of {category.subcategories.length} subcategories
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {category.subcategories.map((subcategory) => (
          <Button
            key={subcategory}
            variant="outline"
            className="h-auto py-8 px-4 flex flex-col items-center justify-center gap-3 hover:border-primary hover:bg-muted/50 transition-all"
            onClick={() =>
              navigate(`/products?category=${categoryId}&subcategory=${encodeURIComponent(subcategory)}`)
            }
          >
            <span className="text-lg font-semibold text-center">{subcategory}</span>
            <ArrowRight className="h-5 w-5" />
          </Button>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button
          size="lg"
          onClick={() => navigate(`/products?category=${categoryId}`)}
          className="min-w-[200px]"
        >
          View All {category.name} Products
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
