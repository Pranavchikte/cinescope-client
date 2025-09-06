export type Movie = {
    id: number
    title: string
    poster_path: string
    vote_average: number
    overview: string
    genres: string[]
    release_date?: string
    trending?: boolean
    isNew?: boolean
}

export const movies: Movie[] = [
    {
        id: 1,
        title: "Shadow Lines",
        poster_path: "/noir-film-poster-shadow-lines-grayscale.jpg",
        vote_average: 8.7,
        overview: "A detective unravels a conspiracy that blurs the lines between truth and illusion.",
        genres: ["Thriller", "Drama"],
        release_date: "2025-08-10",
        trending: true,
        isNew: true,
    },
    {
        id: 2,
        title: "Echoes in the Fog",
        poster_path: "/cinematic-poster-fog-city-grayscale.jpg",
        vote_average: 8.9,
        overview: "Two estranged siblings return home to confront their past in a city swallowed by fog.",
        genres: ["Drama"],
        release_date: "2025-07-22",
        trending: true,
        isNew: true,
    },
    {
        id: 3,
        title: "Neon Silence",
        poster_path: "/urban-night-neon-grayscale-poster.jpg",
        vote_average: 7.9,
        overview: "In a near-future metropolis, a sound engineer discovers a signal that changes reality.",
        genres: ["Sci-Fi", "Thriller"],
        release_date: "2025-09-01",
        trending: true,
        isNew: true,
    },
    {
        id: 4,
        title: "Glass Garden",
        poster_path: "/mysterious-forest-glass-greenhouse-grayscale.jpg",
        vote_average: 8.3,
        overview: "A botanist cultivates a secret that could save—or doom—the last garden on earth.",
        genres: ["Drama", "Thriller"],
        release_date: "2025-05-18",
        trending: true,
    },
    {
        id: 5,
        title: "Paper Skies",
        poster_path: "/paper-airplanes-clouds-grayscale-poster.jpg",
        vote_average: 7.2,
        overview: "An office prank spirals into a citywide treasure hunt that brings strangers together.",
        genres: ["Comedy", "Drama"],
        release_date: "2025-03-02",
    },
    {
        id: 6,
        title: "Static",
        poster_path: "/tv-static-retro-screen-grayscale.jpg",
        vote_average: 9.1,
        overview: "A late-night radio host receives a call from the future and must change the past.",
        genres: ["Thriller"],
        release_date: "2024-12-11",
        trending: true,
    },
    {
        id: 7,
        title: "Lunar Echo",
        poster_path: "/moon-surface-astronaut-grayscale-poster.jpg",
        vote_average: 8.5,
        overview: "Isolation on a lunar outpost forces a scientist to confront memories that aren't hers.",
        genres: ["Sci-Fi", "Drama"],
        release_date: "2025-06-07",
        isNew: true,
    },
    {
        id: 8,
        title: "Midnight Courier",
        poster_path: "/motorcycle-night-rain-grayscale.jpg",
        vote_average: 7.8,
        overview: "A courier on the night shift stumbles into a high-stakes chase across the city.",
        genres: ["Action", "Thriller"],
        release_date: "2025-01-26",
    },
    {
        id: 9,
        title: "Silent Harbor",
        poster_path: "/abandoned-harbor-boats-grayscale.jpg",
        vote_average: 8.0,
        overview: "A coastal town harbors a secret that resurfaces with the tide.",
        genres: ["Drama"],
        release_date: "2024-10-05",
    },
    {
        id: 10,
        title: "Circuit Hearts",
        poster_path: "/robot-hand-human-hand-grayscale-poster.jpg",
        vote_average: 8.8,
        overview: "Two engineers bridge the gap between machine and emotion through a bold experiment.",
        genres: ["Sci-Fi", "Drama"],
        release_date: "2025-04-12",
        trending: true,
        isNew: true,
    },
    {
        id: 11,
        title: "City of Mirth",
        poster_path: "/street-comedy-mask-grayscale-poster.jpg",
        vote_average: 7.4,
        overview: "A stand-up comic navigates the blurry line between punchlines and truth.",
        genres: ["Comedy"],
        release_date: "2025-08-01",
        isNew: true,
    },
    {
        id: 12,
        title: "Fractured Frames",
        poster_path: "/shattered-glass-portrait-grayscale.jpg",
        vote_average: 9.0,
        overview: "An art curator decodes hidden messages inside stolen paintings.",
        genres: ["Thriller"],
        release_date: "2024-11-22",
    },
    {
        id: 13,
        title: "Analog Summer",
        poster_path: "/vintage-camera-seaside-grayscale-poster.jpg",
        vote_average: 7.6,
        overview: "A small town rediscovers itself through a film photography contest.",
        genres: ["Comedy", "Drama"],
        release_date: "2025-07-15",
        isNew: true,
    },
    {
        id: 14,
        title: "Iron Horizon",
        poster_path: "/train-bridge-horizon-grayscale-poster.jpg",
        vote_average: 8.2,
        overview: "A heist aboard a transcontinental train becomes a fight for survival.",
        genres: ["Action", "Thriller"],
        release_date: "2024-09-09",
    },
]

export type DetailedMovie = Movie & {
    backdrop_path?: string
    runtime?: number
    credits?: {
        cast: Array<{
            name: string
            profile_path?: string
            character?: string
        }>
    }
    videos?: {
        results: Array<{
            key: string
            type: string
            name?: string
        }>
    }
    dominantColors?: string[]
}

export function getDetailedMovie(id: number): DetailedMovie | null {
    const movie = movies.find((m) => m.id === id)
    if (!movie) return null

    // Enhanced movie data with additional details for the detail page
    const detailedMovie: DetailedMovie = {
        ...movie,
        backdrop_path: movie.poster_path, // Using poster as backdrop for now
        runtime: Math.floor(Math.random() * 60) + 90, // Random runtime between 90-150 minutes
        credits: {
            cast: [
                { name: "Emma Stone", profile_path: "/actress-portrait.png", character: "Sarah Mitchell" },
                { name: "Ryan Gosling", profile_path: "/actor-portrait.png", character: "David Chen" },
                { name: "Mahershala Ali", profile_path: "/actor-portrait-2.jpg", character: "Detective Rodriguez" },
                { name: "Saoirse Ronan", profile_path: "/actress-portrait-2.jpg", character: "Maya Thompson" },
                { name: "Oscar Isaac", profile_path: "/actor-portrait-3.jpg", character: "Dr. Williams" },
            ],
        },
        videos: {
            results: [{ key: "dQw4w9WgXcQ", type: "Trailer", name: "Official Trailer" }],
        },
        dominantColors: ["#2D2D2D", "#4A4A4A", "#6B6B6B", "#8E8E8E", "#B1B1B1", "#D4D4D4"],
    }

    return detailedMovie
}

export function getSimilarMovies(currentMovieId: number, limit = 6): Movie[] {
    return movies
        .filter((movie) => movie.id !== currentMovieId)
        .sort(() => Math.random() - 0.5)
        .slice(0, limit)
}
