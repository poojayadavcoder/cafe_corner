import type { Cafe, FetchCafesParams } from "../types/cafeTypes";
import { CAFE_IMAGES } from "../data/cafeImages";
import {
  generateTags,
  generateDescription,
  generateGallery,
  getStableIndex
} from "../utils/cafeHelpers";
import { MENU_DATA } from "../data/menuData";

const API_KEY = import.meta.env.VITE_GEOAPIFY_API_KEY as string;

const BASE_URL = "https://api.geoapify.com/v2/places";
const FILTER = "circle:-74.006,40.7128,5000";

type GeoFeature = {
  properties: Record<string, any>;
  geometry?: { coordinates?: [number, number] };
};

const getCafeId = (props: any, index: number) =>
  props.place_id || `place-${index}`;

const mapFeatureToCafe = (feature: GeoFeature, index: number): Cafe => {
  const props = feature.properties;
  const coords = feature.geometry?.coordinates;
  const id = getCafeId(props, index);

  const lon = coords?.[0] ?? props.lon ?? props.lng;
  const lat = coords?.[1] ?? props.lat;

  return {
    id,
    name: props.name || props.address_line1 || "Unknown Café",

    rating: Number((4 + (getStableIndex(id, 10) / 10)).toFixed(1)),
    reviews: 50 + (getStableIndex(id, 250)),

    tags: generateTags(props),
    description: generateDescription(props),

    image: CAFE_IMAGES[getStableIndex(id, CAFE_IMAGES.length)],

    address:
      [props.address_line2, props.city, props.country]
        .filter(Boolean)
        .join(", ") || props.formatted,

    phone:
      props.datasource?.raw?.phone ||
      props.datasource?.raw?.["contact:phone"],

    openingHours:
      props.datasource?.raw?.opening_hours || "Mon–Fri: 8am–8pm",

    coordinates: (lat !== undefined && lon !== undefined)
      ? { lat: Number(lat), lng: Number(lon) }
      : undefined,

    gallery: generateGallery(id)
  };
};

const buildUrl = ({
  query,
  limit,
  offset
}: {
  query?: string;
  limit: number;
  offset: number;
}) => {
  const url = new URL(BASE_URL);

  url.searchParams.append("categories", "catering.cafe");
  url.searchParams.append("filter", FILTER);
  url.searchParams.append("limit", String(limit));
  url.searchParams.append("offset", String(offset));
  url.searchParams.append("apiKey", API_KEY);

  if (query) {
    url.searchParams.append("name", query);
  }

  return url.toString();
};

const sortCafes = (cafes: Cafe[], sortBy?: string) => {
  switch (sortBy) {
    case "rating":
      return cafes.sort((a, b) => b.rating - a.rating);

    case "name":
      return cafes.sort((a, b) => a.name.localeCompare(b.name));

    default:
      return cafes;
  }
};

export const fetchCafes = async (
  params: FetchCafesParams = {}
): Promise<{ cafes: Cafe[]; total: number }> => {

  const {
    query,
    category,
    sortBy = "popularity",
    limit = 8,
    offset = 0
  } = params;

  const url = buildUrl({ query, limit, offset });

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Geoapify error ${res.status}`);
  }

  const data = await res.json();

  if (!data.features) {
    return { cafes: [], total: 0 };
  }

  let cafes: Cafe[] = data.features.map(mapFeatureToCafe);

  if (category && category !== "All") {
    cafes = cafes.filter(cafe => cafe.tags.includes(category));
  }

  cafes = sortCafes(cafes, sortBy);

  return {
    cafes,
    total: cafes.length
  };
};

export const fetchCafeById = async (
  id: string
): Promise<Cafe | null> => {

  const url =
    `https://api.geoapify.com/v2/place-details?id=${id}&apiKey=${API_KEY}`;

  const res = await fetch(url);

  if (res.ok) {
    const data = await res.json();

    if (data.features?.length) {
      return mapFeatureToCafe(data.features[0], 0);
    }
  }

  const { cafes } = await fetchCafes({ limit: 20 });

  return cafes.find(c => String(c.id) === id) || null;
};

export const getMenuForCafe = (_cafeId: string | number) => MENU_DATA;