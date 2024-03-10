import { ArrowLeft } from "lucide-react";

export default function History() {
  return (
    <main className="container flex-1 px-2 py-10">
      <div className="rounded bg-white p-4 md:p-8">
        <div className="flex items-center gap-3">
          <ArrowLeft className="text-cyan200" size={32} />

          <h2 className="text-2xl font-semibold leading-none text-cyan200">
            Placa XXX-999
          </h2>
        </div>
      </div>
    </main>
  );
}
