import Image from "next/image"
import { accessoryBrands } from "@/lib/brands"
import { cn } from "@/lib/utils"

export function BrandMarquee({ className = "" }: { className?: string }) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const loop = [...accessoryBrands, ...accessoryBrands]

  return (
    <div
      className={cn("brand-marquee group relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]", className)}
      aria-label="Accessory brands we carry"
    >
      <ul className="brand-marquee-track">
        {loop.map((brand, i) => (
          <li key={`${brand.name}-${i}`} className="px-6 sm:px-8" aria-hidden={i >= accessoryBrands.length}>
            <div className="flex h-20 w-36 items-center justify-center opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:w-40">
              <Image
                src={brand.logo || "/placeholder.svg"}
                alt={`${brand.name} logo`}
                width={224}
                height={96}
                className={cn(
                  "h-14 w-full object-contain",
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
