"use client";

import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  uppercaseInput?: boolean;
  error?: string | undefined;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, uppercaseInput, error, ...rest }, ref) => {
    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
      if (uppercaseInput) {
        e.currentTarget.value = e.currentTarget.value.toUpperCase();
      }
    }

    return (
      <input
        className="data-[error=true]:text-pink200 h-16 border border-gray200 bg-yellow100 text-center text-2xl outline-none data-[error=true]:text-pink700"
        autoComplete="off"
        data-error={!!error}
        onInput={handleInput}
        ref={ref}
        {...rest}
      />
    );
  },
);

Input.displayName = "Input";

export default Input;
