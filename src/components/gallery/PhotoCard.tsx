import { memo } from "react";
import { motion } from "framer-motion";
import { MOOD_COLORS, MOOD_ICONS } from "../../constants/galleryColors";
import type { PhotoCardProps } from "../../types/galleryTypes";
import { useTheme } from "../../hooks/useTheme";

function PhotoCard({ photo, bookmarked, onOpen, onBookmark }: PhotoCardProps) {
  const { theme } = useTheme();

  const moodColor = MOOD_COLORS[photo.mood];
  const moodIcon = MOOD_ICONS[photo.mood];

  const handleOpen = () => onOpen(photo);

  const handleBookmark = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onBookmark(photo.id);
  };

  // Masonry aspect ratio mapping
  const aspectClass =
    photo.span === "tall"
      ? "aspect-[3/4.5]"
      : photo.span === "wide"
      ? "aspect-[4/3]"
      : "aspect-square";

  const bookmarkStyle = bookmarked
    ? "bg-[#E67E22] text-white border-[#E67E22]/20 shadow-lg shadow-[#E67E22]/30"
    : theme === "dark"
      ? "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white backdrop-blur-md shadow-sm"
      : "bg-white/40 text-white border-white/20 hover:bg-white hover:text-[#E67E22] backdrop-blur-md shadow-sm";

  return (
    <motion.div
      layout
      whileTap={{ scale: 0.98 }}
      onClick={handleOpen}
      role="button"
      tabIndex={0}
      className={`relative group cursor-pointer rounded-[2.5rem] overflow-hidden transition-all duration-700 hover:-translate-y-3 break-inside-avoid mb-8 border border-white/20 ${
        theme === "dark" 
          ? "bg-white/5 shadow-xl hover:shadow-[0_20px_50px_rgb(230,126,34,0.1)]" 
          : "bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(230,126,34,0.18)]"
      }`}
    >

      {/* Inner Glow */}
      <div className="absolute inset-0 border-[0.5px] border-white/0 group-hover:border-white/40 rounded-[2.5rem] z-30 transition-colors duration-700 pointer-events-none" />

      {/* Image Container */}
      <div
        className={`relative overflow-hidden ${aspectClass} transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-1`}
      >
        <img
          src={photo.url}
          alt={photo.cafeName ?? "Cafe photo"}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-in-out brightness-[0.95] group-hover:brightness-105"
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A1810]/95 via-[#4A2C2A]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 z-10">

          <h3 className="text-white font-bold text-2xl lg:text-3xl monFont transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out mb-2">
            {photo.cafeName}
          </h3>

          <p className="text-white/80 text-sm font-medium transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-out">
            Captured in its best mood
          </p>

        </div>
      </div>

      {/* Mood Tag */}
      <div className="absolute top-6 left-6 z-20">

        <span
          className={`text-[12px] font-bold px-4 py-2.5 rounded-full border border-white/20 backdrop-blur-xl shadow-lg flex items-center gap-2.5 transition-all duration-500 group-hover:scale-105 ${moodColor}`}
        >

          <span className="text-lg leading-none">{moodIcon}</span>

          <span className="tracking-wide uppercase text-[10px] font-black">
            {photo.mood}
          </span>

        </span>

      </div>

      {/* Bookmark Button */}
      <motion.button
        aria-label={bookmarked ? "Remove bookmark" : "Save image"}
        onClick={handleBookmark}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`absolute top-6 right-6 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border z-20 shadow-xl ${bookmarkStyle}`}
      >

        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M5 3a2 2 0 00-2 2v16l9-4 9 4V5a2 2 0 00-2-2H5z" />
        </svg>

      </motion.button>

      {/* Bottom Glow */}
      <div className="absolute bottom-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#E67E22]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    </motion.div>
  );
}

export default memo(PhotoCard);
