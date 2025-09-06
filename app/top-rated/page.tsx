"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";
import { SiteNav } from "@/components/site-nav";
import { MovieCard } from "@/components/movie-card";
import { Pagination } from "@/components/pagination";

// Define the types for our data structures
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  rating: number;
}

// NOTE: Our list endpoints don't have pagination, so we simplify the API Response type
interface ApiResponse {
  results: Movie[];
}

// Skeleton loader component for the grid
const SearchSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-800 rounded w-64 mb-2"></div>
    <div className="h-4 bg-gray-800 rounded w-32 mb-8"></div>
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
      ))}
    </div>
  </div>
);

function CategoryPageContent() {
  const pathname = usePathname(); // Hook to get the current URL path

  // State to hold our API response
  const [movies, setMovies] = useState<Movie[]>([]);
  const [pageTitle, setPageTitle] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      
      // Determine the correct API endpoint and title based on the URL
      let endpoint = "";
      let title = "";
      if (pathname.includes("/trending")) {
        endpoint = "/api/v1/movies/popular"; // TMDB uses 'popular' for trending
        title = "Trending Movies";
      } else if (pathname.includes("/new-releases")) {
        endpoint = "/api/v1/movies/upcoming";
        title = "New Releases";
      } else if (pathname.includes("/top-rated")) {
        endpoint = "/api/v1/movies/top-rated";
        title = "Top Rated Movies";
      }
      setPageTitle(title);

      try {
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Failed to fetch ${title}`);
        }
        // Our list endpoints return an array directly
        const responseData: Movie[] = await res.json();
        setMovies(responseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [pathname]); // Re-fetch whenever the path changes

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {isLoading ? (
          <SearchSkeleton />
        ) : error ? (
          <div className="text-center py-16 text-red-500">{error}</div>
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 text-balance">{pageTitle}</h1>
              <p className="text-gray-400 text-sm">
                {movies.length} {movies.length === 1 ? "movie" : "movies"} found
              </p>
            </div>
            
            {movies.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">No movies found for this category.</p>
              </div>
            )}
            
            {/* These pages do not have pagination from our API, so it's removed */}
          </>
        )}
      </main>
    </div>
  );
}

// The main export now just wraps the content in Suspense
export default function CategoryPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <CategoryPageContent />
    </Suspense>
  );
}