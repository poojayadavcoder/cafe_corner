import { useParams, Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useCafeDetail } from "../hooks/useCafeDetail";

import DetailHero from "../components/CafeDetail/DetailHero";
import CafeInfo from "../components/CafeDetail/CafeInfo";
import PhotoGallery from "../components/CafeDetail/PhotoGallery";
import MenuSection from "../components/CafeDetail/MenuSection";
import MapSection from "../components/CafeDetail/MapSection";
import ReviewsSection from "../components/CafeDetail/ReviewsSection";
import ErrorState from "../components/common/ErrorState";
import { CafeDetailSkeleton } from "../components/common/LoadingSkeletons";

export default function CafeDetailPage() {
  const { id } = useParams();
  const { theme } = useTheme();
  const { cafe, menu, loading, error, retry } = useCafeDetail(id);

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-950" : "bg-[#FFFDFB]";

  if (loading && !error) return <CafeDetailSkeleton />;

  if (error || !cafe) {
    return (
      <div className={`min-h-screen pt-20 transition-colors duration-300 ${bgColor}`}>
        <ErrorState
          title="Couldn't brew details"
          message={error || "We couldn't find the cafe you're looking for."}
          onRetry={retry}
          actionText="Try again"
        />
        <div className="text-center mt-4">
          <Link to="/" className="text-[#E67E22] hover:underline font-bold">
            Back to coffee hunting
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 -mt-16 ${bgColor}`}>
      <DetailHero image={cafe.image} name={cafe.name} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="relative z-20 -mt-40 grid grid-cols-1 lg:grid-cols-12 gap-10">


          {/* Sidebar Area */}
          <div className="lg:col-span-6 space-y-7">
             <PhotoGallery images={cafe.gallery || []} cafeName={cafe.name} />
           
          </div>
          
          <div className="lg:col-span-6 space-y-7">
            <CafeInfo cafe={cafe} />
           
            
          </div>

          {/* Full Width Bottom Section */}
           <div className="lg:col-span-12 mt-16">
            <MapSection
              coordinates={cafe.coordinates}
              address={cafe.address}
              cafeName={cafe.name}
            />
          </div>
          <div className="lg:col-span-12 mt-16">
            <MenuSection menu={menu} />
          </div>
          <div className="lg:col-span-12 mt-16">
            <ReviewsSection cafeId={String(cafe.id)} />
          </div>
        </div>
      </div>
    </div>
  );
}
