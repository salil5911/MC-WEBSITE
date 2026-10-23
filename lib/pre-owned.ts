// Certified pre-owned catalog, organized brand -> series -> models.
// All devices are fully unlocked, never repaired, and covered by a 60-day warranty.

export interface PreOwnedSeries {
  /** Display name, e.g. "iPhone 18 Series" */
  name: string
  /** URL-safe id, unique within a brand, e.g. "iphone-18" */
  slug: string
  /** Landscape lineup photo for the series */
  image: string
  /** One-line professional description of the series */
  blurb: string
  /** Individual models offered within the series */
  models: string[]
}

export interface PreOwnedBrand {
  slug: string
  name: string
  /** Transparent brand logo (no frame) */
  logo: string
  /** Short tagline shown under the brand name */
  tagline: string
  /** Longer description for the brand landing page */
  description: string
  series: PreOwnedSeries[]
}

const SERIES_BASE = "/pre-owned/series"

export const preOwnedBrands: PreOwnedBrand[] = [
  {
    slug: "apple",
    name: "Apple iPhone",
    logo: "/pre-owned/apple.svg",
    tagline: "Certified pre-owned iPhone",
    description:
      "Certified pre-owned iPhones from the iPhone 11 series and up. Every device is fully unlocked, never repaired, and backed by our 60-day warranty.",
    series: [
      {
        name: "iPhone 18 Series",
        slug: "iphone-18",
        image: `${SERIES_BASE}/iphone-18.jpg`,
        blurb: "Apple's newest flagship lineup, featuring the latest chip, camera, and display technology.",
        models: ["iPhone 18 Pro Max", "iPhone 18 Pro", "iPhone Duo", "iPhone 18"],
      },
      {
        name: "iPhone 17 Series",
        slug: "iphone-17",
        image: `${SERIES_BASE}/iphone-17.jpg`,
        blurb: "Powerful performance and pro-grade cameras in a refined, everyday design.",
        models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 17 Air", "iPhone 17"],
      },
      {
        name: "iPhone 16 Series",
        slug: "iphone-16",
        image: `${SERIES_BASE}/iphone-16.png`,
        blurb: "A balanced mix of speed, battery life, and camera quality for any budget.",
        models: ["iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 16 Plus", "iPhone 16"],
      },
      {
        name: "iPhone 15 Series",
        slug: "iphone-15",
        image: `${SERIES_BASE}/iphone-15.png`,
        blurb: "USB-C, the Dynamic Island, and dependable performance at a great value.",
        models: ["iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15"],
      },
      {
        name: "iPhone 14 Series",
        slug: "iphone-14",
        image: `${SERIES_BASE}/iphone-14.png`,
        blurb: "Reliable all-day performance and a proven camera system that still impresses.",
        models: ["iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14"],
      },
      {
        name: "iPhone 13 Series",
        slug: "iphone-13",
        image: `${SERIES_BASE}/iphone-13.png`,
        blurb: "Excellent battery life and a crisp display — a smart, affordable everyday phone.",
        models: ["iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 mini"],
      },
      {
        name: "iPhone 12 Series",
        slug: "iphone-12",
        image: `${SERIES_BASE}/iphone-12.png`,
        blurb: "5G connectivity and a sharp OLED display in a timeless flat-edge design.",
        models: ["iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 mini"],
      },
      {
        name: "iPhone 11 Series",
        slug: "iphone-11",
        image: `${SERIES_BASE}/iphone-11.png`,
        blurb: "A dependable classic with great cameras and long-lasting battery life.",
        models: ["iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11"],
      },
    ],
  },
  {
    slug: "samsung",
    name: "Samsung Galaxy",
    logo: "/pre-owned/samsung.svg",
    tagline: "Certified pre-owned Galaxy S",
    description:
      "Certified pre-owned Samsung Galaxy S phones from the S21 series and up. Every device is fully unlocked, never repaired, and backed by our 60-day warranty.",
    series: [
      {
        name: "Galaxy Z Series",
        slug: "galaxy-z",
        image: `${SERIES_BASE}/galaxy-z.png`,
        blurb: "Samsung's foldable lineup — the book-style Z Fold and the compact Z Flip.",
        models: ["Galaxy Z Fold", "Galaxy Z Flip"],
      },
      {
        name: "Galaxy S26 Series",
        slug: "galaxy-s26",
        image: `${SERIES_BASE}/galaxy-s26.avif`,
        blurb: "Samsung's newest flagship lineup with cutting-edge Galaxy AI and pro cameras.",
        models: ["Galaxy S26 Ultra", "Galaxy S26+", "Galaxy S26"],
      },
      {
        name: "Galaxy S25 Series",
        slug: "galaxy-s25",
        image: `${SERIES_BASE}/galaxy-s25.jpg`,
        blurb: "Galaxy AI, brilliant displays, and all-day power for work and play.",
        models: ["Galaxy S25 Ultra", "Galaxy S25+", "Galaxy S25"],
      },
      {
        name: "Galaxy S24 Series",
        slug: "galaxy-s24",
        image: `${SERIES_BASE}/galaxy-s24.jpg`,
        blurb: "The first Galaxy AI generation, with a versatile camera and stunning screen.",
        models: ["Galaxy S24 Ultra", "Galaxy S24+", "Galaxy S24"],
      },
      {
        name: "Galaxy S23 Series",
        slug: "galaxy-s23",
        image: `${SERIES_BASE}/galaxy-s23.png`,
        blurb: "Flagship performance and a refined design that still holds its own today.",
        models: ["Galaxy S23 Ultra", "Galaxy S23+", "Galaxy S23"],
      },
      {
        name: "Galaxy S22 Series",
        slug: "galaxy-s22",
        image: `${SERIES_BASE}/galaxy-s22.png`,
        blurb: "A sleek, capable phone with a bright display and a reliable camera system.",
        models: ["Galaxy S22 Ultra", "Galaxy S22+", "Galaxy S22"],
      },
      {
        name: "Galaxy S21 Series",
        slug: "galaxy-s21",
        image: `${SERIES_BASE}/galaxy-s21.png`,
        blurb: "A great-value flagship with smooth performance and a vibrant display.",
        models: ["Galaxy S21 Ultra", "Galaxy S21+", "Galaxy S21"],
      },
    ],
  },
]

export function getPreOwnedBrand(slug: string): PreOwnedBrand | undefined {
  return preOwnedBrands.find((brand) => brand.slug === slug)
}
