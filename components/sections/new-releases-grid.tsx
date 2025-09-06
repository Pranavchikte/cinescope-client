"use client"

import { MovieCard } from "../movie-card"
import type { Movie } from "@/lib/data/movies"

export function NewReleasesGrid({ items }: { items: Movie[] }) {
  if (!items.length) {
    return <p className="text-gray-400">No new releases match your filters.</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((m) => (
        <div key={m.id} className="flex flex-col">
          <MovieCard
            poster={m.poster}
            title={m.title}
            rating={m.rating}
            genres={m.genres}
            description={m.description}
          />
          <p className="mt-2 text-xs text-gray-400">
            Release: <time dateTime={m.releaseDate}>{new Date(m.releaseDate).toLocaleDateString()}</time>
          </p>
        </div>
      ))}
    </div>
  )
}
