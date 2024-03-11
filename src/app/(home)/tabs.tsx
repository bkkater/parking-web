"use client";

// Components
import Tabs from "@/components/Tabs";

export default function HomeTabs({ children }: { children: React.ReactNode }) {
  return (
    <Tabs defaultValue="entry">
      <Tabs.List className="flex" aria-label="Registre os carros estacionados">
        <Tabs.Trigger value="entry">Entrada</Tabs.Trigger>

        <Tabs.Trigger value="exit">Saída</Tabs.Trigger>
      </Tabs.List>

      {children}
    </Tabs>
  );
}
