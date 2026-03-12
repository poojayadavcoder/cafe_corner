import { memo } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { MapSectionProps } from "../../types/cafeTypes";

const MAP_OFFSET = 0.005;

const MapSection = memo(({ coordinates, address, cafeName }: MapSectionProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const lat = coordinates?.lat;
  const lng = coordinates?.lng;
  const hasCoordinates = typeof lat === "number" && typeof lng === "number";

  const containerStyle = `rounded-3xl shadow-[0_8px_40px_rgb(0,0,0,0.06)] border transition-colors duration-300 ${
    isDark ? "bg-white/5 border-white/10" : "bg-white border-transparent"
  }`;

  const headingStyle = `text-2xl font-bold monFont ${
    isDark ? "text-white" : "text-[#4A2C2A]"
  }`;

  const textStyle = isDark ? "text-white/60" : "text-[#4A2C2A]";

  const osmUrl = hasCoordinates
    ? `https://www.openstreetmap.org/export/embed.html?bbox=${lng - MAP_OFFSET},${
        lat - MAP_OFFSET
      },${lng + MAP_OFFSET},${lat + MAP_OFFSET}&layer=mapnik&marker=${lat},${lng}`
    : "";

  const osmLink = hasCoordinates
    ? `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=16/${lat}/${lng}`
    : "";

  if (!hasCoordinates) {
    return (
      <div className={`${containerStyle} p-8`}>
        <h2 className={`${headingStyle} mb-4`}>Location</h2>

        {address ? (
          <div
            className={`flex items-center gap-3 rounded-2xl px-5 py-4 ${
              isDark ? "bg-white/5" : "bg-[#FFF4E6]"
            }`}
          >
            <LocationIcon />

            <p className={`font-medium ${textStyle}`}>{address}</p>
          </div>
        ) : (
          <p className={isDark ? "text-white/30" : "text-[#4A2C2A]/50"}>
            Address information not available.
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${containerStyle} overflow-hidden`}>
      <div
        className={`px-6 py-5 border-b flex items-center justify-between ${
          isDark ? "border-white/10" : "border-[#4A2C2A]/5"
        }`}
      >
        <h2 className={headingStyle}>Location</h2>

        <a
          href={osmLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#E67E22] text-sm font-semibold hover:underline flex items-center gap-1"
        >
          Open in Map
          <ExternalIcon />
        </a>
      </div>

      <iframe
        title={`Map for ${cafeName}`}
        src={osmUrl}
        width="100%"
        height="320"
        loading="lazy"
        className={`border-none block transition-opacity duration-500 ${
          isDark ? "opacity-80 grayscale" : "opacity-100"
        }`}
      />

      {address && (
        <div
          className={`px-6 py-4 flex items-center gap-2 ${
            isDark ? "bg-white/5" : "bg-[#FFF4E6]/50"
          }`}
        >
          <LocationIcon />

          <p className={`text-sm font-medium ${textStyle}`}>{address}</p>
        </div>
      )}
    </div>
  );
});

export default MapSection;


const LocationIcon = () => (
  <svg
    className="w-4 h-4 text-[#E67E22] shrink-0"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const ExternalIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </svg>
);