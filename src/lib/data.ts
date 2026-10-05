export type Pkg = { name: "Basic" | "Standard" | "Premium"; price: number; days: number; features: string[] };

export type Service = {
  id: string;
  title: string;
  category: string;
  seller: string;
  sellerLevel: string;
  rating: number;
  reviews: number;
  from: number;
  hue: number;
  summary: string;
  packages: Pkg[];
};

export const CATEGORIES = ["All", "Web", "Design", "Writing", "Video", "Marketing"] as const;

function pkgs(a: number, b: number, c: number, items: [string, string, string]): Pkg[] {
  return [
    { name: "Basic", price: a, days: 7, features: [items[0], "1 revision"] },
    { name: "Standard", price: b, days: 5, features: [items[0], items[1], "3 revisions"] },
    { name: "Premium", price: c, days: 3, features: [items[0], items[1], items[2], "Unlimited revisions"] },
  ];
}

export const SERVICES: Service[] = [
  { id: "landing-page", title: "A fast, clean landing page for your business", category: "Web", seller: "Nora Fields", sellerLevel: "Top rated", rating: 4.9, reviews: 212, from: 120, hue: 215, summary: "One focused page that explains your offer and turns visitors into enquiries. Mobile first, quick to load.", packages: pkgs(120, 240, 420, ["1 page design and build", "Contact form", "Basic SEO and analytics setup"]) },
  { id: "store-setup", title: "Online store setup with product pages and checkout", category: "Web", seller: "Marcus Bell", sellerLevel: "Level 2", rating: 4.8, reviews: 96, from: 300, hue: 190, summary: "A store ready to sell: catalogue, payment setup, shipping rules and a simple admin guide.", packages: pkgs(300, 650, 1100, ["Up to 10 products", "Payments and shipping rules", "Discount codes and email receipts"]) },
  { id: "bug-fixes", title: "Fix bugs and small features in your web app", category: "Web", seller: "Priya Nair", sellerLevel: "Level 2", rating: 4.9, reviews: 148, from: 60, hue: 250, summary: "Send the issue, get a fix with a short note on the cause and how it was tested.", packages: pkgs(60, 140, 260, ["1 bug fix", "Up to 3 fixes", "Fixes plus a small feature"]) },
  { id: "logo-pack", title: "Logo and simple brand kit", category: "Design", seller: "Elena Rossi", sellerLevel: "Top rated", rating: 5.0, reviews: 321, from: 80, hue: 330, summary: "A logo in every format you need, with colors and fonts, so your brand looks the same everywhere.", packages: pkgs(80, 180, 340, ["2 logo concepts", "Colors, fonts and usage sheet", "Social media profile set"]) },
  { id: "app-screens", title: "Clean mobile app screens in Figma", category: "Design", seller: "Tom Alvarez", sellerLevel: "Level 1", rating: 4.7, reviews: 54, from: 150, hue: 280, summary: "Screens and a clickable prototype your developer can build from, with spacing and states included.", packages: pkgs(150, 360, 640, ["5 screens", "Clickable prototype", "Design system and handover notes"]) },
  { id: "blog-posts", title: "Well researched blog posts that read naturally", category: "Writing", seller: "Hannah Cole", sellerLevel: "Level 2", rating: 4.8, reviews: 187, from: 40, hue: 30, summary: "Clear, useful articles in your tone of voice, with sources and a short outline you approve first.", packages: pkgs(40, 110, 230, ["1 article, 800 words", "3 articles, 800 words each", "6 articles plus topic plan"]) },
  { id: "product-copy", title: "Product descriptions that help people decide", category: "Writing", seller: "Samir Haddad", sellerLevel: "Level 1", rating: 4.6, reviews: 63, from: 30, hue: 15, summary: "Short, honest descriptions that answer the questions buyers actually ask.", packages: pkgs(30, 90, 190, ["10 descriptions", "30 descriptions", "60 descriptions with a style guide"]) },
  { id: "short-video", title: "Short vertical video edits for social media", category: "Video", seller: "Lena Park", sellerLevel: "Level 2", rating: 4.9, reviews: 129, from: 50, hue: 350, summary: "Cuts, captions and sound cleanup on your footage, sized for the main social apps.", packages: pkgs(50, 130, 290, ["1 video up to 60 seconds", "3 videos with captions", "8 videos with captions and thumbnails"]) },
  { id: "promo-video", title: "Explainer video from your script", category: "Video", seller: "Diego Ferreira", sellerLevel: "Top rated", rating: 4.8, reviews: 77, from: 200, hue: 160, summary: "Animated explainer with voice-over and music, built from the script you approve.", packages: pkgs(200, 450, 800, ["30 second video", "60 second video with voice-over", "90 second video, voice-over and music"]) },
  { id: "ads-setup", title: "Set up and tune your first ad campaign", category: "Marketing", seller: "Grace Okafor", sellerLevel: "Level 2", rating: 4.7, reviews: 88, from: 90, hue: 120, summary: "Account setup, audiences, tracking and a first round of tuning, with a plain report at the end.", packages: pkgs(90, 220, 420, ["Account and tracking setup", "Setup plus 2 ad sets", "Setup, 4 ad sets and a weekly report"]) },
  { id: "email-flow", title: "Welcome and follow-up email sequence", category: "Marketing", seller: "Oliver Grant", sellerLevel: "Level 1", rating: 4.6, reviews: 41, from: 70, hue: 85, summary: "A short sequence that welcomes new subscribers and gently guides them to their first purchase.", packages: pkgs(70, 160, 300, ["3 emails", "5 emails with subject line tests", "7 emails, tests and setup in your tool"]) },
  { id: "site-audit", title: "Website speed and usability review", category: "Web", seller: "Priya Nair", sellerLevel: "Level 2", rating: 4.9, reviews: 102, from: 45, hue: 235, summary: "A written review with the top fixes ranked by impact, plus a short call to walk through it.", packages: pkgs(45, 110, 210, ["Review of 1 page", "Review of 5 pages with fix list", "Full review, fix list and 30 minute call"]) },
];

export const STATUSES = ["Placed", "In progress", "Delivered", "Completed"] as const;
export type Status = (typeof STATUSES)[number];

export const money = (v: number) => `$${v.toLocaleString("en-US")}`;
