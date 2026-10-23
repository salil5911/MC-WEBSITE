import Image from "next/image"
import { Parallax } from "@/components/motion/primitives"

/** Large rounded photo with slow parallax, used as PageHeader media. */
export function HeaderPhoto({
  src,
  alt,
  aspect = "aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5]",
  caption,
}: {
  src: string
  alt: string
  aspect?: string
  caption?: React.ReactNode
}) {
  return (
    <figure className={`relative ${aspect} overflow-hidden rounded-[2rem] bg-white/5`}>
      <Parallax strength={8}>
        <Image src={src} alt={alt} fill priority sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
      </Parallax>
      {caption && (
        <figcaption className="absolute inset-x-4 bottom-4 rounded-2xl bg-black/45 px-5 py-4 text-white backdrop-blur-md">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
