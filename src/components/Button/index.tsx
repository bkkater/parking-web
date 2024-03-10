import { ButtonHTMLAttributes } from "react";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: "h-14 w-full text-center uppercase outline-none text-white disabled:text-gray700 rounded shadow",
  variants: {
    color: {
      primary: "bg-green200 border-2 border-green200",
      secoundary: "bg-violet500 border-2 border-violet500",
    },
    variant: {
      filled: "disabled:bg-gray300 disabled:border-gray300 ",
      outlined: "bg-transparent disabled:border-gray200 text-inherit",
    },
  },
  defaultVariants: {
    variant: "filled",
    color: "primary",
  },
});

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  variant?: "filled" | "outlined";
  color?: "primary" | "secoundary";
}

export default function Button({
  variant,
  color,
  children,
  ...rest
}: ButtonProps) {
  return (
    <button className={button({ variant, color })} {...rest}>
      {children}
    </button>
  );
}
