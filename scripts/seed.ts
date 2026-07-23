import { createClient } from "next-sanity";

const client = createClient({
  projectId: "48x9almg",
  dataset: "production",
  apiVersion: "2024-07-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

interface ProductUpdate {
  slug: string;
  category: string;
  sku: string;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  compareAtPrice?: number;
  variants?: { _key: string; name: string; value: string }[];
}

async function main() {
  // 1. Create categories
  const categories = [
    { _id: "cat-women", _type: "category", title: "Women", slug: { _type: "slug", current: "women" }, description: "Jewellery crafted for the modern woman." },
    { _id: "cat-men", _type: "category", title: "Men", slug: { _type: "slug", current: "men" }, description: "Bold silver pieces for men." },
    { _id: "cat-unisex", _type: "category", title: "Unisex", slug: { _type: "slug", current: "unisex" }, description: "Timeless designs for everyone." },
    { _id: "cat-chains", _type: "category", title: "Chains", slug: { _type: "slug", current: "chains" }, description: "Premium silver chains." },
    { _id: "cat-rings", _type: "category", title: "Rings", slug: { _type: "slug", current: "rings" }, description: "Elegant rings for any occasion." },
    { _id: "cat-anklets", _type: "category", title: "Anklets", slug: { _type: "slug", current: "anklets" }, description: "Beautiful silver anklets." },
    { _id: "cat-bracelets", _type: "category", title: "Bracelets", slug: { _type: "slug", current: "bracelets" }, description: "Stunning silver bracelets." },
    { _id: "cat-pendants", _type: "category", title: "Pendants & Charms", slug: { _type: "slug", current: "pendants-charms" }, description: "Charming pendants and charms." },
  ];

  const catTx = client.transaction();
  for (const cat of categories) {
    catTx.createOrReplace(cat);
  }
  await catTx.commit();
  console.log("✓ Categories created");

  // 2. Map products to categories and add new fields
  const productUpdates: ProductUpdate[] = [
    { slug: "boho-silver-anklet", category: "cat-anklets", sku: "AS-ANK-001", rating: 4.5, reviewCount: 28, inStock: true, compareAtPrice: 1999, variants: [{ _key: "v1", name: "Length", value: "9 inches" }, { _key: "v2", name: "Length", value: "10 inches" }] },
    { slug: "textured-silver-band-ring", category: "cat-rings", sku: "AS-RNG-001", rating: 4.8, reviewCount: 42, inStock: true, compareAtPrice: 2499, variants: [{ _key: "v1", name: "Size", value: "6" }, { _key: "v2", name: "Size", value: "7" }, { _key: "v3", name: "Size", value: "8" }] },
    { slug: "chunky-silver-hoop-earrings", category: "cat-women", sku: "AS-EAR-001", rating: 4.6, reviewCount: 35, inStock: true, variants: [{ _key: "v1", name: "Size", value: "Small" }, { _key: "v2", name: "Size", value: "Large" }] },
    { slug: "floral-silver-charm-pendant", category: "cat-pendants", sku: "AS-PEN-001", rating: 4.3, reviewCount: 19, inStock: true, compareAtPrice: 1500 },
    { slug: "delicate-silver-chain-necklace", category: "cat-chains", sku: "AS-CHN-001", rating: 4.9, reviewCount: 67, inStock: true, compareAtPrice: 4200, variants: [{ _key: "v1", name: "Length", value: "16 inches" }, { _key: "v2", name: "Length", value: "18 inches" }, { _key: "v3", name: "Length", value: "20 inches" }] },
    { slug: "vintage-silver-cuff-bracelet", category: "cat-bracelets", sku: "AS-BRC-001", rating: 4.7, reviewCount: 51, inStock: true, compareAtPrice: 5500 },
    { slug: "classic-silver-chain", category: "cat-chains", sku: "AS-CHN-002", rating: 4.8, reviewCount: 89, inStock: true, compareAtPrice: 6500, variants: [{ _key: "v1", name: "Length", value: "20 inches" }, { _key: "v2", name: "Length", value: "22 inches" }, { _key: "v3", name: "Length", value: "24 inches" }] },
    { slug: "minimalist-silver-ring", category: "cat-rings", sku: "AS-RNG-002", rating: 4.4, reviewCount: 33, inStock: true, variants: [{ _key: "v1", name: "Size", value: "6" }, { _key: "v2", name: "Size", value: "7" }, { _key: "v3", name: "Size", value: "8" }] },
    { slug: "elegant-silver-earrings", category: "cat-women", sku: "AS-EAR-002", rating: 4.7, reviewCount: 44, inStock: true, compareAtPrice: 4500 },
    { slug: "sterling-silver-bracelet", category: "cat-bracelets", sku: "AS-BRC-002", rating: 4.5, reviewCount: 27, inStock: true, compareAtPrice: 7500 },
  ];

  const prodTx = client.transaction();
  for (const update of productUpdates) {
    const existing = await client.fetch<{ _id: string } | null>(
      '*[_type == "product" && slug.current == $slug][0]{_id}',
      { slug: update.slug }
    );
    if (existing) {
      const patchData: Record<string, unknown> = {
        category: { _type: "reference", _ref: update.category },
        sku: update.sku,
        rating: update.rating,
        reviewCount: update.reviewCount,
        inStock: update.inStock,
      };
      if (update.compareAtPrice) patchData.compareAtPrice = update.compareAtPrice;
      if (update.variants) patchData.variants = update.variants;
      prodTx.patch(existing._id, { set: patchData });
    }
  }
  await prodTx.commit();
  console.log("✓ Products updated with categories, ratings, variants, SKUs");

  // 3. Create a delivery policy
  await client.createOrReplace({
    _id: "policy-delivery",
    _type: "policy",
    title: "Delivery Information",
    slug: { _type: "slug", current: "delivery-information" },
    subtitle: "Everything you need to know about receiving your Aastha Silver pieces.",
    content: [
      { _type: "block", style: "normal", children: [{ _type: "span", text: "We offer complimentary express shipping on all orders above ₹10,000 within India. Orders are processed within 24-48 hours and delivered within 3-5 business days via our trusted logistics partners." }] },
      { _type: "block", style: "normal", children: [{ _type: "span", text: "International shipping is available at a flat rate and typically takes 7-14 business days depending on the destination. Customs duties and taxes may apply and are the responsibility of the recipient." }] },
      { _type: "block", style: "normal", children: [{ _type: "span", text: "All packages are fully insured and require a signature upon delivery. You will receive a tracking number once your order has been dispatched." }] },
    ],
    lastUpdated: "2026-07-23",
  });
  console.log("✓ Delivery policy created");

  // 4. Create sample orders
  const orders = [
    {
      _type: "order",
      orderNumber: "AS-2026-0001",
      clerkUserId: "user_2rskLX5eNfYBPWNmwZQb9ET9OaF",
      customerName: "Ananya Sharma",
      customerEmail: "ananya@example.com",
      customerPhone: "+91 98765 43210",
      shippingAddress: { street: "42, Marine Drive", city: "Mumbai", state: "Maharashtra", zipCode: "400001", country: "India" },
      items: [
        { _key: "item1", productId: "product-1", name: "Classic Silver Chain", quantity: 1, price: 4999 },
        { _key: "item2", productId: "product-2", name: "Minimalist Silver Ring", quantity: 1, price: 2499 },
      ],
      totalAmount: 7498,
      status: "delivered",
    },
    {
      _type: "order",
      orderNumber: "AS-2026-0002",
      clerkUserId: "user_2rskLX5eNfYBPWNmwZQb9ET9OaF",
      customerName: "Ananya Sharma",
      customerEmail: "ananya@example.com",
      customerPhone: "+91 98765 43210",
      shippingAddress: { street: "42, Marine Drive", city: "Mumbai", state: "Maharashtra", zipCode: "400001", country: "India" },
      items: [
        { _key: "item1", productId: "product-3", name: "Elegant Silver Earrings", quantity: 1, price: 3499 },
      ],
      totalAmount: 3499,
      status: "shipped",
    },
  ];

  for (const order of orders) {
    await client.create(order);
  }
  console.log("✓ Sample orders created");

  console.log("\n✓ Seeding complete!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
