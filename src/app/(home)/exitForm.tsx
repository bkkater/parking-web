"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// Components
import Form from "@/components/Form";
import Error from "@/components/Error";
import PaymentAlert from "@/app/(home)/paymentAlert";
import ExitAlert from "@/app/(home)/exitAlert";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Utils
import { carSchema, errorMessage } from "@/utils/schema/car";

// Contexts
import { FormSchema, useHomeContext } from "@/contexts/homeContext";

const ExitForm = () => {
  const router = useRouter();
  const { getLastRecord, onSubmitPayment, onSubmitExit, error } =
    useHomeContext();

  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);
  const [success, setSuccess] = useState(false);

  const { register, handleSubmit, watch, getValues, setError, formState } =
    useForm<FormSchema>({
      resolver: zodResolver(carSchema),
    });

  const { errors: formErrors, isSubmitting, isSubmitted } = formState;

  /**
   * Fecha modais de pagamento e saída.
   */
  const handleModalsClose = useCallback(() => {
    if (showPaymentAlert) {
      setShowPaymentAlert(false);
    } else if (showExitAlert) {
      setShowExitAlert(false);
    }
  }, [showExitAlert, showPaymentAlert]);

  /**
   * Submit do pagamento do veículo.
   */
  const handleSubmitPayment = useCallback(
    async (data: FormSchema) => {
      setSuccess(false);

      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se ocorreu algum erro ao pegar dados do veículo, exibe mensagem de erro.
       */
      if (lastRecordError) {
        setError("plate", {
          message: lastRecordError,
        });

        setSuccess(false);
        return;
      }

      /**
       * Se o veículo não possui registro, exibe mensagem de erro.
       */
      if ((lastRecord && lastRecord.left) || !lastRecord) {
        setError("plate", {
          message: "Veículo não tem registro aberto",
        });

        setSuccess(false);
        return;
      }

      /**
       * Se o veículo já realizou o pagamento, exibe mensagem de erro.
       */
      if (lastRecord.paid && !lastRecord.left) {
        setError("plate", {
          message: lastRecordError || "Veículo já realizou o pagamento",
        });

        setSuccess(false);
        return;
      }

      onSubmitPayment(data);
      setSuccess(true);
    },
    [getLastRecord, onSubmitPayment, setError],
  );

  /**
   * Submit da saída do veículo.
   */
  const handleSubmitExit = useCallback(
    async (data: FormSchema) => {
      setSuccess(false);

      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se ocorreu algum erro ao pegar dados do veículo, exibe mensagem de erro.
       */
      if (lastRecordError) {
        setError("plate", {
          message: lastRecordError,
        });

        setSuccess(false);
        return;
      }

      /**
       * Se o veículo não possui registro, exibe mensagem de erro.
       */
      if ((lastRecord && lastRecord.left) || !lastRecord) {
        setError("plate", {
          message: "Veículo não tem registro aberto",
        });

        setSuccess(false);
        return;
      }

      /**
       * Se o veículo não realizou o pagamento, exibe mensagem de erro.
       */
      if (lastRecord && !lastRecord.paid) {
        setError("plate", {
          message: "Veículo não realizou o pagamento",
        });
        setSuccess(false);

        return;
      }

      onSubmitExit(data);
      setSuccess(true);
    },
    [getLastRecord, onSubmitExit, setError],
  );

  const handleHistoryClick = useCallback(() => {
    const plate = getValues("plate");
    const validationResult = carSchema.safeParse({ plate });

    if (validationResult.success) {
      router.push(`/history/${plate}`);
    } else {
      setError("plate", {
        message: errorMessage,
      });
    }
  }, [getValues, router, setError]);

  useEffect(() => {
    if (error.exit) {
      setError("plate", {
        message: error.exit,
      });
    }
  }, [
    error.exit,
    formErrors,
    handleModalsClose,
    setError,
    showExitAlert,
    showPaymentAlert,
  ]);

  useEffect(() => {
    if (formErrors.plate && (showExitAlert || showPaymentAlert)) {
      handleModalsClose();
    }
  }, [formErrors, handleModalsClose, showExitAlert, showPaymentAlert]);

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSuccess(false);
        handleModalsClose();
      }, 2000);
    }
  }, [handleModalsClose, success]);

  const shouldDisableTrigger = !watch("plate") || isSubmitting || success;

  return (
    <Form>
      <Form.Field>
        <Form.Label htmlFor="plate">Numero da placa:</Form.Label>

        <Form.Input
          id="plate"
          type="text"
          placeholder="AAA-0000"
          error={formErrors.plate?.message}
          uppercaseInput
          {...register("plate")}
        />

        {formErrors.plate && <Error text={formErrors.plate.message} />}
      </Form.Field>

      <PaymentAlert
        open={showPaymentAlert}
        onOpenChange={setShowPaymentAlert}
        disableTrigger={shouldDisableTrigger}
        onSubmit={handleSubmit(handleSubmitPayment, handleModalsClose)}
        formState={formState}
        success={success}
      >
        <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
      </PaymentAlert>

      <ExitAlert
        open={showExitAlert}
        onOpenChange={setShowExitAlert}
        disableTrigger={shouldDisableTrigger}
        onSubmit={handleSubmit(handleSubmitExit, handleModalsClose)}
        formState={formState}
        success={success}
      >
        <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
      </ExitAlert>

      <button
        type="button"
        onClick={handleHistoryClick}
        disabled={shouldDisableTrigger}
        className="mx-auto mt-3 font-semibold uppercase text-cyan200 transition-colors hover:text-cyan300 disabled:text-gray700"
      >
        Ver histórico
      </button>
    </Form>
  );
};

export default ExitForm;
