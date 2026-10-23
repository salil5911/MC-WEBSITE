import Image from "next/image"
import type { PreOwnedSeries } from "@/lib/pre-owned"

export function SeriesCard({ series }: { series: PreOwnedSeries }) {
  return (
    <article className="group">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.75rem] bg-[#f0eff2]">
        <Image
          src={series.image || "/placeholder.svg"}
          alt={`${series.name} lineup`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 feather-rect transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:scale-105"
        />
      </div>
      <h3 className="mt-6 font-display text-2xl font-semibold text-ink">{series.name}</h3>
      <p className="mt-2 text-lg leading-relaxed text-ink-soft">{series.blurb}</p>
      <p className="mt-3 text-[0.95rem] text-ink-faint">{series.models.join(", ")}</p>
    </article>
  )
}
