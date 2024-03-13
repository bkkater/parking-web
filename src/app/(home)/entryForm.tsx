"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form";
import Error from "@/components/Error";

// Utils
import { carSchema } from "@/utils/schema/car";

export type EntryFormSchema = z.infer<typeof carSchema>;

type EntryFormProps = {
  onSubmitEntry: (data: EntryFormSchema) => void;
};

const EntryForm = ({ onSubmitEntry }: EntryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitSuccessful, isSubmitting, isLoading },
  } = useForm<EntryFormSchema>({
    resolver: zodResolver(carSchema),
  });

  const handleSubmitEntry = useCallback(
    async (data: EntryFormSchema) => {
      /**
       * Simula um delay na requisição para mostrar o loading.
       */
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      onSubmitEntry(data);
    },
    [onSubmitEntry],
  );

  return (
    <Form onSubmit={handleSubmit(handleSubmitEntry)}>
      <Form.State
        isSubmitSuccessful={isSubmitSuccessful}
        isLoading={isSubmitting}
      >
        <Form.Field>
          <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

          <Form.Input
            id="plate"
            type="text"
            placeholder="AAA-0000"
            uppercaseInput
            error={errors.plate?.message}
            {...register("plate")}
          />

          {errors.plate && <Error text={errors.plate.message} />}
        </Form.Field>

        <Button type="submit" disabled={!watch("plate")}>
          Confirmar entrada
        </Button>
      </Form.State>
    </Form>
  );
};

export default EntryForm;
