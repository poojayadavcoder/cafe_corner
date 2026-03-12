
export interface Cafe {
  id: string | number;
  name: string;
  rating: number;
  reviews: number;
  tags: string[];
  description: string;
  image: string;
  address?: string;
  phone?: string;
  openingHours?: string;
  coordinates?: { lat: number; lng: number };
  gallery?: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
}

export interface MenuCategory {
  name: string;
  items: MenuItem[];
}

export interface MenuSectionProps {
  menu: MenuCategory[];
}

export interface MenuItemCardProps {
  item: MenuItem;
}

export interface FetchCafesParams {
  query?: string;
  category?: string;
  sortBy?: "rating" | "name" | "popularity";
  limit?: number;
  offset?: number;
}

export interface Review {
  id: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface ReviewsSectionProps {
  cafeId: string | number;
}

export interface ReviewCardProps {
  review: Review;
}

export interface StarPickerProps {
  value: number;
  onChange: (value: number) => void;
}

export interface PhotoGalleryProps {
  images: string[];
  cafeName: string;
}

export interface CafeInfoProps {
  cafe: Cafe;
}

export interface MapCoordinates {
  lat: number;
  lng: number;
}

export interface MapSectionProps {
  coordinates?: MapCoordinates;
  address?: string;
  cafeName: string;
}