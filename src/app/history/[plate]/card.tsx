"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";

// Data
import { parkingHistory } from "@/data/type/parkingHistory";

// Components
import Label from "@/app/history/label";
import Value from "@/app/history/value";

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
      <Label>Tempo atual</Label>
      <Label>Pagamento</Label>
      <Value>{item.time}</Value>
      <Value>{item.paid ? "Pago" : "—"}</Value>

      <p className="text-2xl"></p>
      <p className="text-2xl"></p>
    </div>
  );
}
