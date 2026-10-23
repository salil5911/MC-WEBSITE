export type Brand = {
  name: string
  logo: string
}

export const accessoryBrands: Brand[] = [
  { name: "Anker", logo: "/brands/anker.webp" },
  { name: "Belkin", logo: "/brands/belkin.webp" },
  { name: "Case-Mate", logo: "/brands/case-mate.webp" },
  { name: "JBL", logo: "/brands/jbl.webp" },
  { name: "ITSKINS", logo: "/brands/itskins.webp" },
  { name: "Kate Spade", logo: "/brands/kate-spade.webp" },
  { name: "OtterBox", logo: "/brands/otterbox.webp" },
  { name: "mophie", logo: "/brands/mophie.webp" },
  { name: "Prodigee", logo: "/brands/prodigee.avif" },
  { name: "Pelican", logo: "/brands/pelican.webp" },
  { name: "Speck", logo: "/brands/speck.webp" },
  { name: "Spigen", logo: "/brands/spigen.webp" },
  { name: "ZAGG", logo: "/brands/zagg.avif" },
]

/**
 * White, transparent version of a logo for dark backgrounds, generated from
 * the original artwork into a sibling "mono" folder (same name, .webp).
 */
export function monoLogo(logo: string) {
  const slash = logo.lastIndexOf("/")
  return `${logo.slice(0, slash)}/mono/${logo.slice(slash + 1).replace(/\.\w+$/, ".webp")}`
}
