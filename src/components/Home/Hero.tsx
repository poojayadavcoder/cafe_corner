import heroImg from "../../assets/images/Hero.webp";
import type { HeroProps } from "../../types/homeTypes";

export default function Hero({ setSearchQuery, searchQuery }: HeroProps) {
 
  const scrollToDiscover = () => {
    const element = document.getElementById("discover-section");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    scrollToDiscover();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <section
      className="relative flex items-center justify-center h-[120vh] -mt-6 md:-mt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

      <div className="relative z-10 max-w-4xl px-4 text-center text-white">
        <h1 className="mb-4 md:mb-6 text-5xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.2] monFont">
          Discover the Perfect <span className="text-[#E67E22]">Cafe</span> Near You
        </h1>

        <p className="max-w-2xl mx-auto mb-8 md:mb-10 text-xl md:text-2xl font-medium text-white/90">
          Your personal guide to cozy corners, artisan coffee, and the best vibes in the city.
        </p>


        <form onSubmit={handleSearch} className="relative max-w-xl mx-auto">
          <div className="flex flex-row items-center p-2 gap-2 border rounded-2xl md:rounded-full backdrop-blur-xl shadow-2xl transition-all duration-300 focus-within:scale-[1.02] bg-white/10 border-white/20 focus-within:bg-white/15 focus-within:border-white/40">

            <div className="hidden md:flex pl-4 text-white/60">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

            <input
              type="text"
              placeholder="Search cafe or location..."
              className="w-full px-4 py-3 md:py-4 text-base md:text-lg text-white placeholder-white/60 bg-transparent outline-none border-none text-center md:text-left"
              value={searchQuery}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              className="px-2 sm:px-8 py-3 w-[130px] md:py-4 font-bold text-white bg-[#E67E22] rounded-xl md:rounded-full transition-all duration-300 hover:bg-[#D35400] active:scale-95 md:w-auto mt-2 md:mt-0"
            >
              Search
            </button>

          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-6 mt-10 md:mt-12">
          <button
            onClick={scrollToDiscover}
            className="flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer group"
          >
            <span className="text-xs md:text-sm font-semibold tracking-widest uppercase">
              Explore Best Cafes
            </span>

            <svg
              className="w-5 h-5 md:w-6 md:h-6 transition-transform group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}