import { twMerge } from "tailwind-merge";

type LabelProps = {
  className?: string;
  children: string;
};

export default function Label({ children, className }: LabelProps) {
  return (
    <p className={twMerge("text-xs uppercase text-gray700", className)}>
      {children}
    </p>
  );
}
