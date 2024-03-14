"use client";

import { useRouter } from "next/navigation";

// Data
import { parkingHistory } from "@/data/type/parkingHistory";
import { useCallback } from "react";

type CardProps = {
  item: parkingHistory;
};

export default function Card({ item }: CardProps) {
  const router = useRouter();

  const handleItemClick = useCallback(() => {
    localStorage.setItem("historyData", JSON.stringify(item));

    router.push(`/history/detail`);
  }, [item, router]);

  return (
    <div
      className="grid cursor-pointer grid-cols-2 grid-rows-2 rounded-md border border-gray300 p-4 shadow"
      onClick={handleItemClick}
    >
      <p className="text-xs uppercase text-gray700">Tempo atual</p>
      <p className="text-xs uppercase text-gray700">Pagamento</p>
      <p className="text-2xl">{item.time}</p>
      <p className="text-2xl">{item.paid ? "Pago" : "—"}</p>
    </div>
  );
}
