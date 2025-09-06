"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

interface ApiResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
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

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("title") || ""; // Corrected to 'title'
  const page = searchParams.get("page") || "1";

  // State to hold our API response
  const [data, setData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Construct the API URL with query parameters
        const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/search?title=${query}&page=${page}`;
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error("Failed to fetch search results");
        }
        const responseData: ApiResponse = await res.json();
        setData(responseData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [query, page]); // Re-fetch whenever the query or page changes

  // Dynamic title generation
  const pageTitle = `Search Results for "${query}"`;

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
                {data?.total_results} {data?.total_results === 1 ? "movie" : "movies"} found
              </p>
            </div>
            
            {data && data.results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6 mb-12">
                {data.results.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-400 text-lg mb-4">No movies found</p>
                <p className="text-gray-500 text-sm">Try adjusting your search terms.</p>
              </div>
            )}

            {data && data.total_pages > 1 && (
              <Pagination currentPage={data.page} totalPages={data.total_pages} />
            )}
          </>
        )}
      </main>
    </div>
  );
}

// The main export now just wraps the content in Suspense
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchSkeleton />}>
      <SearchContent />
    </Suspense>
  );
}