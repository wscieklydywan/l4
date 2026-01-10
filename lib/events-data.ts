export const events = [
  {
    id: 1,
    title: "TECHNO NIGHT",
    date: "2026-01-10",
    time: "22:00",
    dj: "DJ Matrix",
    genre: "Techno",
    description: "Niezapomniana noc z najlepszym techno w regionie",
    image: "/techno-dj-performing-dark-club.jpg",
    price: "30 PLN",
    featured: true,
  },
  {
    id: 2,
    title: "HOUSE VIBES",
    date: "2026-01-17",
    time: "22:00",
    dj: "Anna K",
    genre: "House",
    description: "Głęboki house i progresywne brzmienia",
    image: "/house-music-party-dancing-crowd.jpg",
    price: "25 PLN",
    featured: false,
  },
  {
    id: 3,
    title: "HIP-HOP EDITION",
    date: "2026-01-24",
    time: "21:00",
    dj: "MC Flow & DJ Beats",
    genre: "Hip-Hop",
    description: "Najgorętsze bity i rap na żywo",
    image: "/hip-hop-party-dj-booth.jpg",
    price: "35 PLN",
    featured: true,
  },
  {
    id: 4,
    title: "RETRO PARTY",
    date: "2026-01-31",
    time: "21:00",
    dj: "DJ Classic",
    genre: "Retro/Disco",
    description: "Najlepsze hity lat 80. i 90.",
    image: "/retro-disco-party-colorful-lights.jpg",
    price: "20 PLN",
    featured: false,
  },
]

export type Event = (typeof events)[number]

export function getEventByDate(dateStr: string): Event | undefined {
  return events.find((e) => e.date === dateStr)
}

export function getEventDates(): Date[] {
  return events.map((e) => new Date(e.date))
}
