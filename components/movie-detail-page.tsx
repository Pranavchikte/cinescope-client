"use client"

import Link from "next/link"
import Image from "next/image" // Import Next.js Image component
import { ArrowLeft, Clock, Calendar, Star } from "lucide-react"
import { MovieCard } from "@/components/movie-card"
import { SiteNav } from "@/components/site-nav"

// Define the types to match our API response exactly
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  rating: number;
}

interface DetailedMovie {
  id: number;
  title: string;
  overview: string;
  poster_url: string | null;
  backdrop_url: string | null;
  rating: number;
  release_date: string;
  runtime: number;
  genres: string[];
  cast: { name: string; character: string; profile_path: string | null }[];
  trailer: { key: string; url: string } | null;
  color_palette: string[];
}

type MovieDetailPageProps = {
  movie: DetailedMovie
  similarMovies: Movie[]
}

export function MovieDetailPage({ movie, similarMovies }: MovieDetailPageProps) {
  const formatRuntime = (minutes: number | null) => {
    if (!minutes) return null;
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "TBA";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />

      {/* Hero Section with Backdrop */}
      <div className="relative">
        <div className="absolute inset-0 h-[70vh]">
          {movie.backdrop_url && (
            <Image
              src={movie.backdrop_url}
              alt={`${movie.title} backdrop`}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/" className="inline-flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-1">
                <div className="aspect-[2/3] w-full max-w-md mx-auto lg:mx-0 rounded-lg overflow-hidden shadow-2xl relative">
                  {movie.poster_url && (
                    <Image
                      src={movie.poster_url}
                      alt={`${movie.title} poster`}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              <div className="lg:col-span-2 space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">{movie.title}</h1>

                <div className="flex flex-wrap items-center gap-4 text-gray-300">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(movie.release_date)}</span>
                  </div>
                  {movie.runtime > 0 && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatRuntime(movie.runtime)}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-current text-yellow-400" />
                    <span className="font-semibold">{movie.rating?.toFixed(1)}</span>
                    <span className="text-gray-400">/10</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <span key={genre} className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm">
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold">Overview</h2>
                  <p className="text-gray-300 leading-relaxed text-lg">{movie.overview}</p>
                </div>

                {movie.color_palette?.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">Dominant Colors</h3>
                    <div className="flex gap-2">
                      {movie.color_palette.map((color, index) => (
                        <div
                          key={index}
                          className="w-8 h-8 rounded border border-gray-600 shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cast Section */}
      {movie.cast?.length > 0 && (
        <section className="py-16 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Cast</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {movie.cast.map((actor, index) => (
                <div key={index} className="flex-shrink-0 text-center w-24">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-3 bg-gray-800 relative">
                    {actor.profile_path && (
                      <Image src={actor.profile_path} alt={actor.name} fill className="object-cover" />
                    )}
                  </div>
                  <p className="font-medium text-sm truncate">{actor.name}</p>
                  <p className="text-gray-400 text-xs mt-1 truncate">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trailer Section */}
      {movie.trailer?.key && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">Official Trailer</h2>
            <div className="aspect-video max-w-4xl mx-auto rounded-lg overflow-hidden bg-gray-900">
              <iframe
                src={`https://www.youtube.com/embed/${movie.trailer.key}`}
                title="Movie Trailer"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </section>
      )}

      {/* Similar Movies - currently disabled until backend supports it */}
      {/* <section className="py-16 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </section>
      */}
    </div>
  )
}