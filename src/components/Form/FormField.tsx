import { ReactNode } from "react";

type FieldProps = {
  children: ReactNode;
};

export default function Field({ children }: FieldProps) {
  return <div className="grid gap-2">{children}</div>;
}
