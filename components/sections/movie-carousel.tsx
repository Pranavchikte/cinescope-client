import { MovieCard } from "../movie-card"

// Define a type for our movie data
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  rating: number;
}

type MovieCarouselProps = {
  title: string;
  movies: Movie[];
  isLoading: boolean; // 1. Add isLoading to the props
}

// 2. Create a simple Skeleton Card component
const SkeletonCard = () => (
  <div className="flex-none w-48 md:w-56">
    <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
  </div>
);

export function MovieCarousel({ title, movies, isLoading }: MovieCarouselProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>

      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-4 carousel-container scroll-smooth">
          {/* 3. Conditional rendering logic */}
          {isLoading ? (
            // If loading, show 5 skeleton cards
            Array.from({ length: 5 }).map((_, index) => <SkeletonCard key={index} />)
          ) : (
            // If not loading, show the actual movie cards
            movies.map((movie) => (
              <div key={movie.id} className="flex-none w-48 md:w-56">
                <MovieCard movie={movie} />
              </div>
            ))
          )}
        </div>

        {/* Fade effect on right edge */}
        <div className="absolute top-0 right-0 bottom-4 w-8 bg-gradient-to-l from-black to-transparent pointer-events-none" />
      </div>
    </div>
  )
}