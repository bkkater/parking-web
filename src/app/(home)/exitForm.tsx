"use client";

import { useCallback } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form";
import Error from "@/components/Error";

// Utils
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Utils
import { carSchema } from "@/utils/schema/car";

export type ExitFormSchema = z.infer<typeof carSchema>;

type EntryFormProps = {
  onSubmitPayment: (data: ExitFormSchema) => void;
  onSubmitExit: (data: ExitFormSchema) => void;
};

const ExitForm = ({ onSubmitPayment, onSubmitExit }: EntryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors, isSubmitSuccessful, isSubmitting, isValid },
  } = useForm<ExitFormSchema>({
    resolver: zodResolver(carSchema),
  });

  const handleSubmitPayment = useCallback(
    async (data: ExitFormSchema) => {
      /**
       * Simula um delay na requisição para exibir o loading.
       */
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      onSubmitPayment(data);
    },
    [onSubmitPayment],
  );

  const handleSubmitExit = useCallback(
    async (data: ExitFormSchema) => {
      /**
       * Simula um delay na requisição para exibir o loading.
       */
      await new Promise((resolve) => {
        setTimeout(resolve, 2000);
      });

      onSubmitExit(data);
    },
    [onSubmitExit],
  );

  return (
    <Form>
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
            error={errors.plate?.message}
            uppercaseInput
            {...register("plate")}
          />

          {errors.plate && <Error text={errors.plate.message} />}
        </Form.Field>

        <Button
          color="secoundary"
          type="button"
          onClick={handleSubmit(handleSubmitPayment)}
          disabled={!watch("plate")}
        >
          Pagamento
        </Button>

        <Button
          color="secoundary"
          variant="outlined"
          type="button"
          onClick={handleSubmit(handleSubmitExit)}
          disabled={!watch("plate")}
        >
          Saída
        </Button>

        {isValid && (
          <Link
            href={`/history/${getValues("plate")}`}
            className="mx-auto mt-3 font-semibold uppercase text-cyan200"
          >
            Ver histórico
          </Link>
        )}
      </Form.State>
    </Form>
  );
};

export default ExitForm;
