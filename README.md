# CineScope Client

This is the official frontend for the CineScope movie discovery application, built with **Next.js** and **Tailwind CSS**. It provides a fast, responsive, and modern user interface for browsing and searching for movies, powered by the [CineScope API](https://github.com/Pranavchikte/cinescope-api).



---

## Features

- **Dynamic Homepage:** Displays curated lists of trending, top-rated, and new movies.
- **Advanced Search:** Allows users to search for movies with real-time results.
- **Detailed Movie Pages:** Provides a comprehensive view for each movie, including cast, trailer, and a generated color palette.
- **Responsive Design:** A fully responsive layout that works seamlessly on desktop, tablet, and mobile devices.
- **Performance Optimized:** Utilizes Next.js for server-side optimizations, static rendering, and optimized image loading to ensure a fast user experience.

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **UI Components:** Radix UI & Lucide React
- **Deployment:** Vercel

---

## Setup & Installation

Follow these steps to run the project locally.

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/your-username/cinescope-client.git](https://github.com/your-username/cinescope-client.git)
    cd cinescope-client
    ```

2.  **Install dependencies:**
    This project uses `npm` for package management.
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the project root. This file will contain the URL for the backend API.
    ```env
    # The local URL for your running Flask backend
    NEXT_PUBLIC_API_URL=[http://127.0.0.1:5000](http://127.0.0.1:5000)
    ```

4.  **Run the development server:**
    Make sure your [CineScope API backend](https://github.com/Pranavchikte/cinescope-api) is running first.
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000`.

---
