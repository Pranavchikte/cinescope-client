"use client"

import { useState, useEffect } from "react"
import { Hero } from "./sections/hero"
import { MovieCarousel } from "./sections/movie-carousel"
import { SiteNav } from "./site-nav"

// Define a type for our movie data for TypeScript
interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_url: string;
  rating: number;
}

export default function LandingPage() {
  // State for each movie list
  const [trending, setTrending] = useState<Movie[]>([]);
  const [newReleases, setNewReleases] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  
  // A loading state to show placeholders while we fetch data
  const [isLoading, setIsLoading] = useState(true);

  // useEffect hook to fetch data when the component mounts
  useEffect(() => {
    // Define an async function to fetch all data
    const fetchAllMovies = async () => {
      try {
        // Set loading to true before starting
        setIsLoading(true);

        // Fetch all three endpoints in parallel for better performance
        const [trendingRes, upcomingRes, topRatedRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/popular`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/upcoming`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/movies/top-rated`)
        ]);

        // Parse the JSON for all responses
        const trendingData = await trendingRes.json();
        const upcomingData = await upcomingRes.json();
        const topRatedData = await topRatedRes.json();

        // Update our state with the data from the API
        setTrending(trendingData);
        setNewReleases(upcomingData);
        setTopRated(topRatedData);
        
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        // Handle error state if necessary (e.g., show an error message)
      } finally {
        // Set loading to false after fetching is complete
        setIsLoading(false);
      }
    };

    fetchAllMovies();
  }, []); // The empty dependency array [] means this runs only once on mount

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteNav />
      {/* For now, we are disabling the search functionality on the homepage */}
      <Hero />

      <main>
        <section id="trending" className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <MovieCarousel title="Trending Now" movies={trending} isLoading={isLoading} />
        </section>

        <section id="new" className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <MovieCarousel title="New Releases" movies={newReleases} isLoading={isLoading} />
        </section>

        <section id="top" className="px-4 md:px-8 lg:px-12 py-8 md:py-12">
          <MovieCarousel title="Top Rated" movies={topRated} isLoading={isLoading} />
        </section>
      </main>

      <footer className="px-4 md:px-8 lg:px-12 py-8 border-t border-gray-800 text-gray-400">
        <div className="max-w-6xl mx-auto text-sm">
          <p>© {new Date().getFullYear()} CineScope. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}