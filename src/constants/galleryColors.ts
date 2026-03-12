import type { MoodTag } from "../types/galleryTypes";

export const MOOD_ICONS: Record<MoodTag, string> = {
  Cozy: "☕",
  Vintage: "📻",
  Modern: "🏢",
  Rustic: "🪵",
  Minimalist: "⚪",
};

export const MOOD_COLORS: Record<MoodTag, string> = {
  Cozy: "bg-amber-100 text-amber-700 border-amber-200/50",
  Vintage: "bg-rose-100 text-rose-700 border-rose-200/50",
  Modern: "bg-sky-100 text-sky-700 border-sky-200/50",
  Rustic: "bg-stone-200 text-stone-800 border-stone-300/50",
  Minimalist: "bg-slate-100 text-slate-600 border-slate-200/50",
};

export const MOOD_PILL_COLORS: Record<MoodTag | "All", string> = {
  All: "bg-[#4A2C2A] text-white",
  Cozy: "bg-amber-600 text-white",
  Vintage: "bg-rose-600 text-white",
  Modern: "bg-sky-600 text-white",
  Rustic: "bg-stone-700 text-white",
  Minimalist: "bg-slate-500 text-white",
};