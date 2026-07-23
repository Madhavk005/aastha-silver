import { groq } from "next-sanity";

const PRODUCT_PROJECTION = `
  _id,
  title,
  slug,
  price,
  compareAtPrice,
  "images": coalesce(images[].asset->url, images),
  "description": pt::text(description),
  "category": category->title,
  "collection": collection->title,
  isFeatured,
  sku,
  rating,
  reviewCount,
  inStock,
  variants
`;

export const getAllProductsQuery = groq`*[_type == "product"] | order(createdAt desc) {${PRODUCT_PROJECTION}}`;

export const getFeaturedProductsQuery = groq`*[_type == "product" && isFeatured == true][0...8] | order(createdAt desc) {${PRODUCT_PROJECTION}}`;

export const getProductBySlugQuery = groq`*[_type == "product" && slug.current == $slug][0] {${PRODUCT_PROJECTION}}`;

export const getProductsByCategoryQuery = groq`*[_type == "product" && category->slug.current == $category] | order(createdAt desc) {${PRODUCT_PROJECTION}}`;

export const getProductBySkuQuery = groq`*[_type == "product" && sku == $sku][0] {${PRODUCT_PROJECTION}}`;

export const getAllCategoriesQuery = groq`*[_type == "category"] { _id, title, slug, description, "image": image.asset->url }`;

export const getPolicyBySlugQuery = groq`*[_type == "policy" && slug.current == $slug][0] { _id, title, subtitle, "content": pt::text(content), lastUpdated }`;

export const getOrdersByUserIdQuery = groq`*[_type == "order" && clerkUserId == $userId] | order(createdAt desc) {
  _id, orderNumber, razorpayOrderId, razorpayPaymentId, clerkUserId,
  customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount, status, _createdAt
}`;

export const getOrderByOrderNumberQuery = groq`*[_type == "order" && orderNumber == $orderNumber][0] {
  _id, orderNumber, razorpayOrderId, razorpayPaymentId, clerkUserId,
  customerName, customerEmail, customerPhone, shippingAddress, items, totalAmount, status, _createdAt
}`;
