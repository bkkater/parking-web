"use client";

import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";

// Components
import Button from "@/components/Button";
import Form from "@/components/Form";
import Error from "@/components/Error";

// Utils
import { carSchema } from "@/utils/schema/car";

// Contexts
import { FormSchema, useHomeContext } from "@/contexts/homeContext";

const EntryForm = () => {
  const { getLastRecord, onSubmitEntry, error } = useHomeContext();

  const {
    register,
    handleSubmit,
    watch,
    setError,

    formState: { errors: formErrors, isSubmitSuccessful, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Submit da entrada do veículo.
   */
  const handleSubmitEntry = useCallback(
    async (data: FormSchema) => {
      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se houver erro no registro anterior, ou se o veículo já estiver estacionado, exibe mensagem de erro.
       */
      if (lastRecordError || (lastRecord && !lastRecord.left)) {
        setError("plate", {
          message: lastRecordError || "Veículo já estacionado",
        });

        return;
      }

      onSubmitEntry(data);
    },
    [getLastRecord, onSubmitEntry, setError],
  );

  useEffect(() => {
    if (error.entry) {
      setError("plate", {
        message: error.entry,
      });
    }
  }, [error.entry, setError]);

  return (
    <Form onSubmit={handleSubmit(handleSubmitEntry)}>
      <Form.State
        isSubmitSuccessful={isSubmitSuccessful && !formErrors}
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
            error={formErrors.plate?.message}
            {...register("plate")}
          />

          {formErrors.plate && <Error text={formErrors.plate.message} />}
        </Form.Field>

        <Button type="submit" disabled={!watch("plate") || isSubmitting}>
          Confirmar entrada
        </Button>
      </Form.State>
    </Form>
  );
};

export default EntryForm;
