export interface StoreLocation {
  slug: string
  name: string
  heading: string
  address: string
  city: string
  state: string
  zip: string
  geo: { lat: number; lng: number }
  nearby: string[]
  phone: string
  hours: { day: string; time: string }[]
  image: string
  badge?: string
  directionsUrl: string
}

export const locations: StoreLocation[] = [
  {
    slug: "cumberland-mall",
    name: "Cumberland Mall",
    heading: "Mobile Phone Repair in Cumberland Mall",
    address: "2860 Cumberland Mall SE #208",
    city: "Atlanta",
    state: "GA",
    zip: "30339",
    geo: { lat: 33.8812, lng: -84.4686 },
    nearby: ["Smyrna", "Vinings", "Marietta", "Sandy Springs", "Mableton"],
    phone: "+1 404 271 6281",
    hours: [
      { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cumberland.jpg-r6o3X74ufd6nWdNblq9vMz1Ig3D8XJ.jpeg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Cumberland+Mall,+2860+Cumberland+Mall+Suite+%23+208,+Atlanta,+GA+30339/",
  },
  {
    slug: "perimeter-mall",
    name: "Perimeter Mall",
    heading: "Mobile Phone Repair in Perimeter Mall",
    address: "4400 Ashford Dunwoody Road #2085",
    city: "Dunwoody",
    state: "GA",
    zip: "30346",
    geo: { lat: 33.9248, lng: -84.3412 },
    nearby: ["Sandy Springs", "Brookhaven", "Chamblee", "Doraville", "Roswell"],
    phone: "+1 470 983 1595",
    hours: [
      { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Perimeter-JGI7ZEPFHx0LZMPyqShJi1dsz4dByj.jpg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Perimeter+Mall,+4400+Ashford+Dunwoody+Rd+Space+%232085,+Dunwoody,+GA+30346/",
  },
  {
    slug: "southlake-mall",
    name: "Southlake Mall",
    heading: "Mobile Phone Repair in Southlake Mall",
    address: "1000 Southlake Circle #1123",
    city: "Morrow",
    state: "GA",
    zip: "30260",
    geo: { lat: 33.5764, lng: -84.3376 },
    nearby: ["Jonesboro", "Riverdale", "Stockbridge", "Forest Park", "Lake City"],
    phone: "+1 470 546 9171",
    hours: [
      { day: "Mon – Sat", time: "10:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/southlake.jpg-cyX67ok0kHYNaPXsFzRqmfNPsFWY33.jpeg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Southlake+Mall,+1000+Southlake+Cir+%231123,+Morrow,+GA+30260/",
  },
  {
    slug: "augusta-mall",
    name: "Augusta Mall",
    heading: "Phone Repair Shop in Augusta Mall",
    address: "3450 Wrightsboro Rd #1125",
    city: "Augusta",
    state: "GA",
    zip: "30909",
    geo: { lat: 33.4733, lng: -82.0838 },
    nearby: ["Martinez", "Evans", "Grovetown", "North Augusta", "Hephzibah"],
    phone: "+1 762 444 9461",
    hours: [
      { day: "Mon – Thu", time: "11:00 AM – 7:00 PM" },
      { day: "Fri – Sat", time: "11:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-1rthSq43p4kpNrDLcfH1wcDlEz8SpR.jpg",
    directionsUrl:
      "https://www.google.com/maps/dir//mobile+care+augusta+mall/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x88f9d39de4ce3a31:0xb9a94f1eb818376f?sa=X&ved=1t:3061&ictx=111",
  },
  {
    slug: "lynnhaven-mall",
    name: "Lynnhaven Mall",
    heading: "Mobile Phone Repair in Lynnhaven Mall",
    address: "701 Lynnhaven Pkwy #B11A",
    city: "Virginia Beach",
    state: "VA",
    zip: "23452",
    geo: { lat: 36.8213, lng: -76.0688 },
    nearby: ["Norfolk", "Chesapeake", "Hilltop", "Kempsville", "Oceanfront"],
    phone: "+1 757 692 1915",
    hours: [
      { day: "Mon – Thu", time: "11:00 AM – 7:00 PM" },
      { day: "Fri – Sat", time: "11:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/lynnhaven.jpg-6s3aZDBwqPpwPuujrrkE9HTbvcZrJs.jpeg",
    badge: "2 kiosks and 1 store",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Lynnhaven+Mall,+701+Lynnhaven+Pkwy,+Virginia+Beach,+VA+23452/",
  },
  {
    slug: "carolina-place-mall",
    name: "Carolina Place Mall",
    heading: "Mobile Phone Repair in Carolina Place Mall",
    address: "11025 Carolina Pl Pkwy Suite # A04",
    city: "Pineville",
    state: "NC",
    zip: "28134",
    geo: { lat: 35.0599, lng: -80.8508 },
    nearby: ["Charlotte", "Ballantyne", "Matthews", "Fort Mill", "Indian Land"],
    phone: "+1 704 670 8479",
    hours: [
      { day: "Mon – Thu", time: "11:00 AM – 7:00 PM" },
      { day: "Fri – Sat", time: "11:00 AM – 8:00 PM" },
      { day: "Sunday", time: "12:00 PM – 6:00 PM" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carolina%20place%20mall.jpg-LColFtaGmCqrSK6WTwRMvNbpLz887Y.jpeg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Carolina+Place+Mall,+11025+Carolina+Pl+Pkwy+Suite+%23+A04,+Pineville,+NC+28134/",
  },
  {
    slug: "twelve-oaks-mall",
    name: "Twelve Oaks Mall",
    heading: "Mobile Phone Repair in Twelve Oaks Mall",
    address: "27500 Novi Rd STE A-109",
    city: "Novi",
    state: "MI",
    zip: "48377",
    geo: { lat: 42.4917, lng: -83.47 },
    nearby: ["Northville", "Wixom", "Farmington Hills", "Commerce Township", "Walled Lake"],
    phone: "+1 248 216 2374",
    hours: [
      { day: "Mon – Thu", time: "10:00 AM – 8:00 PM" },
      { day: "Fri – Sat", time: "10:00 AM – 9:00 PM" },
      { day: "Sunday", time: "11:00 AM – 6:00 PM" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Twelve%20Oaks-YHgbCmCrgSTfTx83HNrhItKnR9TeKG.jpeg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Twelve+Oaks+Mall,+27500+Novi+Rd+STE+A-109,+Novi,+MI+48377/",
  },
  {
    slug: "great-lakes-crossing",
    name: "Great Lakes Crossing",
    heading: "Mobile Phone Repair in Great Lakes Crossing",
    address: "4000 Baldwin Rd",
    city: "Auburn Hills",
    state: "MI",
    zip: "48326",
    geo: { lat: 42.7068, lng: -83.2984 },
    nearby: ["Rochester Hills", "Lake Orion", "Pontiac", "Clarkston", "Troy"],
    phone: "+1 248 520 4170",
    hours: [
      { day: "Mon – Sat", time: "10:00 AM – 9:00 PM" },
      { day: "Sunday", time: "11:00 AM – 7:00 PM" },
    ],
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Great%20lakes-xTbZkQdvDkcYpC3V4irVkwODaOrc2J.jpeg",
    directionsUrl:
      "https://www.google.com/maps/dir//Mobile+Care+Great+Lakes+Crossing,+4000+Baldwin+Rd,+Auburn+Hills,+MI+48326/",
  },
]

export function getLocation(slug: string): StoreLocation | undefined {
  return locations.find((l) => l.slug === slug)
}
