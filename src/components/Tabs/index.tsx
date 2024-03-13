import * as TabsUI from "@radix-ui/react-tabs";

// Components
import Content from "@/components/Tabs/TabsContent";
import Trigger from "@/components/Tabs/TabsTrigger";

type TabsComponentProps = {
  children: React.ReactNode;
} & TabsUI.TabsProps;

export default function Tabs({ children, ...rest }: TabsComponentProps) {
  return (
    <TabsUI.Root
      defaultValue="entry"
      className="mx-auto h-full w-full max-w-2xl animate-fromTop"
      {...rest}
    >
      {children}
    </TabsUI.Root>
  );
}

Tabs.Content = Content;
Tabs.Trigger = Trigger;
Tabs.List = TabsUI.List;
