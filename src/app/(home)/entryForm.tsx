"use client";

import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Submit da entrada do veículo.
   */
  const handleSubmitEntry = useCallback(
    async (data: FormSchema) => {
      setSuccess(false);
      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      if (lastRecordError) {
        return setError("plate", {
          message: lastRecordError,
        });
      }

      if (lastRecord && !lastRecord.left) {
        return setError("plate", {
          message: "Veículo já estacionado",
        });
      }

      onSubmitEntry(data);
      setSuccess(true);
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

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    }
  }, [success]);

  return (
    <Form onSubmit={handleSubmit(handleSubmitEntry)}>
      <Form.State
        isSubmitSuccessful={success}
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
            data-testid="input_entry_plate"
            {...register("plate")}
          />

          {formErrors.plate && <Error text={formErrors.plate.message} />}
        </Form.Field>

        <Button
          type="submit"
          disabled={!watch("plate") || isSubmitting}
          data-testid="submit_entry_plate"
        >
          Confirmar entrada
        </Button>
      </Form.State>
    </Form>
  );
};

export default EntryForm;
