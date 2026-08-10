export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  body: string[];
}

export const ARTICLES: Article[] = [
  {
    slug: "the-art-of-layering",
    title: "The Art of Layering: A Guide to Necklaces",
    excerpt: "Discover how to perfectly balance lengths, weights, and textures to create an effortless stacked look.",
    category: "Styling",
    date: "July 2, 2026",
    image: "/images/hero.jpg",
    body: [
      "Layering necklaces is one of the simplest ways to elevate any outfit — but balance is everything. The rule of three is a great starting point: one short piece, one mid-length, and one long piece creates natural depth without feeling crowded.",
      "Start with a fine, understated chain at 16 inches to anchor the look. Add a pendant at 18-20 inches to draw the eye, then finish with a longer, bolder piece at 24 inches or more. Keep the textures intentional: mix a satin finish with a hammered one, but avoid pairing two statement pieces against each other.",
      "When in doubt, simplify. A single well-chosen layered duo outshines a stack of four competing pieces. And remember — the pieces you wear daily become part of you, so choose layers that are comfortable enough to forget you're wearing them.",
    ],
  },
  {
    slug: "understanding-925-sterling-silver",
    title: "Understanding 925 Sterling Silver",
    excerpt: "What makes sterling silver the premier choice for accessible luxury? We break down the alloy that shapes our collections.",
    category: "Craftsmanship",
    date: "June 15, 2026",
    image: "/images/editorial-1.jpg",
    body: [
      "Sterling silver is an alloy of 92.5% pure silver and 7.5% other metals — usually copper — a blend that gives the metal the strength needed for everyday jewellery while maintaining its luminous finish. Hallmarked 925, it is the international standard for quality silver.",
      "Because it is a natural metal, sterling silver will tarnish over time when exposed to air and moisture. This is not a flaw — it is the honest behaviour of real silver. We never coat or plate our pieces. A few minutes with a silver-polishing cloth restores the brilliance completely.",
      "When you choose 925, you choose a material that ages gracefully, holds its value, and stands the test of generations. It is luxury that is meant to be worn, not kept under glass.",
    ],
  },
  {
    slug: "behind-the-campaign-the-muse",
    title: "Behind the Campaign: The Muse",
    excerpt: "An exclusive look behind the scenes of our latest editorial shoot capturing the essence of quiet luxury.",
    category: "Editorial",
    date: "May 28, 2026",
    image: "/images/editorial-2.jpg",
    body: [
      "The Muse campaign was built around a single idea: elegance that doesn't try. Shot with natural light and minimal styling, the collection's finest pieces speak for themselves — no frantic energy, no loud poses.",
      "Each frame was composed around the jewellery first. The light was shaped to catch the edges of a pendant, the curve of a bangle, the quiet sparkle of a stack of rings. The result is an editorial that feels less like fashion photography and more like a study of permanence.",
      "We believe modern luxury is confidence in restraint. The Muse is our love letter to that belief — and an invitation to find your own quiet moments of brilliance.",
    ],
  },
];