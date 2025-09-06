"use client"

import { MovieCard } from "../movie-card"
import type { Movie } from "@/lib/data/movies"
import { useRef } from "react"

export function TrendingRow({ items }: { items: Movie[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (delta: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollBy({ left: delta, behavior: "smooth" })
  }

  if (!items.length) {
    return <p className="text-gray-400">No trending movies match your filters.</p>
  }

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-3">
        <div className="sr-only">Horizontal carousel controls</div>
        <div className="flex gap-2 ml-auto">
          <button
            aria-label="Scroll left"
            onClick={() => scrollBy(-400)}
            className="rounded-md border border-gray-800 bg-black/50 text-gray-200 hover:bg-black/70 px-3 py-1"
          >
            ←
          </button>
          <button
            aria-label="Scroll right"
            onClick={() => scrollBy(400)}
            className="rounded-md border border-gray-800 bg-black/50 text-gray-200 hover:bg-black/70 px-3 py-1"
          >
            →
          </button>
        </div>
      </div>
      <div ref={scrollerRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2 pr-2">
        {items.map((m) => (
          <div key={m.id} className="w-48 md:w-56 lg:w-60 shrink-0">
            <MovieCard
              poster={m.poster}
              title={m.title}
              rating={m.rating}
              genres={m.genres}
              description={m.description}
              subtle
            />
          </div>
        ))}
      </div>
    </div>
  )
}
