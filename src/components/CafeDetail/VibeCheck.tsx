import { useTheme } from "../../hooks/useTheme";

interface VibeCheckProps {
  category?: string;
}

export default function VibeCheck({ category }: VibeCheckProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-[40px] p-8 transition-colors duration-300 ${
        isDark ? "bg-white/5 border border-white/10 text-white" : "bg-[#4A2C2A] text-white"
      }`}
    >
      <h3
        className={`text-2xl font-bold mb-4 monFont ${
          isDark ? "text-[#E67E22]" : "text-white"
        }`}
      >
        Vibe Check
      </h3>
      <p className={isDark ? "text-white/60" : "text-white/80"}>
        This spot is known for its {category?.toLowerCase() || "amazing"} atmosphere. Perfect for
        your next visit.
      </p>
    </div>
  );
}
