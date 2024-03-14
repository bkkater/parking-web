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

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: {
      errors: formErrors,
      isSubmitting,
      isSubmitSuccessful,
      isLoading,
    },
  } = useForm<FormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Fecha modais de pagamento e saída.
   */
  const handleModalsClose = useCallback(() => {
    setShowPaymentAlert(false);
    setShowExitAlert(false);
  }, []);

  /**
   * Submit do pagamento do veículo.
   */
  const handleSubmitPayment = useCallback(
    async (data: FormSchema) => {
      handleModalsClose();

      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se houver erro no registro anterior, ou se o veículo já realizou o pagamento, exibe mensagem de erro.
       */
      if (
        lastRecordError ||
        !lastRecord ||
        (lastRecord.paid && !lastRecord.left)
      ) {
        setError("plate", {
          message: lastRecordError || "Veículo já realizou o pagamento",
        });
      } else {
        onSubmitPayment(data);
      }
    },
    [getLastRecord, handleModalsClose, onSubmitPayment, setError],
  );

  /**
   * Submit da saída do veículo.
   */
  const handleSubmitExit = useCallback(
    async (data: FormSchema) => {
      handleModalsClose();

      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se ocorreu algum erro ao pegar dados do veículo, exibe mensagem de erro.
       */
      if (lastRecordError) {
        setError("plate", {
          message: lastRecordError,
        });
      }

      /**
       * Se o veículo não possui registro, exibe mensagem de erro.
       */
      if ((lastRecord && !lastRecord.paid) || !lastRecord) {
        setError("plate", {
          message: "Veículo não tem registro aberto",
        });
      }

      /**
       * Se o veículo não realizou o pagamento, exibe mensagem de erro.
       */
      if (lastRecord && !lastRecord.paid) {
        setError("plate", {
          message: "Veículo não realizou o pagamento",
        });
      } else {
        onSubmitExit(data);
      }
    },
    [getLastRecord, handleModalsClose, onSubmitExit, setError],
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
  }, [error.exit, setError]);

  return (
    <Form>
      <Form.State
        submittedText="Registrado!"
        loadingText="Carregando..."
        isLoading={isLoading}
        isSubmitSuccessful={isSubmitSuccessful && !error}
      >
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
          disableTrigger={!watch("plate") || isSubmitting}
          onSubmit={handleSubmit(handleSubmitPayment, handleModalsClose)}
        >
          <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
        </PaymentAlert>

        <ExitAlert
          open={showExitAlert}
          onOpenChange={setShowExitAlert}
          disableTrigger={!watch("plate") || isSubmitting}
          onSubmit={handleSubmit(handleSubmitExit, handleModalsClose)}
        >
          <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
        </ExitAlert>

        <button
          type="button"
          onClick={handleHistoryClick}
          className="mx-auto mt-3 font-semibold uppercase text-cyan200 transition-colors hover:text-cyan300 disabled:text-gray700"
          disabled={!watch("plate") || isSubmitting}
        >
          Ver histórico
        </button>
      </Form.State>
    </Form>
  );
};

export default ExitForm;
