import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";
import type { Cafe } from "../../types/cafeTypes";
import { MAX_FAVORITES } from "../../utils/cafeHelpers";

interface Props {
  cafes: Cafe[];
  loading: boolean;
  atLimit: boolean;
}

export default function FavoritesStats({ cafes, loading, atLimit }: Props) {
  const { theme } = useTheme();
  if (loading || cafes.length === 0) return null;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-16 mt-10">

      <div className={`px-8 py-4 rounded-2xl shadow transition-all duration-300 border ${
        theme === "dark" ? "bg-white/5 border-white/10" : "bg-white border-[#4A2C2A]/5"
      }`}>
        <span className={theme === "dark" ? "text-sm text-white/60" : "text-sm text-[#4A2C2A]/60"}>Total Saved</span>
        <p className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-[#4A2C2A]"}`}>
          {cafes.length}
          <span className={theme === "dark" ? "text-sm text-white/30" : "text-sm text-[#4A2C2A]/30"}> / {MAX_FAVORITES}</span>
        </p>
      </div>

      <Link
        to="/"
        className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
          theme === "dark" 
            ? "bg-[#E67E22] hover:bg-[#D35400] text-white" 
            : "bg-[#4A2C2A] hover:bg-[#E67E22] text-white"
        }`}
      >
        + Add more cafes
      </Link>

      {atLimit && (
        <div className="text-[#E67E22] text-sm font-medium">
          Favorite limit reached.
        </div>
      )}

    </div>
  );
}