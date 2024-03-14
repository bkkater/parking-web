"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Box from "@/components/Box";
import Notification from "@/components/Notification";
import Error from "@/components/Error";

// Data
import { parkingHistory } from "@/data/type/parkingHistory";
import Link from "next/link";

export default function ReservationDetail() {
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<parkingHistory | null>(null);

  useEffect(() => {
    const historyItem = localStorage.getItem("historyData");

    if (historyItem) {
      const item = JSON.parse(historyItem);
      setData(item);
    }

    localStorage.removeItem("historyData");
    setLoading(false);
  }, [router]);

  return (
    <>
      <Box>
        <Box.Header>
          {data?.reservation && <Box.Title>{data?.reservation}</Box.Title>}
        </Box.Header>

        {data && (
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-gray700">Placa</p>
            <p className="mb-3 text-4xl text-cyan200">{data.plate}</p>

            <p className="text-xs uppercase text-gray700">Status</p>
            <p className="mb-3 text-4xl text-cyan200">
              {data.left ? "Concluído" : "Estacionado"}
            </p>

            <p className="text-xs uppercase text-gray700">Tempo atual</p>
            <p className="text-2xl">{data.time}</p>

            <p className="text-xs uppercase text-gray700">Pagamento</p>
            <p className="text-2xl">{data.paid ? "Pago" : "—"}</p>
          </div>
        )}

        {isLoading && (
          <Notification type="loading" text="Carregando resultados..." />
        )}

        {!data && !isLoading && <Error text="Nenhum registro encontrado" />}
      </Box>
    </>
  );
}
