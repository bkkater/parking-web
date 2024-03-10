import { ReactNode } from "react";

interface FieldProps {
  children: ReactNode;
}

export default function Field({ children }: FieldProps) {
  return <div className="grid gap-2">{children}</div>;
}
