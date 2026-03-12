import { memo, useState, useMemo } from "react";
import { useTheme } from "../../hooks/useTheme";
import type { MenuSectionProps, MenuItemCardProps } from "../../types/cafeTypes";

const MenuItemCard = memo(function MenuItemCard({ item }: MenuItemCardProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const cardStyle = isDark
    ? "bg-white/5 border border-white/10 hover:border-[#E67E22]/50 hover:bg-white/10"
    : "bg-white shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(230,126,34,0.1)]";

  const titleStyle = isDark
    ? "text-white group-hover:text-[#E67E22]"
    : "text-[#4A2C2A] group-hover:text-[#E67E22]";

  const textStyle = isDark ? "text-white/40" : "text-[#4A2C2A]/60";

  return (
    <div className={`flex gap-4 rounded-2xl p-4 transition-all duration-300 group ${cardStyle}`}>
      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h4 className={`font-bold text-sm leading-tight transition-colors ${titleStyle}`}>
            {item.name}
          </h4>

          <span className="text-[#E67E22] font-bold text-sm shrink-0">
            {item.price}
          </span>
        </div>

        <p className={`text-xs leading-relaxed line-clamp-2 transition-colors ${textStyle}`}>
          {item.description}
        </p>
      </div>
    </div>
  );
});

const MenuSection = memo(function MenuSection({ menu }: MenuSectionProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState(menu[0]?.name || "");

  const activeCategory = useMemo(
    () => menu.find((category) => category.name === activeTab),
    [menu, activeTab]
  );

  const containerStyle = isDark
    ? "bg-white/5 border-white/10"
    : "bg-[#FFF4E6] border-transparent";

  const titleStyle = isDark ? "text-white" : "text-[#4A2C2A]";

  return (
    <div
      className={`rounded-3xl p-8 transition-colors duration-300 border ${containerStyle}`}
    >
      <h2 className={`text-2xl font-bold monFont mb-6 ${titleStyle}`}>
        Our Menu
      </h2>

      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-6">
        {menu.map((category) => {
          const isActive = activeTab === category.name;

          return (
            <button
              key={category.name}
              onClick={() => setActiveTab(category.name)}
              className={`shrink-0 px-5 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                isActive
                  ? "bg-[#E67E22] text-white shadow-lg shadow-[#E67E22]/30"
                  : isDark
                  ? "bg-white/10 text-white/50 hover:bg-white/20 hover:text-white"
                  : "bg-white text-[#4A2C2A]/70 hover:text-[#E67E22] border border-[#4A2C2A]/5"
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>

      {activeCategory && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeCategory.items.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
});

export default MenuSection;