export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  compareAtPrice?: number;
  images: string[];
  description?: string;
  category?: string;
  collection?: string;
  isFeatured?: boolean;
  sku?: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  name: string;
  value: string;
}
