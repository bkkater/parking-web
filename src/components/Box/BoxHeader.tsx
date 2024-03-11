"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type BoxHeaderProps = {
  children?: React.ReactNode;
};

export default function Header({ children }: BoxHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-2 flex items-center gap-3 md:col-span-2">
      <button onClick={() => router.back()}>
        <ArrowLeft className="text-cyan200" size={32} />
      </button>

      {children}
    </div>
  );
}
