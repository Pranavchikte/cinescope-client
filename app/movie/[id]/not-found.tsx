// In app/movie/[id]/not-found.tsx

import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-4xl font-bold mb-4">Movie Not Found</h2>
        <p className="text-gray-400 mb-8">Sorry, we couldn't find the movie you were looking for.</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 hover:bg-gray-900 transition-colors"
        >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
        </Link>
    </div>
  )
}