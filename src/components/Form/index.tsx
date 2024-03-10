import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

// Components
import Input from "@/components/Form/FormInput";
import Label from "@/components/Form/FormLabel";
import Field from "@/components/Form/FormField";

interface FormProps extends HTMLAttributes<HTMLFormElement> {
  children: React.ReactNode;
}

export default function Form({ children, className }: FormProps) {
  return <form className={twMerge("grid gap-3", className)}>{children}</form>;
}

Form.Field = Field;
Form.Input = Input;
Form.Label = Label;
