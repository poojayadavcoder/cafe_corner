import type { FilterBarProps } from "../../types/homeTypes";
import { useTheme } from "../../hooks/useTheme";

const CATEGORIES = [
  "All",
  "Coffee",
  "Outdoor Seating",
  "Cozy"
];

export default function FilterBar({
  activeCategory,
  onCategoryChange
}: FilterBarProps) {

  const { theme } = useTheme();

  const labelColor =
    theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60";

  const inactiveStyle =
    theme === "dark"
      ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-[#E67E22] border border-white/10"
      : "bg-white text-[#4A2C2A]/70 hover:bg-[#FFF4E6] hover:text-[#E67E22] border border-[#4A2C2A]/5";

  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6 mb-8">
      <div className="flex items-center gap-3 min-w-max px-4 md:px-0">

        <span className={`font-semibold mr-2 hidden md:block ${labelColor}`}>
          Filter by:
        </span>

        {CATEGORIES.map((category) => {

          const isActive = activeCategory === category;

          return (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                px-6 py-2.5 rounded-full font-semibold text-sm whitespace-nowrap
                transition-all duration-200 cursor-pointer
                ${
                  isActive
                    ? "bg-[#E67E22] text-white shadow-md"
                    : inactiveStyle
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}