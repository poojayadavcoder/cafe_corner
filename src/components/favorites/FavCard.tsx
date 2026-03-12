import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiTrash } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";
import type { FavCardProps } from "../../types/favoritesTypes";

export default function FavCard({ cafe, onRemove }: FavCardProps) {
  const { theme } = useTheme();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.98 }}
      className={`relative rounded-[24px] overflow-hidden transition-all duration-500 flex flex-col group min-h-[440px] ${
        theme === "dark" 
          ? "bg-white/5 border border-white/10 hover:border-[#E67E22]/50 shadow-xl" 
          : "bg-white shadow-sm hover:shadow-xl"
      }`}
    >
      <Link to={`/cafes/${cafe.id}`} className="h-56 overflow-hidden relative block">
        <motion.img
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.6 }}
          src={cafe.image}
          alt={cafe.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </Link>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <h3 className={`text-xl font-bold transition-colors duration-300 ${
            theme === "dark" ? "text-white group-hover:text-[#E67E22]" : "text-[#4A2C2A] group-hover:text-[#E67E22]"
          }`}>
            {cafe.name}
          </h3>
          <p className={`text-sm font-medium mt-1 ${theme === "dark" ? "text-white/40" : "text-[#4A2C2A]/50"}`}>
            {cafe.tags?.[0] || 'Coffee Spot'}
          </p>
        </div>

        <p className={`text-sm line-clamp-2 mb-6 leading-relaxed ${
          theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/70"
        }`}>
          {cafe.description}
        </p>

        <div className="mt-auto flex gap-3 items-center">
          <Link
            to={`/cafes/${cafe.id}`}
            className={`flex-grow flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm transition-all duration-300 shadow-md active:scale-95 ${
              theme === "dark" 
                ? "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-[#E67E22]/20" 
                : "bg-[#4A2C2A] hover:bg-[#E67E22] text-white shadow-[#4A2C2A]/10"
            }`}
          >
            Explore
            <HiArrowRight className="w-4 h-4" />
          </Link>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setConfirmOpen(true)}
            className={`p-3 rounded-xl transition-all duration-300 border ${
              theme === "dark"
                ? "bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white border-red-500/20"
                : "bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border-red-100"
            }`}
            title="Remove from favorites"
          >
            <HiTrash className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      {/* Confirmation Overlay */}
      <AnimatePresence>
        {confirmOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-8 text-center transition-all duration-300 ${
              theme === "dark" ? "bg-black/80" : "bg-white/80"
            }`}
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 border ${
              theme === "dark" ? "bg-red-500/20 border-red-500/30" : "bg-red-50 border-red-100"
            }`}>
              <HiTrash className="w-8 h-8 text-red-500" />
            </div>
            
            <h4 className={`font-bold text-lg mb-2 ${theme === "dark" ? "text-white" : "text-[#4A2C2A]"}`}>Remove from favorites?</h4>
            <p className={`text-sm mb-6 px-4 ${theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"}`}>This will remove this spot from your collection.</p>
            
            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={() => onRemove(String(cafe.id))}
                className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                Confirm Removal
              </button>
              <button
                onClick={() => setConfirmOpen(false)}
                className={`w-full py-3 rounded-xl font-bold text-sm transition-all active:scale-95 ${
                  theme === "dark" ? "bg-white/10 hover:bg-white/20 text-white" : "bg-[#4A2C2A]/5 hover:bg-[#4A2C2A]/10 text-[#4A2C2A]"
                }`}
              >
                Go Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
