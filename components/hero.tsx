import Image from "next/image";
import Link from "next/link";
import { Shield, Clock, Star, ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const trustPoints = [
  { icon: Clock, label: "Most repairs in under an hour" },
  { icon: Shield, label: "30-day warranty on every fix" },
  { icon: CheckCircle2, label: "No appointment needed" },
];

const stats = [
  { value: "1M+", label: "Devices repaired" },
  { value: "4.9", label: "Google rating", star: true },
  { value: "Same day", label: "Most repairs done" },
];

export function Hero({ className = "" }: { className?: string }) {
  return (
    <section className={`relative overflow-hidden bg-brand-dark ${className}`}>
      <div className="absolute inset-0 bg-circuit-pattern opacity-[0.12]" aria-hidden="true" />
      <div
        className="absolute -top-32 right-0 h-[36rem] w-[36rem] rounded-full bg-brand-mint/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-brand-mint/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-24 lg:pt-36">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-brand-mint/30 bg-brand-mint/10 px-4 py-1.5 text-sm font-medium text-brand-mint">
              <Star className="h-4 w-4 fill-brand-mint text-brand-mint" />
              Rated 4.9/5 by 2,000+ customers
            </span>

            <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl xl:text-7xl text-balance">
              Phone repair,{" "}
              <span className="text-brand-mint">done right</span> the first time
            </h1>

            <p className="mt-6 max-w-lg text-lg leading-relaxed text-gray-300 text-pretty">
              From shattered screens to worn-out batteries, our certified
              technicians fix it fast — with premium parts, honest pricing, and
              a warranty you can count on.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/locations">
                <Button className="group w-full rounded-full bg-brand-mint px-7 py-6 text-base font-semibold text-brand-dark shadow-lg shadow-brand-mint/20 hover:bg-brand-mintLight sm:w-auto">
                  <MapPin className="mr-2 h-5 w-5" />
                  Find a Location
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  className="w-full rounded-full border-white/25 bg-white/5 px-7 py-6 text-base font-semibold text-white backdrop-blur-sm hover:bg-white/10 hover:text-white sm:w-auto"
                >
                  Explore Services
                </Button>
              </Link>
            </div>

            <ul className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-6">
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2">
                  <point.icon className="h-5 w-5 flex-shrink-0 text-brand-mint" />
                  <span className="text-sm text-gray-200">{point.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/10">
              <Image
                src="/hero-repair.webp"
                alt="Certified technician repairing a smartphone with precision tools"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent" />

              <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full bg-black/40 px-4 py-2 backdrop-blur-md">
                <span className="flex h-2.5 w-2.5 rounded-full bg-brand-mint" aria-hidden="true">
                  <span className="h-full w-full animate-ping rounded-full bg-brand-mint" />
                </span>
                <span className="text-sm font-medium text-white">
                  Open now &middot; Walk in, we&apos;ll fix it today
                </span>
              </div>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-white/10 pt-10 lg:mt-20">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-brand-mint sm:text-4xl lg:text-5xl">
                  {stat.value}
                  {stat.suffix ?? ""}
                </span>
                <span className="mt-2 block text-sm text-gray-400">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
