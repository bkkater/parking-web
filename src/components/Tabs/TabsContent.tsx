import * as Tabs from "@radix-ui/react-tabs";

interface TabsProps extends Tabs.TabsContentProps {
  children: React.ReactNode | string;
  value: string;
}

export default function Content({ children, value, ...rest }: TabsProps) {
  return (
    <Tabs.Content
      className="rounded-b bg-white px-4 py-8 shadow-sm"
      value={value}
      {...rest}
    >
      {children}
    </Tabs.Content>
  );
}
