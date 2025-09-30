export interface Product {
  id: string;
  name: string;
  images: string[];
  price: number;
  mrp: number;
  rating: number;
  ratingTotal: number;
  discount: number;
  seller: string;
  category: string;
  subcategory: string;
  description: string;
  sizes?: string[];
  colors?: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  subcategories: string[];
}
