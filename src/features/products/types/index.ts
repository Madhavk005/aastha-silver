export interface Product {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  compareAtPrice?: number;
  images: any[]; // Using any for Sanity Image for now, should be strongly typed later
  description?: any[];
  category?: { _ref: string };
  collection?: { _ref: string };
  isFeatured?: boolean;
  sku?: string;
}
