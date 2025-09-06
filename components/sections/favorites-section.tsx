"use client"

import { MovieCard } from "../movie-card"
import type { Movie } from "@/lib/data/movies"

export function FavoritesSection({ items }: { items: Movie[] }) {
  if (!items.length) {
    return <p className="text-gray-400">No favorites yet. Start adding movies you love.</p>
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {items.map((m) => (
        <MovieCard
          key={m.id}
          poster={m.poster}
          title={m.title}
          rating={m.rating}
          genres={m.genres}
          description={m.description}
        />
      ))}
    </div>
  )
}
