import { GALLERY_IMAGES } from "../data/galleryImages";

export const getStableIndex = (id: string, max: number): number => {
  if (!id) return 0;
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash) % max;
};

export const generateGallery = (id: string): string[] => {
  const index = getStableIndex(id, GALLERY_IMAGES.length);
  const start = (index * 3) % GALLERY_IMAGES.length;

  return Array.from({ length: 5 }, (_, i) =>
    GALLERY_IMAGES[(start + i) % GALLERY_IMAGES.length]
  );
};

export const generateTags = (props: any): string[] => {
  const tags: string[] = [];
  const categories = props.categories || [];

  if (categories.some((c: string) => c.includes("coffee"))) tags.push("Coffee");
  if (categories.some((c: string) => c.includes("tea"))) tags.push("Tea");

  if (props.datasource?.raw?.wifi === "yes") tags.push("Free WiFi");
  if (props.datasource?.raw?.outdoor_seating === "yes")
    tags.push("Outdoor Seating");

  return tags.length ? tags.slice(0, 3) : ["Coffee", "Cozy"];
};

export const generateDescription = (props: any): string => {
  const raw = props.datasource?.raw || {};

  if (raw.description) return raw.description;

  const city = props.city || props.county || "the city";

  return `A wonderful café in ${city}, perfect for coffee and relaxing atmosphere.`;
};

const STORAGE_KEY = "cafeCorner_favorites";
export const MAX_FAVORITES = 10;

export const getFavorites = (): string[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const removeFavoriteCafe = (id: string): string[] => {
  const updated = getFavorites().filter((f) => f !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

export const toggleFavoriteCafe = (id: string): string[] => {
  const favs = getFavorites();

  if (favs.includes(id)) {
    return removeFavoriteCafe(id);
  }

  // Enforce 10-item max — don't add if already full
  if (favs.length >= MAX_FAVORITES) return favs;

  const updated = [...favs, id];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};
