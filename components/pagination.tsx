"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type PaginationProps = {
  currentPage: number
  totalPages: number
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const searchParams = useSearchParams()

  const createPageUrl = (page: number) => {
    // Get the current search query from the URL
    const query = searchParams.get("title") || ""
    
    const params = new URLSearchParams()
    // Always include the title query
    params.set("title", query)
    
    if (page > 1) {
      params.set("page", page.toString())
    }

    return `/search?${params.toString()}`
  }

  // --- No changes needed to the rendering logic below this line ---

  const getVisiblePages = () => {
    // This complex logic for displaying pages with '...' is great, no changes needed.
    const delta = 2
    const range = []
    const rangeWithDots: (number | string)[] = []
    let l: number | undefined;

    range.push(1)
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
        if (i < totalPages && i > 1) {
            range.push(i)
        }
    }
    range.push(totalPages)

    for (const i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1)
            } else if (i - l !== 1) {
                rangeWithDots.push("...")
            }
        }
        rangeWithDots.push(i)
        l = i
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <nav className="flex items-center justify-center gap-2" aria-label="Pagination">
      <Link
        href={createPageUrl(Math.max(1, currentPage - 1))}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors",
          currentPage === 1
            ? "border-gray-800 text-gray-500 cursor-not-allowed pointer-events-none"
            : "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 hover:bg-gray-900",
        )}
        aria-disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
      </Link>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => {
          if (typeof page === "string") {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          const isActive = page === currentPage

          return (
            <Link
              key={page}
              href={createPageUrl(page)}
              className={cn(
                "px-3 py-2 text-sm rounded-lg border transition-colors min-w-[40px] text-center",
                isActive
                  ? "border-white bg-white text-black font-medium"
                  : "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 hover:bg-gray-900",
              )}
              aria-current={isActive ? "page" : undefined}
            >
              {page}
            </Link>
          )
        })}
      </div>

      <Link
        href={createPageUrl(Math.min(totalPages, currentPage + 1))}
        className={cn(
          "flex items-center gap-2 px-3 py-2 text-sm rounded-lg border transition-colors",
          currentPage === totalPages
            ? "border-gray-800 text-gray-500 cursor-not-allowed pointer-events-none"
            : "border-gray-700 text-gray-300 hover:text-white hover:border-gray-600 hover:bg-gray-900",
        )}
        aria-disabled={currentPage === totalPages}
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-4 h-4" />
      </Link>
    </nav>
  )
}