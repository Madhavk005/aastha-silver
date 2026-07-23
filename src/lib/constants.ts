export const CATEGORIES = [
  { name: "Women", slug: "women", image: "/images/editorial-portrait.jpg" },
  { name: "Men", slug: "men", image: "/images/editorial-1.jpg" },
  { name: "Unisex", slug: "unisex", image: "/images/product-showcase.jpg" },
  { name: "Chains", slug: "chains", image: "/images/editorial-2.jpg" },
  { name: "Rings", slug: "rings", image: "/images/featured-rings.jpg" },
  { name: "Anklets", slug: "anklets", image: "/images/product-detail.jpg" },
  { name: "Bracelets", slug: "bracelets", image: "/images/product-showcase.jpg" },
  { name: "Pendants & Charms", slug: "pendants-charms", image: "/images/featured-necklace.jpg" },
];

export const USP_STRIP = [
  "925 STERLING SILVER",
  "AUTHENTIC SILVER",
  "PAN-INDIA DELIVERY",
  "MADE TO LAST",
];

export const USP_CARDS = [
  {
    title: "925 Sterling Silver",
    description: "Every piece is crafted from premium 92.5% pure silver, hallmarked for guaranteed authenticity and lasting brilliance.",
    icon: "ShieldCheck",
  },
  {
    title: "Anti-Tarnish",
    description: "Our proprietary finishing process resists tarnishing, keeping your jewellery radiant through everyday wear.",
    icon: "Sparkles",
  },
  {
    title: "Hypoallergenic",
    description: "Completely nickel-free and safe for sensitive skin. Designed for comfort, worn without compromise.",
    icon: "Heart",
  },
  {
    title: "Gift-Ready Packaging",
    description: "Every order arrives in our signature box, ready to gift. Because the presentation matters as much as the piece.",
    icon: "Gift",
  },
  {
    title: "Easy Returns",
    description: "Not in love? Return within 14 days for a full refund. No questions asked, free shipping included.",
    icon: "RefreshCw",
  },
  {
    title: "Free Shipping",
    description: "Complimentary express delivery across India on orders above ₹10,000. Fast, insured, and trackable.",
    icon: "Truck",
  },
];

export const REVIEWS = [
  {
    name: "Ananya M.",
    rating: 5,
    text: "Absolutely stunning quality. The silver has a beautiful weight and the design is even more elegant in person. I've received so many compliments on the ring.",
    image: "/images/product-detail.jpg",
    product: "The Signature Ring",
  },
  {
    name: "Priya S.",
    rating: 5,
    text: "I was hesitant to buy silver online, but Aastha Silver exceeded my expectations. The hallmark certificate gave me confidence, and the packaging was absolutely gorgeous.",
    image: "/images/featured-necklace.jpg",
    product: "Classic Hoops",
  },
  {
    name: "Rohan K.",
    rating: 5,
    text: "Bought the chain as a gift for my wife. She hasn't taken it off since. The anti-tarnish quality is remarkable — still looks brand new after months of daily wear.",
    image: "/images/product-showcase.jpg",
    product: "Everyday Chain",
  },
  {
    name: "Neha G.",
    rating: 4,
    text: "Beautiful minimalist design that goes with everything. The length is perfect for layering. Would love to see more pendant options in this style.",
    image: "/images/featured-rings.jpg",
    product: "Tiny Pendant Necklace",
  },
];

export const GIFT_SECTIONS = [
  { name: "Birthday", slug: "birthday", image: "/images/editorial-1.jpg" },
  { name: "Anniversary", slug: "anniversary", image: "/images/featured-rings.jpg" },
  { name: "Wedding", slug: "wedding", image: "/images/editorial-portrait.jpg" },
  { name: "Festivals", slug: "festivals", image: "/images/editorial-2.jpg" },
  { name: "Self Love", slug: "self-love", image: "/images/product-detail.jpg" },
  { name: "Corporate Gifts", slug: "corporate", image: "/images/product-showcase.jpg" },
];

export const INSTAGRAM_POSTS = [
  { src: "/images/hero.jpg", alt: "Style inspiration" },
  { src: "/images/editorial-1.jpg", alt: "Jewellery detail" },
  { src: "/images/editorial-2.jpg", alt: "Editorial shot" },
  { src: "/images/featured-rings.jpg", alt: "Lifestyle" },
  { src: "/images/philosophy.jpg", alt: "Collection" },
  { src: "/images/featured-necklace.jpg", alt: "Craftsmanship" },
];

export const BRAND_STORY_HIGHLIGHTS = [
  {
    title: "Rooted in Craft",
    text: "Every Aastha piece is shaped by master artisans who have refined their skill over generations. Our ateliers blend traditional techniques with contemporary design, creating jewellery that honours the past while embracing the present.",
    image: "/images/editorial-1.jpg",
  },
  {
    title: "Designed for Life",
    text: "We reject the transient nature of fast fashion. Each collection is built around the concept of permanence — pieces designed to be worn daily, passed down, and treasured across decades.",
    image: "/images/editorial-2.jpg",
  },
] as const;

export const OCCASION_DETAILS: Record<string, { subtitle: string; description: string; heroImage: string; colorPalette: string[] }> = {
  birthday: {
    subtitle: "Celebrate Another Beautiful Year",
    description: "Mark life's milestones with silver that sparkles as bright as the memories you're making. From delicate birthstone pendants to engraved bangles, find the gift that says 'you matter' in the most elegant way.",
    heroImage: "/images/editorial-1.jpg",
    colorPalette: ["#fdf2f8", "#fce7f3", "#fbcfe8"],
  },
  anniversary: {
    subtitle: "A Love That Only Grows Finer",
    description: "Celebrate your journey together with silver as enduring as your bond. Our anniversary collection features timeless bands, interlocking pendants, and personalised engravings that capture the essence of your story.",
    heroImage: "/images/featured-rings.jpg",
    colorPalette: ["#fef3c7", "#fde68a", "#fcd34d"],
  },
  wedding: {
    subtitle: "The Beginning of Forever",
    description: "From engagement rings to bridal sets, our wedding collection embodies the purity and permanence of your commitment. Each piece is a promise, crafted to be cherished through every chapter of your shared life.",
    heroImage: "/images/editorial-portrait.jpg",
    colorPalette: ["#f0fdf4", "#dcfce7", "#bbf7d0"],
  },
  festivals: {
    subtitle: "Light, Colour & Silver",
    description: "Festivals are a celebration of light, colour, and togetherness. Adorn yourself and your loved ones with silver that captures the festive spirit — from traditional jhumkas to modern statement pieces.",
    heroImage: "/images/editorial-2.jpg",
    colorPalette: ["#fff7ed", "#ffedd5", "#fed7aa"],
  },
  "self-love": {
    subtitle: "Because You Deserve It",
    description: "The most important relationship is the one with yourself. Our self-love curation is an invitation to honour your own journey — pieces that remind you of your strength, your grace, and your light.",
    heroImage: "/images/product-detail.jpg",
    colorPalette: ["#f5f3ff", "#ede9fe", "#ddd6fe"],
  },
  corporate: {
    subtitle: "Gifts That Speak Volumes",
    description: "Make a lasting impression with corporate gifts that reflect your brand's commitment to quality. Our bespoke corporate collection offers custom engraving, premium packaging, and bulk ordering for your business needs.",
    heroImage: "/images/product-showcase.jpg",
    colorPalette: ["#f8fafc", "#f1f5f9", "#e2e8f0"],
  },
};

export const GALLERY_IMAGES = [
  { src: "/images/hero.jpg", alt: "Style inspiration", user: "@ananya_m", tag: "Everyday Elegance" },
  { src: "/images/editorial-1.jpg", alt: "Ring detail", user: "@priya_sharma", tag: "Minimalist" },
  { src: "/images/editorial-2.jpg", alt: "Editorial shot", user: "@rohan_k", tag: "Gift Guide" },
  { src: "/images/featured-rings.jpg", alt: "Lifestyle", user: "@neha_g", tag: "Everyday Elegance" },
  { src: "/images/editorial-portrait.jpg", alt: "Birthday edit", user: "@divya_menon", tag: "Gift Guide" },
  { src: "/images/featured-necklace.jpg", alt: "Bracelet stack", user: "@kritika_s", tag: "Stacking" },
  { src: "/images/product-showcase.jpg", alt: "Hoop earrings", user: "@meera_iyer", tag: "Everyday Elegance" },
  { src: "/images/philosophy.jpg", alt: "Silver necklace", user: "@aishwarya_r", tag: "Minimalist" },
  { src: "/images/product-detail.jpg", alt: "Pendant detail", user: "@sneha_p", tag: "Layering" },
  { src: "/images/hero.jpg", alt: "Anniversary shoot", user: "@priya_sharma", tag: "Gift Guide" },
  { src: "/images/editorial-1.jpg", alt: "Cuff bracelet", user: "@rohan_k", tag: "Minimalist" },
  { src: "/images/product-showcase.jpg", alt: "Corporate gift", user: "@aastha_silver", tag: "Corporate" },
];


