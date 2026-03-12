import { useState } from "react";
import Feature from "../components/Home/Feature";
import Hero from "../components/Home/Hero";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div>
      <Hero setSearchQuery={setSearchQuery} searchQuery={searchQuery} />
      <div id="discover-section">
        <Feature initialSearch={searchQuery} />
      </div>
    </div>
  );
}
