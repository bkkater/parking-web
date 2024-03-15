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

  const { errors: formErrors, isSubmitting } = formState;

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

  const handleFormSubmit = useCallback(
    async (data: FormSchema, isPayment: boolean) => {
      setSuccess(false);

      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      if (lastRecordError) {
        setError("plate", {
          message: lastRecordError,
        });

        setSuccess(false);
        return;
      }

      if ((lastRecord && lastRecord.left) || !lastRecord) {
        setError("plate", {
          message: "Veículo não tem registro aberto",
        });

        setSuccess(false);
        return;
      }

      if (isPayment && lastRecord && lastRecord.paid && !lastRecord.left) {
        setError("plate", {
          message: "Veículo já realizou o pagamento",
        });

        setSuccess(false);
        return;
      }

      if (!isPayment && lastRecord && !lastRecord.paid) {
        setError("plate", {
          message: "Veículo não realizou o pagamento",
        });

        setSuccess(false);
        return;
      }

      if (isPayment) {
        onSubmitPayment(data);
      } else {
        onSubmitExit(data);
      }

      setSuccess(true);
    },
    [getLastRecord, onSubmitPayment, onSubmitExit, setError],
  );

  const handleSubmitPayment = useCallback(
    async (data: FormSchema) => {
      await handleFormSubmit(data, true);
    },
    [handleFormSubmit],
  );

  const handleSubmitExit = useCallback(
    async (data: FormSchema) => {
      await handleFormSubmit(data, false);
    },
    [handleFormSubmit],
  );

  /**
   * Faz validação da placa e redireciona para a página de histórico.
   */
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

  /**
   * Verifica se houve erro na requisição de getLastRecord.
   */
  useEffect(() => {
    if (error.exit) {
      setError("plate", {
        message: error.exit,
      });
    }
  }, [error.exit, setError]);

  /**
   * Fecha modais de pagamento e saída em caso de erro.
   */
  useEffect(() => {
    if (formErrors.plate && (showExitAlert || showPaymentAlert)) {
      handleModalsClose();
    }
  }, [formErrors.plate, handleModalsClose, showExitAlert, showPaymentAlert]);

  /**
   * Finaliza a animação de sucesso e fecha modais de pagamento e saída.
   */
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
        handleModalsClose();
      }, 2000);

      return () => clearTimeout(timer);
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
