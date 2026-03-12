import { useState, useEffect, useCallback, useMemo } from "react";
import { MOOD_TAGS, type MoodTag, type GalleryPhoto } from "../types/galleryTypes";
import { getBookmarks, toggleBookmark } from "../utils/bookmarkStorage";
import { fetchGalleryImages } from "../services/pexelsService";
import hero from "../assets/images/cafe.jpg";

import PhotoCard from "../components/gallery/PhotoCard";
import Lightbox from "../components/gallery/Lightbox";
import { useTheme } from "../hooks/useTheme";
import { PhotoCardSkeleton } from "../components/common/LoadingSkeletons";
import Spinner from "../components/common/Spinner";

const PER_PAGE = 15;

export default function GalleryPage() {
  const { theme } = useTheme();

  const [activeFilter, setActiveFilter] = useState<MoodTag | "All">("All");
  const [bookmarks, setBookmarks] = useState<string[]>(() => getBookmarks());
  const [lightbox, setLightbox] = useState<GalleryPhoto | null>(null);

  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const loadImages = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchGalleryImages(activeFilter, page, PER_PAGE);
      setPhotos(data.photos);
      setTotalResults(data.totalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load images");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, page]);

  useEffect(() => {
    loadImages();
  }, [loadImages]);


  const handleFilterChange = useCallback((tag: MoodTag | "All") => {
    setActiveFilter(tag);
    setPhotos([]);
    setPage(1);
  }, []);

  const handleBookmark = useCallback((id: string) => {
    setBookmarks(toggleBookmark(id));
  }, []);

  const totalPages = useMemo(() => {
    return Math.ceil(totalResults / PER_PAGE);
  }, [totalResults]);

  const isInitialLoading = loading && photos.length === 0;

  const currentIndex = useMemo(() => {
    return photos.findIndex((p) => p.id === lightbox?.id);
  }, [photos, lightbox]);

  const handleNext = () => {
    if (currentIndex < 0) return;
    const next = photos[(currentIndex + 1) % photos.length];
    setLightbox(next);
  };

  const handlePrev = () => {
    if (currentIndex < 0) return;
    const prev = photos[(currentIndex - 1 + photos.length) % photos.length];
    setLightbox(prev);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 -mt-3 -sm:mt-16 ${
      theme === "dark" ? "bg-gray-950" : "bg-[#FFFDFB]"
    }`}>

      {/* HERO SECTION */}

      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">

        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${hero})` }}
        />

        <div className={`absolute inset-0 bg-gradient-to-b transition-colors duration-300 ${
          theme === "dark" 
            ? "from-black/70 via-black/50 to-gray-950" 
            : "from-black/60 via-black/40 to-black/20"
        }`} />

        <div className="relative z-10 text-center px-4">

          <span className="inline-block px-4 py-1.5 mb-4 rounded-full bg-[#E67E22]/20 backdrop-blur-md border border-[#E67E22]/30 text-[#E67E22] text-sm font-bold tracking-wider uppercase">
            Visual Inspiration
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 monFont tracking-tight">
            Cafe Mood <span className="text-[#E67E22]">Gallery</span>
          </h1>

          <p className="text-white/80 max-w-xl mx-auto text-lg font-medium leading-relaxed">
            A curated collection of the most beautiful cafe corners, artisan beans, and cozy vibes to inspire your next visit.
          </p>

        </div>

      </section>


      <div className="max-w-7xl mx-auto px-4 pb-24 -mt-8 relative z-20">

        {/* FILTERS */}
        <div className={`flex flex-wrap gap-3 justify-center mb-16 p-2 rounded-3xl border shadow-2xl max-w-fit mx-auto transition-colors duration-300 ${
          theme === "dark" ? "bg-white/5 border-white/10" : "bg-[#542A0D] border-white/50"
        }`}>
          {(["All", ...MOOD_TAGS] as const).map((tag) => (
            <button
              key={tag}
              aria-pressed={activeFilter === tag}
              onClick={() => handleFilterChange(tag)}
              className={`px-7 py-3 rounded-2xl font-bold text-sm transition-all duration-300
              ${activeFilter === tag
                ? "bg-[#E67E22] text-white shadow-lg"
                : theme === "dark"
                  ? "bg-white/5 text-white/70 hover:bg-white/10 hover:text-[#E67E22]"
                  : "bg-white text-[#4A2C2A]/70 hover:bg-[#FFF4E6] hover:text-[#E67E22]"}
              `}
            >
              {tag}
            </button>
          ))}
        </div>

        {loading && photos.length > 0 && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/5 backdrop-blur-[2px] pointer-events-none">
            <Spinner size="lg" label="Refreshing Gallery..." />
          </div>
        )}

        {error && (
          <div className="text-center py-24">
            <h3 className={`text-2xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-[#4A2C2A]"}`}>
              Oops! Something went wrong.
            </h3>
            <p className={`mb-8 ${theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"}`}>{error}</p>
            <button
              onClick={loadImages}
              className="px-8 py-4 bg-[#E67E22] text-white rounded-xl transition-transform active:scale-95"
            >
              Retry
            </button>
          </div>
        )}

        {!error && (
          <>
            {isInitialLoading ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                {[...Array(12)].map((_, i) => (
                  <PhotoCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <>
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                  {photos.map((photo) => (
                    <PhotoCard
                      key={photo.id}
                      photo={photo}
                      bookmarked={bookmarks.includes(photo.id)}
                      onOpen={setLightbox}
                      onBookmark={handleBookmark}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex items-center justify-center mt-20 gap-6">
                    <button
                      disabled={page <= 1 || loading}
                      onClick={() => {
                        setPage((p) => p - 1);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`px-6 py-3 rounded-xl border transition-all active:scale-95 disabled:opacity-50 ${
                        theme === "dark" 
                          ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                          : "bg-white border-[#4A2C2A]/10 text-[#4A2C2A] hover:bg-gray-50 shadow-sm"
                      }`}
                    >
                      Previous
                    </button>

                    <div className={`px-6 py-3 rounded-xl font-bold min-w-[100px] text-center ${
                      theme === "dark" ? "bg-[#E67E22]/10 text-[#E67E22] border border-[#E67E22]/20" : "bg-[#4A2C2A] text-white"
                    }`}>
                      {page} / {totalPages}
                    </div>

                    <button
                      disabled={page >= totalPages || loading}
                      onClick={() => {
                        setPage((p) => p + 1);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`px-6 py-3 rounded-xl border transition-all active:scale-95 disabled:opacity-50 ${
                        theme === "dark" 
                          ? "bg-white/5 border-white/10 text-white hover:bg-white/10" 
                          : "bg-white border-[#4A2C2A]/10 text-[#4A2C2A] hover:bg-gray-50 shadow-sm"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>

      {lightbox && (

        <Lightbox
          photo={lightbox}
          bookmarked={bookmarks.includes(lightbox.id)}
          onClose={() => setLightbox(null)}
          onBookmark={handleBookmark}
          onPrev={handlePrev}
          onNext={handleNext}
        />

      )}

    </div>
  );
}