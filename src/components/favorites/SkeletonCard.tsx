import { useTheme } from "../../hooks/useTheme";

export default function SkeletonCard() {
  const { theme } = useTheme();

  return (
    <div className={`rounded-3xl overflow-hidden animate-pulse mt-15 ${
      theme === "dark" ? "bg-white/5" : "bg-white"
    }`}>
      <div className={theme === "dark" ? "h-60 bg-white/10" : "h-60 bg-gray-200"} />
      <div className="p-6 space-y-4">
        <div className={`h-4 rounded w-3/4 ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`} />
        <div className={`h-4 rounded w-1/2 ${theme === "dark" ? "bg-white/10" : "bg-gray-200"}`} />
      </div>
    </div>
  );
}