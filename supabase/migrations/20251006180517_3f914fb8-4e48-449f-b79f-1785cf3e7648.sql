-- Create Home & Living category if it doesn't exist
INSERT INTO categories (name, slug, image)
VALUES ('Home & Living', 'home', 'https://media.designcafe.com/wp-content/uploads/2020/12/21184029/living-room-furniture-decor-ideas.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Create subcategories for Home & Living
DO $$
DECLARE
  home_category_id UUID;
BEGIN
  -- Get the category ID
  SELECT id INTO home_category_id FROM categories WHERE slug = 'home';
  
  -- Only insert if they don't already exist
  IF NOT EXISTS (SELECT 1 FROM subcategories WHERE slug = 'bedding' AND category_id = home_category_id) THEN
    INSERT INTO subcategories (name, slug, category_id) VALUES ('Bedding', 'bedding', home_category_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM subcategories WHERE slug = 'cushions-decor' AND category_id = home_category_id) THEN
    INSERT INTO subcategories (name, slug, category_id) VALUES ('Cushions & Decor', 'cushions-decor', home_category_id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM subcategories WHERE slug = 'storage' AND category_id = home_category_id) THEN
    INSERT INTO subcategories (name, slug, category_id) VALUES ('Storage', 'storage', home_category_id);
  END IF;
END $$;