#!/usr/bin/env python3
"""Seed Sanity dataset with demo data."""
import json
import os
import urllib.request

TOKEN = os.environ["SANITY_TOKEN"]
BASE = "https://48x9almg.api.sanity.io/v2024-07-01/data/mutate/production"
QUERY = "https://48x9almg.api.sanity.io/v2024-07-01/data/query/production"

HEADERS = {
    "Authorization": f"Bearer {TOKEN}",
    "Content-Type": "application/json",
}


def sanity(query=None, mutations=None):
    if query:
        url = f"{QUERY}?query={urllib.parse.quote(query)}"
    else:
        url = BASE
    req = urllib.request.Request(url, data=json.dumps(mutations).encode() if mutations else None, headers=HEADERS, method="POST" if mutations else "GET")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


import urllib.parse

# 1. Create categories
categories = [
    {"_id": "cat-women", "_type": "category", "title": "Women", "slug": {"_type": "slug", "current": "women"}, "description": "Jewellery crafted for the modern woman."},
    {"_id": "cat-men", "_type": "category", "title": "Men", "slug": {"_type": "slug", "current": "men"}, "description": "Bold silver pieces for men."},
    {"_id": "cat-unisex", "_type": "category", "title": "Unisex", "slug": {"_type": "slug", "current": "unisex"}, "description": "Timeless designs for everyone."},
    {"_id": "cat-chains", "_type": "category", "title": "Chains", "slug": {"_type": "slug", "current": "chains"}, "description": "Premium silver chains."},
    {"_id": "cat-rings", "_type": "category", "title": "Rings", "slug": {"_type": "slug", "current": "rings"}, "description": "Elegant rings for any occasion."},
    {"_id": "cat-anklets", "_type": "category", "title": "Anklets", "slug": {"_type": "slug", "current": "anklets"}, "description": "Beautiful silver anklets."},
    {"_id": "cat-bracelets", "_type": "category", "title": "Bracelets", "slug": {"_type": "slug", "current": "bracelets"}, "description": "Stunning silver bracelets."},
    {"_id": "cat-pendants", "_type": "category", "title": "Pendants & Charms", "slug": {"_type": "slug", "current": "pendants-charms"}, "description": "Charming pendants and charms."},
]

result = sanity(mutations={"mutations": [{"createOrReplace": cat} for cat in categories]})
print(f"✓ Categories created ({len(categories)})")

# 2. Fetch existing products
result = sanity(query='*[_type == "product"]{_id, slug}')
products = result.get("result", [])
print(f"✓ Found {len(products)} products")

# 3. Patch products with new fields
updates = {
    "boho-silver-anklet": {"category": {"_type": "reference", "_ref": "cat-anklets"}, "sku": "AS-ANK-001", "rating": 4.5, "reviewCount": 28, "inStock": True, "compareAtPrice": 1999, "variants": [{"_key": "v1", "name": "Length", "value": "9 inches"}, {"_key": "v2", "name": "Length", "value": "10 inches"}]},
    "textured-silver-band-ring": {"category": {"_type": "reference", "_ref": "cat-rings"}, "sku": "AS-RNG-001", "rating": 4.8, "reviewCount": 42, "inStock": True, "compareAtPrice": 2499, "variants": [{"_key": "v1", "name": "Size", "value": "6"}, {"_key": "v2", "name": "Size", "value": "7"}, {"_key": "v3", "name": "Size", "value": "8"}]},
    "chunky-silver-hoop-earrings": {"category": {"_type": "reference", "_ref": "cat-women"}, "sku": "AS-EAR-001", "rating": 4.6, "reviewCount": 35, "inStock": True, "variants": [{"_key": "v1", "name": "Size", "value": "Small"}, {"_key": "v2", "name": "Size", "value": "Large"}]},
    "floral-silver-charm-pendant": {"category": {"_type": "reference", "_ref": "cat-pendants"}, "sku": "AS-PEN-001", "rating": 4.3, "reviewCount": 19, "inStock": True, "compareAtPrice": 1500},
    "delicate-silver-chain-necklace": {"category": {"_type": "reference", "_ref": "cat-chains"}, "sku": "AS-CHN-001", "rating": 4.9, "reviewCount": 67, "inStock": True, "compareAtPrice": 4200, "variants": [{"_key": "v1", "name": "Length", "value": "16 inches"}, {"_key": "v2", "name": "Length", "value": "18 inches"}, {"_key": "v3", "name": "Length", "value": "20 inches"}]},
    "vintage-silver-cuff-bracelet": {"category": {"_type": "reference", "_ref": "cat-bracelets"}, "sku": "AS-BRC-001", "rating": 4.7, "reviewCount": 51, "inStock": True, "compareAtPrice": 5500},
    "classic-silver-chain": {"category": {"_type": "reference", "_ref": "cat-chains"}, "sku": "AS-CHN-002", "rating": 4.8, "reviewCount": 89, "inStock": True, "compareAtPrice": 6500, "variants": [{"_key": "v1", "name": "Length", "value": "20 inches"}, {"_key": "v2", "name": "Length", "value": "22 inches"}, {"_key": "v3", "name": "Length", "value": "24 inches"}]},
    "minimalist-silver-ring": {"category": {"_type": "reference", "_ref": "cat-rings"}, "sku": "AS-RNG-002", "rating": 4.4, "reviewCount": 33, "inStock": True, "variants": [{"_key": "v1", "name": "Size", "value": "6"}, {"_key": "v2", "name": "Size", "value": "7"}, {"_key": "v3", "name": "Size", "value": "8"}]},
    "elegant-silver-earrings": {"category": {"_type": "reference", "_ref": "cat-women"}, "sku": "AS-EAR-002", "rating": 4.7, "reviewCount": 44, "inStock": True, "compareAtPrice": 4500},
    "sterling-silver-bracelet": {"category": {"_type": "reference", "_ref": "cat-bracelets"}, "sku": "AS-BRC-002", "rating": 4.5, "reviewCount": 27, "inStock": True, "compareAtPrice": 7500},
}

patch_mutations = []
for p in products:
    slug = p.get("slug", {}).get("current", "")
    if slug in updates:
        patch_mutations.append({"patch": {"id": p["_id"], "set": updates[slug]}})

if patch_mutations:
    result = sanity(mutations={"mutations": patch_mutations})
    print(f"✓ Products patched ({len(patch_mutations)})")

# 4. Create delivery policy
policy = {
    "_id": "policy-delivery",
    "_type": "policy",
    "title": "Delivery Information",
    "slug": {"_type": "slug", "current": "delivery-information"},
    "subtitle": "Everything you need to know about receiving your Aastha Silver pieces.",
    "content": [
        {"_type": "block", "style": "normal", "children": [{"_type": "span", "text": "We offer complimentary express shipping on all orders above ₹10,000 within India. Orders are processed within 24-48 hours and delivered within 3-5 business days via our trusted logistics partners."}]},
        {"_type": "block", "style": "normal", "children": [{"_type": "span", "text": "International shipping is available at a flat rate and typically takes 7-14 business days depending on the destination. Customs duties and taxes may apply and are the responsibility of the recipient."}]},
        {"_type": "block", "style": "normal", "children": [{"_type": "span", "text": "All packages are fully insured and require a signature upon delivery. You will receive a tracking number once your order has been dispatched."}]},
    ],
    "lastUpdated": "2026-07-23",
}
result = sanity(mutations={"mutations": [{"createOrReplace": policy}]})
print("✓ Delivery policy created")

# 5. Create sample orders
orders = [
    {"_type": "order", "orderNumber": "AS-2026-0001", "clerkUserId": "user_2rskLX5eNfYBPWNmwZQb9ET9OaF", "customerName": "Ananya Sharma", "customerEmail": "ananya@example.com", "customerPhone": "+91 98765 43210", "shippingAddress": {"street": "42, Marine Drive", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "country": "India"}, "items": [{"_key": "item1", "productId": "product-1", "name": "Classic Silver Chain", "quantity": 1, "price": 4999}, {"_key": "item2", "productId": "product-2", "name": "Minimalist Silver Ring", "quantity": 1, "price": 2499}], "totalAmount": 7498, "status": "delivered"},
    {"_type": "order", "orderNumber": "AS-2026-0002", "clerkUserId": "user_2rskLX5eNfYBPWNmwZQb9ET9OaF", "customerName": "Ananya Sharma", "customerEmail": "ananya@example.com", "customerPhone": "+91 98765 43210", "shippingAddress": {"street": "42, Marine Drive", "city": "Mumbai", "state": "Maharashtra", "zipCode": "400001", "country": "India"}, "items": [{"_key": "item1", "productId": "product-3", "name": "Elegant Silver Earrings", "quantity": 1, "price": 3499}], "totalAmount": 3499, "status": "shipped"},
]
result = sanity(mutations={"mutations": [{"create": o} for o in orders]})
print(f"✓ Orders created ({len(orders)})")

print("\n✓ Seeding complete!")
