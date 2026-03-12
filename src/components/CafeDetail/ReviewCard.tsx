import { memo } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { ReviewCardProps } from "../../types/cafeTypes";

export const ReviewCard = memo(function ReviewCard({ review }: ReviewCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const initials = review.reviewerName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const formattedDate = new Date(review.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div
      className={`rounded-[32px] p-6 transition-all border ${
        isDark
          ? "bg-white/5 border-white/10 shadow-none"
          : "bg-white shadow-[0_10px_30px_-10px_rgba(74,44,42,0.08)] border-white/60 hover:shadow-[0_20px_40px_-15px_rgba(74,44,42,0.12)] hover:-translate-y-1"
      }`}
    >
      <div className="flex items-start gap-5 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#E67E22] to-[#D35400] flex items-center justify-center text-white font-black text-sm shrink-0 shadow-lg shadow-[#E67E22]/20">
          {initials}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
            <p
              className={`font-black text-base monFont transition-colors ${
                isDark ? "text-white" : "text-[#4A2C2A]"
              }`}
            >
              {review.reviewerName}
            </p>
            <p
              className={`text-[10px] font-bold uppercase tracking-widest ${
                isDark ? "text-white/80" : "text-[#4A2C2A]/30"
              }`}
            >
              {formattedDate}
            </p>
          </div>

          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <svg
                key={s}
                className={`w-4 h-4 ${
                  s <= review.rating
                    ? "text-[#E67E22] fill-current"
                    : isDark
                    ? "text-white/10 fill-current"
                    : "text-gray-100 fill-current"
                }`}
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>

      <p
        className={`text-[15px] leading-relaxed font-medium transition-colors ${
          isDark ? "text-white/60" : "text-[#4A2C2A]/70"
        }`}
      >
        {review.comment}
      </p>
    </div>
  );
});

export default ReviewCard;
