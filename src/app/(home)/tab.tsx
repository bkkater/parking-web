"use client";

// Components
import Tabs from "@/components/Tabs";

export default function HomeTab({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return (
    <Tabs.Content value={value} data-testid={`home_${value}_tab`}>
      {children}
    </Tabs.Content>
  );
}
