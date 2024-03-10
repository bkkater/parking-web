import * as TabsUI from "@radix-ui/react-tabs";

// Components
import Content from "@/components/Tabs/TabsContent";
import Trigger from "@/components/Tabs/TabsTrigger";

interface TabsComponentProps extends TabsUI.TabsProps {
  children: React.ReactNode;
}

export default function Tabs({ children, ...rest }: TabsComponentProps) {
  return (
    <TabsUI.Root
      defaultValue="entry"
      className="h-full w-full max-w-2xl"
      {...rest}
    >
      {children}
    </TabsUI.Root>
  );
}

Tabs.Content = Content;
Tabs.Trigger = Trigger;
Tabs.List = TabsUI.List;
