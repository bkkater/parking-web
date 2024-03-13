// Data
import { parkingHistory } from "@/data/type/parkingHistory";

export default function Card({ item }: { item: parkingHistory }) {
  return (
    <div className="grid cursor-pointer grid-cols-2 grid-rows-2 rounded-md border border-gray300 p-4 shadow">
      <p className="text-xs uppercase text-gray700">Tempo atual</p>
      <p className="text-xs uppercase text-gray700">Pagamento</p>
      <p className="text-2xl">{item.time}</p>
      <p className="text-2xl">{item.paid ? "Pago" : "—"}</p>
    </div>
  );
}
