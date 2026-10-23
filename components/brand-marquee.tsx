import Image from "next/image"
import { accessoryBrands } from "@/lib/brands"
import { cn } from "@/lib/utils"

export function BrandMarquee() {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...accessoryBrands, ...accessoryBrands]

  return (
    <div
      className="brand-marquee group relative overflow-hidden"
      aria-label="Accessory brands we carry"
    >
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent sm:w-24" />

      <ul className="brand-marquee-track">
        {loop.map((brand, i) => (
          <li key={`${brand.name}-${i}`} className="px-6 sm:px-8" aria-hidden={i >= accessoryBrands.length}>
            <div className="flex h-28 w-52 items-center justify-center transition-transform duration-300 hover:-translate-y-1 sm:w-56">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={224}
                height={96}
                className={cn(
                  "h-20 w-full object-contain",
                  brand.dark ? "" : "mix-blend-multiply",
                )}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
