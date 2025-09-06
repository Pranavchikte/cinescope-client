"use client"

import type { Movie } from "@/lib/data/movies"

export function TopTenList({ items }: { items: Movie[] }) {
  return (
    <ol className="space-y-3">
      {items.map((m, idx) => (
        <li key={m.id} className="flex items-center gap-4 bg-black/40 border border-gray-800 rounded-lg p-3 md:p-4">
          <div className="w-8 h-8 flex items-center justify-center rounded bg-black/60 border border-gray-800 text-gray-200">
            {idx + 1}
          </div>
          <div className="flex-1">
            <p className="font-medium">{m.title}</p>
            <p className="text-xs text-gray-400">{m.genres.join(" • ")}</p>
          </div>
          <div className="text-sm text-gray-300">{m.rating.toFixed(1)}★</div>
        </li>
      ))}
    </ol>
  )
}
