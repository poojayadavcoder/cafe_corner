export type MoodTag = "Cozy" | "Vintage" | "Modern" | "Rustic" | "Minimalist";

export interface GalleryPhoto {
  id: string;
  url: string;
  cafeName: string;
  mood: MoodTag;
  /** rough aspect ratio hint for masonry sizing: "tall" | "wide" | "square" */
  span: "tall" | "wide" | "square";
}

export const MOOD_TAGS: MoodTag[] = ["Cozy", "Vintage", "Modern", "Rustic", "Minimalist"];

export interface FetchGalleryResponse {
  photos: GalleryPhoto[];
  totalResults: number;
}

export interface PhotoCardProps {
  photo: GalleryPhoto;
  bookmarked: boolean;
  onOpen: (photo: GalleryPhoto) => void;
  onBookmark: (id: string) => void;
}

export interface LightboxProps {
  photo: GalleryPhoto;
  bookmarked: boolean;
  onClose: () => void;
  onBookmark: (id: string) => void;
  onPrev: () => void;
  onNext: () => void;
}
