import { Category } from "@/types/product";

export const categories: Category[] = [
  {
    id: "men",
    name: "Men",
    image: "https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=800&q=80",
    subcategories: [
      "Casual Wear",
      "Formal Wear",
      "Traditional Wear",
      "Sportswear",
      "Jeans & Trousers"
    ]
  },
  {
    id: "women",
    name: "Women",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80",
    subcategories: [
      "Casual Wear",
      "Formal Wear",
      "Traditional Wear",
      "Ethnic Wear",
      "Party Wear",
      "Western Wear",
      "Fusion Wear"
    ]
  },
  {
    id: "kids",
    name: "Kids",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=800&q=80",
    subcategories: [
      "Boys Casual",
      "Boys Formal",
      "Girls Casual",
      "Girls Formal"
    ]
  },
  {
    id: "home",
    name: "Home & Living",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&q=80",
    subcategories: [
      "Bedding",
      "Cushions & Decor",
      "Storage"
    ]
  },
  {
    id: "beauty",
    name: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
    subcategories: [
      "Face",
      "Eyes",
      "Lips",
      "Skincare",
      "Haircare",
      "Nails"
    ]
  },
  {
    id: "accessories",
    name: "Accessories",
    image: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=800&q=80",
    subcategories: [
      "Watches",
      "Bags",
      "Jewelry"
    ]
  }
];
