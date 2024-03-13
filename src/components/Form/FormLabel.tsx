import { LabelHTMLAttributes } from "react";

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: React.ReactNode | string;
};

export default function Label({ children, ...rest }: FormLabelProps) {
  return (
    <label className="text-gray700" {...rest}>
      {children}
    </label>
  );
}
