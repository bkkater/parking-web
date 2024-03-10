import Image from "next/image";
import { Menu } from "lucide-react";

// Assets
import LogoImg from "@/assets/logo_parking.png";

export default function Header() {
  return (
    <header className="bg-cyan200 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-2">
        <Image
          src={LogoImg}
          className="h-[30px]"
          alt="Park Logotype"
          priority
        />

        <Menu className="text-white" size={36} />
      </div>
    </header>
  );
}
