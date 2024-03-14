"use client";
import Image from "next/image";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu as MenuIcon, X } from "lucide-react";

// Assets
import LogoImg from "@/assets/icon.png";
import Link from "next/link";

export default function Menu() {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <MenuIcon className="text-white" size={36} />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />

        <Dialog.Content className="animate-fromRight fixed right-0 top-0 flex h-full w-full max-w-96 flex-col gap-8 bg-cyan200 p-8">
          <div className="mb-8 flex items-center justify-between">
            <Image
              src={LogoImg}
              className="h-[30px]"
              alt="Park Logotype"
              priority
              width={40}
              height={30}
            />

            <Dialog.Close>
              <X className="text-white" size={30} />
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <Link href="/?tab=entry" className="text-white">
              Entrada
            </Link>
          </Dialog.Close>

          <Dialog.Close asChild>
            <Link href="/?tab=exit" className="text-white">
              Saída
            </Link>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
