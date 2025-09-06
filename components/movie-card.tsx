"use client"

import Link from "next/link"
import Image from "next/image" // 1. Import the optimized Image component
import { cn } from "@/lib/utils"

// 2. Update the Movie type to match our API response
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  rating: number;
}

type MovieCardProps = {
  movie: Movie
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <article
        className={cn(
          "group relative bg-black/40 border border-gray-800 rounded-lg overflow-hidden cursor-pointer",
          "transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/50",
        )}
      >
        <div className="relative aspect-[2/3] w-full overflow-hidden">
          {/* 3. Use the Next.js Image component */}
          <Image
            src={movie.poster_url}
            alt={`${movie.title} poster`}
            fill // Use fill to make it cover the parent div
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 192px, 224px" // Optimize image loading
          />

          <div className="absolute top-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded-full border border-gray-600 backdrop-blur-sm">
            {/* 4. Use the 'rating' field from our API */}
            {movie.rating.toFixed(1)}★
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-semibold text-lg mb-2 text-balance">{movie.title}</h3>
              {/* 5. The overview is now the primary text */}
              <p className="text-sm text-gray-200 line-clamp-3 leading-relaxed">{movie.overview}</p>
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}