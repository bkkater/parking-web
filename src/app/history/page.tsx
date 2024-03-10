import Link from "next/link";
import { ArrowLeft } from "lucide-react";

// Components
import Box from "@/components/Box";
import Card from "@/app/history/components/Card";

export default function History() {
  return (
    <main className="container flex-1 px-2 py-10">
      <Box>
        <Box.Header>
          <Box.Title>Placa XXX-999</Box.Title>
        </Box.Header>

        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Box>
    </main>
  );
}
