import { Link } from "react-router-dom";

interface LimitReachedModalProps {
  onClose: () => void;
  maxFavorites: number;
}

export default function LimitReachedModal({ onClose, maxFavorites }: LimitReachedModalProps) {
  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-500"
      onClick={onClose}
    >
      <div 
        className="bg-[#1A1A1A] rounded-[40px] w-full max-w-md overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-700"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-10 lg:p-14 text-center">
          {/* Icon */}
          <div className="w-24 h-24 bg-[#E67E22]/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-[#E67E22]/20">
            <svg className="w-12 h-12 text-[#E67E22] animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4 monFont tracking-tight leading-tight">
            Favorite <span className="text-[#E67E22]">Limit</span> Reached
          </h3>
          
          <p className="text-white/50 leading-relaxed mb-10 text-lg font-medium">
            You've reached the maximum of <span className="text-white font-bold">{maxFavorites}</span> favorites. 
            Remove another cafe from your list to save this spot.
          </p>

          <div className="flex flex-col gap-4">
            <Link
              to="/favorites"
              onClick={onClose}
              className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white font-bold py-5 rounded-2xl transition-all duration-300 shadow-xl shadow-[#E67E22]/20"
            >
              Manage Favorites
            </Link>
            
            <button
              onClick={onClose}
              className="w-full text-white/40 hover:text-white font-bold py-3 transition-colors cursor-pointer"
            >
              Keep Exploring
            </button>
          </div>
        </div>
        
        {/* Bottom decorative bar */}
        <div className="h-2 bg-gradient-to-r from-transparent via-[#E67E22] to-transparent" />
      </div>
    </div>
  );
}
