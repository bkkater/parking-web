import * as Tabs from "@radix-ui/react-tabs";

type TabsProps = Tabs.TabsTriggerProps & {
  children: React.ReactNode | string;
  value: string;
};

export default function Trigger({ children, value, ...rest }: TabsProps) {
  return (
    <Tabs.Trigger
      className="w-full rounded-t border-b-2 border-gray100 py-3 text-gray700 data-[state=active]:border-cyan200 data-[state=active]:bg-white data-[state=active]:text-cyan200 data-[state=active]:shadow-sm"
      value={value}
      {...rest}
    >
      {children}
    </Tabs.Trigger>
  );
}
