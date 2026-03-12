import { memo, useState } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { PhotoGalleryProps } from "../../types/cafeTypes";

function PhotoGallery({ images, cafeName }: PhotoGalleryProps) {
  const { theme } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images?.length) return null;

  const nextImage = () => {
    setActiveIdx((i) => (i + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIdx((i) => (i - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full">

      <div className="relative h-[500px] w-full overflow-hidden rounded-3xl border border-white/10">

        <img
          key={activeIdx}
          src={images[activeIdx]}
          alt={`${cafeName} photo ${activeIdx + 1}`}
          className="w-full h-full object-cover transition-opacity duration-500"
        />

        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none rounded-b-3xl" />

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          aria-label="Previous photo"
        >
          ‹
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all"
          aria-label="Next photo"
        >
          ›
        </button>

        <div className="absolute bottom-4 right-5 bg-black/50 text-white text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
          {activeIdx + 1} / {images.length}
        </div>

      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto no-scrollbar px-1 pb-1">
        {images.map((img, idx) => (
          <button
            key={img}
            onClick={() => setActiveIdx(idx)}
            className={`shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              activeIdx === idx
                ? "border-[#E67E22] scale-105 shadow-lg"
                : theme === "dark" 
                  ? "border-white/10 opacity-60 hover:opacity-100" 
                  : "border-transparent opacity-60 hover:opacity-90"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default memo(PhotoGallery);