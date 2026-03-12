import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import logo from "../../assets/images/logo.webp";

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Mood Gallery", path: "/gallery" },
    { name: "Nearby", path: "/nearby" },
    { name: "Favorites", path: "/favorites", icon: <FaHeart className="w-4 h-4" /> },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className={`sticky top-0 z-50 transition-colors duration-300 border-b shadow-sm ${
      theme === "dark" 
        ? "bg-[#0F0A09] border-white/5" 
        : "bg-[#FFFDFB] border-[#4A2C2A]/5"
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className={`w-[140px] md:w-[180px] transition-transform duration-300 group-hover:scale-105 ${
            theme === "dark" ? "" : "brightness-[0.2]"
          }`}>
            <img src={logo} alt="CafeCorner Logo" className="w-full h-auto" />
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`flex items-center gap-2 font-bold text-sm uppercase tracking-widest transition-all duration-300 hover:text-[#E67E22] ${
                isActive(link.path)
                  ? "text-[#E67E22]"
                  : theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle Theme"
            className={`p-3 rounded-xl transition-all duration-300 hover:scale-110 ${
              theme === "dark" 
                ? "bg-white/5 text-[#E67E22] hover:bg-white/10" 
                : "bg-[#4A2C2A]/5 text-[#E67E22] hover:bg-[#4A2C2A]/10"
            }`}
          >
            {theme === "dark" ? <FaSun className="w-5 h-5" /> : <FaMoon className="w-5 h-5" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden p-2 transition-colors duration-300 ${
              theme === "dark" ? "text-white" : "text-[#4A2C2A]"
            }`}
          >
            {menuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out ${
          menuOpen ? "max-h-[300px] opacity-100 border-t border-inherit" : "max-h-0 opacity-0"
        } ${theme === "dark" ? "bg-[#0F0A09]" : "bg-[#FFFDFB]"}`}
      >
        <nav className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 font-bold text-lg uppercase tracking-widest transition-colors ${
                isActive(link.path)
                  ? "text-[#E67E22]"
                  : theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"
              }`}
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
