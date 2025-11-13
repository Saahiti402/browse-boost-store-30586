import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartItem, Product } from "@/types/product";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "./AuthContext";
import { supabase } from "@/integrations/supabase/client";

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, size?: string, color?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  // Load cart and wishlist from database when user logs in
  useEffect(() => {
    const loadUserData = async () => {
      if (!user) {
        setCart([]);
        setWishlist([]);
        return;
      }

      // Load cart items
      const { data: cartData } = await supabase
        .from("cart_items")
        .select(`
          quantity,
          selected_size,
          selected_color,
          products:product_id (
            id,
            name,
            price,
            mrp,
            discount,
            rating,
            rating_count,
            seller,
            category_id,
            subcategory_id,
            description,
            product_images (image_url),
            product_sizes (size),
            product_colors (color)
          )
        `)
        .eq("user_id", user.id);

      if (cartData) {
        const cartItems: CartItem[] = cartData.map((item: any) => ({
          id: item.products.id,
          name: item.products.name,
          images: item.products.product_images.map((img: any) => img.image_url),
          price: item.products.price,
          mrp: item.products.mrp,
          rating: item.products.rating,
          ratingTotal: item.products.rating_count,
          discount: item.products.discount,
          seller: item.products.seller,
          category: item.products.category_id,
          subcategory: item.products.subcategory_id,
          description: item.products.description,
          sizes: item.products.product_sizes.map((s: any) => s.size),
          colors: item.products.product_colors.map((c: any) => c.color),
          quantity: item.quantity,
          selectedSize: item.selected_size,
          selectedColor: item.selected_color,
        }));
        setCart(cartItems);
      }

      // Load wishlist items
      const { data: wishlistData } = await supabase
        .from("wishlist_items")
        .select(`
          products:product_id (
            id,
            name,
            price,
            mrp,
            discount,
            rating,
            rating_count,
            seller,
            category_id,
            subcategory_id,
            description,
            product_images (image_url),
            product_sizes (size),
            product_colors (color)
          )
        `)
        .eq("user_id", user.id);

      if (wishlistData) {
        const wishlistItems: Product[] = wishlistData.map((item: any) => ({
          id: item.products.id,
          name: item.products.name,
          images: item.products.product_images.map((img: any) => img.image_url),
          price: item.products.price,
          mrp: item.products.mrp,
          rating: item.products.rating,
          ratingTotal: item.products.rating_count,
          discount: item.products.discount,
          seller: item.products.seller,
          category: item.products.category_id,
          subcategory: item.products.subcategory_id,
          description: item.products.description,
          sizes: item.products.product_sizes.map((s: any) => s.size),
          colors: item.products.product_colors.map((c: any) => c.color),
        }));
        setWishlist(wishlistItems);
      }
    };

    loadUserData();
  }, [user]);

  const addToCart = async (product: Product, size?: string, color?: string) => {
    if (!user) {
      navigate("/auth", { state: { from: window.location.pathname } });
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your cart",
        variant: "destructive",
      });
      return;
    }

    const existingItem = cart.find((item) => item.id === product.id);
    
    if (existingItem) {
      // Update quantity in database
      await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("user_id", user.id)
        .eq("product_id", product.id);

      setCart((prev) =>
        prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );

      toast({
        title: "Updated cart",
        description: `${product.name} quantity updated`,
      });
    } else {
      // Insert new item to database
      await supabase
        .from("cart_items")
        .insert({
          user_id: user.id,
          product_id: product.id,
          quantity: 1,
          selected_size: size,
          selected_color: color,
        });

      setCart((prev) => [
        ...prev,
        { ...product, quantity: 1, selectedSize: size, selectedColor: color },
      ]);

      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart`,
      });
    }
  };

  const removeFromCart = async (productId: string) => {
    if (!user) return;

    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setCart((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    });
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    if (!user) return;

    await supabase
      .from("cart_items")
      .update({ quantity })
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const clearCart = async () => {
    if (!user) return;

    await supabase
      .from("cart_items")
      .delete()
      .eq("user_id", user.id);

    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      navigate("/auth", { state: { from: window.location.pathname } });
      toast({
        title: "Sign in required",
        description: "Please sign in to add items to your wishlist",
        variant: "destructive",
      });
      return;
    }

    if (isInWishlist(product.id)) {
      toast({
        title: "Already in wishlist",
        description: `${product.name} is already in your wishlist`,
        variant: "destructive",
      });
      return;
    }

    const { error } = await supabase
      .from("wishlist_items")
      .insert({
        user_id: user.id,
        product_id: product.id,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add item to wishlist",
        variant: "destructive",
      });
      return;
    }

    setWishlist((prev) => [...prev, product]);
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  const removeFromWishlist = async (productId: string) => {
    if (!user) return;

    await supabase
      .from("wishlist_items")
      .delete()
      .eq("user_id", user.id)
      .eq("product_id", productId);

    setWishlist((prev) => prev.filter((item) => item.id !== productId));
    toast({
      title: "Removed from wishlist",
      description: "Item has been removed from your wishlist",
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        getTotalPrice,
        getTotalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
