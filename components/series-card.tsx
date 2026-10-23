import Image from "next/image"
import type { PreOwnedSeries } from "@/lib/pre-owned"

export function SeriesCard({ series }: { series: PreOwnedSeries }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-white p-6">
        <Image
          src={series.image || "/placeholder.svg"}
          alt={`${series.name} lineup`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-contain transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 border-t border-border/60 p-5">
        <h3 className="font-display text-lg font-bold text-brand-dark">{series.name}</h3>
        <p className="text-sm leading-relaxed text-gray-600">{series.blurb}</p>
        <ul className="mt-1 flex flex-wrap gap-2">
          {series.models.map((model) => (
            <li
              key={model}
              className="rounded-full bg-brand-cream px-3 py-1 text-xs font-medium text-brand-dark/80"
            >
              {model}
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
