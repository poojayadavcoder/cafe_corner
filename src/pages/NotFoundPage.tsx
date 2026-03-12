import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { HiArrowLeft } from "react-icons/hi";
import { useTheme } from "../hooks/useTheme";

/* ---------------------------------- */
/* Constants */
/* ---------------------------------- */

const containerBase =
  "min-h-[80vh] flex flex-col items-center justify-center p-6 transition-colors duration-500";

const buttonBase =
  "inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1 active:scale-95 group";

/* ---------------------------------- */
/* Component */
/* ---------------------------------- */

export default function NotFoundPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  /* Theme styles */
  const styles = {
    container: isDark ? "bg-gray-950" : "bg-[#FFFDFB]",

    cup: isDark
      ? "bg-white/5 border-white/10 text-[#E67E22]"
      : "bg-white border-[#4A2C2A]/5 text-[#E67E22] shadow-2xl shadow-[#4A2C2A]/5",

    steam: isDark ? "bg-white/20" : "bg-[#4A2C2A]/10",

    shadow: isDark ? "bg-orange-500/20" : "bg-[#4A2C2A]/10",

    title: isDark ? "text-white" : "text-[#4A2C2A]",

    subtitle: isDark ? "text-white/80" : "text-[#4A2C2A]/80",

    text: isDark ? "text-white/40" : "text-[#4A2C2A]/50",

    button: isDark
      ? "bg-[#E67E22] hover:bg-[#D35400] text-white shadow-orange-500/20"
      : "bg-[#4A2C2A] hover:bg-[#3D241E] text-white shadow-[#4A2C2A]/20",

    glow: isDark ? "bg-orange-500/5" : "bg-[#E67E22]/10",
  };

  return (
    <div className={`${containerBase} ${styles.container} -mt-16`}>
      {/* Coffee Icon Section */}
      <div className="relative mb-12">

        <div
          className={`absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-4 rounded-full blur-xl ${styles.shadow}`}
        />
      </div>

      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center max-w-lg"
      >
        <h1
          className={`text-6xl md:text-8xl mt-10 font-black mb-4 monFont transition-colors ${styles.title}`}
        >
          404
        </h1>

        <h2
          className={`text-2xl md:text-3xl font-bold mb-6 transition-colors ${styles.subtitle}`}
        >
          Oops! This cup is empty.
        </h2>

        <p
          className={`text-lg mb-10 leading-relaxed transition-colors ${styles.text}`}
        >
          We couldn't find the brew you were looking for. The page might have
          been moved or doesn't exist.
        </p>

        {/* Back Button */}
        <Link to="/" className={`${buttonBase} ${styles.button}`}>
          <HiArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to coffee hunt
        </Link>
      </motion.div>

      {/* Decorative glow */}
      <div
        className={`fixed top-1/2 left-0 -translate-y-1/2 w-64 h-64 blur-[120px] rounded-full pointer-events-none transition-colors duration-1000 ${styles.glow}`}
      />
      <div
        className={`fixed bottom-0 right-0 w-96 h-96 blur-[150px] rounded-full pointer-events-none transition-colors duration-1000 ${styles.glow}`}
      />
    </div>
  );
}