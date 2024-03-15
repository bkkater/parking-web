"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Components
import Box from "@/components/Box";
import Notification from "@/components/Notification";
import Error from "@/components/Error";
import Label from "@/app/history/label";
import Value from "@/app/history/value";

// Data
import { parkingHistory } from "@/data/type/parkingHistory";

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
        <Box.Header />

        {data && (
          <div
            className="flex flex-col gap-2"
            data-testid="detail_history_card"
          >
            <Label>Placa</Label>
            <Value className="mb-3 text-4xl text-cyan200">{data.plate}</Value>

            <Label>Status</Label>
            <Value className="mb-3">
              {data.left ? "Não estacionado" : "Estacionado"}
            </Value>

            <Label>Tempo atual</Label>
            <Value className="mb-3">{data.time}</Value>

            <Label>Pagamento</Label>
            <Value className="mb-3">{data.paid ? "Pago" : "—"}</Value>
          </div>
        )}

        {isLoading && (
          <Notification type="loading" text="Carregando resultados..." />
        )}

        {!data && !isLoading && (
          <Error text="Nenhum registro encontrado. Volte a página de histórico e tente novamente" />
        )}
      </Box>
    </>
  );
}
