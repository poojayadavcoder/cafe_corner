import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import type { Review } from "../../types/cafeTypes";
import ReviewCard from "./ReviewCard";

interface ReviewCarouselProps {
  reviews: Review[];
  activeIndex: number;
  direction: number;
  handleNext: () => void;
  handlePrev: () => void;
  goToReview: (index: number) => void;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
  }),
};

export const ReviewCarousel = memo(function ReviewCarousel({
  reviews,
  activeIndex,
  direction,
  handleNext,
  handlePrev,
  goToReview,
}: ReviewCarouselProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (reviews.length === 0) return null;

  return (
    <div
      className={`backdrop-blur-xl rounded-[48px] p-8 md:p-8 border relative group/carousel overflow-hidden shadow-2xl transition-colors duration-300 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white/40 border-white/60 shadow-[0_30px_70px_-20px_rgba(74,44,42,0.08)]"
      }`}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10 transition-colors">
        <h2
          className={`text-3xl font-black font-semibold monFont tracking-tight flex items-center gap-4 ${
            isDark ? "text-white" : "text-[#4A2C2A]"
          }`}
        >
          <span className="w-12 h-1 bg-[#E67E22] font-semibold rounded-full" />
          Guest Experiences
        </h2>

        <div className="flex items-center gap-6">
          <span
            className={`font-bold uppercase tracking-widest text-[10px] ${
              isDark ? "text-white/80" : "text-[#4A2C2A]/40"
            }`}
          >
            {activeIndex + 1} of {reviews.length} Experiences
          </span>
        </div>
      </div>

      <div className="relative px-4 md:px-16 lg:px-20 min-h-[260px] flex items-center justify-center">
        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#E67E22", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          onClick={handlePrev}
          className={`absolute -left-7 md:left-6 lg:left-8 z-20 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
            isDark
              ? "bg-white/10 text-black border-white/10"
              : "bg-white/40 text-[#4A2C2A] border-white/40"
          }`}
          aria-label="Previous review"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover/carousel:-translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </motion.button>

        <div className="w-full relative overflow-hidden py-4">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={reviews[activeIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 },
              }}
              className="max-w-3xl mx-auto"
            >
              <ReviewCard review={reviews[activeIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.1, backgroundColor: "#E67E22", color: "#fff" }}
          whileTap={{ scale: 0.9 }}
          onClick={handleNext}
          className={`absolute -right-7 md:right-6 lg:right-8 z-20 w-12 h-12 rounded-full backdrop-blur-md border flex items-center justify-center transition-all duration-300 shadow-lg active:scale-90 ${
            isDark
              ? "bg-white/10 text-white border-white/10"
              : "bg-white/40 text-[#4A2C2A] border-white/40"
          }`}
          aria-label="Next review"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover/carousel:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </motion.button>
      </div>

      <div className="flex justify-center gap-2.5 mt-12 relative z-10 transition-colors">
        {reviews.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToReview(idx)}
            className={`h-1 rounded-full transition-all duration-500 ${
              activeIndex === idx
                ? "w-10 bg-[#E67E22]"
                : isDark
                ? "w-2 bg-white/10 hover:bg-white/20"
                : "w-2 bg-[#4A2C2A]/10 hover:bg-[#4A2C2A]/25"
            }`}
            aria-label={`Go to review ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
});

export default ReviewCarousel;
