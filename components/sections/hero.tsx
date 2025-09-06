"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search } from "lucide-react"
import Image from "next/image" // 1. Import the Image component

export function Hero() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!query.trim()) return
    router.push(`/search?title=${encodeURIComponent(query)}`)
  }

  return (
    <section id="hero" className="relative overflow-hidden min-h-[70vh] flex items-center" aria-label="Cinematic hero">
      <div className="absolute inset-0">
        {/* 2. Replace the broken <img> tag with the optimized <Image> component */}
        <Image
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=2525&auto=format&fit=crop"
          alt="Abstract cinematic background"
          fill
          priority
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-16 md:py-24 lg:py-28">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance leading-tight">
            Discover your next favorite movie
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl">
            Explore a curated collection of cinematic masterpieces, trending hits, and hidden gems.
          </p>
        </div>

        <form onSubmit={handleSearch} className="mt-10">
          <div className="flex items-center gap-3 bg-black/80 border border-gray-700 rounded-lg px-4 py-3 max-w-md backdrop-blur-sm">
            <Search className="w-5 h-5 text-gray-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, genre, or keyword"
              className="w-full bg-transparent outline-none text-base placeholder:text-gray-500 text-white"
              aria-label="Search movies"
            />
          </div>
        </form>
      </div>
    </section>
  )
}