import { memo } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiStar, HiHeart, HiOutlineHeart, HiArrowRight } from "react-icons/hi";

import { useTheme } from "../../hooks/useTheme";
import type { CafeCardProps } from "../../types/homeTypes";

function CafeCard({ cafe, isFavorite, onToggleFavorite }: CafeCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardStyle = isDark
    ? "bg-white/5 border border-white/10 hover:border-white/20 shadow-xl hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
    : "bg-white shadow-sm hover:shadow-[0_20px_50px_rgba(74,44,42,0.1)]";

  const titleColor = isDark
    ? "text-white group-hover:text-[#E67E22]"
    : "text-[#4A2C2A] group-hover:text-[#E67E22]";

  const textMuted = isDark ? "text-white/60" : "text-[#4A2C2A]/60";

  const tagMuted = isDark ? "text-white/40" : "text-[#4A2C2A]/40";

  const ratingStyle = isDark
    ? "bg-[#E67E22]/20 text-[#E67E22] border-[#E67E22]/30"
    : "bg-[#FFF4E6] text-[#E67E22] border-[#E67E22]/10";

  const buttonStyle = isDark
    ? "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-[#E67E22]/10"
    : "bg-[#4A2C2A] hover:bg-[#E67E22] text-white shadow-[#4A2C2A]/5";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.4 }}
      className={`rounded-[24px] overflow-hidden flex flex-col group relative h-full transition-all ${cardStyle}`}
    >

     
      <div className="relative h-60 overflow-hidden">

        <motion.img
          src={cafe.image}
          alt={cafe.name}
          loading="lazy"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full object-cover"
        />


        <div className="absolute top-4 left-4 z-10">
          <span className={`backdrop-blur-md text-[11px] font-black uppercase tracking-widest px-4 py-2 rounded-xl shadow-xl border ${
            isDark ? "bg-black/30 text-white border-white/10" : "bg-white/30 text-white border-white/20"
          }`}>
            Featured
          </span>
        </div>

      
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggleFavorite(cafe.id.toString())}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md shadow-xl border z-10 ${
            isFavorite
              ? "bg-white text-red-500 border-white/20"
              : isDark
              ? "bg-black/30 text-white border-white/10 hover:text-[#E67E22]"
              : "bg-white/30 text-white border-white/20 hover:text-[#E67E22]"
          }`}
        >
          {isFavorite ? (
            <HiHeart className="w-6 h-6" />
          ) : (
            <HiOutlineHeart className="w-6 h-6" />
          )}
        </motion.button>

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-7 flex flex-col flex-grow">

        <div className="flex justify-between items-start mb-4">

          <div className="flex-grow pr-4">
            <h3 className={`text-xl font-bold transition-colors duration-300 monFont line-clamp-1 ${titleColor}`}>
              {cafe.name}
            </h3>

            <p className={`text-xs font-bold uppercase tracking-widest mt-1 ${tagMuted}`}>
              {cafe.tags?.[0] || "Coffee Spot"}
            </p>
          </div>

          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-sm border shrink-0 ${ratingStyle}`}>
            <HiStar className="w-4 h-4" />
            <span>{Number(cafe.rating).toFixed(1)}</span>
          </div>

        </div>

      
        <div className="flex flex-wrap gap-2 mb-6">
          {cafe.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className="text-[10px] font-black text-[#E67E22] bg-[#E67E22]/5 px-3 py-1 rounded-full border border-[#E67E22]/10 uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className={`text-sm mb-8 flex-grow leading-relaxed line-clamp-2 font-medium ${textMuted}`}>
          {cafe.description}
        </p>

        <Link
          to={`/cafes/${cafe.id}`}
          className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all duration-300 shadow-lg active:scale-[0.98] group/btn ${buttonStyle}`}
        >
          View Details
          <HiArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </Link>

      </div>
    </motion.div>
  );
}

export default memo(CafeCard);