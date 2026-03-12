import { useTheme } from "../../hooks/useTheme";

export function CafeCardSkeleton() {
  const { theme } = useTheme();
  
  const baseClass = theme === "dark" 
    ? "bg-white/5 border-white/10" 
    : "bg-white border-[#4A2C2A]/10";
    
  const pulseClass = theme === "dark" ? "bg-white/10" : "bg-gray-200";

  return (
    <div className={`rounded-[24px] overflow-hidden border ${baseClass} h-full flex flex-col`}>
      {/* Image Skeleton */}
      <div className={`w-full h-60 animate-pulse ${pulseClass}`} />
      
      <div className="p-7 flex-1 flex flex-col">
        {/* Header (Name + Rating) */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-4">
            <div className={`h-6 w-3/4 rounded-md animate-pulse ${pulseClass} mb-2`} />
            <div className={`h-3 w-1/3 rounded-md animate-pulse ${pulseClass}`} />
          </div>
          <div className={`h-7 w-12 rounded-xl animate-pulse ${pulseClass}`} />
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className={`h-5 w-14 rounded-full animate-pulse ${pulseClass}`} />
          ))}
        </div>
        
        {/* Description */}
        <div className="mb-8 flex-grow space-y-2">
           <div className={`h-4 w-full rounded-md animate-pulse ${pulseClass}`} />
           <div className={`h-4 w-5/6 rounded-md animate-pulse ${pulseClass}`} />
        </div>
        
        {/* Button */}
        <div className={`h-12 w-full rounded-2xl animate-pulse ${pulseClass}`} />
      </div>
    </div>
  );
}


export function CafeDetailSkeleton() {
  const { theme } = useTheme();
  
  const pulseClass = theme === "dark" ? "bg-white/10" : "bg-gray-200";
  const containerClass = theme === "dark"
    ? "bg-white/5 border border-white/10"
    : "bg-white border border-[#4A2C2A]/10 shadow-xl shadow-[#4A2C2A]/5";

  return (
    <div className={`min-h-screen transition-colors duration-300 -mt-16 ${
      theme === "dark" ? "bg-gray-950" : "bg-[#FFFDFB]"
    }`}>
      {/* Hero Image Skeleton */}
      <div className={`w-full h-[65vh] animate-pulse ${pulseClass}`} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-12 -mt-40 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Main Info Column */}
              <div className="lg:col-span-7 space-y-10">
                {/* Info Card Skeleton */}
                <div className={`rounded-[40px] p-8 md:p-12 ${containerClass}`}>
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="flex-1">
                      <div className={`h-12 w-3/4 rounded-xl animate-pulse ${pulseClass} mb-4`} />
                      <div className={`h-6 w-full rounded-md animate-pulse ${pulseClass} mb-2`} />
                      <div className={`h-6 w-5/6 rounded-md animate-pulse ${pulseClass}`} />
                    </div>
                  </div>
                  <div className="flex gap-4 mb-8">
                    <div className={`h-8 w-24 rounded-full animate-pulse ${pulseClass}`} />
                    <div className={`h-8 w-24 rounded-full animate-pulse ${pulseClass}`} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-16 rounded-2xl animate-pulse ${pulseClass}`} />
                    ))}
                  </div>
                </div>

                {/* Gallery Skeleton */}
                <div className={`rounded-[40px] p-8 md:p-12 ${containerClass}`}>
                  <div className={`h-8 w-40 rounded-lg animate-pulse ${pulseClass} mb-6`} />
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className={`aspect-square rounded-2xl animate-pulse ${pulseClass}`} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Column */}
              <div className="lg:col-span-5 space-y-10">
                {/* Map Skeleton */}
                <div className={`h-[400px] rounded-[40px] animate-pulse ${pulseClass}`} />
                
                {/* Vibe Check Skeleton */}
                <div className={`h-[200px] rounded-[40px] animate-pulse ${pulseClass}`} />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhotoCardSkeleton() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const pulseClass = isDark ? "bg-white/10" : "bg-gray-200";
  
  // Random heights for masonry effect
  const heights = ["h-64", "h-80", "h-72", "h-96"];
  const height = heights[Math.floor(Math.random() * heights.length)];

  return (
    <div className={`break-inside-avoid rounded-3xl overflow-hidden mb-6 border ${
      isDark ? "bg-white/5 border-white/10" : "bg-white border-[#4A2C2A]/5"
    }`}>
      <div className={`${height} w-full animate-pulse ${pulseClass}`} />
      <div className="p-4 flex justify-between items-center gap-4">
        <div className="flex-1 space-y-2">
          <div className={`h-4 w-3/4 rounded-md animate-pulse ${pulseClass}`} />
          <div className={`h-3 w-1/2 rounded-md animate-pulse ${pulseClass}`} />
        </div>
        <div className={`h-8 w-8 rounded-full animate-pulse ${pulseClass}`} />
      </div>
    </div>
  );
}
