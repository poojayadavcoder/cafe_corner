import { Link } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";

interface DetailHeroProps {
  image: string;
  name: string;
}

export default function DetailHero({ image, name }: DetailHeroProps) {
  const { theme } = useTheme();

  return (
    <div className="relative h-[75vh] w-full overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover brightness-[0.85]"
      />
      <div
        className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
          theme === "dark"
            ? "from-black/70 via-black/40 to-gray-950"
            : "from-black/50 via-black/20 to-[#FFFDFB]"
        }`}
      />

      <div className="absolute top-28 left-4 md:left-12 z-20">
        <Link
          to="/"
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-5 py-2.5 rounded-2xl font-bold text-sm transition-all border border-white/20 group"
        >
          <HiArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to feed
        </Link>
      </div>
    </div>
  );
}
