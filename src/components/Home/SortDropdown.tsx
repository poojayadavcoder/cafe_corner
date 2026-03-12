import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { SortDropdownProps } from "../../types/homeTypes";

type SortValue = "popularity" | "rating" | "name";

const SORT_OPTIONS: { label: string; value: SortValue }[] = [
  { label: "Most Popular", value: "popularity" },
  { label: "Top Rated", value: "rating" },
  { label: "Name (A-Z)", value: "name" },
];

export default function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(() => {
    return SORT_OPTIONS.find(option => option.value === sortBy) ?? SORT_OPTIONS[0];
  }, [sortBy]);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleSelect = useCallback(
    (value: SortValue) => {
      onSortChange(value);
      setIsOpen(false);
    },
    [onSortChange]
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labelColor =
    theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60";

  const buttonStyle =
    theme === "dark"
      ? "bg-white/5 border-white/10 text-white hover:bg-white/10"
      : "bg-white border-[#4A2C2A]/5 text-[#4A2C2A]";

  const dropdownStyle =
    theme === "dark"
      ? "bg-gray-900 border border-white/10"
      : "bg-white";

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">

      <div className="flex items-center gap-2">
        <span className={`font-semibold text-sm ${labelColor}`}>
          Sort by:
        </span>

        <button
          onClick={toggleDropdown}
          className={`flex items-center justify-between gap-3 px-5 py-2.5 rounded-xl border shadow-sm hover:shadow-md transition-all font-semibold text-sm min-w-[160px] ${buttonStyle}`}
        >
          {selectedOption.label}

          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-2xl ring-1 ring-black/5 z-20 overflow-hidden ${dropdownStyle}`}
        >
          {SORT_OPTIONS.map(option => {
            const isActive = sortBy === option.value;

            const activeStyle =
              theme === "dark"
                ? "bg-[#E67E22]/20 text-[#E67E22]"
                : "bg-[#FFF4E6] text-[#E67E22]";

            const inactiveStyle =
              theme === "dark"
                ? "text-white/70 hover:bg-white/5 hover:text-white"
                : "text-[#4A2C2A]/70 hover:bg-gray-50 hover:text-[#4A2C2A]";

            return (
              <button
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`w-full flex items-center justify-between px-5 py-3.5 text-sm font-semibold transition-colors ${
                  isActive ? activeStyle : inactiveStyle
                }`}
              >
                {option.label}

                {isActive && (
                  <svg
                    className="w-4 h-4 text-[#E67E22]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}