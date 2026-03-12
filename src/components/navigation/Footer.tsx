import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { useTheme } from "../../hooks/useTheme";
import logo from "../../assets/images/logo.webp";
import type { FooterSection } from "../../types/footerTypes";


const footerSections: FooterSection[] = [
  {
    title: "Explore",
    links: [
      { name: "Home", path: "/" },
      { name: "Mood Gallery", path: "/gallery" },
      { name: "Discover", path: "/" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Favorites", path: "/favorites" },
      { name: "Recent Views", path: "/" },
      { name: "Settings", path: "/" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Help Center", path: "/" },
      { name: "Contact Us", path: "/" },
      { name: "Privacy Policy", path: "/" },
    ],
  },
];

const socialLinks = [
  { name: "instagram", icon: FaInstagram },
  { name: "twitter", icon: FaTwitter },
  { name: "facebook", icon: FaFacebook },
];

const legalLinks = ["Terms", "Privacy", "Cookies"];

const SocialIcon = ({ name, Icon, theme }: { name: string; Icon: React.ElementType; theme: string }) => {
  return (
    <motion.a
      href={`#${name}`}
      whileHover={{ y: -5, color: "#E67E22" }}
      className={`w-10 h-10 rounded-full border transition-all flex items-center justify-center ${
        theme === "dark" 
          ? "border-white/10 text-white hover:border-[#E67E22] bg-white/5" 
          : "border-[#4A2C2A]/10 text-[#4A2C2A] hover:border-[#E67E22] bg-[#4A2C2A]/5"
      }`}
    >
      <span className="sr-only">{name}</span>
      <Icon className="w-5 h-5" />
    </motion.a>
  );
};

const Footer = () => {
  const { theme } = useTheme();
  const year = new Date().getFullYear();

  return (
    <footer className={`relative overflow-hidden pt-20 pb-10 transition-colors duration-300 ${
      theme === "dark" ? "bg-[#0F0A09] text-[#FFF4E6]" : "bg-[#FFFDFB] text-[#4A2C2A]"
    }`}>
      <div className={`absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] ${
        theme === "dark" ? "invert opacity-[0.02]" : ""
      }`} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16 lg:mb-20">

          <div className="col-span-1 lg:col-span-5 space-y-6 lg:space-y-8">

            <Link to="/" className="inline-flex items-center gap-3 group">
              <div className={`w-[160px] md:w-[200px] rounded-xl flex items-center justify-center transition-transform duration-500 ${
                theme === "dark" ? "" : "brightness-[0.2]"
              }`}>
               <img src={logo} alt="logo" />
              </div>
            </Link>

            <p className={`font-medium text-base md:text-lg leading-relaxed max-w-md transition-colors ${
              theme === "dark" ? "text-white/80" : "text-[#4A2C2A]/80"
            }`}>
              Discovering the world's most cozy coffee spots, one cup at a time.
              Your ultimate guide to work-friendly corners and aesthetic brews.
            </p>

            <div className="flex items-center gap-4 md:gap-5 pt-2">
              {socialLinks.map((social) => (
                <SocialIcon key={social.name} name={social.name} Icon={social.icon} theme={theme} />
              ))}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-7 place-items-center grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 pt-6 lg:pt-0">
            {footerSections.map((section) => (
              <div key={section.title} className="space-y-4 md:space-y-6">

                <h4 className="text-[13px] text-center md:text-[15px] font-black uppercase tracking-[0.1em] text-[#E67E22]">
                  {section.title}
                </h4>

                <ul className="space-y-3 md:space-y-4 text-center">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        to={link.path}
                        className={`inline-block font-bold text-sm transition-all hover:translate-x-1 hover:text-[#E67E22] ${
                          theme === "dark" ? "text-white/60 hover:text-white" : "text-[#4A2C2A]/60 hover:text-[#4A2C2A]"
                        }`}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>

        </div>

        <div className={`flex flex-col md:flex-row items-center justify-between gap-6 pt-8 md:pt-10 border-t transition-colors text-center md:text-left ${
          theme === "dark" ? "border-white/5" : "border-[#4A2C2A]/5"
        }`}>

          <p className={`font-black tracking-widest uppercase text-[10px] md:text-xs transition-colors ${
            theme === "dark" ? "text-white/40" : "text-[#4A2C2A]/40"
          }`}>
            © {year} CafeCorner Inc. All rights reserved.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {legalLinks.map((item) => (
              <Link
                key={item}
                to="/"
                className={`text-[9px] md:text-[10px] font-black tracking-widest uppercase transition-colors hover:text-[#E67E22] ${
                  theme === "dark" ? "text-white/30" : "text-[#4A2C2A]/30"
                }`}
              >
                {item}
              </Link>
            ))}
          </div>

        </div>

      </div>

      <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] blur-3xl rounded-full -mr-64 -mb-64 pointer-events-none transition-opacity duration-1000 ${
        theme === "dark" ? "bg-[#E67E22]/5 opacity-100" : "bg-[#E67E22]/10 opacity-50"
      }`} />
    </footer>
  );
};

export default Footer;
