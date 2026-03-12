import { memo, useState } from "react";
import { motion } from "framer-motion";
import type { StarPickerProps } from "../../types/cafeTypes";

export const StarPicker = memo(function StarPicker({ value, onChange }: StarPickerProps) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex gap-2.5 px-1 py-2">
      {[1, 2, 3, 4, 5].map((star) => {
        const isActive = star <= (hover || value);
        const isSelected = star <= value;
        return (
          <motion.button
            key={star}
            type="button"
            whileHover={{ scale: 1.25, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => onChange(star)}
            className="group relative transition-all duration-300"
          >
            {isActive && (
              <motion.div
                layoutId="starGlow"
                className="absolute inset-0 bg-[#E67E22]/20 blur-md rounded-full scale-150"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            <svg
              className={`w-9 h-9 relative z-10 transition-all duration-300 ${
                isActive
                  ? "text-[#E67E22] drop-shadow-[0_0_8px_rgba(230,126,34,0.4)]"
                  : "text-gray-200"
              } ${
                isSelected && !hover
                  ? "fill-current"
                  : isActive
                  ? "fill-current opacity-80"
                  : "fill-current"
              }`}
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.button>
        );
      })}
    </div>
  );
});

export default StarPicker;
