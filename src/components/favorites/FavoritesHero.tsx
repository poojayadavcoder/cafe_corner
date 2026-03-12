import { motion } from "framer-motion";
import twoCups from "../../assets/images/twoCups.jpg";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/useTheme";

export default function FavoritesHero() {
  const { theme } = useTheme();
  return (
    <section className="relative h-[450px] flex items-center justify-center text-center overflow-hidden -mt-6 -sm:mt-16">

      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-slow-zoom"
        style={{ backgroundImage: `url(${twoCups})` }}
      />

<div className="absolute inset-0 bg-black/50" />


<div className={`absolute inset-0 transition-colors duration-300 bg-gradient-to-b ${
  theme === "dark" 
    ? "from-black/60 via-black/30 to-black/90" 
    : "from-black/60 via-black/30 to-[#FFF4E6]/20"
}`} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 px-6"
      >
      
       <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#E67E22]/20 backdrop-blur-md border border-[#E67E22]/30 text-[#E67E22] text-sm font-bold tracking-wider uppercase">
            Saved Cafés
          </span>

        <h1 className="text-6xl drop-shadow-[0_5px_20px_rgba(0,0,0,0.6)] text-white font-semibold monFont">
          Your Favorite <span className="text-[#E67E22]">Cafés</span>
        </h1>

        <p className="text-white/80 mt-4 max-w-xl mx-auto">
         All the cozy cafés you've saved for your next coffee break.
        </p>

        <Link
          to="/"
          className="mt-6 inline-block bg-[#E67E22] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#d96f1c] transition"
        >
          Explore More Cafés
        </Link>
      </motion.div>

    </section>
  );
}