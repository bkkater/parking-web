import { ComponentProps, forwardRef } from "react";
import { tv } from "tailwind-variants";

const button = tv({
  base: "h-16 w-full text-center uppercase outline-none text-white disabled:text-gray700 rounded shadow transition-colors",
  variants: {
    color: {
      primary:
        "bg-green200 border-2 border-green200 hover:bg-green100 hover:border-green100",
      secoundary:
        "bg-violet500 border-2 border-violet500 hover:bg-violet400 hover:border-violet400",
    },
    variant: {
      filled: "disabled:bg-gray300 disabled:border-gray300 ",
      outlined:
        "bg-transparent disabled:border-gray200 text-violet500 hover:bg-transparent",
    },
  },
  defaultVariants: {
    variant: "filled",
    color: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> & {
  variant?: "filled" | "outlined";
  color?: "primary" | "secoundary";
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, color, children, ...rest }, ref) => {
    return (
      <button className={button({ variant, color })} ref={ref} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export default Button;
