"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react" // 1. Import the Menu icon

const links = [
  { href: "/trending", label: "Trending" },
  { href: "/new-releases", label: "New Releases" },
  { href: "/top-rated", label: "Top Rated" },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)
  
  return (
    <header className="sticky top-0 z-40 bg-black/70 backdrop-blur supports-[backdrop-filter]:bg-black/60 border-b border-gray-900">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 md:px-6 h-14">
        <Link href="/" className="font-semibold tracking-tight text-white">
          CineScope
          <span className="sr-only">Home</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-300">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        {/* 2. Replace the three <span> tags with the Menu icon component */}
        <button
          className="md:hidden text-gray-300 hover:text-white"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-gray-900 px-4 pb-4">
          <nav className="flex flex-col gap-3 py-3 text-sm text-gray-300">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}