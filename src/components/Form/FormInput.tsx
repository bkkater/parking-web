import { InputHTMLAttributes as InputProps } from "react";

export default function Input({ ...rest }: InputProps<HTMLInputElement>) {
  return (
    <input
      className="bg-yellow100 border-gray200 h-14 border text-center text-2xl uppercase outline-none"
      {...rest}
    />
  );
}
