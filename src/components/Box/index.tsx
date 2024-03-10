// Components
import Header from "@/components/Box/BoxHeader";
import Title from "@/components/Box/BoxTitle";

type BoxProps = {
  children: React.ReactNode;
};

export default function Box({ children }: BoxProps) {
  return (
    <div className="grid gap-4 rounded bg-white p-4 md:grid-cols-2 md:p-8">
      {children}
    </div>
  );
}

Box.Header = Header;
Box.Title = Title;
