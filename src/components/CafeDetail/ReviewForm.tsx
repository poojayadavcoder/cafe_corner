import { memo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import StarPicker from "./StarPicker";

interface ReviewFormProps {
  onAddReview: (name: string, rating: number, comment: string) => void;
  submitted: boolean;
}

export const ReviewForm = memo(function ReviewForm({
  onAddReview,
  submitted,
}: ReviewFormProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !comment.trim()) return;
      onAddReview(name, rating, comment);
      setName("");
      setComment("");
      setRating(5);
    },
    [name, comment, rating, onAddReview]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`rounded-[48px] p-10 md:p-14 border relative overflow-hidden transition-colors duration-300 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-[#FFF9F2] border-white shadow-[0_40px_80px_-30px_rgba(74,44,42,0.12)]"
      }`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#E67E22]/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#4A2C2A]/5 rounded-full -ml-32 -mb-32 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="mb-10 text-center md:text-left">
          <h2
            className={`text-3xl font-black font-semibold monFont tracking-tight mb-2 transition-colors ${
              isDark ? "text-white" : "text-[#4A2C2A]"
            }`}
          >
            Leave a Review
          </h2>
          <p
            className={`font-bold uppercase tracking-widest text-[10px] ${
              isDark ? "text-white/80" : "text-[#4A2C2A]/50"
            }`}
          >
            Share your cozy experience with us
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label
                  className={`block text-[13px] font-semibold font-black tracking-[0.2em] uppercase mb-3 ml-1 transition-colors ${
                    isDark ? "text-white/80" : "text-[#4A2C2A]/40"
                  }`}
                >
                  Your Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah M."
                  required
                  className={`w-full border rounded-[24px] px-6 py-4 font-bold transition-all text-sm backdrop-blur-sm focus:outline-none focus:border-[#E67E22] focus:shadow-[0_10px_30px_rgba(230,126,34,0.05)] ${
                    isDark
                      ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:bg-white/10"
                      : "bg-white/80 border-[#4A2C2A]/5 text-[#4A2C2A] placeholder-[#4A2C2A]/20 focus:bg-white"
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[13px] font-semibold font-black tracking-[0.2em] uppercase mb-3 ml-1 transition-colors ${
                    isDark ? "text-white/80" : "text-[#4A2C2A]/40"
                  }`}
                >
                  Your Rating
                </label>
                <div
                  className={`backdrop-blur-sm rounded-[24px] p-2 inline-block border transition-colors ${
                    isDark ? "bg-white/5 border-white/10" : "bg-white/60 border-[#4A2C2A]/5"
                  }`}
                >
                  <StarPicker value={rating} onChange={setRating} />
                </div>
              </div>
            </div>

            <div>
              <label
                className={`block text-[13px] font-black font-semibold tracking-[0.2em] uppercase mb-3 ml-1 transition-colors ${
                  isDark ? "text-white/80" : "text-[#4A2C2A]/40"
                }`}
              >
                Your Review
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you love about this cafe?"
                rows={6}
                required
                className={`w-full border rounded-[32px] px-7 py-6 font-semibold transition-all text-sm resize-none backdrop-blur-sm focus:outline-none focus:border-[#E67E22] focus:shadow-[0_10px_30px_rgba(230,126,34,0.05)] ${
                  isDark
                    ? "bg-white/5 border-white/10 text-white placeholder-white/20 focus:bg-white/10"
                    : "bg-white/80 border-[#4A2C2A]/5 text-[#4A2C2A] placeholder-[#4A2C2A]/20 focus:bg-white"
                }`}
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <motion.button
              whileHover={{ scale: 1.02, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className={`group relative overflow-hidden px-14 py-5 rounded-[24px] font-black text-sm tracking-widest uppercase transition-all duration-500 shadow-2xl active:scale-95 cursor-pointer ${
                submitted
                  ? "bg-[#27AE60] text-white"
                  : isDark
                  ? "bg-[#E67E22] text-white hover:bg-[#D35400] shadow-[#E67E22]/20"
                  : "bg-[#3D2422] text-white hover:bg-[#4A2C2A] hover:shadow-[#3D2422]/20 shadow-[#3D2422]/10"
              }`}
            >
              <span className="relative z-10 flex items-center gap-3">
                {submitted ? (
                  <>
                    <motion.svg
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </motion.svg>
                    Submitted
                  </>
                ) : (
                  <>
                    Submit Review
                    <svg
                      className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                      />
                    </svg>
                  </>
                )}
              </span>

              {!submitted && (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
});

export default ReviewForm;
