"use client";

import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

// Components
import Form from "@/components/Form";
import Error from "@/components/Error";
import PaymentAlert from "@/app/(home)/paymentAlert";
import ExitAlert from "@/app/(home)/exitAlert";

// Utils
import { zodResolver } from "@hookform/resolvers/zod";

// Utils
import { carSchema } from "@/utils/schema/car";

export type ExitFormSchema = z.infer<typeof carSchema>;

type EntryFormProps = {
  onSubmitPayment: (data: ExitFormSchema) => void;
  onSubmitExit: (data: ExitFormSchema) => void;
  verifyPlateStatus: (data: ExitFormSchema) => any;
};

const ExitForm = ({
  onSubmitPayment,
  onSubmitExit,
  verifyPlateStatus,
}: EntryFormProps) => {
  const [showPaymentAlert, setShowPaymentAlert] = useState(false);
  const [showExitAlert, setShowExitAlert] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setError,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ExitFormSchema>({
    resolver: zodResolver(carSchema),
  });

  /**
   * Fecha o modal em caso de erro ou sucesso na requisição.
   */
  const handleCloseModal = useCallback(() => {
    setShowPaymentAlert(false);
    setShowExitAlert(false);
  }, []);

  /**
   * Submit do pagamento do veículo.
   */
  const handleSubmitPayment = useCallback(
    async (data: ExitFormSchema) => {
      const { plate } = data;

      const { data: historyData, error } = await verifyPlateStatus({ plate });

      if (error || !historyData || (historyData.paid && !historyData.left)) {
        setError("plate", {
          message: error || "Veículo já realizou o pagamento",
        });
      } else {
        onSubmitPayment({ plate });
      }

      handleCloseModal();
    },
    [handleCloseModal, onSubmitPayment, setError, verifyPlateStatus],
  );

  /**
   * Submit da saída do veículo.
   */
  const handleSubmitExit = useCallback(
    async (data: ExitFormSchema) => {
      const { plate } = data;

      const { data: historyData, error } = await verifyPlateStatus({ plate });

      if (error || !historyData || !historyData.paid) {
        setError("plate", {
          message: error || "Veículo não realizou o pagamento",
        });
      } else {
        onSubmitExit({ plate });
      }

      handleCloseModal();
    },
    [handleCloseModal, onSubmitExit, setError, verifyPlateStatus],
  );

  return (
    <Form>
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

      <PaymentAlert
        disableTrigger={!watch("plate") || isSubmitting}
        onSubmit={handleSubmit(handleSubmitPayment, handleCloseModal)}
        open={showPaymentAlert}
        onOpenChange={setShowPaymentAlert}
      >
        <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
      </PaymentAlert>

      <ExitAlert
        disableTrigger={!watch("plate") || isSubmitting}
        onSubmit={handleSubmit(handleSubmitExit, handleCloseModal)}
        open={showExitAlert}
        onOpenChange={setShowExitAlert}
      >
        <span className="mb-3 text-4xl text-cyan200">{watch("plate")}</span>
      </ExitAlert>

      {isValid && (
        <Link
          href={`/history/${getValues("plate")}`}
          className="mx-auto mt-3 font-semibold uppercase text-cyan200 transition-colors hover:text-cyan300"
        >
          Ver histórico
        </Link>
      )}
    </Form>
  );
};

export default ExitForm;
