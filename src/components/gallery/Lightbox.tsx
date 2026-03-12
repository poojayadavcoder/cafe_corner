import { useEffect } from "react";
import type { LightboxProps } from "../../types/galleryTypes";
import { MOOD_ICONS } from "../../constants/galleryColors";
import { useTheme } from "../../hooks/useTheme";

export default function Lightbox({
  photo,
  bookmarked,
  onClose,
  onBookmark,
  onPrev,
  onNext,
}: LightboxProps) {
  const { theme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4 lg:p-12"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >

      <button
        onClick={onClose}
        className="absolute top-2 right-2 w-12 h-12 flex items-center justify-center text-white/40 hover:text-white transition-colors z-20"
      >
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div
        className={`rounded-[3rem] lg:rounded-[4rem] overflow-hidden max-w-6xl w-full max-h-[60vh] sm:max-h-[60vh] md:max-h-[80vh] shadow-2xl flex flex-col sm:flex-row relative transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`w-full h-[170px] sm:h-full md:w-[600px] flex items-center justify-center ${
          theme === "dark" ? "bg-black/20" : "bg-gray-100"
        }`}>
          <img
            src={photo.url}
            alt={photo.cafeName}
            className=" w-full h-full object-cover object-center"
          />
        </div>

        <div className={`md:w-[40%] p-8 lg:p-14 flex flex-col justify-center transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-900" : "bg-white"
        }`}>

          <span className={`hidden md:inline-flex w-[140px]  items-center gap-2 px-4 py-2 rounded-full border font-bold text-sm mb-8 transition-colors ${
            theme === "dark" 
              ? "bg-[#E67E22]/20 border-[#E67E22]/30 text-[#E67E22]" 
              : "bg-[#FFF4E6] border-[#E67E22]/10 text-[#E67E22]"
          }`}>
            <span>{MOOD_ICONS[photo.mood]}</span>
            {photo.mood}
          </span>

          <h2 className={` text-[20px] lg:text-[25px] xl:text-4xl font-bold monFont mb-6 leading-tight transition-colors ${
            theme === "dark" ? "text-white" : "text-[#4A2C2A]"
          }`}>
            {photo.cafeName}
          </h2>

          <p className={` text-[13px] lg:text-lg leading-relaxed mb-10 font-medium transition-colors ${
            theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"
          }`}>
            Experience the unique {photo.mood.toLowerCase()} atmosphere that this cafe offers.
          </p>

          <button
            onClick={() => onBookmark(photo.id)}
            className={`w-full py-2 lg:py-5 rounded-3xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
            ${
              bookmarked
                ? "bg-[#E67E22] text-white shadow-xl shadow-[#E67E22]/30"
                : theme === "dark"
                  ? "bg-white/10 text-white hover:bg-white/20 shadow-xl"
                  : "bg-[#4A2C2A] text-white hover:bg-[#3C2A21] shadow-xl shadow-[#4A2C2A]/20"
            }`}
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M5 3a2 2 0 00-2 2v16l9-4 9 4V5a2 2 0 00-2-2H5z" />
            </svg>

            {bookmarked ? "Saved to Favorites" : "Save Image"}
          </button>

        </div>

      </div>

    </div>
  );
}
