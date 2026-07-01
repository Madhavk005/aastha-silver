import { groq } from "next-sanity";

// Product Queries
export const getAllProductsQuery = groq`
  *[_type == "product"] | order(createdAt desc) {
    _id,
    title,
    slug,
    price,
    compareAtPrice,
    images,
    "category": category->{title, slug},
    isFeatured,
    sku
  }
`;

export const getFeaturedProductsQuery = groq`
  *[_type == "product" && isFeatured == true][0...4] | order(createdAt desc) {
    _id,
    title,
    slug,
    price,
    compareAtPrice,
    images,
    "category": category->{title, slug},
    isFeatured,
    sku
  }
`;

export const getProductBySlugQuery = groq`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    price,
    compareAtPrice,
    images,
    description,
    "category": category->{title, slug},
    "collection": collection->{title, slug},
    isFeatured,
    sku
  }
`;

export const getProductsByCategoryQuery = groq`
  *[_type == "product" && category->slug.current == $category] | order(createdAt desc) {
    _id,
    title,
    slug,
    price,
    compareAtPrice,
    images,
    "category": category->{title, slug},
    isFeatured,
    sku
  }
`;

// Category Queries
export const getAllCategoriesQuery = groq`
  *[_type == "category"] {
    _id,
    title,
    slug,
    description,
    image
  }
`;

export const getPolicyBySlugQuery = groq`
  *[_type == "policy" && slug.current == $slug][0] {
    _id,
    title,
    subtitle,
    content,
    lastUpdated
  }
`;
