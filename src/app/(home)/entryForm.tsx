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
  verifyPlateStatus: (data: EntryFormSchema) => any;
};

const EntryForm = ({ onSubmitEntry, verifyPlateStatus }: EntryFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<EntryFormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Submit da entrada do veículo.
   */
  const handleSubmitEntry = useCallback(
    async (data: EntryFormSchema) => {
      const { plate } = data;

      const { data: lastRegisterData, error } = await verifyPlateStatus({
        plate,
      });

      /**
       * Em caso de erro na requisição ou se o veículo já estiver estacionado, exibe mensagem de erro.
       */
      if (
        error ||
        (lastRegisterData && (!lastRegisterData.paid || !lastRegisterData.left))
      ) {
        setError("plate", { message: error || "Veículo já estacionado" });

        return;
      }

      onSubmitEntry({ plate });
    },
    [onSubmitEntry, setError, verifyPlateStatus],
  );

  return (
    <Form onSubmit={handleSubmit(handleSubmitEntry)}>
      <Form.State
        isSubmitSuccessful={isSubmitSuccessful}
        isLoading={isSubmitting}
        submittedText="Registrado!"
        loadingText="Registrando..."
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

        <Button type="submit" disabled={!watch("plate") || isSubmitting}>
          Confirmar entrada
        </Button>
      </Form.State>
    </Form>
  );
};

export default EntryForm;
