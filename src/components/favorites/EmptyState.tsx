import cupIllustration from "../../assets/images/cup.webp";
import { useTheme } from "../../hooks/useTheme";

export default function EmptyState() {
  const { theme } = useTheme();

  return (
    <div className="text-center py-13">

      <img
        src={cupIllustration}
        alt="Empty"
        className="w-40 mx-auto mb-3"
      />

      <h2 className={`text-3xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-[#4A2C2A]"}`}>
        Your cup is empty
      </h2>

      <p className={`mb-8 ${theme === "dark" ? "text-white/60" : "text-[#4A2C2A]/60"}`}>
       Start exploring cafés and save your favorites here.
      </p>

    </div>
  );
}