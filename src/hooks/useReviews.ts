import { useState, useEffect, useCallback } from "react";
import type { Review } from "../types/cafeTypes";
import { SEED_REVIEWS } from "../data/reviewData";

export function useReviews(cafeId: string) {
  const storageKey = `cafeCorner_reviews_${cafeId}`;
  const [reviews, setReviews] = useState<Review[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(storageKey) ?? "null") ?? SEED_REVIEWS;
    setReviews(stored);
  }, [storageKey]);

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % reviews.length);
  }, [reviews.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, [reviews.length]);

  const goToReview = useCallback((index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  }, [activeIndex]);

  const addReview = useCallback((name: string, rating: number, comment: string) => {
    const newReview: Review = {
      id: `r${Date.now()}`,
      reviewerName: name.trim(),
      rating,
      comment: comment.trim(),
      date: new Date().toISOString().split("T")[0],
    };

    const updated = [newReview, ...reviews];
    setReviews(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
    setActiveIndex(0);
    setDirection(1);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }, [reviews, storageKey]);

  return {
    reviews,
    activeIndex,
    direction,
    submitted,
    handleNext,
    handlePrev,
    goToReview,
    addReview
  };
}
