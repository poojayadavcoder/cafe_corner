import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaStar, FaDirections, FaCoffee, FaLocationArrow } from "react-icons/fa";
import { useTheme } from "../hooks/useTheme";
import type { Cafe } from "../types/cafeTypes";

// ===== Leaflet Default Marker Fix =====
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// ===== Helper Component: Change Map View =====
const ChangeView: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  map.setView(center, zoom);
  return null;
};

// ===== Mock Cafe Data =====
const mockCafes: Cafe[] = [
  {
    id: 1,
    name: "Cafe Mocha",
    rating: 4.8,
    reviews: 124,
    tags: ["Cozy", "Artisanal"],
    description: "A warm and inviting space with the best mocha in town.",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 26.9124, lng: 75.7873 },
    address: "C-Scheme, Jaipur",
  },
  {
    id: 2,
    name: "Java Beans",
    rating: 4.5,
    reviews: 89,
    tags: ["Workspace", "Quiet"],
    description: "Perfect spot for digital nomads and coffee lovers alike.",
    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 26.9145, lng: 75.7860 },
    address: "Malviya Nagar, Jaipur",
  },
  {
    id: 3,
    name: "Brew Brothers",
    rating: 4.7,
    reviews: 210,
    tags: ["Modern", "Vibrant"],
    description: "Cold brews and hot vibes. Jaipur's favorite weekend spot.",
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=800",
    coordinates: { lat: 26.9100, lng: 75.7890 },
    address: "Raja Park, Jaipur",
  },
];

// ===== Cafe Card Component =====
interface CafeCardProps {
  cafe: Cafe;
  isSelected: boolean;
  onClick: (cafe: Cafe) => void;
  isDark: boolean;
}

const CafeCard: React.FC<CafeCardProps> = ({ cafe, isSelected, onClick, isDark }) => {
  const borderClasses = isSelected
    ? "border-[#E67E22] bg-[#E67E22]/5"
    : isDark
    ? "border-white/5 bg-white/5 hover:border-white/20"
    : "border-[#4A2C2A]/5 bg-[#4A2C2A]/5 hover:border-[#4A2C2A]/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(cafe)}
      className={`group cursor-pointer p-4 rounded-2xl border transition-all duration-300 ${borderClasses}`}
    >
      <div className="flex gap-4">
        <div className="relative w-24 h-24 shrink-0 rounded-xl overflow-hidden shadow-lg">
          <img
            src={cafe.image}
            alt={cafe.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-1 right-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-lg flex items-center gap-1 text-[10px] text-white">
            <FaStar className="text-yellow-400" />
            {cafe.rating}
          </div>
        </div>

        <div className="flex-grow min-w-0">
          <h3 className={`font-bold text-lg mb-1 truncate ${isDark ? "text-white" : "text-[#4A2C2A]"}`}>{cafe.name}</h3>

          <div className="flex items-center gap-2 text-xs opacity-60 mb-2">
            <FaMapMarkerAlt className="text-[#E67E22]" />
            <span className="truncate">{cafe.address}</span>
          </div>

          <div className="flex flex-wrap gap-1">
            {cafe.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded-full bg-[#E67E22]/20 text-[#E67E22] font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ===== Sidebar Component =====
interface SidebarProps {
  cafes: Cafe[];
  selectedCafe: Cafe | null;
  onCafeSelect: (cafe: Cafe) => void;
  isDark: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ cafes, selectedCafe, onCafeSelect, isDark }) => {
  return (
    <div className={`w-full lg:w-[450px] flex flex-col border-r ${isDark ? "border-white/5" : "border-[#4A2C2A]/5"}`}>
      <div className="p-6">
        <h2 className={`text-3xl font-bold mb-2 monFont ${isDark ? "text-white" : "text-[#4A2C2A]"}`}>
          Nearby <span className="text-[#E67E22]">Corners</span>
        </h2>
        <p className={`text-sm opacity-60 ${isDark ? "text-white" : "text-[#4A2C2A]"}`}>
          Finding the best spots within walking distance
        </p>
      </div>

      <div className="flex-grow overflow-y-auto px-6 pb-6 space-y-4 custom-scrollbar">
        <AnimatePresence>
          {cafes.map((cafe) => (
            <CafeCard
              key={cafe.id}
              cafe={cafe}
              onClick={onCafeSelect}
              isSelected={selectedCafe?.id === cafe.id}
              isDark={isDark}
            />
          ))}
        </AnimatePresence>

        {cafes.length === 0 && (
          <div className={`text-center py-20 opacity-50 ${isDark ? "text-white" : "text-[#4A2C2A]"}`}>
            <FaLocationArrow className="mx-auto text-4xl mb-4" />
            <p>No cafes found in this area.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// ===== Main Component =====
const NearbyCafes: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [nearbyCafes, setNearbyCafes] = useState<Cafe[]>([]);
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [loading, setLoading] = useState(true);

  // ===== Get User Location & Nearby Cafes =====
  useEffect(() => {
    if (!navigator.geolocation) return fallbackLocation();

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const { latitude, longitude } = coords;
        setUserLocation({ lat: latitude, lng: longitude });

        setTimeout(() => {
          const nearby = mockCafes.filter(
            (cafe) =>
              Math.abs((cafe.coordinates?.lat || 0) - latitude) < 0.05 &&
              Math.abs((cafe.coordinates?.lng || 0) - longitude) < 0.05
          );
          setNearbyCafes(nearby);
          setLoading(false);
        }, 1000);
      },
      (err) => {
        console.error("Geolocation error:", err);
        fallbackLocation();
      }
    );

    function fallbackLocation() {
      const defaultLocation = { lat: 26.9124, lng: 75.7873 };
      setUserLocation(defaultLocation);
      setNearbyCafes(mockCafes);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-[80vh] flex flex-col items-center justify-center transition-colors duration-300 ${
          isDark ? "bg-[#0F0A09] text-white" : "bg-[#FFFDFB] text-[#4A2C2A]"
        }`}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="mb-4"
        >
          <FaCoffee className="text-5xl text-[#E67E22]" />
        </motion.div>
        <p className="text-xl font-medium animate-pulse">Brewing your nearby map...</p>
      </div>
    );
  }

  return (
    <div className={`flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden ${isDark ? "bg-[#0F0A09]" : "bg-[#FFFDFB]"}`}>
      <Sidebar cafes={nearbyCafes} selectedCafe={selectedCafe} onCafeSelect={setSelectedCafe} isDark={isDark} />

      <div className="relative flex-grow h-[400px] lg:h-full">
        {userLocation && (
          <MapContainer
            center={[userLocation.lat, userLocation.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            zoomControl={false}
          >
            <TileLayer
              url={
                isDark
                  ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              }
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <ChangeView
              center={
                selectedCafe
                  ? [selectedCafe.coordinates?.lat || 0, selectedCafe.coordinates?.lng || 0]
                  : [userLocation.lat, userLocation.lng]
              }
              zoom={selectedCafe ? 16 : 14}
            />

            {/* User Marker */}
            <Marker position={[userLocation.lat, userLocation.lng]}>
              <Popup>
                <div className="text-center font-bold">You are here</div>
              </Popup>
            </Marker>

            {/* Cafe Markers */}
            {nearbyCafes.map((cafe) => (
              <Marker
                key={cafe.id}
                position={[cafe.coordinates?.lat || 0, cafe.coordinates?.lng || 0]}
                eventHandlers={{ click: () => setSelectedCafe(cafe) }}
              >
                <Popup>
                  <div className={`p-1 min-w-[150px] ${isDark ? "bg-[#0F0A09] text-white" : "text-[#4A2C2A]"}`}>
                    <img src={cafe.image} alt={cafe.name} className="w-full h-20 object-cover rounded-md mb-2" />
                    <h4 className="font-bold">{cafe.name}</h4>
                    <div className="flex items-center gap-1 text-xs mb-2">
                      <FaStar className="text-yellow-400" />
                      {cafe.rating} ({cafe.reviews} reviews)
                    </div>
                    <button className="w-full py-1.5 bg-[#E67E22] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-2">
                      <FaDirections /> Get Directions
                    </button>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}

        {/* Floating Controls */}
        <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-2">
          <button
            onClick={() => setSelectedCafe(null)}
            className={`p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
              isDark ? "bg-white/10 text-white border border-white/20" : "bg-white text-[#4A2C2A] border border-[#4A2C2A]/10"
            }`}
          >
            <FaLocationArrow className={selectedCafe ? "opacity-50" : "text-[#E67E22]"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NearbyCafes;