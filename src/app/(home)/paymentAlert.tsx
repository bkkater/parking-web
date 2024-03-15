import { Dispatch, ReactNode, SetStateAction } from "react";
import { FormState } from "react-hook-form";

// Components
import AlertDialog from "@/components/AlertDialog";
import Button from "@/components/Button";
import Form from "@/components/Form";

type PaymentAlertProps = {
  onSubmit: () => void;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  open: boolean;
  disableTrigger: boolean;
  children: ReactNode | string;
  formState: FormState<any>;
};

export default function PaymentAlert({
  disableTrigger,
  onSubmit,
  children,
  open,
  onOpenChange,
  formState,
}: PaymentAlertProps) {
  const { isSubmitSuccessful, errors, isSubmitting } = formState;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Trigger asChild>
        <Button color="secoundary" disabled={disableTrigger}>
          Pagamento
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <Form.State
          isSubmitSuccessful={isSubmitSuccessful && !!errors.plate}
          isLoading={isSubmitting}
          submittedText="Pago!"
          loadingText="Confirmando..."
        >
          <AlertDialog.Title>
            Confima o pagamento da placa abaixo?
          </AlertDialog.Title>

          {children}

          <AlertDialog.Action asChild>
            <Button color="secoundary" onClick={onSubmit} type="button">
              Confirmar
            </Button>
          </AlertDialog.Action>

          <AlertDialog.Cancel />
        </Form.State>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
