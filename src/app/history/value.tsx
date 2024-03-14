import { twMerge } from "tailwind-merge";

type ValueProps = {
  className?: string;
  children: string;
};

export default function Value({ children, className }: ValueProps) {
  return <p className={twMerge("text-2xl", className)}>{children}</p>;
}
