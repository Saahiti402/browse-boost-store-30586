import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      // Fetch products with their related data
      const { data: products, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(id, name, slug),
          subcategory:subcategories(id, name, slug),
          product_images(image_url, display_order),
          product_sizes(size, stock_quantity),
          product_colors(color, hex_code, stock_quantity)
        `)
        .eq("is_active", true)
        .order("created_at", { ascending: false });

      if (error) throw error;

      // Transform database structure to Product type
      const transformedProducts: Product[] = products.map((product: any) => ({
        id: product.id,
        name: product.name,
        images: product.product_images
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((img: any) => img.image_url),
        price: Number(product.price),
        mrp: Number(product.mrp),
        rating: Number(product.rating),
        ratingTotal: product.rating_count || 0,
        discount: product.discount || 0,
        seller: product.seller,
        category: product.category?.slug || "",
        subcategory: product.subcategory?.name || "",
        description: product.description || "",
        sizes: product.product_sizes?.map((s: any) => s.size) || [],
        colors: product.product_colors?.map((c: any) => c.color) || [],
      }));

      return transformedProducts;
    },
  });
};
