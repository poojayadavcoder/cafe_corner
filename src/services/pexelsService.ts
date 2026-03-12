import { type MoodTag, type FetchGalleryResponse } from "../types/galleryTypes";

const API_KEY = import.meta.env.VITE_IMAGE_API_KEY as string;
const BASE_URL = "https://api.pexels.com/v1/search";

const SPANS = ["tall", "wide", "square"] as const;

const getRandomSpan = (): "tall" | "wide" | "square" => {
  return SPANS[Math.floor(Math.random() * SPANS.length)];
};

interface PexelsPhoto {
  id: number;
  photographer: string;
  src: {
    large: string;
  };
}

interface PexelsResponse {
  photos: PexelsPhoto[];
  total_results: number;
}

export const fetchGalleryImages = async (
  mood: MoodTag | "All",
  page: number = 1,
  perPage: number = 15
): Promise<FetchGalleryResponse> => {

  if (!API_KEY) {
    throw new Error("Missing Pexels API key");
  }

  const query =
    mood === "All"
      ? "cafe coffee shop"
      : `cafe coffee shop ${mood.toLowerCase()}`;

  const url =
    `${BASE_URL}?query=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;

  const res = await fetch(url, {
    headers: {
      Authorization: API_KEY,
    },
  });

  if (!res.ok) {
    throw new Error(`Pexels API error: ${res.status} ${res.statusText}`);
  }

  const data: PexelsResponse = await res.json();

  const photos = data.photos.map((photo) => ({
    id: photo.id.toString(),
    url: photo.src.large,
    cafeName: photo.photographer ?? "Gallery Cafe",
    mood: mood === "All" ? "Cozy" : mood,
    span: getRandomSpan(),
  }));

  return {
    photos,
    totalResults: data.total_results,
  };
};