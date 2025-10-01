import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Product } from "@/types/product";

export const useProduct = (productId: string | undefined) => {
  return useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      if (!productId) throw new Error("Product ID is required");

      const { data: product, error } = await supabase
        .from("products")
        .select(`
          *,
          category:categories(id, name, slug),
          subcategory:subcategories(id, name, slug),
          product_images(image_url, display_order),
          product_sizes(size, stock_quantity),
          product_colors(color, hex_code, stock_quantity)
        `)
        .eq("id", productId)
        .eq("is_active", true)
        .single();

      if (error) throw error;
      if (!product) throw new Error("Product not found");

      // Transform database structure to Product type
      const transformedProduct: Product = {
        id: product.id,
        name: product.name,
        images: (product.product_images || [])
          .sort((a: any, b: any) => a.display_order - b.display_order)
          .map((img: any) => img.image_url),
        price: Number(product.price),
        mrp: Number(product.mrp),
        rating: Number(product.rating),
        ratingTotal: product.rating_count || 0,
        discount: product.discount || 0,
        seller: product.seller,
        category: product.category?.slug || "",
        subcategory: product.subcategory?.slug || "",
        description: product.description || "",
        sizes: product.product_sizes?.map((s: any) => s.size) || [],
        colors: product.product_colors?.map((c: any) => c.color) || [],
      };

      return transformedProduct;
    },
    enabled: !!productId,
  });
};
