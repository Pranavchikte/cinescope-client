"use client"

import type { Movie } from "@/lib/data/movies"
import { MovieCard } from "../movie-card"

export function RecentlyWatchedSection({ items }: { items: Movie[] }) {
  if (!items.length) {
    return <p className="text-gray-400">You haven’t watched anything yet.</p>
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {items.map((m) => (
        <div
          key={m.id}
          className="grid grid-cols-3 gap-4 bg-black/40 border border-gray-800 rounded-lg p-3 md:p-4 items-center"
        >
          <div className="col-span-1">
            <MovieCard
              poster={m.poster}
              title={m.title}
              rating={m.rating}
              genres={m.genres}
              description={m.description}
              subtle
            />
          </div>
          <div className="col-span-2 flex flex-col justify-center">
            <h4 className="font-medium">{m.title}</h4>
            <p className="text-sm text-gray-300 line-clamp-2">{m.description}</p>
            <div className="mt-3">
              <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden" aria-label="Watch progress">
                <div className="h-full bg-gray-200" style={{ width: `${m.watchedProgress ?? 0}%` }} />
              </div>
              <div className="mt-1 text-xs text-gray-400">{m.watchedProgress}% watched</div>
            </div>
            <div className="mt-3">
              <button className="px-3 py-1.5 rounded-md bg-white text-black text-sm hover:bg-gray-100 transition-colors">
                Continue
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
