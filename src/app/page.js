import Image from "next/image";
import Navbar from "./components/ui/Navbar";
import Hero from "./components/ui/Hero";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <section>
        <Hero />
      </section>
    </div>
  );
}
