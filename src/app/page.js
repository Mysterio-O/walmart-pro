import Image from "next/image";
import Navbar from "./components/ui/Navbar";

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <nav>
        <Navbar />
      </nav>
    </div>
  );
}
