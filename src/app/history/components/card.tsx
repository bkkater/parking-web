export default function Card() {
  return (
    <div className="grid cursor-pointer grid-cols-2 grid-rows-2 rounded-md border border-gray300 p-4 shadow">
      <p className="text-xs uppercase text-gray700">Tempo atual</p>
      <p className="text-xs uppercase text-gray700">Pagamento</p>
      <p className="text-2xl">1h20 min</p>
      <p className="text-2xl">-</p>
    </div>
  );
}
