import { Heart, Star } from "lucide-react";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { useCart } from "@/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToWishlist, isInWishlist, removeFromWishlist } = useCart();
  const navigate = useNavigate();
  const inWishlist = isInWishlist(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg border-border"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-muted">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <Button
          variant="ghost"
          size="icon"
          className={`absolute top-2 right-2 rounded-full bg-background/80 backdrop-blur-sm hover:bg-background ${
            inWishlist ? "text-accent" : ""
          }`}
          onClick={handleWishlist}
        >
          <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
        </Button>
        {product.discount > 0 && (
          <div className="absolute top-2 left-2 bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{product.seller}</p>
        <div className="flex items-center gap-2 mb-2">
          <span className="font-bold text-lg">₹{product.price}</span>
          <span className="text-sm text-muted-foreground line-through">₹{product.mrp}</span>
          <span className="text-xs text-accent font-semibold">({product.discount}% OFF)</span>
        </div>
        {product.rating > 0 && (
          <div className="flex items-center gap-1 text-xs">
            <div className="flex items-center gap-1 bg-primary text-primary-foreground px-2 py-0.5 rounded">
              <span className="font-semibold">{product.rating}</span>
              <Star className="h-3 w-3 fill-current" />
            </div>
            <span className="text-muted-foreground">({product.ratingTotal.toLocaleString()})</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default ProductCard;
