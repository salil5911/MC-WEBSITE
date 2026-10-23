import Image from "next/image"
import type { PreOwnedSeries } from "@/lib/pre-owned"

export function SeriesCard({ series }: { series: PreOwnedSeries }) {
  return (
    <article className="group flex h-full flex-col bg-white">
      <div className="relative aspect-[4/3] w-full p-6">
        <Image
          src={series.image || "/placeholder.svg"}
          alt={`${series.name} lineup`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain p-6 transition-transform duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col border-t border-ink/10 p-6">
        <h3 className="font-display text-xl font-medium text-ink">{series.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{series.blurb}</p>
        <p className="mt-4 font-mono text-[0.7rem] uppercase leading-relaxed tracking-[0.1em] text-ink-faint">
          {series.models.join(" / ")}
        </p>
      </div>
    </article>
  )
}
