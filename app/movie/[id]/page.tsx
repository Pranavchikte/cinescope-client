"use client"

import { useState, useEffect } from "react";
import { MovieDetailPage } from "@/components/movie-detail-page";

// Define the detailed movie type based on our API response
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

// Skeleton loader for the detail page
const DetailPageSkeleton = () => (
  <div className="min-h-screen bg-black animate-pulse">
    <div className="w-full h-14 bg-gray-900"></div>
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3">
          <div className="aspect-[2/3] bg-gray-800 rounded-lg"></div>
        </div>
        <div className="w-full md:w-2/3">
          <div className="h-10 bg-gray-800 rounded w-3/4 mb-4"></div>
          <div className="h-6 bg-gray-800 rounded w-1/2 mb-6"></div>
          <div className="h-20 bg-gray-800 rounded w-full"></div>
        </div>
      </div>
    </div>
  </div>
);


export default function MoviePage({ params }: { params: { id: string } }) {
  const [movie, setMovie] = useState<DetailedMovie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/${params.id}`);

        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Movie not found");
          }
          throw new Error("Failed to fetch movie details");
        }

        const data: DetailedMovie = await res.json();
        setMovie(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchMovieDetails();
    }
  }, [params.id]); // Re-fetch if the ID in the URL changes

  if (isLoading) {
    return <DetailPageSkeleton />;
  }

  if (error) {
    // We will use our dedicated not-found page for 404s
    if (error === "Movie not found") {
       // Note: In newer Next.js, you might need to use the notFound() function from 'next/navigation'
       // For now, a simple message is fine.
       return <div>Movie not found.</div>
    }
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }
  
  // For now, we will pass an empty array for similar movies
  return movie ? <MovieDetailPage movie={movie} similarMovies={[]} /> : null;
}