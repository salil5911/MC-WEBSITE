export type Brand = {
  name: string
  logo: string
  /** Render on a dark tile when the logo artwork is light-on-dark */
  dark?: boolean
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
  { name: "Pelican", logo: "/brands/pelican.webp", dark: true },
  { name: "Speck", logo: "/brands/speck.webp" },
  { name: "Spigen", logo: "/brands/spigen.webp" },
  { name: "ZAGG", logo: "/brands/zagg.avif" },
]
