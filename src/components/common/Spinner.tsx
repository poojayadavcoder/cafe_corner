import { memo } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export const Spinner = memo(function Spinner({ size = "md", label }: SpinnerProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const sizes = {
    sm: "w-8 h-8 border-2",
    md: "w-16 h-16 border-4",
    lg: "w-24 h-24 border-6"
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-12">
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-[#E67E22]/20 border-t-[#E67E22]`}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-0 ${sizes[size]} rounded-full border-transparent border-b-[#4A2C2A]/20`}
        />
      </div>
      
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className={`font-black tracking-widest uppercase text-xs transition-colors ${
            isDark ? "text-white/40" : "text-[#4A2C2A]/40"
          }`}
        >
          {label}
        </motion.p>
      )}
    </div>
  );
});

export default Spinner;
