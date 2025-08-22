import Image from "next/image";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";
import ProductHighlights from "./components/ui/ProductHighlights";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <section>
        <Hero />
      </section>
      <section>
        <ProductHighlights />
      </section>
    </div>
  );
}
