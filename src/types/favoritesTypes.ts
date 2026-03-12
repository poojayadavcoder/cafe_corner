import type { Cafe } from "./cafeTypes";

export interface FavCardProps {
  cafe: Cafe;
  onRemove: (id: string) => void;
}
