-- Add foreign key constraints for cart_items and wishlist_items
ALTER TABLE public.cart_items
  ADD CONSTRAINT cart_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;

ALTER TABLE public.wishlist_items
  ADD CONSTRAINT wishlist_items_product_id_fkey 
  FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE CASCADE;