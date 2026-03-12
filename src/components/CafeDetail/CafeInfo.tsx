import { memo, useState, useEffect } from "react";
import {
  HiHeart,
  HiOutlineHeart,
  HiStar,
  HiLocationMarker,
  HiPhone,
  HiClock
} from "react-icons/hi";

import { useTheme } from "../../hooks/useTheme";
import type { CafeInfoProps } from "../../types/cafeTypes";
import { getFavorites, toggleFavoriteCafe } from "../../utils/cafeHelpers";

import type { IconType } from "react-icons";

type InfoItemProps = {
  icon: IconType;
  label: string;
  value: string;
  isDark: boolean;
};

const InfoItem = memo(function InfoItem({
  icon: Icon,
  label,
  value,
  isDark
}: InfoItemProps) {
  const labelStyle = isDark ? "text-[#FF8904]" : "text-[#FF8904] font-semibold";
  const valueStyle = isDark ? "text-white/80 font-semibold" : "text-[#4A2C2A] font-semibold";
  const iconBg = isDark ? "bg-white/10" : "bg-[#FFF4E6]";

  return (
    <div className="flex items-start gap-4">
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className="w-5 h-5 text-[#E67E22]" />
      </div>

      <div>
        <p className={`text-xs font-bold uppercase tracking-widest mb-0.5 ${labelStyle}`}>
          {label}
        </p>
        <p className={`font-semibold text-sm ${valueStyle}`}>{value}</p>
      </div>
    </div>
  );
});

type StarRatingProps = {
  rating: number;
  isDark: boolean;
};

const StarRating = memo(function StarRating({ rating, isDark }: StarRatingProps) {
  const filledStars = Math.round(rating);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <HiStar
            key={star}
            className={`w-5 h-5 ${
              star <= filledStars
                ? "text-[#E67E22]"
                : isDark
                ? "text-white/10"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>

      <span className={`font-black text-sm ml-1 ${isDark ? "text-white" : "text-[#4A2C2A]"}`}>
        {rating.toFixed(1)}
      </span>
    </div>
  );
});

const CafeInfo = memo(function CafeInfo({ cafe }: CafeInfoProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cafeId = String(cafe.id);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    setIsFavorite(favorites.includes(cafeId));
  }, [cafeId]);

  const handleToggleFavorite = () => {
    const updated = toggleFavoriteCafe(cafeId);
    setIsFavorite(updated.includes(cafeId));
  };

  const containerStyle = isDark
    ? "bg-white/5 border-white/10 shadow-none"
    : "bg-white border-transparent";

  const titleStyle = isDark ? "text-white" : "text-[#4A2C2A]";

  const descriptionStyle = isDark ? "text-white/60" : "text-[#4A2C2A]/70";

  const dividerStyle = isDark ? "border-white/10" : "border-[#4A2C2A]/5";

  return (
    <div
      className={`rounded-[40px] p-10 shadow-2xl transition-all duration-500 border ${containerStyle}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-6 mb-6">
        <h1 className={`text-4xl md:text-5xl font-black monFont leading-[1.1] ${titleStyle}`}>
          {cafe.name}
        </h1>

        <button
          onClick={handleToggleFavorite}
          className={`shrink-0 w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all active:scale-90 ${
            isFavorite
              ? "bg-red-50 border-red-400 text-red-500 shadow-lg shadow-red-200"
              : isDark
              ? "bg-white/5 border-white/10 text-white/40 hover:border-red-500/50 hover:text-red-500"
              : "bg-gray-50 border-gray-200 text-gray-400 hover:border-red-300 hover:text-red-400"
          }`}
        >
          {isFavorite ? (
            <HiHeart className="w-7 h-7" />
          ) : (
            <HiOutlineHeart className="w-7 h-7" />
          )}
        </button>
      </div>


      <div className="flex items-center gap-4 mb-8">
        <StarRating rating={Number(cafe.rating)} isDark={isDark} />

        <div className={`w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-gray-300"}`} />

        <span className={`text-sm font-bold ${isDark ? "text-white/40" : "text-[#4A2C2A]/50"}`}>
          {cafe.reviews.toLocaleString()} global reviews
        </span>
      </div>

      <p className={`text-lg leading-relaxed mb-10 font-medium ${descriptionStyle}`}>
        {cafe.description}
      </p>
      
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 border-t ${dividerStyle}`}>
        {cafe.address && (
          <InfoItem
            icon={HiLocationMarker}
            label="Location"
            value={cafe.address}
            isDark={isDark}
          />
        )}

        {cafe.phone && (
          <InfoItem
            icon={HiPhone}
            label="Contact"
            value={cafe.phone}
            isDark={isDark}
          />
        )}

        {cafe.openingHours && (
          <InfoItem
            icon={HiClock}
            label="Operational Hours"
            value={cafe.openingHours}
            isDark={isDark}
          />
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2 md:col-span-2">
          {cafe.tags.map((tag) => (
            <span
              key={tag}
              className={`text-[10px] font-black px-4 py-2 rounded-xl uppercase tracking-widest border ${
                isDark
                  ? "text-[#E67E22] bg-[#E67E22]/10 border-[#E67E22]/20"
                  : "text-[#E67E22] bg-[#E67E22]/5 border-[#E67E22]/10"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default CafeInfo;