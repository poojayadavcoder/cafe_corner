import { Link, useLocation } from "react-router-dom";
import { HiSun, HiMoon, HiMenu, HiX } from "react-icons/hi";
import { useTheme } from "../../hooks/useTheme";
import logo from "../../assets/images/logo.webp";
import { useState, useEffect } from "react";

/* Navigation Links */

const links = [
  { name: "Home", path: "/" },
  { name: "Mood Gallery", path: "/gallery" },
  { name: "Favorites", path: "/favorites" },
];

export default function Header() {
  const { pathname } = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  /* Close menu when route changes */

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  /* Prevent body scroll when sidebar is open */

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-[100] w-full px-4 md:px-12 py-2 md:py-3 flex items-center justify-between bg-black/60 backdrop-blur-xl border-b border-white/10 text-[#FFF4E6] transition-all duration-300">
      
      {/* Logo */}
      <Link to="/" className="relative z-[60] flex-shrink-0 transition-transform duration-300 hover:scale-105 active:scale-95">
        <img
          src={logo}
          alt="CafeCorner logo"
          className="h-8 md:h-12 w-auto object-contain"
        />
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-10 font-medium">
        {links.map((link) => {
          const active = pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative py-2 text-xs lg:text-sm uppercase tracking-widest transition-all duration-300 ${
                active
                  ? "text-[#E67E22]"
                  : "text-white/60 hover:text-white"
              }`}
            >
              {link.name}

              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-[#E67E22] transition-all duration-300 ${
                  active ? "w-full" : "w-0"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <div className="flex items-center gap-3 md:gap-6 relative z-[110]">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle Theme"
          className="p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:scale-110 active:scale-90"
        >
          {theme === "dark" ? (
            <HiMoon className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
          ) : (
            <HiSun className="w-5 h-5 md:w-6 md:h-6 text-orange-400" />
          )}
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 md:p-2.5 rounded-full bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-white/10 active:scale-90"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <HiX className="w-6 h-6" />
          ) : (
            <HiMenu className="w-6 h-6" />
          )}
        </button>
      </div>



          <div
        className={`md:hidden fixed top-0 right-0 w-[200px] h-full bg-gray-950 text-orange-600 
          transition-transform duration-500 ease-in-out z-40
           ${isMobileMenuOpen? "translate-x-0" : "translate-x-full"}`}
      >
         <div className="flex flex-col items-start bg-black px-4 py-10 gap-6"> 
           {links.map((linkItem, index) => {          
            return (
               <Link
                 key={index}
                 to={linkItem.path}
                 className="flex items-center gap-3 text-lg text-[#E67E22] font-semibold mt-3 z-[150]"
               >
                 {linkItem.name}
               </Link>
             );
})}
         </div>
       </div>
       </header>
  );
}
