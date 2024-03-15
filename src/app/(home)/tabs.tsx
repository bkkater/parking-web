"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

// Components
import Tabs from "@/components/Tabs";

type TabValue = "entry" | "exit";

type HomeTabsProps = {
  children: React.ReactNode;
};

const DEFAULT_TAB = "entry";

export default function HomeTabs({ children }: HomeTabsProps) {
  const searchParams = useSearchParams();

  const initialTab = searchParams.get("tab") as TabValue;
  const [activeTab, setActiveTab] = useState<TabValue>(
    initialTab || DEFAULT_TAB,
  );

  const handleTabChange = (value: string) => {
    const tabValue = value as TabValue;

    if (tabValue) {
      setActiveTab(tabValue);
    }
  };

  useEffect(() => {
    const value = searchParams.get("tab");

    if (value === "entry" || value === "exit") {
      setActiveTab(value);
    }
  }, [searchParams]);

  return (
    <Tabs
      defaultValue="entry"
      value={activeTab || DEFAULT_TAB}
      onValueChange={handleTabChange}
    >
      <Tabs.List className="flex" aria-label="Registre os carros estacionados">
        <Tabs.Trigger value="entry">Entrada</Tabs.Trigger>

        <Tabs.Trigger value="exit">Saída</Tabs.Trigger>
      </Tabs.List>

      {children}
    </Tabs>
  );
}
