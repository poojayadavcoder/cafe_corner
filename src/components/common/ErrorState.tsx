import { motion } from "framer-motion";
import { HiOutlineExclamationCircle, HiRefresh } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  actionText?: string;
}

export default function ErrorState({
  title = "Oops! Something went wrong",
  message = "We're having trouble connecting to our servers. Please check your connection and try again.",
  onRetry,
  actionText = "Try Again",
}: ErrorStateProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col items-center justify-center p-8 text-center min-h-[400px]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`max-w-md w-full p-8 rounded-[32px] border transition-all duration-300 ${
          theme === "dark"
            ? "bg-white/5 border-red-500/20 shadow-xl shadow-red-500/10"
            : "bg-white border-red-100 shadow-[0_20px_50px_rgba(220,38,38,0.05)]"
        }`}
      >
        <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-6 border-4 ${
          theme === "dark" ? "bg-red-500/10 border-red-500/20" : "bg-red-50 border-red-100"
        }`}>
          <HiOutlineExclamationCircle className={`w-10 h-10 ${
            theme === "dark" ? "text-red-400" : "text-red-500"
          }`} />
        </div>

        <h3 className={`text-2xl font-bold mb-3 monFont ${
          theme === "dark" ? "text-white" : "text-[#4A2C2A]"
        }`}>
          {title}
        </h3>

        <p className={`text-sm mb-8 leading-relaxed ${
          theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/70"
        }`}>
          {message}
        </p>

        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onRetry}
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              theme === "dark"
                ? "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-lg shadow-orange-500/20 focus:ring-[#E67E22] focus:ring-offset-gray-950"
                : "bg-[#4A2C2A] hover:bg-[#3D241E] text-white shadow-lg shadow-[#4A2C2A]/20 focus:ring-[#4A2C2A] focus:ring-offset-white"
            }`}
          >
            <HiRefresh className="w-5 h-5" />
            {actionText}
          </motion.button>
        )}
      </motion.div>
    </div>
  );
}
