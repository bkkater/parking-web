"use client";

import Tabs from "@/components/Tabs";

export default function HomeTab({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  return <Tabs.Content value={value}>{children}</Tabs.Content>;
}
