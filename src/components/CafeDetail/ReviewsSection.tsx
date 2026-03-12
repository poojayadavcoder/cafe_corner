import { memo } from "react";
import { motion } from "framer-motion";
import type { ReviewsSectionProps } from "../../types/cafeTypes";
import { useReviews } from "../../hooks/useReviews";
import ReviewCarousel from "./ReviewCarousel";
import ReviewForm from "./ReviewForm";

export const ReviewsSection = memo(function ReviewsSection({
  cafeId,
}: ReviewsSectionProps) {
  const {
    reviews,
    activeIndex,
    direction,
    submitted,
    handleNext,
    handlePrev,
    goToReview,
    addReview,
  } = useReviews(String(cafeId));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="space-y-12"
    >
      <ReviewCarousel
        reviews={reviews}
        activeIndex={activeIndex}
        direction={direction}
        handleNext={handleNext}
        handlePrev={handlePrev}
        goToReview={goToReview}
      />

      <ReviewForm onAddReview={addReview} submitted={submitted} />
    </motion.div>
  );
});

export default ReviewsSection;
