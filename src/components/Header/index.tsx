import Link from "next/link";
import Image from "next/image";

// Components
import Menu from "@/components/Menu";

// Assets
import LogoImg from "@/assets/icon.png";

export default function Header() {
  return (
    <header className="bg-cyan200 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-2">
        <Link href="/">
          <Image
            src={LogoImg}
            className="h-[30px]"
            alt="Park Logotype"
            priority
            width={40}
            height={30}
          />
        </Link>

        <Menu />
      </div>
    </header>
  );
}
