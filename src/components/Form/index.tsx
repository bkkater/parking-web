import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

// Components
import Input from "@/components/Form/FormInput";
import Label from "@/components/Form/FormLabel";
import Field from "@/components/Form/FormField";
import State from "@/components/Form/FormState";

export type FormProps = ComponentProps<"form">;

export default function Form({ children, className, ...rest }: FormProps) {
  return (
    <form className={twMerge("grid gap-3", className)} {...rest}>
      {children}
    </form>
  );
}

Form.Field = Field;
Form.Input = Input;
Form.Label = Label;
Form.State = State;
