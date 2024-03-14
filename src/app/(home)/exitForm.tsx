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

  /**
   * Fecha modais de pagamento e saída.
   */
  const handleModalsClose = useCallback(() => {
    setShowPaymentAlert(false);
    setShowExitAlert(false);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors: formErrors, isSubmitting },
  } = useForm<FormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Submit do pagamento do veículo.
   */
  const handleSubmitPayment = useCallback(
    async (data: FormSchema) => {
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

      handleModalsClose();
    },
    [getLastRecord, handleModalsClose, onSubmitPayment, setError],
  );

  /**
   * Submit da saída do veículo.
   */
  const handleSubmitExit = useCallback(
    async (data: FormSchema) => {
      const { lastRecord, error: lastRecordError } = await getLastRecord(data);

      /**
       * Se houver erro no registro anterior, ou se o veículo não realizou o pagamento, exibe mensagem de erro.
       */
      if (lastRecordError || !lastRecord || !lastRecord.paid) {
        setError("plate", {
          message: lastRecordError || "Veículo não realizou o pagamento",
        });
      } else {
        onSubmitExit(data);
      }

      handleModalsClose();
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
    </Form>
  );
};

export default ExitForm;
