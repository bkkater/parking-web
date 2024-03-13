import { Suspense } from "react";

// Components
import Box from "@/components/Box";
import Notification from "@/components/Notification";
import Error from "@/components/Error";
import Card from "@/app/history/[plate]/card";

// Data
import { api } from "@/data/api";
import { parkingHistory } from "@/data/type/parkingHistory";

// Utils
import { carSchema } from "@/utils/schema/car";

type HistoryDetailProps = {
  params: {
    plate: string;
  };
};

type HistoryResponseProps = {
  data: parkingHistory[] | null;
  error: string | null;
};

async function getHistory(plate: string): Promise<HistoryResponseProps> {
  try {
    const validationResult = carSchema.safeParse({ plate });

    if (!validationResult.success) {
      console.log("caiu no log de validação");

      return {
        data: null,
        error: validationResult.error.errors[0].message,
      };
    }

    const response = await api(`/${plate}`, {
      method: "GET",
    });

    if (!response.ok) {
      console.log("caiu no log da api");

      return {
        data: null,
        error: "Erro ao carregar os dados da API",
      };
    }

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    console.log("caiu no log do catch");

    return {
      data: null,
      error: "Oops, algo deu errado",
    };
  }
}

export default async function History({ params }: HistoryDetailProps) {
  const { data, error } = await getHistory(params.plate);

  return (
    <>
      <Box>
        <Box.Header>
          <Box.Title>Placa {params.plate}</Box.Title>
        </Box.Header>

        <Suspense
          fallback={<Notification type="loading" text="Carregando..." />}
        >
          {data?.map((item) => <Card item={item} key={item.reservation} />)}
        </Suspense>

        {error && <Error text={error} />}
      </Box>
    </>
  );
}
